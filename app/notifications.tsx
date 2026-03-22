import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const notificationsData = [
  {
    id: '1',
    title: 'Battle result announced',
    message: 'Your reel ranked #2 in today’s dance challenge.',
    time: '2m ago',
    type: 'success',
    icon: 'trophy-outline' as const,
    unread: true,
  },
  {
    id: '2',
    title: 'New comment received',
    message: 'Anjali commented on your post: “Lighting next level 🔥”',
    time: '10m ago',
    type: 'comment',
    icon: 'chatbubble-ellipses-outline' as const,
    unread: true,
  },
  {
    id: '3',
    title: 'Wallet credited',
    message: '₹500 added to your wallet from contest winnings.',
    time: '1h ago',
    type: 'wallet',
    icon: 'wallet-outline' as const,
    unread: false,
  },
  {
    id: '4',
    title: 'Profile reached new milestone',
    message: 'Congratulations! You crossed 10K profile visits.',
    time: '3h ago',
    type: 'milestone',
    icon: 'sparkles-outline' as const,
    unread: false,
  },
  {
    id: '5',
    title: 'Challenge reminder',
    message: 'Upload your reel before 9 PM to join today’s battle.',
    time: 'Yesterday',
    type: 'reminder',
    icon: 'alarm-outline' as const,
    unread: false,
  },
];

export default function NotificationsScreen() {
  const [selectedTab, setSelectedTab] = useState<'All' | 'Unread'>('All');

  const filtered = notificationsData.filter((item) =>
    selectedTab === 'All' ? true : item.unread
  );

  const getIconBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'rgba(34,197,94,0.15)';
      case 'comment':
        return 'rgba(56,189,248,0.15)';
      case 'wallet':
        return 'rgba(250,204,21,0.15)';
      case 'milestone':
        return 'rgba(124,58,237,0.15)';
      default:
        return 'rgba(148,163,184,0.15)';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#22C55E';
      case 'comment':
        return '#38BDF8';
      case 'wallet':
        return '#FACC15';
      case 'milestone':
        return '#8B5CF6';
      default:
        return '#CBD5E1';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="checkmark-done-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topCard}>
        <View style={styles.topLeft}>
          <View style={styles.bellBox}>
            <Ionicons name="notifications-outline" size={22} color="#8B5CF6" />
          </View>
          <View>
            <Text style={styles.topTitle}>Stay Updated</Text>
            <Text style={styles.topSub}>2 unread notifications</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabRow}>
        {(['All', 'Unread'] as const).map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filtered.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: getIconBg(item.type) }]}>
              <Ionicons name={item.icon} size={22} color={getIconColor(item.type)} />
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08111F' },
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
  topCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
  },
  topLeft: { flexDirection: 'row', alignItems: 'center' },
  bellBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(124,58,237,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  topSub: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: '#111C2B',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#7C3AED',
  },
  tabText: { color: '#CBD5E1', fontWeight: '700' },
  tabTextActive: { color: '#fff' },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardBody: { flex: 1 },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '800', flex: 1, paddingRight: 8 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  cardMessage: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  cardTime: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 8,
  },
});