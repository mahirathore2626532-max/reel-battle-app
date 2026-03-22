const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_RAZORPAY_KEY_SECRET",
});

exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  try {
    const { uid, amount } = data;

    if (!uid || !amount) {
      throw new functions.https.HttpsError("invalid-argument", "uid and amount required");
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${uid}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await db.collection("paymentOrders").doc(order.id).set({
      uid,
      amount: Number(amount),
      orderId: order.id,
      status: "created",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
    };
  } catch (error) {
    console.error("createRazorpayOrder error:", error);
    throw new functions.https.HttpsError("internal", error.message || "Order creation failed");
  }
});

exports.verifyRazorpayPayment = functions.https.onCall(async (data, context) => {
  try {
    const {
      uid,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = data;

    if (!uid || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
      throw new functions.https.HttpsError("invalid-argument", "Missing payment fields");
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "YOUR_RAZORPAY_KEY_SECRET";
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new functions.https.HttpsError("permission-denied", "Invalid payment signature");
    }

    const userRef = db.collection("users").doc(uid);
    const txRef = db.collection("transactions").doc();
    const orderRef = db.collection("paymentOrders").doc(razorpay_order_id);

    await db.runTransaction(async (tx) => {
      const userSnap = await tx.get(userRef);

      if (!userSnap.exists) {
        throw new Error("User not found");
      }

      tx.update(userRef, {
        walletBalance: admin.firestore.FieldValue.increment(Number(amount)),
        updatedAt: Date.now(),
      });

      tx.set(txRef, {
        userId: uid,
        type: "credit",
        title: "Wallet Deposit",
        subtitle: "Razorpay Payment",
        amount: Number(amount),
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        createdAt: Date.now(),
        createdAtServer: admin.firestore.FieldValue.serverTimestamp(),
      });

      tx.set(orderRef, {
        status: "paid",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    });

    return {
      success: true,
      message: "Payment verified and wallet credited",
    };
  } catch (error) {
    console.error("verifyRazorpayPayment error:", error);
    throw new functions.https.HttpsError("internal", error.message || "Payment verification failed");
  }
});

exports.joinBattleSecure = functions.https.onCall(async (data, context) => {
  try {
    const { uid, battleId } = data;

    if (!uid || !battleId) {
      throw new functions.https.HttpsError("invalid-argument", "uid and battleId required");
    }

    const userRef = db.collection("users").doc(uid);
    const battleRef = db.collection("battles").doc(battleId);
    const joinedRef = db.collection("joinedBattles").doc();

    await db.runTransaction(async (tx) => {
      const [userSnap, battleSnap] = await Promise.all([
        tx.get(userRef),
        tx.get(battleRef),
      ]);

      if (!userSnap.exists) throw new Error("User not found");
      if (!battleSnap.exists) throw new Error("Battle not found");

      const user = userSnap.data();
      const battle = battleSnap.data();

      if (battle.status === "Closed") {
        throw new Error("Battle closed");
      }

      if (battle.filledSpots >= battle.totalSpots) {
        throw new Error("Battle full");
      }

      if ((user.walletBalance || 0) < battle.entryFee) {
        throw new Error("Insufficient wallet balance");
      }

      tx.update(userRef, {
        walletBalance: admin.firestore.FieldValue.increment(-Number(battle.entryFee)),
        joinedBattles: admin.firestore.FieldValue.increment(1),
        updatedAt: Date.now(),
      });

      tx.update(battleRef, {
        filledSpots: admin.firestore.FieldValue.increment(1),
        updatedAt: Date.now(),
      });

      tx.set(joinedRef, {
        userId: uid,
        battleId,
        battleTitle: battle.title,
        entryFee: Number(battle.entryFee),
        joinedAt: Date.now(),
        status: "Joined",
        createdAtServer: admin.firestore.FieldValue.serverTimestamp(),
      });

      tx.set(db.collection("transactions").doc(), {
        userId: uid,
        type: "debit",
        title: "Battle Joined",
        subtitle: battle.title,
        amount: Number(battle.entryFee),
        battleId,
        createdAt: Date.now(),
        createdAtServer: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    return {
      success: true,
      message: "Battle joined successfully",
    };
  } catch (error) {
    console.error("joinBattleSecure error:", error);
    throw new functions.https.HttpsError("internal", error.message || "Join failed");
  }
});

exports.declareBattleResult = functions.https.onCall(async (data, context) => {
  try {
    const { battleId, winnerUserId, prizeAmount } = data;

    if (!battleId || !winnerUserId || !prizeAmount) {
      throw new functions.https.HttpsError("invalid-argument", "battleId, winnerUserId, prizeAmount required");
    }

    const battleRef = db.collection("battles").doc(battleId);
    const userRef = db.collection("users").doc(winnerUserId);

    await db.runTransaction(async (tx) => {
      const [battleSnap, userSnap] = await Promise.all([
        tx.get(battleRef),
        tx.get(userRef),
      ]);

      if (!battleSnap.exists) throw new Error("Battle not found");
      if (!userSnap.exists) throw new Error("Winner not found");

      tx.update(battleRef, {
        status: "Closed",
        winnerUserId,
        prizeAmount: Number(prizeAmount),
        resultDeclaredAt: Date.now(),
      });

      tx.update(userRef, {
        walletBalance: admin.firestore.FieldValue.increment(Number(prizeAmount)),
        winnings: admin.firestore.FieldValue.increment(Number(prizeAmount)),
        wins: admin.firestore.FieldValue.increment(1),
        updatedAt: Date.now(),
      });

      tx.set(db.collection("transactions").doc(), {
        userId: winnerUserId,
        type: "credit",
        title: "Battle Winning",
        subtitle: battleSnap.data().title,
        amount: Number(prizeAmount),
        battleId,
        createdAt: Date.now(),
        createdAtServer: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    return {
      success: true,
      message: "Result declared successfully",
    };
  } catch (error) {
    console.error("declareBattleResult error:", error);
    throw new functions.https.HttpsError("internal", error.message || "Declare result failed");
  }
});