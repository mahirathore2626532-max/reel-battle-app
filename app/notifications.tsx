import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialData = [
  {
    id: "1",
    title: "Battle result announced",
    message: "Your reel ranked #2 in today’s dance challenge.",
    time: "2m ago",
    type: "success",
    icon: "trophy-outline" as const,
    unread: true,
  },
  {
    id: "2",
    title: "New comment received",
    message: "Anjali commented: “Lighting next level 🔥”",
    time: "10m ago",
    type: "comment",
    icon: "chatbubble-ellipses-outline" as const,
    unread: true,
  },
  {
    id: "3",
    title: "Wallet credited",
    message: "₹500 added to your wallet.",
    time: "1h ago",
    type: "wallet",
    icon: "wallet-outline" as const,
    unread: false,
  },
];

export default function NotificationsScreen() {
  const [selectedTab, setSelectedTab] = useState<"All" | "Unread">("All");
  const [data, setData] = useState(initialData);

  const unreadCount = useMemo(
    () => data.filter((i) => i.unread).length,
    [data]
  );

  const filtered = useMemo(() => {
    return selectedTab === "All" ? data : data.filter((i) => i.unread);
  }, [data, selectedTab]);

  const markAllRead = () => {
    setData((prev) => prev.map((i) => ({ ...i, unread: false })));
  };

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "#22C55E";
      case "comment":
        return "#38BDF8";
      case "wallet":
        return "#FACC15";
      default:
        return "#8B5CF6";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity style={styles.headerBtn} onPress={markAllRead}>
          <Ionicons name="checkmark-done-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top card */}
      <View style={styles.topCard}>
        <Text style={styles.topTitle}>Stay Updated</Text>
        <Text style={styles.topSub}>{unreadCount} unread notifications</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {["All", "Unread"].map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, active && styles.activeTab]}
              onPress={() => setSelectedTab(tab as any)}
            >
              <Text style={[styles.tabText, active && styles.activeText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => {
              // future navigation
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: getColor(item.type) + "20" }]}>
              <Ionicons name={item.icon} size={20} color={getColor(item.type)} />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                {item.unread && <View style={styles.dot} />}
              </View>

              <Text style={styles.msg}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={40} color="#64748B" />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08111F" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  headerBtn: {
    width: 42,
    height: 42,
    backgroundColor: "#111C2B",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },

  topCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#111C2B",
    borderRadius: 18,
  },

  topTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  topSub: { color: "#94A3B8", marginTop: 6 },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
  },

  tabBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#111C2B",
    borderRadius: 14,
    alignItems: "center",
  },

  activeTab: { backgroundColor: "#7C3AED" },

  tabText: { color: "#CBD5E1" },
  activeText: { color: "#fff" },

  list: { padding: 16 },

  card: {
    flexDirection: "row",
    backgroundColor: "#111C2B",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: { color: "#fff", fontWeight: "800" },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8B5CF6",
  },

  msg: { color: "#CBD5E1", marginTop: 6 },
  time: { color: "#94A3B8", fontSize: 12, marginTop: 6 },

  empty: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    color: "#94A3B8",
    marginTop: 10,
  },
});