import AppButton from "@/components/AppButton";
import ScreenHeader from "@/components/ScreenHeader";
import Colors from "@/constants/colors";
import { auth, db, loginUser } from "@/firebase";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";

function OtpBox({ value }: { value: string }) {
  return (
    <View
      style={{
        width: 62,
        height: 64,
        borderRadius: 18,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: Colors.white, fontSize: 24, fontWeight: "800" }}>{value}</Text>
    </View>
  );
}

export default function OtpScreen() {
  const handleLogin = async () => {
    try {
      await loginUser();

      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "Login fail ho gaya");
        return;
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: "User",
          createdAt: Date.now()
        },
        { merge: true }
      );

      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <ScreenHeader title="Verify OTP" showBack />

        <Text style={{ color: Colors.white, fontSize: 28, fontWeight: "900", marginBottom: 10 }}>
          Enter Code
        </Text>

        <Text style={{ color: Colors.subText, lineHeight: 22, marginBottom: 26 }}>
          We have sent a 4-digit verification code to your mobile number.
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 26
          }}
        >
          <OtpBox value="2" />
          <OtpBox value="4" />
          <OtpBox value="6" />
          <OtpBox value="8" />
        </View>

        <AppButton title="Verify & Continue" onPress={handleLogin} />

        <Pressable style={{ marginTop: 22, alignItems: "center" }}>
          <Text style={{ color: Colors.primary, fontWeight: "700" }}>Resend OTP</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}