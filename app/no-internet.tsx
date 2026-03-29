import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NoInternetScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="cloud-offline-outline" size={42} color="#F59E0B" />
        </View>

        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>
          Check your network and try again.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081018" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 26,
    backgroundColor: "rgba(245,158,11,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});