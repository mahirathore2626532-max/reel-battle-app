import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomActionSheet from "../components/BottomActionSheet";

export default function PostDetailScreen() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.videoArea}
          imageStyle={styles.videoImage}
        >
          <View style={styles.topOverlay}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => setSheetOpen(true)}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.playWrap}>
            <View style={styles.playBtn}>
              <Ionicons name="play" size={26} color="#fff" />
            </View>
          </View>
        </ImageBackground>

        <ScrollView style={styles.infoWrap} showsVerticalScrollIndicator={false}>
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.username}>@reelmaster</Text>
              <Text style={styles.subText}>12.4k followers</Text>
            </View>

            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.caption}>
            Weekend battle entry 🔥 Full energy, smooth transitions, and trending audio mix.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Ionicons name="heart" size={14} color="#ff4d6d" />
              <Text style={styles.statText}>24.8k Likes</Text>
            </View>

            <View style={styles.statPill}>
              <Ionicons name="chatbubble-ellipses" size={14} color="#8ab4ff" />
              <Text style={styles.statText}>1.8k Comments</Text>
            </View>

            <View style={styles.statPill}>
              <Ionicons name="paper-plane" size={14} color="#d5a3ff" />
              <Text style={styles.statText}>3.2k Shares</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setLiked(!liked)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={20}
                color={liked ? "#ff4d6d" : "#fff"}
              />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/post-comments")}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => Alert.alert("Share clicked")}
            >
              <Ionicons name="paper-plane-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setSaved(!saved)}
            >
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={20}
                color={saved ? "#8B5CF6" : "#fff"}
              />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Audio</Text>
            <Text style={styles.detailDesc}>
              Original Sound • Trending in Battle category
            </Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Hashtags</Text>
            <Text style={styles.detailDesc}>
              #battle #reels #viral #trending #videoedit
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Sheet */}
        <BottomActionSheet
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Post Options"
          items={[
            {
              label: "Share Post",
              icon: "paper-plane-outline",
              onPress: () => Alert.alert("Shared"),
            },
            {
              label: "Save Post",
              icon: "bookmark-outline",
              onPress: () => setSaved(true),
            },
            {
              label: "Report Post",
              icon: "flag-outline",
              danger: true,
              onPress: () => Alert.alert("Reported"),
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1 },

  videoArea: { height: 360, justifyContent: "space-between" },
  videoImage: { borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },

  topOverlay: {
    paddingTop: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  circleBtn: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  playWrap: { flex: 1, alignItems: "center", justifyContent: "center" },

  playBtn: {
    height: 66,
    width: 66,
    borderRadius: 33,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  infoWrap: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    marginTop: -8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  userRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },

  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#ff3b5c",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: { color: "#fff", fontWeight: "800", fontSize: 18 },

  username: { color: "#fff", fontSize: 16, fontWeight: "800" },

  subText: { color: "#8b8b95", fontSize: 12, marginTop: 2 },

  followBtn: {
    backgroundColor: "#ff3b5c",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },

  followText: { color: "#fff", fontWeight: "700" },

  caption: {
    color: "#e6e6ea",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },

  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17171d",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },

  statText: {
    color: "#e4e4e7",
    fontSize: 12,
    fontWeight: "600",
  },

  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#141419",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#202028",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  actionBtn: { alignItems: "center", gap: 6, flex: 1 },

  actionText: {
    color: "#d9d9e0",
    fontSize: 12,
    fontWeight: "600",
  },

  detailCard: {
    backgroundColor: "#141419",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#202028",
    padding: 14,
    marginBottom: 12,
  },

  detailTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },

  detailDesc: {
    color: "#a1a1aa",
    fontSize: 13,
    lineHeight: 20,
  },
});