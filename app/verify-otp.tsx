import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  getPendingOtpUser,
  removePendingOtpUser,
  saveLoggedInUser,
} from "../lib/auth";

export default function VerifyOtpScreen() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      if (otp.length !== 6) {
        Alert.alert("Error", "6 digit OTP dalo");
        return;
      }

      const confirmation = (global as any).otpConfirmation;

      if (!confirmation) {
        Alert.alert("Error", "OTP session nahi mili, dobara login karo");
        return;
      }

      setLoading(true);

      await confirmation.confirm(otp);

      const pendingUser = await getPendingOtpUser();

      if (!pendingUser) {
        Alert.alert("Error", "User data nahi mila");
        return;
      }

      await saveLoggedInUser(pendingUser);
      await removePendingOtpUser();

      (global as any).otpConfirmation = null;

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Verify Error", error?.message || "OTP verify nahi hui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>OTP sent to {phone}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 6 digit OTP"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        <Pressable
          style={styles.button}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#111",
    marginBottom: 16,
  },
  button: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});