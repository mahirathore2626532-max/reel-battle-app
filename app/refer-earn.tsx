import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const steps = [
  {
    id: '1',
    title: 'Share Your Code',
    text: 'Send your unique referral code or link to friends.',
    icon: 'share-social-outline' as const,
  },
  {
    id: '2',
    title: 'Friend Joins',
    text: 'Your friend signs up and starts using the app.',
    icon: 'person-add-outline' as const,
  },
  {
    id: '3',
    title: 'Both Earn Rewards',
    text: 'You and your friend receive bonus rewards.',
    icon: 'gift-outline' as const,
  },
];

const earnings = [
  { id: '1', label: 'Total Referrals', value: '24' },
  { id: '2', label: 'Total Earnings', value: '₹2,400' },
  { id: '3', label: 'Pending Rewards', value: '₹300' },
];

export default function ReferEarnScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Refer & Earn</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="gift-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.giftWrap}>
            <Ionicons name="gift" size={30} color="#FACC15" />
          </View>
          <Text style={styles.heroTitle}>Earn Rewards for Every Invite</Text>
          <Text style={styles.heroSub}>
            Invite friends to join Reel Battle and earn bonus cash and points when they sign up.
          </Text>

          <View style={styles.referralBox}>
            <Text style={styles.referralLabel}>Your Referral Code</Text>
            <Text style={styles.referralCode}>RBMAHAVEER24</Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Share Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="copy-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Referral Stats</Text>
        <View style={styles.statsCard}>
          {earnings.map((item, index) => (
            <View
              key={item.id}
              style={[styles.statBox, index !== earnings.length - 1 && styles.statBorder]}
            >
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>How It Works</Text>
        {steps.map((item) => (
          <View key={item.id} style={styles.stepCard}>
            <View style={styles.stepIconWrap}>
              <Ionicons name={item.icon} size={22} color="#8B5CF6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepText}>{item.text}</Text>
            </View>
          </View>
        ))}

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={20} color="#38BDF8" />
          <Text style={styles.noteText}>
            Rewards are added after the referred user completes signup and first activity.
          </Text>
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  heroCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  giftWrap: {
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
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroSub: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  referralBox: {
    width: '100%',
    marginTop: 18,
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  referralLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  referralCode: {
    color: '#FACC15',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 6,
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryBtn: {
    width: 54,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    overflow: 'hidden',
  },
  statBox: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  statBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 6,
  },
  stepCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  stepText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5,
  },
  noteCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 10,
  },
});