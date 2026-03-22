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

const rewards = [
  { id: '1', title: 'Daily Login Bonus', points: '+20', icon: 'calendar-outline' as const },
  { id: '2', title: 'Invite a Friend', points: '+100', icon: 'people-outline' as const },
  { id: '3', title: 'Win a Battle', points: '+250', icon: 'trophy-outline' as const },
  { id: '4', title: 'Upload 3 Reels', points: '+80', icon: 'videocam-outline' as const },
];

const history = [
  { id: '1', title: 'Daily login claimed', date: 'Today', points: '+20' },
  { id: '2', title: 'Referral reward', date: 'Yesterday', points: '+100' },
  { id: '3', title: 'Battle victory bonus', date: '18 Mar', points: '+250' },
];

export default function RewardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1020" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Rewards</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="gift-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.coinCircle}>
              <Ionicons name="diamond-outline" size={26} color="#FACC15" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroLabel}>Available Reward Points</Text>
              <Text style={styles.heroPoints}>2,840</Text>
            </View>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroBox}>
              <Text style={styles.heroBoxValue}>12</Text>
              <Text style={styles.heroBoxLabel}>Claimed</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroBox}>
              <Text style={styles.heroBoxValue}>4</Text>
              <Text style={styles.heroBoxLabel}>Pending</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>Redeem Rewards</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Earn More Points</Text>
        {rewards.map((item) => (
          <TouchableOpacity key={item.id} style={styles.rewardCard}>
            <View style={styles.rewardLeft}>
              <View style={styles.rewardIconWrap}>
                <Ionicons name={item.icon} size={22} color="#8B5CF6" />
              </View>
              <Text style={styles.rewardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.rewardPoints}>{item.points}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Reward History</Text>
        <View style={styles.historyWrap}>
          {history.map((item, index) => (
            <View
              key={item.id}
              style={[styles.historyCard, index !== history.length - 1 && styles.historyBorder]}
            >
              <View>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={styles.historyPoints}>{item.points}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1020' },
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
  content: { paddingBottom: 30 },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 24,
    padding: 18,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinCircle: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: 'rgba(250,204,21,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  heroLabel: { color: '#94A3B8', fontSize: 13 },
  heroPoints: { color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 4 },
  heroStats: {
    marginTop: 18,
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
  },
  heroBox: {
    flex: 1,
    alignItems: 'center',
  },
  heroBoxValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  heroBoxLabel: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  heroDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  claimBtn: {
    marginTop: 16,
    backgroundColor: '#FACC15',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  claimBtnText: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
  rewardCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  rewardIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rewardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  rewardPoints: {
    color: '#22C55E',
    fontSize: 18,
    fontWeight: '900',
  },
  historyWrap: {
    marginHorizontal: 16,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    overflow: 'hidden',
  },
  historyCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  historyTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  historyDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  historyPoints: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '800',
  },
});