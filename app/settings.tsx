import OptionRow from "@/components/OptionRow";
import ScreenHeader from "@/components/ScreenHeader";
import Colors from "@/constants/colors";
import { auth } from "@/firebase";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, SafeAreaView, View } from "react-native";

export default function SettingsScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (e) {
      Alert.alert("Error", "Logout fail hua");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <ScreenHeader title="Settings" showBack />

        <OptionRow icon="person-circle-outline" title="Account" subTitle="Manage your profile details" />
        <OptionRow icon="lock-closed-outline" title="Privacy Policy" subTitle="Read privacy information" />
        <OptionRow icon="shield-checkmark-outline" title="Security" subTitle="Phone, password, device safety" />
        <OptionRow icon="help-circle-outline" title="Help & Support" subTitle="Contact support team" />
        <OptionRow icon="information-circle-outline" title="About App" subTitle="Version 1.0.0" />
        <OptionRow
          icon="log-out-outline"
          title="Logout"
          subTitle="Sign out from this device"
          danger
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}