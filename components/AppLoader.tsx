import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
};

export default function AppLoading({ title = "Loading..." }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.loaderCard}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loaderCard: {
    minWidth: 180,
    backgroundColor: "#111C2B",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  text: {
    marginTop: 12,
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "700",
  },
});