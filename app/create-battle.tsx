import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db } from "../lib/firebase";

export default function CreateBattleScreen() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [title, setTitle] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prize, setPrize] = useState("");
  const [status, setStatus] = useState<"live" | "upcoming">("upcoming");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setCurrentUser(user);
    });
  }, []);

  const handleCreateBattle = async () => {
    if (!currentUser) return;

    if (!title.trim()) {
      Alert.alert("Error", "Battle title dalo");
      return;
    }

    const fee = Number(entryFee);
    const prizeAmount = Number(prize);

    if (Number.isNaN(fee) || fee < 0) {
      Alert.alert("Error", "Sahi entry fee dalo");
      return;
    }

    if (Number.isNaN(prizeAmount) || prizeAmount < 0) {
      Alert.alert("Error", "Sahi prize amount dalo");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "battles"), {
        title: title.trim(),
        entryFee: fee,
        prize: prizeAmount,
        status,
        createdBy: currentUser.id,
        createdByName: currentUser.name,
        joinedUsers: [currentUser.id],
        joinedUserNames: [currentUser.name],
        participantsCount: 1,
        winnerId: "",
        winnerName: "",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Battle create ho gayi");
      router.replace("/battle");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Battle create nahi hui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Battle</Text>

        <Text style={styles.label}>Battle Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Battle ka title dalo"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Entry Fee</Text>
        <TextInput
          style={styles.input}
          placeholder="Entry fee dalo"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          value={entryFee}
          onChangeText={setEntryFee}
        />

        <Text style={styles.label}>Prize</Text>
        <TextInput
          style={styles.input}
          placeholder="Prize amount dalo"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          value={prize}
          onChangeText={setPrize}
        />

        <Text style={styles.label}>Battle Type</Text>

        <View style={styles.statusRow}>
          <Pressable
            style={[styles.statusBtn, status === "live" && styles.activeStatusBtn]}
            onPress={() => setStatus("live")}
          >
            <Text
              style={[
                styles.statusBtnText,
                status === "live" && styles.activeStatusBtnText,
              ]}
            >
              Live
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.statusBtn,
              status === "upcoming" && styles.activeStatusBtn,
            ]}
            onPress={() => setStatus("upcoming")}
          >
            <Text
              style={[
                styles.statusBtnText,
                status === "upcoming" && styles.activeStatusBtnText,
              ]}
            >
              Upcoming
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={handleCreateBattle}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Battle</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statusBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStatusBtn: {
    backgroundColor: "#2563eb",
  },
  statusBtnText: {
    color: "#111",
    fontWeight: "700",
  },
  activeStatusBtnText: {
    color: "#fff",
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});