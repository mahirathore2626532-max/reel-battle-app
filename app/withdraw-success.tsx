import React from 'react';
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

export default function WithdrawSuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successWrap}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={42} color="#fff" />
          </View>

          <Text style={styles.successTitle}>Request Successful</Text>
          <Text style={styles.successSub}>
            Your transaction has been submitted successfully. Amount will reflect shortly.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Transaction Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>₹500</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Method</Text>
            <Text style={styles.value}>UPI</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>TXN45872109</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.successValue}>Processing</Text>
          </View>

          <View style={[styles.row, { marginBottom: 0 }]}>
            <Text style={styles.label}>Expected Time</Text>
            <Text style={styles.value}>Within 24 hrs</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={20} color="#38BDF8" />
          <Text style={styles.noteText}>
            You can track this payment from transactions history or wallet section.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/transactions')}>
          <Text style={styles.primaryBtnText}>View Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.secondaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09111F' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 30,
  },
  successWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  successTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
  },
  successSub: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 18,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 16,
  },
  row: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
  },
  value: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  successValue: {
    color: '#22C55E',
    fontSize: 13,
    fontWeight: '800',
  },
  noteCard: {
    marginTop: 16,
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
  primaryBtn: {
    marginTop: 22,
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryBtn: {
    marginTop: 12,
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});