import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { BattleItem } from "../types";

export default function BattleCard({
  item,
  onPress,
}: {
  item: BattleItem;
  onPress: () => void;
}) {
  const spotsLeft = item.totalSpots - item.filledSpots;
  const percent = (item.filledSpots / item.totalSpots) * 100;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.badge}>{item.status}</Text>
      </View>

      <Text style={styles.sub}>
        {item.mode} • {item.map}
      </Text>

      <View style={styles.infoRow}>
        <Text style={styles.info}>Entry ₹{item.entryFee}</Text>
        <Text style={styles.info}>Prize ₹{item.prizePool}</Text>
        <Text style={styles.info}>{item.time}</Text>
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>

      <Text style={styles.spots}>
        {spotsLeft} spots left / {item.totalSpots}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
    paddingRight: 8,
  },
  badge: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  sub: {
    color: COLORS.subtext,
    marginTop: 8,
  },
  infoRow: {
    marginTop: 14,
  },
  info: {
    color: COLORS.white,
    marginBottom: 5,
  },
  progressBg: {
    height: 8,
    backgroundColor: COLORS.card2,
    borderRadius: 999,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
  },
  spots: {
    color: COLORS.subtext,
    marginTop: 8,
    fontSize: 12,
  },
});