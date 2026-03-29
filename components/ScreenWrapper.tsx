import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <LinearGradient colors={["#020617", "#0F172A", "#111827"]} style={styles.container}>
        <View style={styles.inner}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});