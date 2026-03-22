import AppButton from "@/components/AppButton";
import OptionRow from "@/components/OptionRow";
import ScreenHeader from "@/components/ScreenHeader";
import Colors from "@/constants/colors";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function WalletScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <ScreenHeader title="Wallet" />

        <View
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 26,
            padding: 22,
            marginBottom: 24
          }}
        >
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>Available Balance</Text>
          <Text style={{ color: Colors.white, fontSize: 34, fontWeight: "900", marginTop: 10 }}>
            ₹ 2,450
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.85)", marginTop: 8 }}>
            Use balance to join contests and boost reels
          </Text>
        </View>

        <AppButton title="Add Money" />

        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            fontWeight: "800",
            marginTop: 28,
            marginBottom: 14
          }}
        >
          Recent Transactions
        </Text>

        <OptionRow icon="arrow-down-circle" title="Money Added" subTitle="Today • ₹500" />
        <OptionRow icon="trophy" title="Contest Entry" subTitle="Yesterday • -₹99" />
        <OptionRow icon="cash" title="Reward Received" subTitle="2 days ago • +₹250" />
      </View>
    </SafeAreaView>
  );
}