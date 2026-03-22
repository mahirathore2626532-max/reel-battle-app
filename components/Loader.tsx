import Colors from "@/constants/colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.bg }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}