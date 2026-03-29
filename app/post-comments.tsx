import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialComments = [
  { id: "1", user: "vikas_editz", text: "Bhai mast reel hai 🔥", time: "2m", likes: 12 },
  { id: "2", user: "reel_queen", text: "Transition bahut clean hai", time: "6m", likes: 8 },
  { id: "3", user: "aryan_creator", text: "Audio combo top level 👏", time: "15m", likes: 5 },
];

export default function PostCommentsScreen() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleSend = () => {
    if (!comment.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      user: "you",
      text: comment.trim(),
      time: "now",
      likes: 0,
    };

    setComments([newItem, ...comments]);
    setComment("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0b0f" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comments</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>1,843 Comments</Text>
          <Text style={styles.summarySub}>Join the conversation on this post</Text>
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.user.charAt(0).toUpperCase()}</Text>
              </View>

              <View style={styles.commentContent}>
                <View style={styles.rowTop}>
                  <Text style={styles.user}>{item.user}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                <Text style={styles.commentText}>{item.text}</Text>

                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.smallAction}>
                    <Ionicons name="heart-outline" size={15} color="#9b9ba5" />
                    <Text style={styles.smallActionText}>{item.likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.smallAction}>
                    <Ionicons name="chatbubble-outline" size={15} color="#9b9ba5" />
                    <Text style={styles.smallActionText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment..."
              placeholderTextColor="#7c7c86"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b0f" },
  container: { flex: 1, backgroundColor: "#0b0b0f", paddingHorizontal: 16, paddingTop: 10 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#17171d",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },

  summaryCard: {
    backgroundColor: "#17171d",
    borderWidth: 1,
    borderColor: "#24242c",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  summaryTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  summarySub: { color: "#8b8b95", fontSize: 13, marginTop: 4 },

  commentCard: {
    flexDirection: "row",
    marginBottom: 14,
    backgroundColor: "#141419",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#202028",
    padding: 14,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ff3b5c",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "800" },

  commentContent: { flex: 1 },
  rowTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  user: { color: "#fff", fontWeight: "700", fontSize: 14 },
  time: { color: "#8b8b95", fontSize: 12 },
  commentText: { color: "#dadade", marginTop: 6, lineHeight: 20 },

  commentActions: { flexDirection: "row", alignItems: "center", gap: 18, marginTop: 10 },
  smallAction: { flexDirection: "row", alignItems: "center", gap: 6 },
  smallActionText: { color: "#9b9ba5", fontSize: 12, fontWeight: "600" },

  inputBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: "#17171d",
    borderWidth: 1,
    borderColor: "#24242c",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: "center",
  },
  input: { color: "#fff", fontSize: 14 },
  sendBtn: {
    height: 52,
    width: 52,
    borderRadius: 16,
    backgroundColor: "#ff3b5c",
    alignItems: "center",
    justifyContent: "center",
  },
});