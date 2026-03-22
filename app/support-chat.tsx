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

const initialMessages = [
  {
    id: '1',
    text: 'Hello! Welcome to Reel Battle support. How can we help you today?',
    sender: 'support',
    time: '10:20 AM',
  },
  {
    id: '2',
    text: 'Mujhe wallet withdrawal status check karna hai.',
    sender: 'user',
    time: '10:21 AM',
  },
  {
    id: '3',
    text: 'Sure, please share your withdrawal request date or transaction ID.',
    sender: 'support',
    time: '10:22 AM',
  },
];

export default function SupportChatScreen() {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Support Chat</Text>
          <Text style={styles.headerSub}>Online now</Text>
        </View>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="call-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.dateChip}>
          <Text style={styles.dateChipText}>Today</Text>
        </View>

        {initialMessages.map((item) => {
          const isUser = item.sender === 'user';

          return (
            <View
              key={item.id}
              style={[styles.messageRow, isUser ? styles.userRow : styles.supportRow]}
            >
              <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.supportBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrap}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="attach-outline" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="happy-outline" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={18} color="#111827" />
        </TouchableOpacity>
      </View>
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
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#111C2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  headerSub: {
    color: '#22C55E',
    fontSize: 12,
    marginTop: 3,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
  dateChip: {
    alignSelf: 'center',
    backgroundColor: '#111C2B',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 16,
  },
  dateChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  supportRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  supportBubble: {
    backgroundColor: '#111C2B',
    borderTopLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: '#8B5CF6',
    borderTopRightRadius: 6,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    height: 56,
    backgroundColor: '#111C2B',
    borderRadius: 18,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 6,
  },
  sendBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
  },
});