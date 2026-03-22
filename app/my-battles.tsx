import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getJoinedBattles } from "../services/battleService";
import { JoinedBattle } from "../types";

export default function MyBattlesScreen() {
  const { user } = useAuth();
  const [items, setItems] = useState<JoinedBattle[]>([]);

  useEffect(() => {
    if (!user) return;
    getJoinedBattles(user.uid).then(setItems);
  }, [user]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>My Battles</Text>

        {items.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.empty}>No joined battles yet</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>{item.battleTitle}</Text>
              <Text style={styles.sub}>Entry Fee: ₹{item.entryFee}</Text>
              <Text style={styles.sub}>Status: {item.status}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 40 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: "700" },
  heading: { color: COLORS.white, fontSize: 24, fontWeight: "800", marginBottom: 12 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  title: { color: COLORS.white, fontWeight: "800", fontSize: 16 },
  sub: { color: COLORS.subtext, marginTop: 8 },
  empty: { color: COLORS.subtext },
});