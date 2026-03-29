import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const transactions = [
  { id: "1", title: "Battle Win Reward", time: "Today, 10:25 AM", amount: "+₹120", type: "credit" },
  { id: "2", title: "Contest Entry Fee", time: "Today, 09:10 AM", amount: "-₹30", type: "debit" },
  { id: "3", title: "Referral Bonus", time: "Yesterday, 07:40 PM", amount: "+₹50", type: "credit" },
  { id: "4", title: "Withdrawal", time: "Yesterday, 01:15 PM", amount: "-₹100", type: "debit" },
];

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0b0f" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Wallet</Text>

          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/transactions")}>
            <Ionicons name="receipt-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>₹1,240</Text>

          <View style={styles.balanceMetaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="trending-up-outline" size={14} color="#7CFFB2" />
              <Text style={styles.metaText}>+12.4% this week</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="wallet-outline" size={14} color="#fff" />
              <Text style={styles.metaText}>Active wallet</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.primaryBtn]}>
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.actionBtnText}>Add Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.secondaryBtn]}>
            <Ionicons name="arrow-up-circle-outline" size={18} color="#fff" />
            <Text style={styles.actionBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.push("/transactions")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const credit = item.type === "credit";
            return (
              <View style={styles.txnCard}>
                <View style={[styles.txnIconWrap, credit ? styles.creditBg : styles.debitBg]}>
                  <Ionicons
                    name={credit ? "arrow-down-outline" : "arrow-up-outline"}
                    size={18}
                    color="#fff"
                  />
                </View>

                <View style={styles.txnInfo}>
                  <Text style={styles.txnTitle}>{item.title}</Text>
                  <Text style={styles.txnTime}>{item.time}</Text>
                </View>

                <Text style={[styles.txnAmount, credit ? styles.creditText : styles.debitText]}>
                  {item.amount}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b0f" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10, backgroundColor: "#0b0b0f" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "800" },
  iconBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#17171d",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceCard: {
    backgroundColor: "#17171d",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#24242c",
  },
  balanceLabel: { color: "#a1a1aa", fontSize: 14, marginBottom: 6 },
  balanceValue: { color: "#fff", fontSize: 34, fontWeight: "800", marginBottom: 14 },
  balanceMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22222b",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 6,
  },
  metaText: { color: "#e4e4e7", fontSize: 12, fontWeight: "600" },
  actionRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryBtn: { backgroundColor: "#ff3b5c" },
  secondaryBtn: { backgroundColor: "#262633" },
  actionBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#8b8b95", fontSize: 13, fontWeight: "600" },
  txnCard: {
    backgroundColor: "#141419",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#202028",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  txnIconWrap: {
    height: 42,
    width: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  creditBg: { backgroundColor: "#1f8f5f" },
  debitBg: { backgroundColor: "#b33951" },
  txnInfo: { flex: 1 },
  txnTitle: { color: "#fff", fontSize: 15, fontWeight: "700" },
  txnTime: { color: "#8b8b95", fontSize: 12, marginTop: 4 },
  txnAmount: { fontSize: 15, fontWeight: "800" },
  creditText: { color: "#7CFFB2" },
  debitText: { color: "#ff6b81" },
});