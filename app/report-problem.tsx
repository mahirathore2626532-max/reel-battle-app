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

const categories = [
  'Login Issue',
  'OTP Problem',
  'Wallet Issue',
  'Upload Error',
  'App Crash',
  'Other',
];

export default function ReportProblemScreen() {
  const [selectedCategory, setSelectedCategory] = useState('OTP Problem');
  const [subject, setSubject] = useState('OTP not received');
  const [description, setDescription] = useState(
    'I am trying to log in but OTP is not arriving on my phone number.'
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Report Problem</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="warning-outline" size={28} color="#FACC15" />
          </View>
          <Text style={styles.heroTitle}>Tell Us What Went Wrong</Text>
          <Text style={styles.heroSub}>
            Share issue details so our team can review and help resolve it faster.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Problem Category</Text>
          <View style={styles.chipWrap}>
            {categories.map((item) => {
              const active = selectedCategory === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Subject</Text>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter issue subject"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Describe the Problem</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Explain your issue in detail"
            placeholderTextColor="#94A3B8"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.attachCard}>
          <Text style={styles.attachTitle}>Attachments</Text>
          <Text style={styles.attachSub}>Add screenshot or related file for better support</Text>

          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.attachBtnText}>Upload Screenshot</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Submit Report</Text>
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
  heroCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(250,204,21,0.12)',
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
  formCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#8B5CF6',
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    color: '#fff',
    fontSize: 14,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  attachCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
  },
  attachTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  attachSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
  },
  attachBtn: {
    marginTop: 14,
    backgroundColor: '#1F2937',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attachBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  submitBtn: {
    marginTop: 18,
    backgroundColor: '#FACC15',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '900',
  },
});