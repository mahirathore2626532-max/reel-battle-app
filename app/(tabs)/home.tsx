import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ReelItem = {
  id: string;
  name: string;
  username: string;
  title: string;
  category: string;
  likes: number;
  comments: number;
  image: string;
};

const REELS: ReelItem[] = [
  {
    id: "1",
    name: "Aarav",
    username: "@aarav.edits",
    title: "Best cinematic transition reel",
    category: "Editing",
    likes: 1240,
    comments: 88,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Priya",
    username: "@priya.creator",
    title: "Trending dance challenge entry",
    category: "Dance",
    likes: 980,
    comments: 54,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Rohan",
    username: "@rohan.vibes",
    title: "Funny short clip battle",
    category: "Comedy",
    likes: 1560,
    comments: 112,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sneha",
    username: "@sneha.music",
    title: "Music vibe reel of the day",
    category: "Music",
    likes: 720,
    comments: 41,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Editing", "Dance", "Comedy", "Music"];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredReels = useMemo(() => {
    return REELS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const text = `${item.name} ${item.username} ${item.title} ${item.category}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const renderCategory = (item: string) => {
    const active = selectedCategory === item;

    return (
      <Pressable
        key={item}
        onPress={() => setSelectedCategory(item)}
        style={[styles.categoryChip, active && styles.categoryChipActive]}
      >
        <Text
          style={[styles.categoryChipText, active && styles.categoryChipTextActive]}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: ReelItem }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <LinearGradient
          colors={["transparent", "rgba(2,6,23,0.45)", "rgba(2,6,23,0.92)"]}
          style={styles.imageOverlay}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>

          <Text style={styles.cardTitle}>{item.title}</Text>

          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.usernameText}>{item.username}</Text>
            </View>

            <Pressable style={styles.followBtn}>
              <Text style={styles.followBtnText}>Follow</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={18} color="#EF4444" />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#60A5FA" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>

          <Pressable style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View Battle</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0F172A", "#111827", "#020617"]} style={styles.container}>
        <FlatList
          data={filteredReels}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.greeting}>Welcome back</Text>
                  <Text style={styles.heading}>Reel Battle</Text>
                </View>

                <Pressable style={styles.notificationBtn}>
                  <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                </Pressable>
              </View>

              <View style={styles.heroCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.heroSmall}>Today’s Highlight</Text>
                  <Text style={styles.heroTitle}>Trending Reel Battles</Text>
                  <Text style={styles.heroText}>
                    Explore top creators, vote on the best reels, and grow your audience.
                  </Text>
                </View>

                <View style={styles.heroIconWrap}>
                  <Ionicons name="play-circle" size={42} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Search creators, category, reels..."
                  placeholderTextColor="#94A3B8"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                />
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <Text style={styles.sectionSubtitle}>{filteredReels.length} results</Text>
              </View>

              <View style={styles.categoryRow}>{CATEGORIES.map(renderCategory)}</View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Battles</Text>
                <Text style={styles.sectionSubtitle}>Fresh picks for you</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="film-outline" size={42} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No reels found</Text>
              <Text style={styles.emptyText}>Try changing search or category.</Text>
            </View>
          }
        />
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
  listContent: {
    padding: 18,
    paddingBottom: 32,
  },
  headerRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "500",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  notificationBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    marginTop: 20,
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#7C3AED",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroSmall: {
    color: "#E9D5FF",
    fontSize: 12,
    fontWeight: "700",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },
  heroText: {
    color: "#F5F3FF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    paddingRight: 6,
  },
  heroIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    marginTop: 18,
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 15,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  categoryChipActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#8B5CF6",
  },
  categoryChipText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  card: {
    marginBottom: 18,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardImage: {
    width: "100%",
    height: 280,
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 60,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(124,58,237,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 28,
  },
  userRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  usernameText: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 2,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  followBtnText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },
  statsRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },
  statText: {
    color: "#E2E8F0",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
  },
  viewBtn: {
    marginLeft: "auto",
    backgroundColor: "#7C3AED",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  viewBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  emptyWrap: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 6,
  },
});