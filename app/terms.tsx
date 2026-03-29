import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Terms & Conditions</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.heading}>Platform Rules</Text>
            <Text style={styles.text}>
              By using this app, you agree to follow platform rules, respect other users, and avoid
              uploading harmful, illegal, or misleading content.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>User Responsibilities</Text>
            <Text style={styles.text}>
              • Keep your account secure{"\n"}
              • Upload only content you own or can legally use{"\n"}
              • Avoid spam, abuse, and policy violations
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Content Moderation</Text>
            <Text style={styles.text}>
              The platform may review, remove, or restrict content that violates rules or creates
              safety risks for the community.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Wallet and Payments</Text>
            <Text style={styles.text}>
              Wallet balances, withdrawals, and rewards should be validated through secure backend
              systems. UI values shown in this version are demo values unless connected to live data.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Changes</Text>
            <Text style={styles.text}>
              Terms may be updated over time. Continued use of the platform means you accept the
              latest version.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617", paddingHorizontal: 16, paddingTop: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  content: { paddingBottom: 30 },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 14,
  },
  heading: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 10 },
  subHeading: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 8 },
  text: { color: "#CBD5E1", fontSize: 14, lineHeight: 22 },
});