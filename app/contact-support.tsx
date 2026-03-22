import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { submitSupportMessage } from "../services/supportService";

export default function ContactSupportScreen() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    if (!user || !message.trim()) return;

    try {
      await submitSupportMessage(user.uid, message.trim());
      setMessage("");
      Alert.alert("Success", "Support message submitted");
    } catch {
      Alert.alert("Error", "Submit failed");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>Contact Support</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Your Message</Text>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Write your issue..."
            placeholderTextColor={COLORS.subtext}
            multiline
          />

          <Pressable style={styles.btn} onPress={onSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
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
  label: { color: COLORS.white, fontWeight: "700", marginBottom: 8 },
  input: {
    minHeight: 140,
    backgroundColor: COLORS.card2,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.white,
    borderRadius: 14,
    padding: 14,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 16,
  },
  btnText: { color: COLORS.white, fontWeight: "800" },
});