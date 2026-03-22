import { useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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
  TextInput,
  View,
} from "react-native";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db } from "../lib/firebase";

type CommentItem = {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  text: string;
};

export default function PostCommentsScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedInUser().then(setCurrentUser);
  }, []);

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, "post_comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: CommentItem[] = snapshot.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<CommentItem, "id">),
          }))
          .filter((item) => item.postId === postId);

        setComments(list);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return unsub;
  }, [postId]);

  const handleAddComment = async () => {
    if (!currentUser || !postId) return;

    if (!text.trim()) {
      Alert.alert("Error", "Comment likho");
      return;
    }

    try {
      await addDoc(collection(db, "post_comments"), {
        postId,
        userId: currentUser.id,
        userName: currentUser.name,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "posts", postId), {
        commentCount: increment(1),
      });

      setText("");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Comment add nahi hua");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Comments</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListEmptyComponent={<Text style={styles.emptyText}>Koi comment nahi hai</Text>}
            renderItem={({ item }) => (
              <View style={styles.commentCard}>
                <Text style={styles.commentUser}>{item.userName}</Text>
                <Text style={styles.commentId}>{item.userId}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
          />
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Comment likho..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
          />
          <Pressable style={styles.sendBtn} onPress={handleAddComment}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  commentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: "700",
    color: "#111",
    fontSize: 15,
  },
  commentId: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
  commentText: {
    color: "#222",
    fontSize: 14,
    marginTop: 8,
  },
  inputRow: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginRight: 10,
    fontSize: 15,
    color: "#111",
  },
  sendBtn: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
});