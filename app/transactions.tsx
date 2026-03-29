import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const allTransactions = [
  { id: "1", title: "Battle Win Reward", date: "22 Mar 2026", amount: "+₹120", status: "Completed", type: "credit" },
  { id: "2", title: "Contest Entry Fee", date: "22 Mar 2026", amount: "-₹30", status: "Completed", type: "debit" },
  { id: "3", title: "Referral Bonus", date: "21 Mar 2026", amount: "+₹50", status: "Completed", type: "credit" },
  { id: "4", title: "Withdrawal to Bank", date: "21 Mar 2026", amount: "-₹100", status: "Pending", type: "debit" },
  { id: "5", title: "Top Up", date: "20 Mar 2026", amount: "+₹500", status: "Completed", type: "credit" },
];

export default function TransactionsScreen() {
  const [tab, setTab] = useState<"all" | "credit" | "debit">("all");

  const data = useMemo(() => {
    if (tab === "all") return allTransactions;
    return allTransactions.filter((item) => item.type === tab);
  }, [tab]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0b0f" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Transactions</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.filterRow}>
          {["all", "credit", "debit"].map((item) => {
            const active = tab === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.filterBtn, active && styles.filterBtnActive]}
                onPress={() => setTab(item as "all" | "credit" | "debit")}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const credit = item.type === "credit";
            return (
              <View style={styles.card}>
                <View style={styles.left}>
                  <View style={[styles.iconBox, credit ? styles.creditBg : styles.debitBg]}>
                    <Ionicons
                      name={credit ? "arrow-down-outline" : "arrow-up-outline"}
                      size={18}
                      color="#fff"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDate}>{item.date}</Text>

                    <View style={styles.statusRow}>
                      <View
                        style={[
                          styles.statusDot,
                          item.status === "Completed" ? styles.completedDot : styles.pendingDot,
                        ]}
                      />
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                </View>

                <Text style={[styles.amount, credit ? styles.creditText : styles.debitText]}>
                  {item.amount}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="receipt-outline" size={34} color="#666" />
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
        />
      </View>
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
  title: { color: "#fff", fontSize: 28, fontWeight: "800" },

  filterRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#17171d",
  },
  filterBtnActive: { backgroundColor: "#ff3b5c" },
  filterText: { color: "#9f9fa9", fontWeight: "700" },
  filterTextActive: { color: "#fff" },

  card: {
    backgroundColor: "#141419",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#202028",
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", flex: 1, marginRight: 10 },
  iconBox: {
    height: 42,
    width: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  creditBg: { backgroundColor: "#1f8f5f" },
  debitBg: { backgroundColor: "#b33951" },

  cardTitle: { color: "#fff", fontSize: 15, fontWeight: "700" },
  cardDate: { color: "#8b8b95", fontSize: 12, marginTop: 4 },

  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 999, marginRight: 6 },
  completedDot: { backgroundColor: "#55d68d" },
  pendingDot: { backgroundColor: "#f7b84b" },
  statusText: { color: "#b4b4be", fontSize: 12, fontWeight: "600" },

  amount: { fontSize: 15, fontWeight: "800", marginTop: 2 },
  creditText: { color: "#7CFFB2" },
  debitText: { color: "#ff6b81" },

  emptyWrap: { alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyText: { color: "#7a7a84", marginTop: 10, fontSize: 14 },
});