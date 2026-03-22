import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const QUICK_AMOUNTS = [49, 99, 199, 499, 999];

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(199);

  const finalAmount = useMemo(() => {
    if (amount.trim()) {
      const parsed = Number(amount);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return selectedAmount ?? 0;
  }, [amount, selectedAmount]);

  const onSelectQuickAmount = (value: number) => {
    setSelectedAmount(value);
    setAmount("");
  };

  const handleAddMoney = () => {
    if (!finalAmount || finalAmount <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount.");
      return;
    }

    Alert.alert(
      "Payment disabled",
      `₹${finalAmount} add karne ka UI ready hai.\n\nRazorpay integration baad me add karenge.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#111827", "#1E293B"]}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Add Money</Text>

            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroLabel}>Wallet Top Up</Text>
            <Text style={styles.heroAmount}>
              ₹{finalAmount > 0 ? finalAmount : 0}
            </Text>
            <Text style={styles.heroSubtext}>
              Secure payment integration will be enabled later
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Amount</Text>

            <View style={styles.quickGrid}>
              {QUICK_AMOUNTS.map((item) => {
                const active = !amount && selectedAmount === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => onSelectQuickAmount(item)}
                    style={[styles.amountChip, active && styles.amountChipActive]}
                  >
                    <Text
                      style={[
                        styles.amountChipText,
                        active && styles.amountChipTextActive,
                      ]}
                    >
                      ₹{item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Amount</Text>

            <View style={styles.inputWrap}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                value={amount}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  setAmount(cleaned);
                  if (cleaned.length > 0) {
                    setSelectedAmount(null);
                  }
                }}
                placeholder="Enter amount"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                style={styles.input}
                maxLength={6}
              />
            </View>

            <Text style={styles.helperText}>
              Minimum amount ₹1. Payment gateway abhi disabled hai.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Current Status</Text>
            <Text style={styles.infoText}>
              • UI complete hai{"\n"}
              • Payment gateway temporarily disabled hai{"\n"}
              • Razorpay / billing integration baad me add karenge
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={handleAddMoney}>
            <Text style={styles.primaryButtonText}>
              Continue with ₹{finalAmount > 0 ? finalAmount : 0}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              Alert.alert(
                "Coming soon",
                "Transaction history aur real wallet balance baad me add karenge."
              )
            }
          >
            <Text style={styles.secondaryButtonText}>View Wallet Details</Text>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: -2,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 42,
    height: 42,
  },
  heroCard: {
    marginTop: 24,
    borderRadius: 24,
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heroLabel: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
  },
  heroAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 10,
  },
  heroSubtext: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amountChip: {
    minWidth: 92,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  amountChipActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#8B5CF6",
  },
  amountChipText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "700",
  },
  amountChipTextActive: {
    color: "#FFFFFF",
  },
  inputWrap: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  rupee: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  helperText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
  infoCard: {
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: "rgba(124,58,237,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    padding: 16,
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  infoText: {
    color: "#D8B4FE",
    fontSize: 13,
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 28,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "700",
  },
});