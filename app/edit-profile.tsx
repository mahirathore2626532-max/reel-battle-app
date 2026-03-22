import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import ScreenHeader from "@/components/ScreenHeader";
import Colors from "@/constants/colors";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

export default function EditProfileScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const loadData = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data();
        setName(data?.name || "");
        setUsername(data?.username || "");
        setBio(data?.bio || "");
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Error", "User not found");
        return;
      }

      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          name,
          username,
          bio,
          updatedAt: Date.now()
        },
        { merge: true }
      );

      Alert.alert("Success", "Profile updated");
    } catch (e) {
      Alert.alert("Error", "Profile save nahi hua");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <ScreenHeader title="Edit Profile" showBack />

        <View
          style={{
            height: 110,
            width: 110,
            borderRadius: 55,
            backgroundColor: Colors.card,
            borderWidth: 1,
            borderColor: Colors.border,
            alignSelf: "center",
            marginBottom: 26,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: Colors.white, fontSize: 34, fontWeight: "900" }}>M</Text>
        </View>

        <AppInput label="Full Name" placeholder="Mahaveer Singh" value={name} onChangeText={setName} />
        <AppInput label="Username" placeholder="@mahaveer_creator" value={username} onChangeText={setUsername} />
        <AppInput label="Bio" placeholder="Write your bio..." multiline value={bio} onChangeText={setBio} />

        <View style={{ marginTop: 8 }}>
          <AppButton title="Save Changes" onPress={saveData} />
        </View>
      </View>
    </SafeAreaView>
  );
}