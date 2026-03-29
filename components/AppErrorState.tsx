import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onRetry?: () => void;
};

export default function AppErrorState({
  title = "Something went wrong",
  subtitle = "Please try again.",
  buttonText = "Retry",
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="alert-circle-outline" size={38} color="#F87171" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  iconWrap: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: "rgba(239,68,68,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  button: {
    marginTop: 18,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});