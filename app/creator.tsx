import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../constants/theme";

export default function CreatorScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <Text style={styles.heading}>Reel</Text>
        <Text style={styles.subheading}>Creator videos and content</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Reel Feature</Text>
          <Text style={styles.text}>
            Abhi ye placeholder hai. Yaha baad me short video feed, creators,
            likes, comments aur upload system connect hoga.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Coming Features</Text>
          <Text style={styles.text}>• Video feed</Text>
          <Text style={styles.text}>• Upload reel</Text>
          <Text style={styles.text}>• Like / comment</Text>
          <Text style={styles.text}>• Creator profile</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  back: {
    color: COLORS.primary,
    fontWeight: "700",
    marginBottom: 12,
    fontSize: 16,
  },
  heading: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
  },
  subheading: {
    color: COLORS.subtext,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    color: COLORS.subtext,
    lineHeight: 22,
    marginBottom: 6,
  },
});