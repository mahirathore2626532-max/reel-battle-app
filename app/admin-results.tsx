import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/theme";
import { declareResultLocal, getBattles } from "../services/battleService";
import { BattleItem } from "../types";

export default function AdminResultsScreen() {
  const [items, setItems] = useState<BattleItem[]>([]);
  const [winnerUserId, setWinnerUserId] = useState("");
  const [prizeAmount, setPrizeAmount] = useState("");

  useEffect(() => {
    getBattles().then(setItems);
  }, []);

  const onDeclare = async (item: BattleItem) => {
    try {
      await declareResultLocal({
        battleId: item.id,
        battleTitle: item.title,
        winnerUserId,
        prizeAmount: Number(prizeAmount),
      });
      Alert.alert("Success", "Result declared");
    } catch {
      Alert.alert("Error", "Result declare failed");
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

            <Text style={styles.heading}>Admin Results</Text>

            <View style={styles.card}>
              <TextInput
                style={styles.input}
                value={winnerUserId}
                onChangeText={setWinnerUserId}
                placeholder="Winner User ID"
                placeholderTextColor={COLORS.subtext}
              />
              <TextInput
                style={styles.input}
                value={prizeAmount}
                onChangeText={setPrizeAmount}
                placeholder="Prize Amount"
                placeholderTextColor={COLORS.subtext}
                keyboardType="numeric"
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>Prize Pool ₹{item.prizePool}</Text>
            <Pressable style={styles.btn} onPress={() => onDeclare(item)}>
              <Text style={styles.btnText}>Declare Result</Text>
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
    borderRadius: 16,
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
  itemCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  itemTitle: { color: COLORS.white, fontWeight: "800" },
  itemSub: { color: COLORS.subtext, marginTop: 6 },
  btn: {
    backgroundColor: COLORS.success,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  btnText: { color: COLORS.white, fontWeight: "800" },
});