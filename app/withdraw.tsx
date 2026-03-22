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

const methods = [
  { id: '1', title: 'UPI', subtitle: 'mahaveer@upi', icon: 'phone-portrait-outline' as const },
  { id: '2', title: 'Bank Account', subtitle: 'xxxxxx4821', icon: 'card-outline' as const },
];

const amounts = ['₹100', '₹500', '₹1000', '₹2000'];

export default function WithdrawScreen() {
  const [selectedMethod, setSelectedMethod] = useState('1');
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Withdraw</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="help-circle-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹4,200</Text>
          <Text style={styles.balanceSub}>Withdrawable amount from your wallet</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Method</Text>
        {methods.map((item) => {
          const active = selectedMethod === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.methodCard, active && styles.methodCardActive]}
              onPress={() => setSelectedMethod(item.id)}
            >
              <View style={styles.methodLeft}>
                <View style={[styles.methodIconWrap, active && styles.methodIconWrapActive]}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={active ? '#fff' : '#8B5CF6'}
                  />
                </View>
                <View>
                  <Text style={styles.methodTitle}>{item.title}</Text>
                  <Text style={styles.methodSubtitle}>{item.subtitle}</Text>
                </View>
              </View>

              <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                {active && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>Enter Amount</Text>
        <View style={styles.inputCard}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            style={styles.amountInput}
          />
        </View>

        <View style={styles.amountRow}>
          {amounts.map((item) => (
            <TouchableOpacity key={item} style={styles.amountChip} onPress={() => setAmount(item.replace('₹', ''))}>
              <Text style={styles.amountChipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Processing Fee</Text>
            <Text style={styles.infoValue}>₹0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Expected Arrival</Text>
            <Text style={styles.infoValue}>Within 24 hours</Text>
          </View>
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <Text style={styles.infoLabel}>Minimum Withdraw</Text>
            <Text style={styles.infoValue}>₹100</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.withdrawBtn}>
          <Text style={styles.withdrawBtnText}>Withdraw Now</Text>
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  balanceCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#94A3B8',
    fontSize: 13,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  balanceSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  methodCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodCardActive: {
    borderColor: '#8B5CF6',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodIconWrapActive: {
    backgroundColor: '#8B5CF6',
  },
  methodTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  methodSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#8B5CF6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  inputCard: {
    backgroundColor: '#111C2B',
    borderRadius: 20,
    height: 72,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#FACC15',
    fontSize: 26,
    fontWeight: '900',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  amountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  amountChip: {
    backgroundColor: '#111C2B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  amountChipText: {
    color: '#fff',
    fontWeight: '700',
  },
  infoCard: {
    marginTop: 18,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
  },
  infoRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 13,
  },
  infoValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  withdrawBtn: {
    marginTop: 22,
    backgroundColor: '#FACC15',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '900',
  },
});