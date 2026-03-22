import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22, justifyContent: "center" }}>
        <Text style={{ color: Colors.white, fontSize: 30, fontWeight: "900", marginBottom: 10 }}>
          Welcome Back
        </Text>
        <Text style={{ color: Colors.subText, fontSize: 15, lineHeight: 22, marginBottom: 28 }}>
          Login with your mobile number to continue your reel journey.
        </Text>

        <AppInput
          label="Mobile Number"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
        />

        <AppButton title="Send OTP" onPress={() => router.push("/otp")} />

        <Pressable
          onPress={() => router.replace("/(tabs)/home")}
          style={{ marginTop: 20, alignItems: "center" }}
        >
          <Text style={{ color: Colors.primary, fontWeight: "700" }}>Skip for UI Preview</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}