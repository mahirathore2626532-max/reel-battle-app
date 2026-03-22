import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const STATS = [
  { label: "Followers", value: "12.4K", icon: "people-outline" as const },
  { label: "Following", value: "684", icon: "person-add-outline" as const },
  { label: "Battles", value: "128", icon: "flash-outline" as const },
  { label: "Wins", value: "86", icon: "trophy-outline" as const },
];

const MENU_ITEMS = [
  {
    title: "Edit Profile",
    subtitle: "Update name, bio, and creator details",
    icon: "create-outline" as const,
    action: () => Alert.alert("Coming soon", "Edit Profile feature baad me connect karenge."),
  },
  {
    title: "Wallet",
    subtitle: "Check balance, add money, and transactions",
    icon: "wallet-outline" as const,
    action: () => router.push("/wallet"),
  },
  {
    title: "Transactions",
    subtitle: "See payment and wallet history",
    icon: "receipt-outline" as const,
    action: () => router.push("/transactions"),
  },
  {
    title: "Privacy Policy",
    subtitle: "Read privacy and data usage details",
    icon: "shield-checkmark-outline" as const,
    action: () => router.push("/privacy-policy"),
  },
  {
    title: "Terms & Conditions",
    subtitle: "Platform rules and usage terms",
    icon: "document-text-outline" as const,
    action: () => router.push("/terms"),
  },
  {
    title: "Support",
    subtitle: "Get help for account or app issues",
    icon: "help-circle-outline" as const,
    action: () => Alert.alert("Support", "Support screen baad me add karenge."),
  },
];

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert("Logout", "Logout logic baad me connect karenge.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#111827", "#020617"]}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.subHeading}>Creator account</Text>
              <Text style={styles.heading}>Profile</Text>
            </View>

            <Pressable
              style={styles.iconButton}
              onPress={() => Alert.alert("Settings", "Settings screen baad me add karenge.")}
            >
              <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.profileCard}>
            <LinearGradient
              colors={["#7C3AED", "#6D28D9", "#4C1D95"]}
              style={styles.profileTop}
            >
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>M</Text>
              </View>

              <Text style={styles.name}>Mahaveer Singh</Text>
              <Text style={styles.username}>@reelbattle.creator</Text>

              <Text style={styles.bio}>
                Short reel creator • Battle enthusiast • Building content daily
              </Text>

              <View style={styles.actionRow}>
                <Pressable
                  style={styles.primaryMiniButton}
                  onPress={() =>
                    Alert.alert("Coming soon", "Edit Profile feature baad me connect karenge.")
                  }
                >
                  <Text style={styles.primaryMiniButtonText}>Edit Profile</Text>
                </Pressable>

                <Pressable
                  style={styles.secondaryMiniButton}
                  onPress={() => router.push("/wallet")}
                >
                  <Text style={styles.secondaryMiniButtonText}>Open Wallet</Text>
                </Pressable>
              </View>
            </LinearGradient>

            <View style={styles.statsGrid}>
              {STATS.map((item) => (
                <View key={item.label} style={styles.statCard}>
                  <View style={styles.statIconWrap}>
                    <Ionicons name={item.icon} size={18} color="#FFFFFF" />
                  </View>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
            <Text style={styles.sectionSubtitle}>Manage your profile</Text>
          </View>

          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.title}
                style={styles.menuItem}
                onPress={item.action}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconWrap}>
                    <Ionicons name={item.icon} size={20} color="#FFFFFF" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </Pressable>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Profile Status</Text>
            <Text style={styles.infoText}>
              • Profile UI polished{"\n"}
              • Wallet and transaction links active{"\n"}
              • Settings and edit profile placeholders ready{"\n"}
              • Real logout logic pending
            </Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#FFFFFF" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  headerRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeading: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    marginTop: 20,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  profileTop: {
    padding: 22,
    alignItems: "center",
  },
  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 14,
  },
  username: {
    color: "#E9D5FF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  bio: {
    color: "#F5F3FF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    textAlign: "center",
    maxWidth: 280,
  },
  actionRow: {
    marginTop: 18,
    flexDirection: "row",
    gap: 10,
  },
  primaryMiniButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  primaryMiniButtonText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },
  secondaryMiniButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  secondaryMiniButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  statsGrid: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    width: "47%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  menuList: {
    gap: 12,
  },
  menuItem: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  menuIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(124,58,237,0.85)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  menuSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  infoCard: {
    marginTop: 24,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(124,58,237,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  infoText: {
    color: "#DDD6FE",
    fontSize: 13,
    lineHeight: 21,
  },
  logoutButton: {
    marginTop: 24,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#DC2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});