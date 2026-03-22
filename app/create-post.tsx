import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getLoggedInUser, LoggedInUser } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export default function CreatePostScreen() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [caption, setCaption] = useState("");
  const [mediaUri, setMediaUri] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video" | "">("");
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

  const pickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission", "Gallery permission deni padegi");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setMediaUri(asset.uri);

    if (asset.type === "video") {
      setMediaType("video");
    } else {
      setMediaType("image");
    }
  };

  const uploadFileToStorage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const extension = mediaType === "video" ? "mp4" : "jpg";

    const fileName = `posts/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;

    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleCreatePost = async () => {
    if (!currentUser) return;

    if (!caption.trim()) {
      Alert.alert("Error", "Caption dalo");
      return;
    }

    if (!mediaUri) {
      Alert.alert("Error", "Image ya video select karo");
      return;
    }

    try {
      setLoading(true);

      const mediaUrl = await uploadFileToStorage(mediaUri);

      await addDoc(collection(db, "posts"), {
        userId: currentUser.id,
        userName: currentUser.name,
        caption: caption.trim(),
        mediaUrl,
        mediaType,
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Post upload ho gayi");
      router.replace("/reels");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Post upload nahi hui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Post</Text>

        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={[styles.input, styles.bigInput]}
          placeholder="Apni post ka caption likho"
          placeholderTextColor="#888"
          multiline
          value={caption}
          onChangeText={setCaption}
        />

        <Pressable style={styles.pickBtn} onPress={pickMedia}>
          <Text style={styles.pickBtnText}>Gallery se Image/Video Choose karo</Text>
        </Pressable>

        {mediaUri ? (
          <View style={styles.previewBox}>
            {mediaType === "image" ? (
              <Image source={{ uri: mediaUri }} style={styles.previewImage} />
            ) : (
              <Video
                source={{ uri: mediaUri }}
                style={styles.previewImage}
                useNativeControls
                resizeMode="cover"
                isLooping
              />
            )}
          </View>
        ) : null}

        <Pressable style={styles.button} onPress={handleCreatePost} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Upload Post</Text>
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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  bigInput: {
    height: 110,
    textAlignVertical: "top",
    paddingTop: 14,
  },
  pickBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#0f766e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pickBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  previewBox: {
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
  },
  previewImage: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});