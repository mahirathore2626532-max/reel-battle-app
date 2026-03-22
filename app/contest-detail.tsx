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

const prizes = [
  { id: '1', rank: '1st Prize', amount: '₹2,500', icon: 'trophy' as const },
  { id: '2', rank: '2nd Prize', amount: '₹1,200', icon: 'medal-outline' as const },
  { id: '3', rank: '3rd Prize', amount: '₹700', icon: 'ribbon-outline' as const },
];

const rules = [
  'Only original reel uploads are allowed.',
  'Video duration should be between 15 to 60 seconds.',
  'No abusive, copyrighted, or misleading content.',
  'Winners are selected based on engagement and quality score.',
];

export default function ContestDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Contest Detail</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="share-social-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE CONTEST</Text>
            </View>

            <Text style={styles.contestTitle}>Dance Faceoff 2026</Text>
            <Text style={styles.contestSub}>Show your best moves and win exciting rewards</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>12.8K</Text>
              <Text style={styles.infoLabel}>Participants</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>9 PM</Text>
              <Text style={styles.infoLabel}>Ends Today</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>₹5,000</Text>
              <Text style={styles.infoLabel}>Prize Pool</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About Contest</Text>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionText}>
            Join this trending dance contest and upload your best reel performance. Top creators
            will be selected based on audience engagement, creativity, and reel quality.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Prize Breakdown</Text>
        {prizes.map((item, index) => (
          <View key={item.id} style={styles.prizeCard}>
            <View style={styles.prizeLeft}>
              <View
                style={[
                  styles.prizeIconWrap,
                  index === 0
                    ? { backgroundColor: 'rgba(250,204,21,0.14)' }
                    : index === 1
                    ? { backgroundColor: 'rgba(148,163,184,0.16)' }
                    : { backgroundColor: 'rgba(251,146,60,0.16)' },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={index === 0 ? '#FACC15' : index === 1 ? '#CBD5E1' : '#FB923C'}
                />
              </View>
              <Text style={styles.prizeRank}>{item.rank}</Text>
            </View>
            <Text style={styles.prizeAmount}>{item.amount}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Rules</Text>
        <View style={styles.sectionCard}>
          {rules.map((rule, index) => (
            <View key={index} style={styles.ruleRow}>
              <View style={styles.ruleDot} />
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>View Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Join Contest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09111F' },
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
  content: { paddingHorizontal: 16, paddingBottom: 30 },
  heroCard: {
    marginTop: 8,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#111C2B',
    height: 260,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  liveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 12,
  },
  liveBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
  contestTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  contestSub: {
    color: '#E2E8F0',
    fontSize: 13,
    marginTop: 6,
  },
  infoCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    paddingVertical: 18,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  infoDivider: {
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
  sectionCard: {
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
  },
  sectionText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  prizeCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prizeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  prizeRank: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  prizeAmount: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '900',
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ruleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginTop: 6,
    marginRight: 10,
  },
  ruleText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#FACC15',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '900',
  },
});