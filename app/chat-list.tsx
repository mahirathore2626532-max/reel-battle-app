import { router } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db } from "../lib/firebase";

type UserItem = {
  id: string;
  name: string;
  phone?: string;
};

export default function ChatListScreen() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
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
    if (!currentUser) return;

    const q = query(collection(db, "users"), orderBy("name", "asc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: UserItem[] = snapshot.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<UserItem, "id">),
          }))
          .filter((item) => item.id !== currentUser.id);

        setUsers(list);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return unsub;
  }, [currentUser]);

  const openChat = (otherUser: UserItem) => {
    if (!currentUser) return;

    router.push({
      pathname: "/chat-room",
      params: {
        currentUserId: currentUser.id,
        otherUserId: otherUser.id,
        otherUserName: otherUser.name,
      },
    });
  };

  if (!currentUser) {
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
        <Text style={styles.title}>Chats</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Koi users nahi mile</Text>
            }
            renderItem={({ item }) => (
              <Pressable style={styles.userCard} onPress={() => openChat(item)}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name?.charAt(0)?.toUpperCase() || "U"}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userPhone}>{item.phone || "No phone"}</Text>
                </View>
              </Pressable>
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
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  userPhone: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
});