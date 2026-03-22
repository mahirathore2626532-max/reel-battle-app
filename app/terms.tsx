import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>Terms & Conditions</Text>

        <View style={styles.card}>
          <Text style={styles.text}>1. User apni responsibility par battle join karega.</Text>
          <Text style={styles.text}>2. Testing mode me wallet values demo purpose ke liye ho sakti hain.</Text>
          <Text style={styles.text}>3. Admin result declare karega.</Text>
          <Text style={styles.text}>4. Production se pehle secure backend zaroor add karo.</Text>
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
  text: { color: COLORS.subtext, lineHeight: 24, marginBottom: 10 },
});