import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const quickAmounts = ['100', '200', '500', '1000', '2000', '5000'];

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState('500');
  const [selectedBonus, setSelectedBonus] = useState('10% Bonus');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Money</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="wallet-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Wallet Balance</Text>
          <Text style={styles.balanceAmount}>₹12,580</Text>
          <Text style={styles.balanceSub}>Top up your wallet to join more battles</Text>
        </View>

        <Text style={styles.sectionTitle}>Enter Amount</Text>
        <View style={styles.inputCard}>
          <Text style={styles.currency}>₹</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            style={styles.amountInput}
          />
        </View>

        <View style={styles.quickGrid}>
          {quickAmounts.map((item) => {
            const active = amount === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.quickChip, active && styles.quickChipActive]}
                onPress={() => setAmount(item)}
              >
                <Text style={[styles.quickChipText, active && styles.quickChipTextActive]}>
                  ₹{item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Offers</Text>
        <View style={styles.offerCard}>
          <TouchableOpacity
            style={[
              styles.offerOption,
              selectedBonus === '10% Bonus' && styles.offerOptionActive,
            ]}
            onPress={() => setSelectedBonus('10% Bonus')}
          >
            <View>
              <Text style={styles.offerTitle}>10% Bonus</Text>
              <Text style={styles.offerSub}>On recharge above ₹500</Text>
            </View>
            <Ionicons
              name={selectedBonus === '10% Bonus' ? 'checkmark-circle' : 'ellipse-outline'}
              size={20}
              color={selectedBonus === '10% Bonus' ? '#22C55E' : '#64748B'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.offerOption,
              selectedBonus === 'Flat ₹100 Cashback' && styles.offerOptionActive,
            ]}
            onPress={() => setSelectedBonus('Flat ₹100 Cashback')}
          >
            <View>
              <Text style={styles.offerTitle}>Flat ₹100 Cashback</Text>
              <Text style={styles.offerSub}>On recharge above ₹1000</Text>
            </View>
            <Ionicons
              name={
                selectedBonus === 'Flat ₹100 Cashback'
                  ? 'checkmark-circle'
                  : 'ellipse-outline'
              }
              size={20}
              color={selectedBonus === 'Flat ₹100 Cashback' ? '#22C55E' : '#64748B'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Recharge Amount</Text>
            <Text style={styles.summaryValue}>₹{amount || '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bonus Applied</Text>
            <Text style={styles.summaryValueGreen}>{selectedBonus}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={styles.summaryValue}>₹0</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/payment-methods')}>
          <Text style={styles.primaryBtnText}>Continue to Payment</Text>
        </TouchableOpacity>
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
  balanceCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: { color: '#94A3B8', fontSize: 13 },
  balanceAmount: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 8 },
  balanceSub: { color: '#94A3B8', fontSize: 12, marginTop: 8 },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  inputCard: {
    backgroundColor: '#111C2B',
    borderRadius: 20,
    height: 74,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    color: '#FACC15',
    fontSize: 28,
    fontWeight: '900',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  quickChip: {
    backgroundColor: '#111C2B',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  quickChipActive: {
    backgroundColor: '#8B5CF6',
  },
  quickChipText: {
    color: '#fff',
    fontWeight: '800',
  },
  quickChipTextActive: {
    color: '#fff',
  },
  offerCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 14,
  },
  offerOption: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerOptionActive: {
    borderWidth: 1,
    borderColor: '#22C55E',
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
  summaryCard: {
    marginTop: 18,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 13,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryValueGreen: {
    color: '#22C55E',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryBtn: {
    marginTop: 22,
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
});