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

export default function NotificationsSettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [battleAlerts, setBattleAlerts] = useState(true);
  const [commentAlerts, setCommentAlerts] = useState(true);
  const [likeAlerts, setLikeAlerts] = useState(true);
  const [walletAlerts, setWalletAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notification Settings</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topCard}>
          <View style={styles.topIconWrap}>
            <Ionicons name="notifications-outline" size={26} color="#8B5CF6" />
          </View>
          <Text style={styles.topTitle}>Control Your Alerts</Text>
          <Text style={styles.topSub}>
            Choose which updates you want to receive from the app.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Delivery Methods</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSub}>Receive app alerts on your device</Text>
            </View>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Email Notifications</Text>
              <Text style={styles.settingSub}>Get updates on your email address</Text>
            </View>
            <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>SMS Notifications</Text>
              <Text style={styles.settingSub}>Receive important alerts by SMS</Text>
            </View>
            <Switch value={smsEnabled} onValueChange={setSmsEnabled} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Activity Alerts</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Battle Updates</Text>
              <Text style={styles.settingSub}>Contest results, rank changes, and reminders</Text>
            </View>
            <Switch value={battleAlerts} onValueChange={setBattleAlerts} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Comments</Text>
              <Text style={styles.settingSub}>New comments on your reels and replies</Text>
            </View>
            <Switch value={commentAlerts} onValueChange={setCommentAlerts} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Likes & Reactions</Text>
              <Text style={styles.settingSub}>Likes and reactions on your content</Text>
            </View>
            <Switch value={likeAlerts} onValueChange={setLikeAlerts} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Wallet & Payments</Text>
              <Text style={styles.settingSub}>Recharge, withdraw, and reward updates</Text>
            </View>
            <Switch value={walletAlerts} onValueChange={setWalletAlerts} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Promotions & Offers</Text>
              <Text style={styles.settingSub}>Special campaigns, offers, and announcements</Text>
            </View>
            <Switch value={promoAlerts} onValueChange={setPromoAlerts} />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Notification Settings</Text>
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
  headerTitle: { color: '#fff', fontSize: 19, fontWeight: '800' },
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
  saveBtn: {
    marginTop: 22,
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