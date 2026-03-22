import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function submitSupportMessage(userId: string, message: string) {
  await addDoc(collection(db, "supportMessages"), {
    userId,
    message,
    createdAt: Date.now(),
  });
}