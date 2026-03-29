import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Item = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  danger?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  items: Item[];
};

export default function ActionSheet({
  visible,
  onClose,
  title = "Options",
  items,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>

          {items.map((item) => (
            <Pressable
              key={item.title}
              style={styles.row}
              onPress={() => {
                onClose();
                item.onPress();
              }}
            >
              <View style={styles.left}>
                <View style={[styles.iconWrap, item.danger && styles.iconWrapDanger]}>
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={item.danger ? "#FCA5A5" : "#fff"}
                  />
                </View>
                <Text style={[styles.rowText, item.danger && styles.rowTextDanger]}>
                  {item.title}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#0F172A",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  handle: {
    alignSelf: "center",
    width: 54,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#475569",
    marginBottom: 14,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },
  row: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconWrapDanger: {
    backgroundColor: "rgba(220,38,38,0.16)",
  },
  rowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  rowTextDanger: {
    color: "#FCA5A5",
  },
});