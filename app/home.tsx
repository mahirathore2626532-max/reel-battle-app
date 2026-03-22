import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BattleCard from "../components/BattleCard";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getBattles } from "../services/battleService";
import { getUserProfile } from "../services/profileService";
import { BattleItem, UserProfile } from "../types";

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [battles, setBattles] = useState<BattleItem[]>([]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const p = await getUserProfile(user.uid);
      const b = await getBattles();
      setProfile(p);
      setBattles(b);
    }
    load();
  }, [user]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topCard}>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.name}>{profile?.name || "User"}</Text>

          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletValue}>₹{profile?.walletBalance || 0}</Text>
            </View>

            <Pressable style={styles.walletBtn} onPress={() => router.push("/wallet")}>
              <Text style={styles.walletBtnText}>Wallet</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.featureRow}>
          <Pressable style={styles.featureCard} onPress={() => router.push("/battles")}>
            <Text style={styles.featureTitle}>Battles</Text>
            <Text style={styles.featureSub}>Join contests</Text>
          </Pressable>

          <Pressable style={styles.featureCard} onPress={() => router.push("/my-battles")}>
            <Text style={styles.featureTitle}>My Battles</Text>
            <Text style={styles.featureSub}>Joined rooms</Text>
          </Pressable>
        </View>

        <View style={styles.featureRow}>
          <Pressable style={styles.featureCard} onPress={() => router.push("/profile")}>
            <Text style={styles.featureTitle}>Profile</Text>
            <Text style={styles.featureSub}>User account</Text>
          </Pressable>

          <Pressable style={styles.featureCard} onPress={() => router.push("/creator")}>
            <Text style={styles.featureTitle}>Reel</Text>
            <Text style={styles.featureSub}>Videos / creators</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Battles</Text>
          <Pressable onPress={() => router.push("/battles")}>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>

        {battles.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No battles found</Text>
          </View>
        ) : (
          battles.slice(0, 5).map((item) => (
            <BattleCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/battle-detail",
                  params: { id: item.id },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  topCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },
  welcome: {
    color: "#EDEBFF",
    fontSize: 14,
  },
  name: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  walletRow: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletLabel: {
    color: "#EDEBFF",
    fontSize: 13,
  },
  walletValue: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
  },
  walletBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  walletBtnText: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  featureCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  featureTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
  },
  featureSub: {
    color: COLORS.subtext,
    fontSize: 13,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
  },
  viewAll: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
  },
  emptyText: {
    color: COLORS.subtext,
  },
});