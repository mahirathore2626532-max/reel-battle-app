import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#020617" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="transactions" />
        <Stack.Screen name="post-detail" />
        <Stack.Screen name="post-comments" />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="terms" />
      </Stack>
    </>
  );
}