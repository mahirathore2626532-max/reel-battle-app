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

const reasons = [
  'Privacy concerns',
  'Too many notifications',
  'Not using the app',
  'Technical issues',
  'Found another platform',
  'Other',
];

export default function DeleteAccountScreen() {
  const [selectedReason, setSelectedReason] = useState('Not using the app');
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Delete Account</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.warningCard}>
          <View style={styles.warningIconWrap}>
            <Ionicons name="warning-outline" size={28} color="#EF4444" />
          </View>
          <Text style={styles.warningTitle}>This Action Is Permanent</Text>
          <Text style={styles.warningSub}>
            Deleting your account will remove your profile, reels, wallet access, rewards, and all
            associated activity permanently.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>What will be removed</Text>
        <View style={styles.infoCard}>
          {[
            'Your profile and account details',
            'Uploaded reels, comments, and likes',
            'Wallet and rewards data',
            'Followers, following, and contest history',
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Ionicons name="close-circle" size={18} color="#EF4444" />
              <Text style={styles.infoText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Reason for leaving</Text>
        <View style={styles.reasonWrap}>
          {reasons.map((item) => {
            const active = selectedReason === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.reasonChip, active && styles.reasonChipActive]}
                onPress={() => setSelectedReason(item)}
              >
                <Text style={[styles.reasonChipText, active && styles.reasonChipTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Additional Feedback</Text>
        <View style={styles.feedbackCard}>
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Tell us how we could improve..."
            placeholderTextColor="#94A3B8"
            style={styles.textArea}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Keep My Account</Text>
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
  warningCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
  },
  warningIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(239,68,68,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  warningTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
  },
  warningSub: {
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
  infoCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 10,
  },
  reasonWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reasonChip: {
    backgroundColor: '#111C2B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  reasonChipActive: {
    backgroundColor: '#EF4444',
  },
  reasonChipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  reasonChipTextActive: {
    color: '#fff',
  },
  feedbackCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: 'top',
    color: '#fff',
    fontSize: 14,
  },
  deleteBtn: {
    marginTop: 22,
    backgroundColor: '#EF4444',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  cancelBtn: {
    marginTop: 12,
    backgroundColor: '#1F2937',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});