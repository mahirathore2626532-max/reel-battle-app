import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.subText,
        tabBarStyle: {
          backgroundColor: "#0D0D12",
          borderTopColor: "#1F1F28",
          height: 74,
          paddingTop: 8,
          paddingBottom: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Reel",
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" color={color} size={34} />
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}