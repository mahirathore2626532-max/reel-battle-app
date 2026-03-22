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

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordChecks = [
    { id: '1', label: 'At least 8 characters', ok: newPassword.length >= 8 },
    { id: '2', label: 'Contains one uppercase letter', ok: /[A-Z]/.test(newPassword) },
    { id: '3', label: 'Contains one number', ok: /[0-9]/.test(newPassword) },
    { id: '4', label: 'Passwords match', ok: newPassword.length > 0 && newPassword === confirmPassword },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Change Password</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="lock-closed-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.heroTitle}>Keep Your Account Secure</Text>
          <Text style={styles.heroSub}>
            Update your password regularly to protect your account and wallet.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showCurrent}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Ionicons
                name={showCurrent ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showNew}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons
                name={showNew ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter new password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirm}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checksCard}>
          <Text style={styles.sectionTitle}>Password Requirements</Text>

          {passwordChecks.map((item) => (
            <View key={item.id} style={styles.checkRow}>
              <Ionicons
                name={item.ok ? 'checkmark-circle' : 'ellipse-outline'}
                size={18}
                color={item.ok ? '#22C55E' : '#64748B'}
              />
              <Text style={[styles.checkText, item.ok && styles.checkTextActive]}>{item.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Update Password</Text>
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
  inputWrap: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    paddingRight: 10,
  },
  checksCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkText: {
    color: '#94A3B8',
    fontSize: 13,
    marginLeft: 10,
  },
  checkTextActive: {
    color: '#E2E8F0',
  },
  saveBtn: {
    marginTop: 18,
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
});