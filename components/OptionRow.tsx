import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subTitle?: string;
  onPress?: () => void;
  danger?: boolean;
};

export default function OptionRow({ icon, title, subTitle, onPress, danger = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 12
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.bg2,
          marginRight: 12
        }}
      >
        <Ionicons name={icon} size={20} color={danger ? "#EF4444" : Colors.white} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: danger ? "#EF4444" : Colors.white,
            fontSize: 15,
            fontWeight: "700"
          }}
        >
          {title}
        </Text>
        {subTitle ? (
          <Text style={{ color: Colors.subText, marginTop: 4, fontSize: 13 }}>{subTitle}</Text>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.subText} />
    </Pressable>
  );
}