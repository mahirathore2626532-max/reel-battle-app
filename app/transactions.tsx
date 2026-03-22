import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
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

const transactionsData = [
  { id: '1', type: 'credit', title: 'Contest Winning', amount: '+₹500', date: 'Today, 10:24 AM', icon: 'trophy-outline' as const },
  { id: '2', type: 'debit', title: 'Entry Fee', amount: '-₹99', date: 'Today, 09:10 AM', icon: 'ticket-outline' as const },
  { id: '3', type: 'credit', title: 'Referral Bonus', amount: '+₹120', date: 'Yesterday, 08:45 PM', icon: 'gift-outline' as const },
  { id: '4', type: 'debit', title: 'Withdrawal', amount: '-₹1,000', date: 'Yesterday, 05:12 PM', icon: 'card-outline' as const },
  { id: '5', type: 'credit', title: 'Wallet Top-up', amount: '+₹2,000', date: '18 Mar, 11:20 AM', icon: 'add-circle-outline' as const },
  { id: '6', type: 'debit', title: 'Battle Join', amount: '-₹49', date: '17 Mar, 07:35 PM', icon: 'flash-outline' as const },
];

const filters = ['All', 'Credit', 'Debit'];

export default function TransactionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    return transactionsData.filter((item) => {
      const matchesFilter =
        selectedFilter === 'All' ||
        item.type.toLowerCase() === selectedFilter.toLowerCase();

      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Transactions</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="download-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>This Month</Text>
          <Text style={styles.summaryValue}>₹3,021</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Entries</Text>
          <Text style={styles.summaryValue}>26</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" />
        <TextInput
          placeholder="Search transaction..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterRow}>
        {filters.map((filter) => {
          const active = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, active && styles.activeChip]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, active && styles.activeChipText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => {
          const isCredit = item.type === 'credit';

          return (
            <TouchableOpacity key={item.id} style={styles.transactionCard}>
              <View style={[styles.transactionIcon, isCredit ? styles.creditBg : styles.debitBg]}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isCredit ? '#22C55E' : '#F97316'}
                />
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>

              <Text style={[styles.transactionAmount, isCredit ? styles.creditText : styles.debitText]}>
                {item.amount}
              </Text>
            </TouchableOpacity>
          );
        })}

        {filteredData.length === 0 && (
          <View style={styles.emptyWrap}>
            <Ionicons name="document-text-outline" size={42} color="#64748B" />
            <Text style={styles.emptyTitle}>No transactions found</Text>
            <Text style={styles.emptySub}>Try changing filter or search keyword</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081018',
  },
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 6,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#111C2B',
  },
  activeChip: {
    backgroundColor: '#7C3AED',
  },
  filterText: {
    color: '#CBD5E1',
    fontWeight: '700',
    fontSize: 13,
  },
  activeChipText: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  transactionCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditBg: {
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  debitBg: {
    backgroundColor: 'rgba(249,115,22,0.12)',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  transactionDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '800',
  },
  creditText: {
    color: '#22C55E',
  },
  debitText: {
    color: '#F97316',
  },
  emptyWrap: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  emptySub: {
    marginTop: 6,
    color: '#94A3B8',
    fontSize: 13,
  },
});