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

export default function PrivacySettingsScreen() {
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [allowTags, setAllowTags] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09111F" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Privacy Settings</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topCard}>
          <View style={styles.topIconWrap}>
            <Ionicons name="shield-checkmark-outline" size={26} color="#8B5CF6" />
          </View>
          <Text style={styles.topTitle}>Control Your Privacy</Text>
          <Text style={styles.topSub}>
            Choose how others can see your account, activity, and content.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Account Privacy</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Private Account</Text>
              <Text style={styles.settingSub}>Only approved followers can see your posts</Text>
            </View>
            <Switch value={privateAccount} onValueChange={setPrivateAccount} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Show Activity Status</Text>
              <Text style={styles.settingSub}>Let others know when you are active</Text>
            </View>
            <Switch value={showActivity} onValueChange={setShowActivity} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Show Online Status</Text>
              <Text style={styles.settingSub}>Display your online presence to followers</Text>
            </View>
            <Switch value={showOnlineStatus} onValueChange={setShowOnlineStatus} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Content Controls</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Allow Comments</Text>
              <Text style={styles.settingSub}>Enable users to comment on your reels</Text>
            </View>
            <Switch value={allowComments} onValueChange={setAllowComments} />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Allow Tags & Mentions</Text>
              <Text style={styles.settingSub}>Others can tag or mention your account</Text>
            </View>
            <Switch value={allowTags} onValueChange={setAllowTags} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ad Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Personalized Ads</Text>
              <Text style={styles.settingSub}>Show ads based on your interests and activity</Text>
            </View>
            <Switch value={personalizedAds} onValueChange={setPersonalizedAds} />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Privacy Settings</Text>
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