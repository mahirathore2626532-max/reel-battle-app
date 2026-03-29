import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import AppErrorState from "../../components/AppErrorState";
import AppLoading from "../../components/AppLoading";
import AppSuccessToast from "../../components/AppSuccessToast";
import { getLoggedInUser, logoutUser } from "../../lib/auth";
import { getPostsByUser } from "../../services/postService";
import { getUserProfile } from "../../services/profileService";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [name, setName] = useState("User");
  const [username, setUsername] = useState("@creator");
  const [bio, setBio] = useState("Reel creator");
  const [userPosts, setUserPosts] = useState("0");
  const [followers] = useState("12.4K");
  const [following] = useState("684");
  const [wins] = useState("0");
  const [showLogout, setShowLogout] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const user = await getLoggedInUser();
      if (!user) return;

      const profile = await getUserProfile(user.uid);
      const posts = await getPostsByUser(user.uid);

      setName(profile?.name || user.name || "User");
      setUsername(`@${profile?.username || user.username || "creator"}`);
      setBio(profile?.bio || "Reel creator");
      setUserPosts(String(posts?.length || 0));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadProfile(); }, []));

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  if (loading) return <AppLoading title="Loading profile..." />;

  if (error)
    return (
      <AppErrorState
        title="Profile load failed"
        onRetry={() => {
          setError(false);
          loadProfile();
        }}
      />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <LinearGradient colors={["#0F172A", "#111827", "#020617"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.subHeading}>Creator account</Text>
              <Text style={styles.heading}>Profile</Text>
            </View>

            <Pressable onPress={() => router.push("/settings")} style={styles.iconButton}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </Pressable>
          </View>

          {/* Profile */}
          <View style={styles.profileCard}>
            <LinearGradient colors={["#7C3AED", "#6D28D9", "#4C1D95"]} style={styles.profileTop}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
              </View>

              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.bio}>{bio}</Text>

              <View style={styles.actionRow}>
                <Pressable style={styles.primaryMiniButton} onPress={() => router.push("/edit-profile")}>
                  <Text style={styles.primaryMiniButtonText}>Edit Profile</Text>
                </Pressable>

                <Pressable style={styles.secondaryMiniButton} onPress={() => router.push("/wallet")}>
                  <Text style={styles.secondaryMiniButtonText}>Wallet</Text>
                </Pressable>
              </View>
            </LinearGradient>

            <View style={styles.statsGrid}>
              {[
                { label: "Followers", value: followers },
                { label: "Following", value: following },
                { label: "Posts", value: userPosts },
                { label: "Wins", value: wins },
              ].map((item) => (
                <View key={item.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Logout */}
          <Pressable style={styles.logoutButton} onPress={() => setShowLogout(true)}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      {/* Logout Modal */}
      <Modal visible={showLogout} transparent>
        <View style={styles.modal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <View style={styles.modalRow}>
              <Pressable onPress={() => setShowLogout(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable onPress={handleLogout} style={styles.confirmBtn}>
                <Text style={styles.confirmText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {showToast && <AppSuccessToast text="Profile Loaded" />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0F172A" },
  container: { flex: 1 },
  content: { padding: 16 },

  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  subHeading: { color: "#94A3B8" },
  heading: { color: "#fff", fontSize: 24, fontWeight: "800" },

  iconButton: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 12,
  },

  profileCard: { marginTop: 20, borderRadius: 20, overflow: "hidden" },
  profileTop: { alignItems: "center", padding: 20 },

  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: { fontSize: 28, fontWeight: "800" },

  name: { color: "#fff", fontSize: 20 },
  username: { color: "#ddd" },
  bio: { color: "#ccc", marginTop: 6 },

  actionRow: { flexDirection: "row", gap: 10, marginTop: 10 },

  primaryMiniButton: { backgroundColor: "#fff", padding: 10, borderRadius: 20 },
  primaryMiniButtonText: { fontWeight: "700" },

  secondaryMiniButton: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },

  secondaryMiniButtonText: { color: "#fff" },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },

  statCard: { alignItems: "center" },
  statValue: { color: "#fff", fontSize: 16 },
  statLabel: { color: "#94A3B8" },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: { color: "#fff", fontWeight: "800" },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  modalCard: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },

  modalTitle: { color: "#fff", fontSize: 18 },

  modalRow: { flexDirection: "row", marginTop: 20, gap: 10 },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#374151",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmBtn: {
    flex: 1,
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelText: { color: "#fff" },
  confirmText: { color: "#fff" },
});