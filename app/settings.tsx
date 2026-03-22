import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
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

const settingGroups = [
  {
    title: 'Account',
    items: [
      { id: '1', title: 'Edit Profile', icon: 'person-outline' as const },
      { id: '2', title: 'Change Password', icon: 'lock-closed-outline' as const },
      { id: '3', title: 'Privacy Settings', icon: 'shield-checkmark-outline' as const },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: '4', title: 'Language', icon: 'language-outline' as const, value: 'English' },
      { id: '5', title: 'Theme', icon: 'moon-outline' as const, value: 'Dark' },
      { id: '6', title: 'Notification Sound', icon: 'volume-high-outline' as const, toggle: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: '7', title: 'Help Center', icon: 'help-circle-outline' as const },
      { id: '8', title: 'Terms & Conditions', icon: 'document-text-outline' as const },
      { id: '9', title: 'Logout', icon: 'log-out-outline' as const, danger: true },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={26} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Mahaveer Singh</Text>
            <Text style={styles.profileSub}>Manage your account and app preferences</Text>
          </View>
        </View>

        {settingGroups.map((group) => (
          <View key={group.title} style={styles.groupWrap}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            <View style={styles.groupCard}>
              {group.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.itemRow,
                    index !== group.items.length - 1 && styles.itemBorder,
                  ]}
                >
                  <View style={styles.itemLeft}>
                    <View style={styles.itemIconWrap}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={item.danger ? '#EF4444' : '#8B5CF6'}
                      />
                    </View>
                    <Text style={[styles.itemText, item.danger && styles.dangerText]}>
                      {item.title}
                    </Text>
                  </View>

                  {item.toggle ? (
                    <Switch value={true} />
                  ) : item.value ? (
                    <View style={styles.itemRight}>
                      <Text style={styles.itemValue}>{item.value}</Text>
                      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
  content: { paddingBottom: 30 },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#111C2B',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileName: { color: '#fff', fontSize: 17, fontWeight: '800' },
  profileSub: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  groupWrap: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  groupCard: {
    backgroundColor: '#111C2B',
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemRow: {
    minHeight: 62,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  dangerText: {
    color: '#EF4444',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    color: '#94A3B8',
    fontSize: 13,
    marginRight: 6,
  },
});