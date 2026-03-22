import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SecurityScreen() {
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [deviceVerification, setDeviceVerification] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Security</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topCard}>
          <View style={styles.topIconWrap}>
            <Ionicons name="shield-half-outline" size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.topTitle}>Protect Your Account</Text>
          <Text style={styles.topSub}>
            Manage verification, login protection, and account safety tools.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Security Options</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Biometric Login</Text>
              <Text style={styles.settingSub}>Use fingerprint or face unlock to sign in</Text>
            </View>
            <Switch value={biometricLogin} onValueChange={setBiometricLogin} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
              <Text style={styles.settingSub}>Add an extra verification step while logging in</Text>
            </View>
            <Switch value={twoFactorAuth} onValueChange={setTwoFactorAuth} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Login Alerts</Text>
              <Text style={styles.settingSub}>Get notified for new login attempts</Text>
            </View>
            <Switch value={loginAlerts} onValueChange={setLoginAlerts} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Device Verification</Text>
              <Text style={styles.settingSub}>Verify unknown devices before access is granted</Text>
            </View>
            <Switch value={deviceVerification} onValueChange={setDeviceVerification} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Security Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <Ionicons name="phone-portrait-outline" size={18} color="#22C55E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Login from Android Device</Text>
              <Text style={styles.activitySub}>Today, 10:42 AM • Jodhpur, India</Text>
            </View>
          </View>

          <View style={styles.activityDivider} />

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <Ionicons name="desktop-outline" size={18} color="#FACC15" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Password Changed</Text>
              <Text style={styles.activitySub}>Yesterday, 08:15 PM • Verified device</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Review Devices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Run Security Check</Text>
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
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    overflow: 'hidden',
  },
  settingRow: {
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flex: 1,
    paddingRight: 14,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  settingSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 16,
  },
  activityCard: {
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  activitySub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  activityDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 14,
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