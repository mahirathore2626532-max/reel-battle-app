import Colors from "@/constants/colors";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.card,
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border
      }}
    >
      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: Colors.subText, fontSize: 13, marginTop: 4 }}>{label}</Text>
    </View>
  );
}