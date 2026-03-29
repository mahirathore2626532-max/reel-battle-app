import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [sound, setSound] = useState(true);

  const handlePress = (title: string) => {
    if (title === "Edit Profile") {
      router.push("/edit-profile");
    } else if (title === "Terms & Conditions") {
      router.push("/terms");
    } else if (title === "Logout") {
      Alert.alert("Logout", "Are you sure?", [
        { text: "Cancel" },
        { text: "Logout", style: "destructive" },
      ]);
    } else {
      Alert.alert("Coming soon");
    }
  };

  const renderItem = (item: any, isLast: boolean) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.itemRow, !isLast && styles.border]}
      activeOpacity={0.7}
      onPress={() => handlePress(item.title)}
    >
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons
            name={item.icon}
            size={20}
            color={item.danger ? "#EF4444" : "#8B5CF6"}
          />
        </View>
        <Text style={[styles.text, item.danger && styles.danger]}>
          {item.title}
        </Text>
      </View>

      {item.toggle ? (
        <Switch value={sound} onValueChange={setSound} />
      ) : item.value ? (
        <View style={styles.right}>
          <Text style={styles.value}>{item.value}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.btn} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Profile */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>Mahaveer Singh</Text>
            <Text style={styles.sub}>Manage your account</Text>
          </View>
        </View>

        {/* Sections */}
        {[
          {
            title: "Account",
            items: [
              { id: "1", title: "Edit Profile", icon: "person-outline" },
              { id: "2", title: "Change Password", icon: "lock-closed-outline" },
              { id: "3", title: "Privacy Settings", icon: "shield-checkmark-outline" },
            ],
          },
          {
            title: "Preferences",
            items: [
              { id: "4", title: "Language", icon: "language-outline", value: "English" },
              { id: "5", title: "Theme", icon: "moon-outline", value: "Dark" },
              { id: "6", title: "Notification Sound", icon: "volume-high-outline", toggle: true },
            ],
          },
          {
            title: "Support",
            items: [
              { id: "7", title: "Help Center", icon: "help-circle-outline" },
              { id: "8", title: "Terms & Conditions", icon: "document-text-outline" },
              { id: "9", title: "Logout", icon: "log-out-outline", danger: true },
            ],
          },
        ].map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            <View style={styles.card}>
              {group.items.map((item, i) =>
                renderItem(item, i === group.items.length - 1)
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#081018" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  btn: {
    width: 42,
    height: 42,
    backgroundColor: "#111C2B",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  title: { color: "#fff", fontSize: 20, fontWeight: "800" },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "#111C2B",
    padding: 16,
    borderRadius: 18,
  },

  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#8B5CF6",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  name: { color: "#fff", fontWeight: "800" },
  sub: { color: "#94A3B8", fontSize: 12 },

  group: { marginTop: 16, paddingHorizontal: 16 },

  groupTitle: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#111C2B",
    borderRadius: 18,
    overflow: "hidden",
  },

  itemRow: {
    minHeight: 60,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  border: {
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconWrap: {
    width: 40,
    height: 40,
    backgroundColor: "#1F2937",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  text: { color: "#fff", fontWeight: "700" },
  danger: { color: "#EF4444" },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  value: {
    color: "#94A3B8",
    marginRight: 6,
  },
});