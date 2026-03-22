import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type CreatePostInput = {
  userId: string;
  title: string;
  caption: string;
  category: string;
  type: "reel" | "battle";
  videoUrl?: string;
  thumbnailUrl?: string;
};

export async function createPost(data: CreatePostInput) {
  const ref = collection(db, "posts");

  const docRef = await addDoc(ref, {
    userId: data.userId,
    title: data.title,
    caption: data.caption,
    category: data.category,
    type: data.type,
    videoUrl: data.videoUrl || "",
    thumbnailUrl: data.thumbnailUrl || "",
    likesCount: 0,
    commentsCount: 0,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getAllPosts() {
  const ref = collection(db, "posts");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getPostsByUser(userId: string) {
  const ref = collection(db, "posts");
  const q = query(ref, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}