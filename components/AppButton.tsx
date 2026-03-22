import Colors from "@/constants/colors";
import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  secondary?: boolean;
};

export default function AppButton({ title, onPress, secondary = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: secondary ? Colors.card : Colors.primary,
        borderWidth: secondary ? 1 : 0,
        borderColor: Colors.border,
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: Colors.white,
          fontSize: 16,
          fontWeight: "700"
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}