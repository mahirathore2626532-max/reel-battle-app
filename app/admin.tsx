import { router } from "expo-router";
import {
    collection,
    doc,
    increment,
    onSnapshot,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { isAdminPhone } from "../lib/admin";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db } from "../lib/firebase";

type WithdrawItem = {
  id: string;
  userId: string;
  userName: string;
  phone: string;
  amount: number;
  upiId: string;
  status: "pending" | "approved" | "rejected";
};

type BattleItem = {
  id: string;
  title: string;
  prize?: number;
  status?: "live" | "upcoming" | "completed";
  joinedUsers?: string[];
  joinedUserNames?: string[];
  winnerId?: string;
  winnerName?: string;
};

export default function AdminScreen() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<"withdraws" | "battles">("withdraws");
  const [withdraws, setWithdraws] = useState<WithdrawItem[]>([]);
  const [battles, setBattles] = useState<BattleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (!isAdminPhone(user.phone)) {
        Alert.alert("Access Denied", "Aap admin nahi ho");
        router.replace("/home");
        return;
      }

      setCurrentUser(user);
      setAuthorized(true);
    });
  }, []);

  useEffect(() => {
    if (!authorized) return;

    const unsubWithdraws = onSnapshot(
      query(collection(db, "withdraw_requests"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const list: WithdrawItem[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<WithdrawItem, "id">),
        }));
        setWithdraws(list);
        setLoading(false);
      },
      () => setLoading(false)
    );

    const unsubBattles = onSnapshot(
      query(collection(db, "battles"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const list: BattleItem[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<BattleItem, "id">),
        }));
        setBattles(list);
      }
    );

    return () => {
      unsubWithdraws();
      unsubBattles();
    };
  }, [authorized]);

  const approveWithdraw = async (item: WithdrawItem) => {
    try {
      setProcessingId(item.id);

      await runTransaction(db, async (transaction) => {
        const withdrawRef = doc(db, "withdraw_requests", item.id);
        const withdrawSnap = await transaction.get(withdrawRef);

        if (!withdrawSnap.exists()) {
          throw new Error("Withdraw request nahi mili");
        }

        const withdrawData = withdrawSnap.data() as WithdrawItem;

        if (withdrawData.status !== "pending") {
          throw new Error("Ye request pehle hi process ho chuki hai");
        }

        transaction.update(withdrawRef, {
          status: "approved",
          processedAt: serverTimestamp(),
        });
      });

      Alert.alert("Success", "Withdraw request approve ho gayi");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Approve fail ho gaya");
    } finally {
      setProcessingId("");
    }
  };

  const rejectWithdraw = async (item: WithdrawItem) => {
    try {
      setProcessingId(item.id);

      await runTransaction(db, async (transaction) => {
        const withdrawRef = doc(db, "withdraw_requests", item.id);
        const userRef = doc(db, "users", item.userId);

        const withdrawSnap = await transaction.get(withdrawRef);
        const userSnap = await transaction.get(userRef);

        if (!withdrawSnap.exists()) {
          throw new Error("Withdraw request nahi mili");
        }

        if (!userSnap.exists()) {
          throw new Error("User nahi mila");
        }

        const withdrawData = withdrawSnap.data() as WithdrawItem;

        if (withdrawData.status !== "pending") {
          throw new Error("Ye request pehle hi process ho chuki hai");
        }

        transaction.update(withdrawRef, {
          status: "rejected",
          processedAt: serverTimestamp(),
        });

        transaction.update(userRef, {
          walletBalance: increment(Number(item.amount || 0)),
        });

        const walletTxnRef = doc(collection(db, "wallet_transactions"));
        transaction.set(walletTxnRef, {
          userId: item.userId,
          userName: item.userName,
          type: "withdraw_refund",
          amount: Number(item.amount || 0),
          status: "credit",
          battleTitle: "",
          createdAt: serverTimestamp(),
        });
      });

      Alert.alert("Success", "Withdraw reject ho gaya aur refund wapas add ho gaya");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Reject fail ho gaya");
    } finally {
      setProcessingId("");
    }
  };

  const setBattleWinner = async (
    battle: BattleItem,
    winnerId: string,
    winnerName: string
  ) => {
    try {
      setProcessingId(`${battle.id}_${winnerId}`);

      await runTransaction(db, async (transaction) => {
        const battleRef = doc(db, "battles", battle.id);
        const winnerRef = doc(db, "users", winnerId);

        const battleSnap = await transaction.get(battleRef);
        const winnerSnap = await transaction.get(winnerRef);

        if (!battleSnap.exists()) {
          throw new Error("Battle nahi mili");
        }

        if (!winnerSnap.exists()) {
          throw new Error("Winner user nahi mila");
        }

        const battleData = battleSnap.data() as BattleItem;

        if (battleData.status === "completed" && battleData.winnerId) {
          throw new Error("Winner pehle hi set ho chuka hai");
        }

        const prizeAmount = Number(battleData.prize || 0);

        transaction.update(battleRef, {
          winnerId,
          winnerName,
          status: "completed",
          completedAt: serverTimestamp(),
        });

        transaction.update(winnerRef, {
          walletBalance: increment(prizeAmount),
        });

        const walletTxnRef = doc(collection(db, "wallet_transactions"));
        transaction.set(walletTxnRef, {
          userId: winnerId,
          userName: winnerName,
          type: "battle_winner_prize",
          amount: prizeAmount,
          status: "credit",
          battleId: battle.id,
          battleTitle: battle.title,
          createdAt: serverTimestamp(),
        });
      });

      Alert.alert("Success", `Winner set ho gaya: ${winnerName}`);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Winner set nahi hua");
    } finally {
      setProcessingId("");
    }
  };

  const renderWithdrawItem = ({ item }: { item: WithdrawItem }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.userName}</Text>
      <Text style={styles.cardText}>Phone: {item.phone}</Text>
      <Text style={styles.cardText}>UPI: {item.upiId}</Text>
      <Text style={styles.cardText}>Amount: ₹ {item.amount}</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>

      {item.status === "pending" ? (
        <View style={styles.row}>
          <Pressable
            style={[styles.smallBtn, styles.approveBtn]}
            onPress={() => approveWithdraw(item)}
            disabled={processingId === item.id}
          >
            {processingId === item.id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.smallBtnText}>Approve</Text>
            )}
          </Pressable>

          <Pressable
            style={[styles.smallBtn, styles.rejectBtn]}
            onPress={() => rejectWithdraw(item)}
            disabled={processingId === item.id}
          >
            {processingId === item.id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.smallBtnText}>Reject + Refund</Text>
            )}
          </Pressable>
        </View>
      ) : null}
    </View>
  );

  const renderBattleItem = ({ item }: { item: BattleItem }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>Prize: ₹ {item.prize || 0}</Text>
      <Text style={styles.cardText}>Status: {item.status || "N/A"}</Text>
      <Text style={styles.cardText}>
        Winner: {item.winnerName || "Not selected"}
      </Text>

      <Text style={[styles.cardText, { marginTop: 8, fontWeight: "700" }]}>
        Participants:
      </Text>

      {(item.joinedUserNames || []).length > 0 ? (
        (item.joinedUserNames || []).map((name, index) => {
          const uid = item.joinedUsers?.[index] || "";
          const key = `${item.id}_${uid}`;

          return (
            <Pressable
              key={`${item.id}_${uid}_${index}`}
              style={[styles.smallBtn, styles.winnerBtn, { marginTop: 8 }]}
              onPress={() => setBattleWinner(item, uid, name)}
              disabled={!!item.winnerId || processingId === key}
            >
              {processingId === key ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.smallBtnText}>
                  {item.winnerId ? `Winner: ${item.winnerName}` : `Set Winner: ${name}`}
                </Text>
              )}
            </Pressable>
          );
        })
      ) : (
        <Text style={styles.cardText}>No participants</Text>
      )}
    </View>
  );

  if (!authorized || !currentUser) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Panel</Text>
        <Text style={styles.subtitle}>Admin: {currentUser.name}</Text>

        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tabBtn, tab === "withdraws" && styles.activeTab]}
            onPress={() => setTab("withdraws")}
          >
            <Text
              style={[styles.tabText, tab === "withdraws" && styles.activeTabText]}
            >
              Withdraws
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabBtn, tab === "battles" && styles.activeTab]}
            onPress={() => setTab("battles")}
          >
            <Text
              style={[styles.tabText, tab === "battles" && styles.activeTabText]}
            >
              Battles
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : tab === "withdraws" ? (
          <FlatList
            data={withdraws}
            keyExtractor={(item) => item.id}
            renderItem={renderWithdrawItem}
            ListEmptyComponent={
              <Text style={styles.empty}>Koi withdraw request nahi hai</Text>
            }
          />
        ) : (
          <FlatList
            data={battles}
            keyExtractor={(item) => item.id}
            renderItem={renderBattleItem}
            ListEmptyComponent={
              <Text style={styles.empty}>Koi battle nahi hai</Text>
            }
          />
        )}

        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 14,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#2563eb",
  },
  tabText: {
    color: "#111",
    fontWeight: "700",
  },
  activeTabText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  cardText: {
    color: "#444",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  smallBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
  },
  approveBtn: {
    backgroundColor: "#16a34a",
  },
  rejectBtn: {
    backgroundColor: "#dc2626",
  },
  winnerBtn: {
    backgroundColor: "#7c3aed",
  },
  smallBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 6,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
  backBtn: {
    marginTop: 8,
    backgroundColor: "#111827",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});