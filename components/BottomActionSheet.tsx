import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Item = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  danger?: boolean;
};

type Props = {
  visible: boolean;
  title?: string;
  items: Item[];
  onClose: () => void;
};

export default function BottomActionSheet({
  visible,
  title = "Options",
  items,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>

          {items.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.row}
              activeOpacity={0.7}
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
                    color={item.danger ? "#F87171" : "#FFFFFF"}
                  />
                </View>
                <Text style={[styles.rowText, item.danger && styles.rowTextDanger]}>
                  {item.label}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
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
    backgroundColor: "#081018",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 16,
    paddingBottom: 26,
  },
  handle: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#475569",
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  row: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: "#111C2B",
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
    backgroundColor: "#1F2937",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconWrapDanger: {
    backgroundColor: "rgba(239,68,68,0.14)",
  },
  rowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  rowTextDanger: {
    color: "#F87171",
  },
});