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

const faqData = [
  {
    id: '1',
    q: 'How do I upload a reel?',
    a: 'Go to the upload section, choose your video, add title and caption, then publish it.',
  },
  {
    id: '2',
    q: 'How can I withdraw wallet balance?',
    a: 'Open wallet, tap withdraw, select method, enter amount and confirm request.',
  },
  {
    id: '3',
    q: 'How are battle winners selected?',
    a: 'Winners are selected using engagement, quality score, and contest rule compliance.',
  },
  {
    id: '4',
    q: 'What should I do if OTP does not arrive?',
    a: 'Check mobile network, wait a bit, then retry. Also verify that the phone number is correct.',
  },
];

export default function HelpCenterScreen() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('1');

  const filtered = faqData.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help Center</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search help topics..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="help-circle-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSub}>
            Find answers to common questions and platform related help topics.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {filtered.map((item) => {
          const open = openId === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqCard}
              onPress={() => setOpenId(open ? null : item.id)}
            >
              <View style={styles.faqTop}>
                <Text style={styles.faqQuestion}>{item.q}</Text>
                <Ionicons
                  name={open ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#94A3B8"
                />
              </View>

              {open && <Text style={styles.faqAnswer}>{item.a}</Text>}
            </TouchableOpacity>
          );
        })}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactSub}>
            Contact support team for account, payment, and technical issues.
          </Text>

          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 8,
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
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
    fontSize: 21,
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
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#111C2B',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  faqTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    paddingRight: 12,
  },
  faqAnswer: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  contactCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
  },
  contactTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  contactSub: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  contactBtn: {
    marginTop: 16,
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  contactBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});