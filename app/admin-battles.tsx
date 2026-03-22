import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/theme";
import { createBattle, deleteBattle } from "../services/adminService";
import { getBattles } from "../services/battleService";
import { BattleItem } from "../types";

export default function AdminBattlesScreen() {
  const [items, setItems] = useState<BattleItem[]>([]);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("Solo");
  const [entryFee, setEntryFee] = useState("20");
  const [prizePool, setPrizePool] = useState("200");
  const [totalSpots, setTotalSpots] = useState("20");
  const [map, setMap] = useState("Erangel");
  const [time, setTime] = useState("Today, 8:00 PM");
  const [description, setDescription] = useState("Battle description");

  const load = async () => {
    const data = await getBattles();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async () => {
    try {
      await createBattle({
        title,
        mode,
        entryFee: Number(entryFee),
        prizePool: Number(prizePool),
        totalSpots: Number(totalSpots),
        filledSpots: 0,
        time,
        map,
        status: "Upcoming",
        description,
      });
      Alert.alert("Success", "Battle created");
      setTitle("");
      await load();
    } catch {
      Alert.alert("Error", "Create failed");
    }
  };

  const onDelete = async (battleId: string) => {
    try {
      await deleteBattle(battleId);
      await load();
    } catch {
      Alert.alert("Error", "Delete failed");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.container}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.back}>← Back</Text>
            </Pressable>

            <Text style={styles.heading}>Admin Battles</Text>

            <View style={styles.card}>
              <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor={COLORS.subtext} />
              <TextInput style={styles.input} value={mode} onChangeText={setMode} placeholder="Mode" placeholderTextColor={COLORS.subtext} />
              <TextInput style={styles.input} value={entryFee} onChangeText={setEntryFee} placeholder="Entry Fee" placeholderTextColor={COLORS.subtext} keyboardType="numeric" />
              <TextInput style={styles.input} value={prizePool} onChangeText={setPrizePool} placeholder="Prize Pool" placeholderTextColor={COLORS.subtext} keyboardType="numeric" />
              <TextInput style={styles.input} value={totalSpots} onChangeText={setTotalSpots} placeholder="Total Spots" placeholderTextColor={COLORS.subtext} keyboardType="numeric" />
              <TextInput style={styles.input} value={map} onChangeText={setMap} placeholder="Map" placeholderTextColor={COLORS.subtext} />
              <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="Time" placeholderTextColor={COLORS.subtext} />
              <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" placeholderTextColor={COLORS.subtext} />

              <Pressable style={styles.btn} onPress={onCreate}>
                <Text style={styles.btnText}>Create Battle</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>{item.mode} • ₹{item.entryFee} • {item.status}</Text>
            <Pressable style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: "700" },
  heading: { color: COLORS.white, fontSize: 24, fontWeight: "800", marginBottom: 12 },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.card2,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    color: COLORS.white,
    padding: 12,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: { color: COLORS.white, fontWeight: "800" },
  itemCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  itemTitle: { color: COLORS.white, fontWeight: "800", fontSize: 16 },
  itemSub: { color: COLORS.subtext, marginTop: 6 },
  deleteBtn: {
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  deleteText: { color: COLORS.white, fontWeight: "800" },
});