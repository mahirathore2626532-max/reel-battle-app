import { Video } from "expo-av";
import { router } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db } from "../lib/firebase";

type PostItem = {
  id: string;
  userId: string;
  userName: string;
  caption?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
};

type LikeMap = Record<string, boolean>;

export default function ReelsScreen() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [likes, setLikes] = useState<LikeMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const unsubPosts = onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const list: PostItem[] = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...(docItem.data() as Omit<PostItem, "id">),
        }));
        setPosts(list);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return unsubPosts;
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const unsubLikes = onSnapshot(collection(db, "post_likes"), (snapshot) => {
      const map: LikeMap = {};
      snapshot.docs.forEach((d) => {
        const data = d.data();
        if (data.userId === currentUser.id) {
          map[data.postId] = true;
        }
      });
      setLikes(map);
    });

    return unsubLikes;
  }, [currentUser]);

  const handleLike = async (postId: string) => {
    if (!currentUser) return;

    try {
      const likeDocId = `${postId}_${currentUser.id}`;
      const likeRef = doc(db, "post_likes", likeDocId);
      const postRef = doc(db, "posts", postId);

      if (likes[postId]) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, {
          likeCount: increment(-1),
        });
      } else {
        await setDoc(likeRef, {
          postId,
          userId: currentUser.id,
          createdAt: serverTimestamp(),
        });
        await updateDoc(postRef, {
          likeCount: increment(1),
        });
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Like update nahi hua");
    }
  };

  const handleShare = async (item: PostItem) => {
    try {
      const postRef = doc(db, "posts", item.id);
      await updateDoc(postRef, {
        shareCount: increment(1),
      });

      await Share.share({
        message: `${item.userName} ki reel dekho\n${item.caption || ""}\n${item.mediaUrl || ""}`,
      });
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Share update nahi hua");
    }
  };

  const renderMedia = (item: PostItem) => {
    if (!item.mediaUrl) {
      return (
        <View style={styles.mediaBox}>
          <Text style={styles.mediaText}>No media</Text>
        </View>
      );
    }

    if (item.mediaType === "video") {
      return (
        <Video
          source={{ uri: item.mediaUrl }}
          style={styles.media}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      );
    }

    return <Image source={{ uri: item.mediaUrl }} style={styles.media} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Reels</Text>

          <Pressable
            style={styles.createBtn}
            onPress={() => router.push("/create-post")}
          >
            <Text style={styles.createBtnText}>Upload</Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Koi reels nahi hai</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.userId}>User ID: {item.userId}</Text>
                <Text style={styles.userName}>{item.userName}</Text>

                <View style={styles.mediaWrap}>{renderMedia(item)}</View>

                <Text style={styles.caption}>{item.caption || "No caption"}</Text>

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.actionBtn}
                    onPress={() => handleLike(item.id)}
                  >
                    <Text style={styles.actionText}>
                      {likes[item.id] ? "Liked" : "Like"} ({item.likeCount || 0})
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.actionBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/post-comments",
                        params: { postId: item.id },
                      })
                    }
                  >
                    <Text style={styles.actionText}>
                      Comment ({item.commentCount || 0})
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.actionBtn}
                    onPress={() => handleShare(item)}
                  >
                    <Text style={styles.actionText}>
                      Share ({item.shareCount || 0})
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  createBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  userId: {
    color: "#666",
    fontSize: 12,
    marginBottom: 4,
  },
  userName: {
    color: "#111",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  mediaWrap: {
    marginBottom: 10,
  },
  mediaBox: {
    height: 260,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaText: {
    fontWeight: "600",
    color: "#444",
  },
  media: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  caption: {
    color: "#222",
    fontSize: 14,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: "#111",
    fontWeight: "600",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
});