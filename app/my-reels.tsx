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
    TouchableOpacity,
    View,
} from 'react-native';

const tabs = ['All', 'Published', 'Draft'];

const reelsData = [
  {
    id: '1',
    title: 'Epic Dance Battle',
    status: 'Published',
    views: '98.3K',
    likes: '24.8K',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Beat Sync Challenge',
    status: 'Published',
    views: '75.2K',
    likes: '18.6K',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Studio Practice Reel',
    status: 'Draft',
    views: '--',
    likes: '--',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Night Performance',
    status: 'Published',
    views: '54.1K',
    likes: '11.2K',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function MyReelsScreen() {
  const [selectedTab, setSelectedTab] = useState('All');

  const filtered = useMemo(() => {
    if (selectedTab === 'All') return reelsData;
    return reelsData.filter((item) => item.status === selectedTab);
  }, [selectedTab]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Reels</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="add-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topCard}>
        <View style={styles.topIconWrap}>
          <Ionicons name="videocam-outline" size={24} color="#8B5CF6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.topTitle}>Your Reel Library</Text>
          <Text style={styles.topSub}>Manage all published reels and saved drafts</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filtered.map((item) => {
          const isDraft = item.status === 'Draft';

          return (
            <TouchableOpacity key={item.id} style={styles.reelCard}>
              <Image source={{ uri: item.image }} style={styles.reelImage} />

              <View style={styles.reelBody}>
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusChip,
                      isDraft ? styles.draftChip : styles.publishedChip,
                    ]}
                  >
                    <Text style={styles.statusChipText}>{item.status}</Text>
                  </View>
                </View>

                <Text style={styles.reelTitle}>{item.title}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="eye-outline" size={15} color="#94A3B8" />
                    <Text style={styles.metaText}>{item.views}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons name="heart-outline" size={15} color="#94A3B8" />
                    <Text style={styles.metaText}>{item.likes}</Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="create-outline" size={16} color="#fff" />
                    <Text style={styles.actionBtnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="share-social-outline" size={16} color="#fff" />
                    <Text style={styles.actionBtnText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#081018' },
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
  topCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  topSub: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: '#111C2B',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#8B5CF6',
  },
  tabText: { color: '#CBD5E1', fontWeight: '700' },
  tabTextActive: { color: '#fff' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  reelCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 14,
  },
  reelImage: {
    width: '100%',
    height: 190,
  },
  reelBody: {
    padding: 14,
  },
  statusRow: {
    marginBottom: 10,
  },
  statusChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  publishedChip: {
    backgroundColor: 'rgba(34,197,94,0.16)',
  },
  draftChip: {
    backgroundColor: 'rgba(251,146,60,0.16)',
  },
  statusChipText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
  reelTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 12,
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
});