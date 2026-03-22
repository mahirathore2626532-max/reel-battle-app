import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
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
import { saveLoggedInUser } from "../lib/auth";
import { createUserProfile } from "../services/profileService";

export default function OtpScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();
  const phone = typeof params.phone === "string" ? params.phone : "";
  const [otp, setOtp] = useState("");

  const maskedPhone = useMemo(() => {
    if (!phone) return "+91 **********";
    if (phone.length < 10) return `+91 ${phone}`;
    return `+91 ${phone.slice(0, 2)}******${phone.slice(-2)}`;
  }, [phone]);

  const handleVerify = async () => {
    if (otp.length < 4) {
      Alert.alert("Invalid OTP", "Please enter a valid OTP.");
      return;
    }

    try {
      const demoUser = {
        uid: phone || "demo_user_1",
        name: "Mahaveer Singh",
        phone: phone || "0000000000",
        username: `user${(phone || "000000").slice(-6)}`,
      };

      await saveLoggedInUser(demoUser);

      await createUserProfile({
        uid: demoUser.uid,
        name: demoUser.name,
        phone: demoUser.phone,
        username: demoUser.username,
        photoURL: "",
        bio: "Reel creator",
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "User profile save nahi ho paya.");
    }
  };

  const handleResend = () => {
    Alert.alert("OTP resent", "Demo OTP resend UI active hai.");
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
            <View style={styles.headerRow}>
              <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.centerContent}>
              <View style={styles.iconWrap}>
                <Ionicons name="lock-closed" size={30} color="#FFFFFF" />
              </View>

              <Text style={styles.title}>Verify OTP</Text>
              <Text style={styles.subtitle}>
                Enter the code sent to {maskedPhone}
              </Text>

              <View style={styles.card}>
                <Text style={styles.label}>One Time Password</Text>

                <TextInput
                  value={otp}
                  onChangeText={(text) =>
                    setOtp(text.replace(/[^0-9]/g, "").slice(0, 6))
                  }
                  placeholder="Enter OTP"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  style={styles.input}
                  maxLength={6}
                />

                <View style={styles.demoBox}>
                  <Ionicons name="information-circle-outline" size={18} color="#C4B5FD" />
                  <Text style={styles.demoText}>
                    Demo mode: koi bhi 4 ya 6 digit OTP daal kar continue kar sakte ho.
                  </Text>
                </View>

                <Pressable style={styles.primaryButton} onPress={handleVerify}>
                  <Text style={styles.primaryButtonText}>Verify & Continue</Text>
                </Pressable>

                <Pressable style={styles.secondaryButton} onPress={handleResend}>
                  <Text style={styles.secondaryButtonText}>Resend OTP</Text>
                </Pressable>
              </View>
            </View>

            <Text style={styles.bottomText}>
              OTP ke baad user Firestore me save ho jayega.
            </Text>
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
  },
  headerRow: {
    marginTop: 8,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 22,
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
  },
  card: {
    width: "100%",
    marginTop: 26,
    borderRadius: 28,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  label: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 4,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  demoBox: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "rgba(124,58,237,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.22)",
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  demoText: {
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
  secondaryButton: {
    marginTop: 12,
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
    fontWeight: "800",
  },
  bottomText: {
    paddingBottom: 10,
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },
});