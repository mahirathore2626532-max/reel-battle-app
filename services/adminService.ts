import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BattleItem } from "../types";

export async function createBattle(data: Omit<BattleItem, "id">) {
  await addDoc(collection(db, "battles"), {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
}

export async function deleteBattle(battleId: string) {
  await deleteDoc(doc(db, "battles", battleId));
}

export async function updateBattle(battleId: string, data: Partial<BattleItem>) {
  await updateDoc(doc(db, "battles", battleId), {
    ...data,
    updatedAt: Date.now(),
  });
}