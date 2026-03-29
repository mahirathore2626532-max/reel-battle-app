import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
};

export default function AppButton({
  title,
  onPress,
  loading = false,
  variant = "primary",
  icon,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} /> : null}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: "#7C3AED",
  },
  secondary: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  danger: {
    backgroundColor: "#DC2626",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});