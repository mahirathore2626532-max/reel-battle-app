import AppButton from "@/components/AppButton";
import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#09090B", "#141420", "#220C15"]}
      style={{ flex: 1, justifyContent: "space-between", padding: 24 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 32,
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: Colors.white, fontSize: 40, fontWeight: "900" }}>R</Text>
        </View>

        <Text style={{ color: Colors.white, fontSize: 34, fontWeight: "900" }}>ReelBattle</Text>
        <Text
          style={{
            color: Colors.subText,
            marginTop: 10,
            textAlign: "center",
            fontSize: 15,
            lineHeight: 22,
            paddingHorizontal: 18
          }}
        >
          Create reels, join battles, grow your profile and enjoy a premium short video experience.
        </Text>
      </View>

      <View style={{ gap: 12, marginBottom: 20 }}>
        <AppButton title="Get Started" onPress={() => router.push("/login")} />
        <AppButton title="Preview App" secondary onPress={() => router.replace("/(tabs)/home")} />
      </View>
    </LinearGradient>
  );
}