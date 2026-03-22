import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import BattleCard from "../components/BattleCard";
import { COLORS } from "../constants/theme";
import { getBattles } from "../services/battleService";
import { BattleItem } from "../types";

export default function BattlesScreen() {
  const [items, setItems] = useState<BattleItem[]>([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("All");

  useEffect(() => {
    getBattles().then(setItems);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const modeMatch = mode === "All" || item.mode === mode;
      const searchMatch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.map.toLowerCase().includes(search.toLowerCase());
      return modeMatch && searchMatch;
    });
  }, [items, search, mode]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>All Battles</Text>

        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search battle or map"
          placeholderTextColor={COLORS.subtext}
        />

        <View style={styles.filterRow}>
          {["All", "Solo", "Duo", "Squad"].map((item) => (
            <Pressable
              key={item}
              style={[styles.filterBtn, mode === item && styles.filterBtnActive]}
              onPress={() => setMode(item)}
            >
              <Text style={[styles.filterText, mode === item && styles.filterTextActive]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BattleCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/battle-detail",
                  params: { id: item.id },
                })
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, padding: 16 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: "700" },
  heading: { color: COLORS.white, fontSize: 24, fontWeight: "800", marginBottom: 12 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    color: COLORS.white,
    padding: 14,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  filterBtn: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.subtext,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
});