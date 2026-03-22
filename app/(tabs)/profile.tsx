import AppButton from "@/components/AppButton";
import StatCard from "@/components/StatCard";
import Colors from "@/constants/colors";
import { auth, db } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Mahaveer Singh");

  const loadUser = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data();
        if (data?.name) setName(data.name);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24
          }}
        >
          <Text style={{ color: Colors.white, fontSize: 22, fontWeight: "900" }}>Profile</Text>
          <Pressable onPress={() => router.push("/settings")}>
            <Ionicons name="settings-outline" size={24} color={Colors.white} />
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: Colors.border,
            padding: 20
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=12" }}
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                marginBottom: 14
              }}
            />
            <Text style={{ color: Colors.white, fontSize: 22, fontWeight: "900" }}>
              {name}
            </Text>
            <Text style={{ color: Colors.subText, marginTop: 6 }}>
              @{auth.currentUser?.uid?.slice(0, 8) || "guest_user"}
            </Text>
            <Text
              style={{
                color: Colors.subText,
                textAlign: "center",
                marginTop: 12,
                lineHeight: 20
              }}
            >
              Reel creator • Contest lover • Short video app UI testing
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
            <StatCard value="48" label="Reels" />
            <StatCard value="12.5K" label="Followers" />
            <StatCard value="782" label="Following" />
          </View>

          <View style={{ marginTop: 18, gap: 12 }}>
            <AppButton title="Edit Profile" onPress={() => router.push("/edit-profile")} />
            <AppButton title="Share Profile" secondary />
          </View>
        </View>

        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            fontWeight: "800",
            marginTop: 24,
            marginBottom: 14
          }}
        >
          My Reel Highlights
        </Text>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              flex: 1,
              height: 160,
              borderRadius: 20,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              justifyContent: "flex-end",
              padding: 14
            }}
          >
            <Text style={{ color: Colors.white, fontWeight: "800" }}>Dance Battle</Text>
            <Text style={{ color: Colors.subText, marginTop: 4 }}>8.2K likes</Text>
          </View>

          <View
            style={{
              flex: 1,
              height: 160,
              borderRadius: 20,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              justifyContent: "flex-end",
              padding: 14
            }}
          >
            <Text style={{ color: Colors.white, fontWeight: "800" }}>Funny Clip</Text>
            <Text style={{ color: Colors.subText, marginTop: 4 }}>12.9K likes</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}