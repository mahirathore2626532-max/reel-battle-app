import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/profileService";
import { UserProfile } from "../types";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then(setProfile);
  }, [user]);

  if (!profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name?.charAt(0)?.toUpperCase() || "U"}</Text>
          </View>

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.mobile}>+91 {profile.mobile}</Text>

          <View style={styles.uidBox}>
            <Text style={styles.uidLabel}>Game Name</Text>
            <Text style={styles.uidValue}>{profile.gameName || "-"}</Text>
          </View>

          <View style={styles.uidBox}>
            <Text style={styles.uidLabel}>Game UID</Text>
            <Text style={styles.uidValue}>{profile.gameUid || "-"}</Text>
          </View>
        </View>

        <MenuCard
          title="Account"
          items={[
            ["Edit Profile", "/edit-profile"],
            ["KYC Verification", "/kyc"],
            ["My Battles", "/my-battles"],
            ["My Transactions", "/transactions"],
            ["Wallet", "/wallet"],
          ]}
        />

        <MenuCard
          title="Support"
          items={[
            ["Help Center", "/help-center"],
            ["Terms & Conditions", "/terms"],
            ["Privacy Policy", "/privacy-policy"],
            ["Contact Support", "/contact-support"],
          ]}
        />

        <MenuCard
          title="Admin"
          items={[
            ["Manage Battles", "/admin-battles"],
            ["Declare Results", "/admin-results"],
          ]}
        />

        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            logout();
            router.replace("/home");
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuCard({
  title,
  items,
}: {
  title: string;
  items: [string, any][];
}) {
  return (
    <View style={styles.menuCard}>
      <Text style={styles.menuTitle}>{title}</Text>

      {items.map(([label, path], index) => (
        <Pressable
          key={label}
          style={[styles.menuItem, index === items.length - 1 && styles.menuItemLast]}
          onPress={() => router.push(path)}
        >
          <Text style={styles.menuText}>{label}</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "800",
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
  },
  mobile: {
    color: COLORS.subtext,
    marginTop: 6,
    marginBottom: 14,
  },
  uidBox: {
    width: "100%",
    backgroundColor: COLORS.card2,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
  },
  uidLabel: {
    color: COLORS.subtext,
    fontSize: 12,
  },
  uidValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },
  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  menuTitle: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 6,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    color: COLORS.white,
    fontSize: 15,
  },
  menuArrow: {
    color: COLORS.subtext,
    fontSize: 22,
    fontWeight: "700",
  },
  logoutBtn: {
    backgroundColor: COLORS.danger,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { color: COLORS.white, fontSize: 16 },
});