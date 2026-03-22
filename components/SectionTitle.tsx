import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: "800" },
  subtitle: { color: COLORS.subtext, fontSize: 13, marginTop: 4 },
});