import { doc, getDoc, setDoc } from "firebase/firestore";
import { mockUser } from "../data/mock";
import { db } from "../lib/firebase";
import { UserProfile } from "../types";

export async function getUserProfile(uid: string): Promise<UserProfile> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const newUser = { ...mockUser, uid, createdAt: Date.now(), updatedAt: Date.now() };
      await setDoc(ref, newUser);
      return newUser;
    }

    return snap.data() as UserProfile;
  } catch {
    return { ...mockUser, uid };
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      ...data,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}