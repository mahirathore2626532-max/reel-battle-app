import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import ScreenHeader from "@/components/ScreenHeader";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

export default function UploadScreen() {
  const [caption, setCaption] = useState("");

  const handleSelectVideo = () => {
    Alert.alert("Coming Soon", "Video select feature baad me add hoga");
  };

  const handleUpload = () => {
    Alert.alert("Coming Soon", "Storage enable hone ke baad real upload add karenge");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 22 }}>
        <ScreenHeader title="Upload Reel" />

        <View
          style={{
            height: 220,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: Colors.border,
            backgroundColor: Colors.card,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 22
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              backgroundColor: Colors.bg2,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 14
            }}
          >
            <Ionicons name="videocam" size={32} color={Colors.white} />
          </View>
          <Text style={{ color: Colors.white, fontSize: 18, fontWeight: "800" }}>
            Select Reel Video
          </Text>
          <Text style={{ color: Colors.subText, marginTop: 8 }}>
            Video upload UI placeholder
          </Text>
        </View>

        <AppInput
          label="Caption"
          placeholder="Write something amazing..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />

        <AppInput label="Category" placeholder="Dance / Comedy / Vlog" />

        <View style={{ gap: 12, marginTop: 10 }}>
          <AppButton title="Select Video" secondary onPress={handleSelectVideo} />
          <AppButton title="Upload Reel" onPress={handleUpload} />
        </View>
      </View>
    </SafeAreaView>
  );
}