import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
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
import AppErrorState from "../../components/AppErrorState";
import AppLoading from "../../components/AppLoading";
import BottomActionSheet from "../../components/BottomActionSheet";

const CATEGORIES = ["All", "Trending", "Battles", "Comedy", "Dance", "Music"];

const POSTS = [
  {
    id: "1",
    user: "reelmaster",
    name: "Reel Master",
    avatar: "https://i.pravatar.cc/100?img=12",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    caption: "Weekend battle entry 🔥 trending sound + smooth transitions",
    likes: "24.8K",
    comments: "1.8K",
    shares: "3.2K",
    category: "Trending",
  },
  {
    id: "2",
    user: "danceking",
    name: "Dance King",
    avatar: "https://i.pravatar.cc/100?img=14",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    caption: "Fast beat challenge 💃 full energy performance",
    likes: "18.1K",
    comments: "980",
    shares: "1.1K",
    category: "Dance",
  },
  {
    id: "3",
    user: "funfactory",
    name: "Fun Factory",
    avatar: "https://i.pravatar.cc/100?img=18",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    caption: "Comedy battle with unexpected ending 😂",
    likes: "11.5K",
    comments: "670",
    shares: "820",
    category: "Comedy",
  },
  {
    id: "4",
    user: "musicfire",
    name: "Music Fire",
    avatar: "https://i.pravatar.cc/100?img=22",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    caption: "Live vibe reel 🎵 crowd energy on peak",
    likes: "21.3K",
    comments: "1.2K",
    shares: "1.7K",
    category: "Music",
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return POSTS.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchSearch =
        !search.trim() ||
        item.caption.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  const refreshFeed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Feed refreshed");
    }, 1200);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#020617" />
        <LinearGradient colors={["#020617", "#0F172A", "#111827"]} style={styles.container}>
          <AppLoading title="Loading feed..." />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#020617" />
        <LinearGradient colors={["#020617", "#0F172A", "#111827"]} style={styles.container}>
          <AppErrorState
            title="Failed to load feed"
            subtitle="Check your connection and try again."
            onRetry={() => {
              setError(false);
              refreshFeed();
            }}
          />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <LinearGradient colors={["#020617", "#0F172A", "#111827"]} style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>Welcome back</Text>
            <Text style={styles.title}>Discover Reels</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.roundButton} onPress={() => router.push("/wallet")}>
              <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
            </Pressable>

            <Pressable style={styles.roundButton} onPress={() => router.push("/notifications")}>
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            </Pressable>

            <Pressable style={styles.roundButton} onPress={() => setSheetOpen(true)}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.searchWrap} onPress={() => router.push("/search")}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search creators, reels, tags..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </Pressable>

        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const active = item === selectedCategory;
            return (
              <Pressable
                style={[styles.categoryPill, active && styles.activeCategoryPill]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[styles.categoryText, active && styles.activeCategoryText]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => {
            const isLiked = liked.includes(item.id);

            return (
              <Pressable
                style={({ pressed }) => [
                  styles.card,
                  pressed && { transform: [{ scale: 0.985 }], opacity: 0.92 },
                ]}
                onPress={() => router.push("/post-detail")}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                <LinearGradient
                  colors={["transparent", "rgba(2,6,23,0.25)", "rgba(2,6,23,0.95)"]}
                  style={styles.overlay}
                >
                  <View style={styles.topRow}>
                    <View style={styles.userRow}>
                      <Image source={{ uri: item.avatar }} style={styles.avatar} />
                      <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.username}>@{item.user}</Text>
                      </View>
                    </View>

                    <Pressable style={styles.followButton}>
                      <Text style={styles.followButtonText}>Follow</Text>
                    </Pressable>
                  </View>

                  <View style={styles.bottomContent}>
                    <Text style={styles.caption} numberOfLines={2}>
                      {item.caption}
                    </Text>

                    <View style={styles.statsRow}>
                      <View style={styles.statPill}>
                        <Ionicons name="heart" size={14} color="#FB7185" />
                        <Text style={styles.statText}>{item.likes}</Text>
                      </View>

                      <View style={styles.statPill}>
                        <Ionicons name="chatbubble-ellipses" size={14} color="#93C5FD" />
                        <Text style={styles.statText}>{item.comments}</Text>
                      </View>

                      <View style={styles.statPill}>
                        <Ionicons name="paper-plane" size={14} color="#C4B5FD" />
                        <Text style={styles.statText}>{item.shares}</Text>
                      </View>
                    </View>

                    <View style={styles.actionRow}>
                      <Pressable
                        style={styles.actionButton}
                        onPress={() =>
                          setLiked((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((i) => i !== item.id)
                              : [...prev, item.id]
                          )
                        }
                      >
                        <Ionicons
                          name={isLiked ? "heart" : "heart-outline"}
                          size={18}
                          color={isLiked ? "#FB7185" : "#FFFFFF"}
                        />
                        <Text style={styles.actionText}>Like</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => router.push("/post-comments")}
                      >
                        <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" />
                        <Text style={styles.actionText}>Comment</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => Alert.alert("Share clicked")}
                      >
                        <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
                        <Text style={styles.actionText}>Share</Text>
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="videocam-outline" size={34} color="#94A3B8" />
              <Text style={styles.emptyTitle}>No reels found</Text>
              <Text style={styles.emptySub}>Try another category or search keyword.</Text>
            </View>
          }
        />

        <BottomActionSheet
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Feed Options"
          items={[
            {
              label: "Open Search",
              icon: "search-outline",
              onPress: () => router.push("/search"),
            },
            {
              label: "Open Notifications",
              icon: "notifications-outline",
              onPress: () => router.push("/notifications"),
            },
            {
              label: "Refresh Feed",
              icon: "refresh-outline",
              onPress: refreshFeed,
            },
            {
              label: "Show Error State",
              icon: "alert-circle-outline",
              danger: true,
              onPress: () => setError(true),
            },
          ]}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallTitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  roundButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    marginTop: 18,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    marginLeft: 10,
    fontSize: 14,
  },
  categoryList: {
    paddingTop: 16,
    paddingBottom: 18,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginRight: 10,
  },
  activeCategoryPill: {
    backgroundColor: "#7C3AED",
  },
  categoryText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "700",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  card: {
    height: 460,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: "#111827",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  topRow: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "70%",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  username: {
    color: "#E2E8F0",
    fontSize: 12,
    marginTop: 3,
  },
  followButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  bottomContent: {},
  caption: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.55)",
  },
  statText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  actionRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  emptyBox: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },
  emptySub: {
    color: "#94A3B8",
    marginTop: 6,
    fontSize: 13,
  },
});