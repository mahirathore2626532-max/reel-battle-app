import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
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

export default function BattleResultScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1020" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Battle Result</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="share-social-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.trophyWrap}>
            <Ionicons name="trophy" size={34} color="#FACC15" />
          </View>
          <Text style={styles.heroTitle}>You Secured Rank #2</Text>
          <Text style={styles.heroSubtitle}>
            Great performance! Your reel made it to the top ranking list.
          </Text>

          <View style={styles.rewardRow}>
            <View style={styles.rewardBox}>
              <Text style={styles.rewardValue}>₹500</Text>
              <Text style={styles.rewardLabel}>Cash Prize</Text>
            </View>
            <View style={styles.rewardDivider} />
            <View style={styles.rewardBox}>
              <Text style={styles.rewardValue}>+250</Text>
              <Text style={styles.rewardLabel}>Reward Points</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Battle Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>98.3K</Text>
            <Text style={styles.summaryLabel}>Views</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>24.8K</Text>
            <Text style={styles.summaryLabel}>Likes</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>1.2K</Text>
            <Text style={styles.summaryLabel}>Comments</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top Participants</Text>

        <View style={styles.participantCard}>
          <View style={styles.participantLeft}>
            <View style={[styles.positionBadge, { backgroundColor: '#FACC15' }]}>
              <Text style={styles.positionText}>1</Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.participantName}>Anjali Verma</Text>
              <Text style={styles.participantSub}>@anjali_editz</Text>
            </View>
          </View>
          <Text style={styles.participantScore}>13,200</Text>
        </View>

        <View style={styles.participantCard}>
          <View style={styles.participantLeft}>
            <View style={[styles.positionBadge, { backgroundColor: '#94A3B8' }]}>
              <Text style={styles.positionText}>2</Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.participantName}>Mahaveer Singh</Text>
              <Text style={styles.participantSub}>@mahaveer_creates</Text>
            </View>
          </View>
          <Text style={styles.participantScore}>12,480</Text>
        </View>

        <View style={styles.participantCard}>
          <View style={styles.participantLeft}>
            <View style={[styles.positionBadge, { backgroundColor: '#FB923C' }]}>
              <Text style={styles.positionText}>3</Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.participantName}>Harry Beats</Text>
              <Text style={styles.participantSub}>@harry_beats</Text>
            </View>
          </View>
          <Text style={styles.participantScore}>11,960</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Claim Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Join Next Battle</Text>
          </TouchableOpacity>
        </View>
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
  content: { paddingHorizontal: 16, paddingBottom: 30 },
  heroCard: {
    marginTop: 8,
    backgroundColor: '#131B2E',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  trophyWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(250,204,21,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  rewardRow: {
    marginTop: 18,
    width: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  rewardBox: { flex: 1, alignItems: 'center' },
  rewardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  rewardLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  rewardDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#131B2E',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  participantCard: {
    backgroundColor: '#131B2E',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  positionBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  positionText: {
    color: '#111827',
    fontWeight: '900',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  participantName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  participantSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  participantScore: {
    color: '#22C55E',
    fontWeight: '900',
    fontSize: 15,
  },
  actionRow: {
    marginTop: 12,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#FACC15',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
});