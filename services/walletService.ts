import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { WalletTransaction } from "../types";

export async function getTransactions(userId: string): Promise<WalletTransaction[]> {
  try {
    const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const snap = await getDocs(q);

    const items = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<WalletTransaction, "id">),
    }));

    return items.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export async function addTransaction(params: {
  userId: string;
  type: "credit" | "debit";
  title: string;
  subtitle?: string;
  amount: number;
}) {
  await addDoc(collection(db, "transactions"), {
    ...params,
    createdAt: Date.now(),
  });
}