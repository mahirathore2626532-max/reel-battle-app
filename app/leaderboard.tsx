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

const tabs = ['Today', 'Weekly', 'Monthly'];

const leaderboardData = {
  Today: [
    {
      id: '1',
      name: 'Anjali Verma',
      username: '@anjali_editz',
      points: '12,480',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Mahaveer Singh',
      username: '@mahaveer_creates',
      points: '11,920',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Harry Beats',
      username: '@harry_beats',
      points: '11,200',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Neha Sharma',
      username: '@neha.creates',
      points: '10,860',
      avatar:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Studio Vibe',
      username: '@studio_vibe',
      points: '10,120',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    },
  ],
  Weekly: [
    {
      id: '1',
      name: 'Mahaveer Singh',
      username: '@mahaveer_creates',
      points: '74,220',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Anjali Verma',
      username: '@anjali_editz',
      points: '72,980',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Neha Sharma',
      username: '@neha.creates',
      points: '69,540',
      avatar:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Harry Beats',
      username: '@harry_beats',
      points: '67,330',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Studio Vibe',
      username: '@studio_vibe',
      points: '63,010',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    },
  ],
  Monthly: [
    {
      id: '1',
      name: 'Harry Beats',
      username: '@harry_beats',
      points: '2,14,000',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Mahaveer Singh',
      username: '@mahaveer_creates',
      points: '2,05,600',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Anjali Verma',
      username: '@anjali_editz',
      points: '1,98,450',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Neha Sharma',
      username: '@neha.creates',
      points: '1,91,220',
      avatar:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Studio Vibe',
      username: '@studio_vibe',
      points: '1,86,100',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    },
  ],
};

export default function LeaderboardScreen() {
  const [selectedTab, setSelectedTab] = useState<'Today' | 'Weekly' | 'Monthly'>('Today');

  const list = useMemo(() => leaderboardData[selectedTab], [selectedTab]);
  const topThree = list.slice(0, 3);
  const others = list.slice(3);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1020" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Leaderboard</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="trophy-outline" size={22} color="#FACC15" />
        </TouchableOpacity>
      </View>

      <View style={styles.topCard}>
        <View style={styles.topBadge}>
          <Ionicons name="sparkles-outline" size={20} color="#FACC15" />
        </View>
        <Text style={styles.topTitle}>Top Creators</Text>
        <Text style={styles.topSubtitle}>Compete and climb the ranking board</Text>
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => setSelectedTab(tab as 'Today' | 'Weekly' | 'Monthly')}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.podiumWrap}>
          <View style={[styles.podiumCard, styles.secondCard]}>
            <Image source={{ uri: topThree[1]?.avatar }} style={styles.podiumAvatar} />
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[1]?.name}</Text>
            <Text style={styles.podiumPoints}>{topThree[1]?.points}</Text>
            <View style={[styles.rankBadge, styles.rankBadgeSilver]}>
              <Text style={styles.rankBadgeText}>2</Text>
            </View>
          </View>

          <View style={[styles.podiumCard, styles.firstCard]}>
            <Image source={{ uri: topThree[0]?.avatar }} style={[styles.podiumAvatar, styles.firstAvatar]} />
            <View style={styles.crownWrap}>
              <Ionicons name="trophy" size={18} color="#FACC15" />
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[0]?.name}</Text>
            <Text style={styles.podiumPoints}>{topThree[0]?.points}</Text>
            <View style={[styles.rankBadge, styles.rankBadgeGold]}>
              <Text style={styles.rankBadgeText}>1</Text>
            </View>
          </View>

          <View style={[styles.podiumCard, styles.thirdCard]}>
            <Image source={{ uri: topThree[2]?.avatar }} style={styles.podiumAvatar} />
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[2]?.name}</Text>
            <Text style={styles.podiumPoints}>{topThree[2]?.points}</Text>
            <View style={[styles.rankBadge, styles.rankBadgeBronze]}>
              <Text style={styles.rankBadgeText}>3</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>More Rankings</Text>

        {others.map((item, index) => (
          <TouchableOpacity key={item.id} style={styles.rankCard}>
            <View style={styles.rankLeft}>
              <View style={styles.rankNumberBox}>
                <Text style={styles.rankNumber}>{index + 4}</Text>
              </View>
              <Image source={{ uri: item.avatar }} style={styles.rankAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rankName}>{item.name}</Text>
                <Text style={styles.rankUsername}>{item.username}</Text>
              </View>
            </View>
            <Text style={styles.rankPoints}>{item.points}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1020' },
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
    backgroundColor: '#131B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  topCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#131B2E',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
  },
  topBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(250,204,21,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  topTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  topSubtitle: { color: '#94A3B8', fontSize: 13, marginTop: 6 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: '#131B2E',
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
    paddingTop: 18,
    paddingBottom: 30,
  },
  podiumWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  podiumCard: {
    backgroundColor: '#131B2E',
    borderRadius: 20,
    alignItems: 'center',
    padding: 12,
    width: '31%',
  },
  firstCard: {
    paddingTop: 18,
    paddingBottom: 18,
    minHeight: 210,
  },
  secondCard: {
    minHeight: 180,
  },
  thirdCard: {
    minHeight: 170,
  },
  podiumAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 10,
  },
  firstAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  crownWrap: {
    marginBottom: 8,
  },
  podiumName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  podiumPoints: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  rankBadge: {
    marginTop: 12,
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeGold: { backgroundColor: '#FACC15' },
  rankBadgeSilver: { backgroundColor: '#94A3B8' },
  rankBadgeBronze: { backgroundColor: '#FB923C' },
  rankBadgeText: {
    color: '#111827',
    fontWeight: '900',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 12,
  },
  rankCard: {
    backgroundColor: '#131B2E',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  rankNumberBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankNumber: {
    color: '#fff',
    fontWeight: '800',
  },
  rankAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  rankName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  rankUsername: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  rankPoints: {
    color: '#22C55E',
    fontSize: 15,
    fontWeight: '900',
  },
});