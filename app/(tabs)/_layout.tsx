import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ff3b5c",
        tabBarInactiveTintColor: "#8b8b95",
        tabBarStyle: {
          backgroundColor: "#111118",
          borderTopColor: "#1d1d26",
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "upload") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}