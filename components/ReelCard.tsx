import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

type Props = {
  item: {
    userName: string;
    caption: string;
    likes: string | number;
    comments: string | number;
    shares: string | number;
  };
};

export default function ReelCard({ item }: Props) {
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop" }}
      style={{
        width,
        height: height - 92,
        justifyContent: "space-between",
        backgroundColor: "#000"
      }}
      imageStyle={{ opacity: 0.82 }}
    >
      <View
        style={{
          paddingHorizontal: 18,
          paddingTop: 18,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={{ color: Colors.white, fontSize: 22, fontWeight: "900" }}>ReelBattle</Text>
        <Ionicons name="search" size={24} color={Colors.white} />
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ color: Colors.white, fontSize: 17, fontWeight: "800" }}>
            @{item.userName}
          </Text>
          <Text style={{ color: Colors.white, marginTop: 8, fontSize: 14, lineHeight: 20 }}>
            {item.caption}
          </Text>
        </View>

        <View style={{ alignItems: "center", gap: 18 }}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="heart" size={28} color={Colors.primary} />
            <Text style={{ color: Colors.white, marginTop: 6, fontWeight: "700" }}>
              {item.likes}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Ionicons name="chatbubble" size={24} color={Colors.white} />
            <Text style={{ color: Colors.white, marginTop: 6, fontWeight: "700" }}>
              {item.comments}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Ionicons name="paper-plane" size={24} color={Colors.white} />
            <Text style={{ color: Colors.white, marginTop: 6, fontWeight: "700" }}>
              {item.shares}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}