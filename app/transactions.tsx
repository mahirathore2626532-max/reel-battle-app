import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/walletService";
import { WalletTransaction } from "../types";

export default function TransactionsScreen() {
  const { user } = useAuth();
  const [items, setItems] = useState<WalletTransaction[]>([]);

  useEffect(() => {
    if (!user) return;
    getTransactions(user.uid).then(setItems);
  }, [user]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>Transactions</Text>

        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.subtitle || "-"}</Text>
            </View>
            <Text style={item.type === "credit" ? styles.credit : styles.debit}>
              {item.type === "credit" ? "+" : "-"} ₹{item.amount}
            </Text>
          </View>
        ))}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: COLORS.white, fontWeight: "700" },
  sub: { color: COLORS.subtext, marginTop: 5, fontSize: 12 },
  credit: { color: COLORS.success, fontWeight: "800" },
  debit: { color: COLORS.danger, fontWeight: "800" },
});