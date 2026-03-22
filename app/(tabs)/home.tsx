import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getAllPosts } from "../../services/postService";

type PostItem = {
  id: string;
  userId: string;
  title: string;
  caption: string;
  category: string;
  type: "reel" | "battle";
  likesCount?: number;
  commentsCount?: number;
};

const CATEGORIES = ["All", "Editing", "Dance", "Comedy", "Music", "Acting", "Other"];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const data = (await getAllPosts()) as PostItem[];
      setPosts(data);
    } catch (error) {
      console.log("loadPosts error", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const text =
        `${item.title} ${item.caption} ${item.category} ${item.type}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

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

  const renderItem = ({ item }: { item: PostItem }) => {
    return (
      <View style={styles.card}>
        <LinearGradient
          colors={["#1E293B", "#0F172A"]}
          style={styles.cardTop}
        >
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>

            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{item.type}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{item.title}</Text>

          <Text style={styles.cardCaption}>
            {item.caption?.trim() ? item.caption : "No caption added."}
          </Text>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={18} color="#EF4444" />
            <Text style={styles.statText}>{item.likesCount ?? 0}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#60A5FA" />
            <Text style={styles.statText}>{item.commentsCount ?? 0}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="person-circle-outline" size={18} color="#A78BFA" />
            <Text style={styles.statText}>{item.userId}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0F172A", "#111827", "#020617"]} style={styles.container}>
        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loaderText}>Loading posts...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                    <Text style={styles.heroSmall}>Firestore Connected</Text>
                    <Text style={styles.heroTitle}>Live Reel Posts</Text>
                    <Text style={styles.heroText}>
                      Ab home screen par real Firestore posts load ho rahe hain.
                    </Text>
                  </View>

                  <View style={styles.heroIconWrap}>
                    <Ionicons name="server-outline" size={42} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.searchWrap}>
                  <Ionicons name="search" size={18} color="#94A3B8" />
                  <TextInput
                    placeholder="Search title, caption, category..."
                    placeholderTextColor="#94A3B8"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                  />
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Categories</Text>
                  <Text style={styles.sectionSubtitle}>{filteredPosts.length} results</Text>
                </View>

                <View style={styles.categoryRow}>{CATEGORIES.map(renderCategory)}</View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Latest Posts</Text>
                  <Text style={styles.sectionSubtitle}>Live from Firestore</Text>
                </View>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyWrap}>
                <Ionicons name="film-outline" size={42} color="#94A3B8" />
                <Text style={styles.emptyTitle}>No posts found</Text>
                <Text style={styles.emptyText}>
                  Upload screen se first post create karo.
                </Text>
              </View>
            }
          />
        )}
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
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    marginTop: 12,
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
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
  cardTop: {
    padding: 18,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(124,58,237,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  typeBadgeText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 28,
  },
  cardCaption: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  statsRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    color: "#E2E8F0",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
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