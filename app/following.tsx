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

const followingData = [
  {
    id: '1',
    name: 'Anjali Verma',
    username: '@anjali_editz',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    category: 'Dance Creator',
  },
  {
    id: '2',
    name: 'Harry Beats',
    username: '@harry_beats',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    category: 'Music Creator',
  },
  {
    id: '3',
    name: 'Neha Sharma',
    username: '@neha.creates',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
    category: 'Lifestyle Creator',
  },
  {
    id: '4',
    name: 'Studio Vibe',
    username: '@studio_vibe',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    category: 'Production House',
  },
];

export default function FollowingScreen() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return followingData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07101D" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Following</Text>

        <View style={styles.headerBtn} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search following..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>248 Following</Text>
        <Text style={styles.summarySub}>Creators and profiles you follow</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filtered.map((item) => (
          <TouchableOpacity key={item.id} style={styles.userCard}>
            <View style={styles.userLeft}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followBtnText}>Following</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07101D' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#111C2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 16,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  summarySub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  userCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  username: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  category: {
    color: '#C4B5FD',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '700',
  },
  followBtn: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  followBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
});