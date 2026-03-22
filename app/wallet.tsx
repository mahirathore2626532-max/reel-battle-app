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

const quickActions = [
  { id: '1', title: 'Add Money', icon: 'add-circle-outline' as const },
  { id: '2', title: 'Withdraw', icon: 'wallet-outline' as const },
  { id: '3', title: 'History', icon: 'time-outline' as const },
  { id: '4', title: 'Rewards', icon: 'gift-outline' as const },
];

const cards = [
  { id: '1', title: 'Winning Balance', amount: '₹2,450' },
  { id: '2', title: 'Bonus Balance', amount: '₹320' },
  { id: '3', title: 'Referral Earnings', amount: '₹180' },
];

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wallet</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹12,580</Text>

          <View style={styles.balanceRow}>
            <View style={styles.balanceInfoBox}>
              <Text style={styles.balanceInfoValue}>₹4,200</Text>
              <Text style={styles.balanceInfoLabel}>Withdrawable</Text>
            </View>

            <View style={styles.balanceDivider} />

            <View style={styles.balanceInfoBox}>
              <Text style={styles.balanceInfoValue}>₹8,380</Text>
              <Text style={styles.balanceInfoLabel}>In App</Text>
            </View>
          </View>

          <View style={styles.primaryBtnRow}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="add" size={18} color="#0F172A" />
              <Text style={styles.primaryBtnText}>Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="arrow-down-circle-outline" size={18} color="#fff" />
              <Text style={styles.secondaryBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {quickActions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.quickCard}>
              <View style={styles.quickIconWrap}>
                <Ionicons name={item.icon} size={24} color="#7C3AED" />
              </View>
              <Text style={styles.quickText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Wallet Breakdown</Text>
        {cards.map((item) => (
          <View key={item.id} style={styles.infoCard}>
            <View>
              <Text style={styles.infoCardTitle}>{item.title}</Text>
              <Text style={styles.infoCardSub}>Updated just now</Text>
            </View>
            <Text style={styles.infoCardAmount}>{item.amount}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Offer</Text>
        <View style={styles.offerCard}>
          <View style={styles.offerLeft}>
            <View style={styles.offerBadge}>
              <Ionicons name="flash" size={16} color="#fff" />
            </View>
            <View>
              <Text style={styles.offerTitle}>Get 10% bonus on recharge</Text>
              <Text style={styles.offerSub}>Add ₹500 or more to unlock bonus</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>Claim</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 24,
    backgroundColor: '#1E293B',
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  balanceLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
  },
  balanceRow: {
    marginTop: 18,
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  balanceInfoBox: {
    flex: 1,
    alignItems: 'center',
  },
  balanceInfoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  balanceInfoLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  primaryBtnRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#FACC15',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryBtnText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  quickIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(124,58,237,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  infoCardSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  infoCardAmount: {
    color: '#22C55E',
    fontSize: 18,
    fontWeight: '800',
  },
  offerCard: {
    marginHorizontal: 16,
    marginTop: 4,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  offerBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  offerSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  claimBtn: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  claimBtnText: {
    color: '#111827',
    fontWeight: '800',
  },
});