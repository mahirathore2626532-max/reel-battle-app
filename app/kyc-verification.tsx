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

const documentTypes = ['Aadhaar Card', 'PAN Card', 'Driving License'];

export default function KycVerificationScreen() {
  const [fullName, setFullName] = useState('Mahaveer Singh');
  const [documentNumber, setDocumentNumber] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('Aadhaar Card');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>KYC Verification</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topCard}>
          <View style={styles.topIconWrap}>
            <Ionicons name="id-card-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.topTitle}>Verify Your Identity</Text>
          <Text style={styles.topSub}>
            Complete KYC to unlock secure withdrawals and full wallet access.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Verification Progress</Text>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressSub}>Step 1 of 3 completed</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Document Type</Text>
          <View style={styles.docWrap}>
            {documentTypes.map((item) => {
              const active = selectedDoc === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.docChip, active && styles.docChipActive]}
                  onPress={() => setSelectedDoc(item)}
                >
                  <Text style={[styles.docChipText, active && styles.docChipTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Document Number</Text>
          <TextInput
            value={documentNumber}
            onChangeText={setDocumentNumber}
            placeholder="Enter document number"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        <View style={styles.uploadCard}>
          <Text style={styles.uploadTitle}>Upload Documents</Text>
          <Text style={styles.uploadSub}>Front and back image should be clear and readable</Text>

          <TouchableOpacity style={styles.uploadBtn}>
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.uploadBtnText}>Upload Front Side</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBtnSecondary}>
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.uploadBtnText}>Upload Back Side</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Submit Verification</Text>
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  topCard: {
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
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
  topTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '900',
  },
  topSub: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  progressCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#22C55E',
  },
  progressSub: {
    color: '#94A3B8',
    fontSize: 12,
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
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    color: '#fff',
    fontSize: 14,
  },
  docWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  docChip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  docChipActive: {
    backgroundColor: '#8B5CF6',
  },
  docChipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  docChipTextActive: {
    color: '#fff',
  },
  uploadCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
  },
  uploadTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  uploadSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
  },
  uploadBtn: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  uploadBtnSecondary: {
    marginTop: 12,
    width: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
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