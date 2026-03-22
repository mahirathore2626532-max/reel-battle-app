import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getLoggedInUser } from "../../lib/auth";
import { createPost } from "../../services/postService";

const CATEGORIES = ["Editing", "Dance", "Comedy", "Music", "Acting", "Other"];

export default function UploadScreen() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Editing");
  const [selectedMode, setSelectedMode] = useState<"reel" | "battle">("reel");
  const [allowComments, setAllowComments] = useState(true);
  const [agreeRules, setAgreeRules] = useState(true);

  const titleCount = useMemo(() => title.trim().length, [title]);
  const captionCount = useMemo(() => caption.trim().length, [caption]);

  const handlePickVideo = () => {
    Alert.alert(
      "Upload disabled",
      "Video picker aur real storage upload baad me connect karenge."
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Title required", "Please enter a reel title.");
      return;
    }

    if (!agreeRules) {
      Alert.alert("Rules required", "Please accept content rules before posting.");
      return;
    }

    try {
      const user = await getLoggedInUser();

      if (!user) {
        Alert.alert("Login required", "Please login first.");
        return;
      }

      await createPost({
        userId: user.uid,
        title: title.trim(),
        caption: caption.trim(),
        category: selectedCategory,
        type: selectedMode,
        videoUrl: "",
        thumbnailUrl: "",
      });

      Alert.alert("Success", "Post Firestore me save ho gaya.");

      setTitle("");
      setCaption("");
      setSelectedCategory("Editing");
      setSelectedMode("reel");
      setAllowComments(true);
      setAgreeRules(true);
    } catch (error) {
      Alert.alert("Error", "Post save nahi ho paya.");
    }
  };

  const renderCategoryChip = (item: string) => {
    const active = selectedCategory === item;

    return (
      <Pressable
        key={item}
        onPress={() => setSelectedCategory(item)}
        style={[styles.chip, active && styles.chipActive]}
      >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#111827", "#020617"]}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.subHeading}>Create your next post</Text>
              <Text style={styles.heading}>Upload Reel</Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroBadge}>Creator Studio</Text>
              <Text style={styles.heroTitle}>Share your best reel battle</Text>
              <Text style={styles.heroText}>
                Ab title, caption, category aur type Firestore me save honge.
              </Text>
            </View>

            <View style={styles.heroCircle}>
              <Ionicons name="play" size={34} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Post Type</Text>

            <View style={styles.modeRow}>
              <Pressable
                onPress={() => setSelectedMode("reel")}
                style={[
                  styles.modeCard,
                  selectedMode === "reel" && styles.modeCardActive,
                ]}
              >
                <Ionicons
                  name="film-outline"
                  size={22}
                  color={selectedMode === "reel" ? "#FFFFFF" : "#CBD5E1"}
                />
                <Text
                  style={[
                    styles.modeTitle,
                    selectedMode === "reel" && styles.modeTitleActive,
                  ]}
                >
                  Reel
                </Text>
                <Text
                  style={[
                    styles.modeText,
                    selectedMode === "reel" && styles.modeTextActive,
                  ]}
                >
                  Normal creator post
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedMode("battle")}
                style={[
                  styles.modeCard,
                  selectedMode === "battle" && styles.modeCardActive,
                ]}
              >
                <Ionicons
                  name="flash-outline"
                  size={22}
                  color={selectedMode === "battle" ? "#FFFFFF" : "#CBD5E1"}
                />
                <Text
                  style={[
                    styles.modeTitle,
                    selectedMode === "battle" && styles.modeTitleActive,
                  ]}
                >
                  Battle
                </Text>
                <Text
                  style={[
                    styles.modeText,
                    selectedMode === "battle" && styles.modeTextActive,
                  ]}
                >
                  Competitive reel entry
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video</Text>

            <Pressable style={styles.uploadBox} onPress={handlePickVideo}>
              <View style={styles.uploadIconWrap}>
                <Ionicons name="videocam-outline" size={30} color="#FFFFFF" />
              </View>
              <Text style={styles.uploadTitle}>Select Video</Text>
              <Text style={styles.uploadText}>
                Tap to choose a reel video from device
              </Text>
              <Text style={styles.uploadHint}>
                Storage upload abhi pending hai
              </Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={styles.sectionTitle}>Title</Text>
              <Text style={styles.countText}>{titleCount}/60</Text>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text.slice(0, 60))}
                placeholder="Enter reel title"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={styles.sectionTitle}>Caption</Text>
              <Text style={styles.countText}>{captionCount}/180</Text>
            </View>

            <View style={[styles.inputWrap, styles.textAreaWrap]}>
              <TextInput
                value={caption}
                onChangeText={(text) => setCaption(text.slice(0, 180))}
                placeholder="Write a short caption..."
                placeholderTextColor="#94A3B8"
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.chipsWrap}>{CATEGORIES.map(renderCategoryChip)}</View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Options</Text>

            <Pressable
              style={styles.optionRow}
              onPress={() => setAllowComments((prev) => !prev)}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIcon}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Allow Comments</Text>
                  <Text style={styles.optionText}>
                    Let users comment on this post
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.toggle,
                  allowComments && styles.toggleActive,
                ]}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    allowComments && styles.toggleCircleActive,
                  ]}
                />
              </View>
            </Pressable>

            <Pressable
              style={styles.optionRow}
              onPress={() => setAgreeRules((prev) => !prev)}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIcon}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.optionTitle}>Accept Content Rules</Text>
                  <Text style={styles.optionText}>
                    No abuse, spam, or copied content
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.checkbox,
                  agreeRules && styles.checkboxActive,
                ]}
              >
                {agreeRules ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : null}
              </View>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Current Upload Status</Text>
            <Text style={styles.infoText}>
              • User-based post save active{"\n"}
              • Firestore save active{"\n"}
              • Video upload pending{"\n"}
              • Comments toggle UI only
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>
              Publish {selectedMode === "reel" ? "Reel" : "Battle"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              Alert.alert("Saved", "Draft save feature baad me add karenge.")
            }
          >
            <Text style={styles.secondaryButtonText}>Save as Draft</Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  headerRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeading: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#7C3AED",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroLeft: {
    flex: 1,
  },
  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    color: "#F5F3FF",
    fontSize: 11,
    fontWeight: "800",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },
  heroText: {
    color: "#F3E8FF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  heroCircle: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  modeRow: {
    flexDirection: "row",
    gap: 12,
  },
  modeCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  modeCardActive: {
    backgroundColor: "rgba(124,58,237,0.24)",
    borderColor: "#8B5CF6",
  },
  modeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 12,
  },
  modeTitleActive: {
    color: "#FFFFFF",
  },
  modeText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  modeTextActive: {
    color: "#E9D5FF",
  },
  uploadBox: {
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(139,92,246,0.55)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  uploadIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  uploadTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  uploadText: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  uploadHint: {
    color: "#A78BFA",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  labelRow: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
  },
  inputWrap: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
  },
  input: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  textAreaWrap: {
    minHeight: 130,
    paddingVertical: 12,
    justifyContent: "flex-start",
  },
  textArea: {
    minHeight: 100,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  chipActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#8B5CF6",
  },
  chipText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  optionRow: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(124,58,237,0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  optionText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
  },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 99,
    backgroundColor: "#334155",
    paddingHorizontal: 4,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#7C3AED",
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },
  toggleCircleActive: {
    alignSelf: "flex-end",
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#64748B",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#8B5CF6",
  },
  infoCard: {
    marginTop: 24,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(124,58,237,0.14)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  infoText: {
    color: "#DDD6FE",
    fontSize: 13,
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 26,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "800",
  },
});