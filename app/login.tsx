import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    if (phone.trim().length < 10) {
      Alert.alert("Invalid number", "Please enter a valid mobile number.");
      return;
    }

    router.push({
      pathname: "/otp",
      params: { phone },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#111827", "#020617"]}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.content}>
            <View style={styles.topSection}>
              <View style={styles.logoWrap}>
                <Ionicons name="play" size={34} color="#FFFFFF" />
              </View>

              <Text style={styles.smallText}>Welcome to</Text>
              <Text style={styles.title}>Reel Battle</Text>
              <Text style={styles.subtitle}>
                Create reels, join battles, and grow your creator profile.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Login / Sign Up</Text>
              <Text style={styles.cardSubtitle}>
                Enter your mobile number to continue
              </Text>

              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrap}>
                <View style={styles.prefixWrap}>
                  <Text style={styles.prefixText}>+91</Text>
                </View>

                <TextInput
                  value={phone}
                  onChangeText={(text) =>
                    setPhone(text.replace(/[^0-9]/g, "").slice(0, 10))
                  }
                  placeholder="Enter mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  style={styles.input}
                  maxLength={10}
                />
              </View>

              <View style={styles.infoBox}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#C4B5FD"
                />
                <Text style={styles.infoText}>
                  OTP verification ke baad user Firestore me save hoga.
                </Text>
              </View>

              <Pressable style={styles.primaryButton} onPress={handleContinue}>
                <Text style={styles.primaryButtonText}>Send OTP</Text>
              </Pressable>

              <Text style={styles.termsText}>
                By continuing, you agree to our Terms & Privacy Policy.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    flex: 1,
    padding: 22,
    justifyContent: "space-between",
  },
  topSection: {
    marginTop: 40,
    alignItems: "center",
  },
  logoWrap: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  smallText: {
    marginTop: 24,
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 12,
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 310,
  },
  card: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 18,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  cardSubtitle: {
    marginTop: 6,
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 20,
  },
  label: {
    marginTop: 22,
    marginBottom: 10,
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "700",
  },
  inputWrap: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  prefixWrap: {
    height: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(124,58,237,0.22)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.08)",
  },
  prefixText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 14,
  },
  infoBox: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "rgba(124,58,237,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.22)",
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#DDD6FE",
    fontSize: 12,
    lineHeight: 19,
  },
  primaryButton: {
    marginTop: 22,
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
  termsText: {
    marginTop: 16,
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});