import { useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { db } from "../lib/firebase";

type MessageItem = {
  id: string;
  text: string;
  senderId: string;
  createdAt?: any;
};

function getChatId(uid1: string, uid2: string) {
  return [uid1, uid2].sort().join("_");
}

export default function ChatRoomScreen() {
  const { currentUserId, otherUserId, otherUserName } = useLocalSearchParams<{
    currentUserId: string;
    otherUserId: string;
    otherUserName: string;
  }>();

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const currentUid = String(currentUserId);
  const otherUid = String(otherUserId);

  const chatId = useMemo(() => {
    return getChatId(currentUid, otherUid);
  }, [currentUid, otherUid]);

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list: MessageItem[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MessageItem, "id">),
      }));
      setMessages(list);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return unsub;
  }, [chatId]);

  const sendMessage = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(db, "chats", chatId, "messages");

    await setDoc(
      chatRef,
      {
        participants: [currentUid, otherUid],
        lastMessage: trimmed,
        lastMessageAt: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(messagesRef, {
      text: trimmed,
      senderId: currentUid,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.header}>{otherUserName || "Chat"}</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const mine = item.senderId === currentUid;

            return (
              <View
                style={[
                  styles.messageWrap,
                  mine ? styles.rightWrap : styles.leftWrap,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    mine ? styles.myBubble : styles.otherBubble,
                  ]}
                >
                  <Text style={mine ? styles.myText : styles.otherText}>
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type message..."
            value={text}
            onChangeText={setText}
          />
          <Pressable style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    color: "#111",
  },
  listContent: {
    padding: 12,
  },
  messageWrap: {
    marginVertical: 5,
    flexDirection: "row",
  },
  leftWrap: {
    justifyContent: "flex-start",
  },
  rightWrap: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  myBubble: {
    backgroundColor: "#2563eb",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
  },
  myText: {
    color: "#fff",
    fontSize: 15,
  },
  otherText: {
    color: "#111",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginRight: 10,
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
    fontSize: 15,
  },
});