import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getBattles, joinBattleLocal } from "../services/battleService";
import { getUserProfile } from "../services/profileService";
import { BattleItem, UserProfile } from "../types";

export default function BattleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const [battle, setBattle] = useState<BattleItem | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const battles = await getBattles();
      const found = battles.find((b) => b.id === id) || null;
      setBattle(found);

      if (user) {
        const p = await getUserProfile(user.uid);
        setProfile(p);
      }
    }
    load();
  }, [id, user]);

  const onJoin = async () => {
    if (!battle || !user) return;

    try {
      setLoading(true);
      await joinBattleLocal({ userId: user.uid, battle });
      Alert.alert("Success", "Battle joined successfully");
      router.replace("/my-battles");
    } catch (e: any) {
      Alert.alert("Error", e?.message || "Join failed");
    } finally {
      setLoading(false);
    }
  };

  if (!battle) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFound}>Battle not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const spotsLeft = battle.totalSpots - battle.filledSpots;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.title}>{battle.title}</Text>
          <Text style={styles.sub}>
            {battle.mode} • {battle.map}
          </Text>
          <Text style={styles.price}>Entry ₹{battle.entryFee}</Text>
          <Text style={styles.price}>Prize ₹{battle.prizePool}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.row}>Time: {battle.time}</Text>
          <Text style={styles.row}>Status: {battle.status}</Text>
          <Text style={styles.row}>Spots Left: {spotsLeft}</Text>
          <Text style={styles.row}>Wallet: ₹{profile?.walletBalance || 0}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.desc}>{battle.description}</Text>
        </View>

        <Pressable style={styles.btn} onPress={onJoin} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Joining..." : "Join Battle"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 40 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: "700" },
  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  title: { color: COLORS.white, fontSize: 24, fontWeight: "800" },
  sub: { color: COLORS.white, marginTop: 6 },
  price: { color: COLORS.white, marginTop: 8, fontWeight: "700" },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },
  row: { color: COLORS.white, marginBottom: 10 },
  desc: { color: COLORS.subtext, lineHeight: 22 },
  btn: {
    backgroundColor: COLORS.success,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  btnText: { color: COLORS.white, fontWeight: "800", fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { color: COLORS.white, fontSize: 20, fontWeight: "700" },
});