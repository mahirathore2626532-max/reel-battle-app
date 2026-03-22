import ReelCard from "@/components/ReelCard";
import Colors from "@/constants/colors";
import { reels } from "@/data/reels";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReelCard item={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}