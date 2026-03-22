import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = ['All', 'Creators', 'Reels', 'Battles'];

const searchData = [
  {
    id: '1',
    type: 'Creators',
    title: 'Mahaveer Singh',
    subtitle: '@mahaveer_creates • 12.4K followers',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    type: 'Creators',
    title: 'Anjali Verma',
    subtitle: '@anjali_editz • 18.1K followers',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    type: 'Reels',
    title: 'Epic Dance Battle',
    subtitle: 'Trending reel • 98.3K views',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    type: 'Battles',
    title: 'Dance Faceoff 2026',
    subtitle: 'Prize pool ₹5,000 • Ends tonight',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    type: 'Reels',
    title: 'Beat Sync Challenge',
    subtitle: 'Featured reel • 75.2K views',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = useMemo(() => {
    return searchData.filter((item) => {
      const byType = selectedCategory === 'All' || item.type === selectedCategory;
      const byQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase());

      return byType && byQuery;
    });
  }, [query, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search creators, reels, battles..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {categories.map((item) => {
          const active = selectedCategory === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        <Text style={styles.sectionCount}>{filtered.length} found</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filtered.map((item) => (
          <TouchableOpacity key={item.id} style={styles.resultCard}>
            <Image source={{ uri: item.image }} style={styles.resultImage} />
            <View style={styles.resultBody}>
              <View style={styles.typeChip}>
                <Text style={styles.typeChipText}>{item.type}</Text>
              </View>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyWrap}>
            <Ionicons name="search-outline" size={42} color="#64748B" />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySub}>Try a different keyword or category</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#081018' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#111C2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchWrap: {
    flex: 1,
    height: 52,
    backgroundColor: '#111C2B',
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  categoryRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  categoryChip: {
    backgroundColor: '#111C2B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  categoryChipActive: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    color: '#CBD5E1',
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionCount: {
    color: '#94A3B8',
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  resultCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImage: {
    width: 58,
    height: 58,
    borderRadius: 16,
    marginRight: 12,
  },
  resultBody: {
    flex: 1,
    paddingRight: 10,
  },
  typeChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139,92,246,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 8,
  },
  typeChipText: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  resultSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  emptyWrap: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },
  emptySub: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 6,
  },
});