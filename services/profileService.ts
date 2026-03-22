import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type UserProfile = {
  uid: string;
  name: string;
  phone: string;
  username: string;
  photoURL?: string;
  bio?: string;
};

export async function createUserProfile(profile: UserProfile) {
  const ref = doc(db, "users", profile.uid);

  await setDoc(
    ref,
    {
      ...profile,
      photoURL: profile.photoURL || "",
      bio: profile.bio || "",
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid">>
) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
}