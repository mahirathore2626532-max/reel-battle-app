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

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.heading}>Your Privacy Matters</Text>
            <Text style={styles.text}>
              We collect only the information needed to run the app, improve the user experience,
              and provide account-related features.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Information We Collect</Text>
            <Text style={styles.text}>
              • Basic account details{"\n"}
              • Profile information{"\n"}
              • Uploaded content metadata{"\n"}
              • App usage and activity logs
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>How We Use Information</Text>
            <Text style={styles.text}>
              • To manage accounts{"\n"}
              • To show profile and reel content{"\n"}
              • To improve performance and safety{"\n"}
              • To support wallet and transaction features
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Data Security</Text>
            <Text style={styles.text}>
              We use secure systems and access controls to protect user information. Sensitive
              operations should be handled through authenticated backend services.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Contact</Text>
            <Text style={styles.text}>
              For privacy-related questions, contact the app support team.
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
  title: { color: "#fff", fontSize: 24, fontWeight: "800" },
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