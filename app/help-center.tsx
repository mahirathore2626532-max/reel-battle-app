import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function HelpCenterScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>Help Center</Text>

        <View style={styles.card}>
          <Text style={styles.q}>How do I join a battle?</Text>
          <Text style={styles.a}>Wallet me balance rakho aur battle detail page se join karo.</Text>

          <Text style={styles.q}>Wallet kaise add karein?</Text>
          <Text style={styles.a}>Abhi testing ke liye manual add buttons diye gaye hain.</Text>

          <Text style={styles.q}>Result kaise aayega?</Text>
          <Text style={styles.a}>Admin result declare karega.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 40 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: "700" },
  heading: { color: COLORS.white, fontSize: 24, fontWeight: "800", marginBottom: 12 },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  q: { color: COLORS.white, fontWeight: "800", marginTop: 12 },
  a: { color: COLORS.subtext, marginTop: 8, lineHeight: 22 },
});