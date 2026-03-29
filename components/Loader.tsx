import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader({ text = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 13,
  },
});