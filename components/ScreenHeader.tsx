import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  showBack?: boolean;
};

export default function ScreenHeader({ title, showBack = false }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22
      }}
    >
      <View style={{ width: 40 }}>
        {showBack ? (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color={Colors.white} />
          </Pressable>
        ) : null}
      </View>

      <Text
        style={{
          color: Colors.white,
          fontSize: 20,
          fontWeight: "800"
        }}
      >
        {title}
      </Text>

      <View style={{ width: 40 }} />
    </View>
  );
}