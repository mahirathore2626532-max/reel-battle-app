import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const methods = [
  {
    id: '1',
    title: 'UPI',
    subtitle: 'Pay instantly with any UPI app',
    icon: 'phone-portrait-outline' as const,
  },
  {
    id: '2',
    title: 'Debit / Credit Card',
    subtitle: 'Visa, Mastercard, RuPay supported',
    icon: 'card-outline' as const,
  },
  {
    id: '3',
    title: 'Net Banking',
    subtitle: 'All major Indian banks supported',
    icon: 'business-outline' as const,
  },
  {
    id: '4',
    title: 'Wallets',
    subtitle: 'Paytm, PhonePe and other wallets',
    icon: 'wallet-outline' as const,
  },
];

export default function PaymentMethodsScreen() {
  const [selectedMethod, setSelectedMethod] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Payment Methods</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topCard}>
          <View style={styles.topIconWrap}>
            <Ionicons name="card-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.topTitle}>Choose Payment Method</Text>
          <Text style={styles.topSub}>Recharge Amount: ₹500</Text>
        </View>

        {methods.map((item) => {
          const active = selectedMethod === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.methodCard, active && styles.methodCardActive]}
              onPress={() => setSelectedMethod(item.id)}
            >
              <View style={styles.methodLeft}>
                <View style={[styles.methodIconWrap, active && styles.methodIconActive]}>
                  <Ionicons name={item.icon} size={22} color={active ? '#fff' : '#8B5CF6'} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.methodTitle}>{item.title}</Text>
                  <Text style={styles.methodSub}>{item.subtitle}</Text>
                </View>
              </View>

              <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                {active && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="lock-closed-outline" size={16} color="#22C55E" />
            <Text style={styles.infoText}>100% secure payments</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="flash-outline" size={16} color="#FACC15" />
            <Text style={styles.infoText}>Instant wallet top up after payment</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/withdraw-success')}>
          <Text style={styles.primaryBtnText}>Proceed to Pay</Text>
        </TouchableOpacity>
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
  content: { paddingHorizontal: 16, paddingBottom: 30 },
  topCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
  },
  topIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  topTitle: { color: '#fff', fontSize: 21, fontWeight: '900' },
  topSub: { color: '#94A3B8', fontSize: 13, marginTop: 8 },
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
    flex: 1,
    paddingRight: 10,
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
  methodIconActive: {
    backgroundColor: '#8B5CF6',
  },
  methodTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  methodSub: {
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
  infoCard: {
    marginTop: 10,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginLeft: 10,
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