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

const friends = [
  {
    id: '1',
    name: 'Anjali Verma',
    phone: '+91 98xxxx1234',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Harry Beats',
    phone: '+91 97xxxx5521',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Neha Sharma',
    phone: '+91 96xxxx4432',
    avatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
  },
];

export default function InviteFriendsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Invite Friends</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="paper-plane-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="people-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.heroTitle}>Bring Friends to Reel Battle</Text>
          <Text style={styles.heroSub}>
            Invite your friends and grow faster together on the platform.
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Your Invite Code</Text>
            <Text style={styles.codeValue}>MAHAVEER2026</Text>
          </View>

          <View style={styles.shareRow}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Share Invite Link</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="copy-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Suggested Friends</Text>

        {friends.map((item) => (
          <TouchableOpacity key={item.id} style={styles.friendCard}>
            <View style={styles.friendLeft}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendPhone}>{item.phone}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>Invite</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={20} color="#FACC15" />
          <Text style={styles.tipText}>
            Invite more friends to unlock bonus rewards and platform perks.
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
  heroIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(139,92,246,0.14)',
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
  codeBox: {
    marginTop: 18,
    width: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  codeLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  codeValue: {
    color: '#FACC15',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
    letterSpacing: 1,
  },
  shareRow: {
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
  friendCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  friendName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  friendPhone: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  inviteBtn: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  inviteBtnText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '900',
  },
  tipCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 10,
  },
});