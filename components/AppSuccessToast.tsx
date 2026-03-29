import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text?: string;
};

export default function AppSuccessToast({ text = "Success" }: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: "#111C2B",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },
});