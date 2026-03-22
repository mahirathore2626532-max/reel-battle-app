import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { mockBattles } from "../data/mock";
import { db } from "../lib/firebase";
import { BattleItem, JoinedBattle } from "../types";
import { getUserProfile, updateUserProfile } from "./profileService";
import { addTransaction } from "./walletService";

export async function seedBattlesIfEmpty() {
  const snap = await getDocs(collection(db, "battles"));
  if (!snap.empty) return;

  for (const item of mockBattles) {
    await setDoc(doc(db, "battles", item.id), item);
  }
}

export async function getBattles(): Promise<BattleItem[]> {
  try {
    await seedBattlesIfEmpty();
    const snap = await getDocs(collection(db, "battles"));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<BattleItem, "id">) }));
  } catch {
    return mockBattles;
  }
}

export async function getJoinedBattles(userId: string): Promise<JoinedBattle[]> {
  try {
    const q = query(collection(db, "joinedBattles"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<JoinedBattle, "id">) }));
  } catch {
    return [];
  }
}

export async function joinBattleLocal(params: { userId: string; battle: BattleItem }) {
  const { userId, battle } = params;

  const user = await getUserProfile(userId);

  if (battle.status === "Closed") {
    throw new Error("Battle closed");
  }

  if (battle.filledSpots >= battle.totalSpots) {
    throw new Error("Battle full");
  }

  if ((user.walletBalance || 0) < battle.entryFee) {
    throw new Error("Insufficient wallet balance");
  }

  await addDoc(collection(db, "joinedBattles"), {
    userId,
    battleId: battle.id,
    battleTitle: battle.title,
    entryFee: battle.entryFee,
    joinedAt: Date.now(),
    status: "Joined",
  });

  await updateUserProfile(userId, {
    walletBalance: user.walletBalance - battle.entryFee,
    joinedBattles: (user.joinedBattles || 0) + 1,
  });

  await updateDoc(doc(db, "battles", battle.id), {
    filledSpots: battle.filledSpots + 1,
  });

  await addTransaction({
    userId,
    type: "debit",
    title: "Battle Joined",
    subtitle: battle.title,
    amount: battle.entryFee,
  });
}

export async function declareResultLocal(params: {
  battleId: string;
  battleTitle: string;
  winnerUserId: string;
  prizeAmount: number;
}) {
  const { battleId, battleTitle, winnerUserId, prizeAmount } = params;
  const user = await getUserProfile(winnerUserId);

  await updateDoc(doc(db, "battles", battleId), {
    status: "Closed",
    winnerUserId,
    prizeAmount,
    resultDeclaredAt: Date.now(),
  });

  await updateUserProfile(winnerUserId, {
    walletBalance: (user.walletBalance || 0) + prizeAmount,
    winnings: (user.winnings || 0) + prizeAmount,
    wins: (user.wins || 0) + 1,
  });

  await addTransaction({
    userId: winnerUserId,
    type: "credit",
    title: "Battle Winning",
    subtitle: battleTitle,
    amount: prizeAmount,
  });
}