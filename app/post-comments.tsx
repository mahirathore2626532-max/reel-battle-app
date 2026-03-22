import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const commentsData = [
  {
    id: '1',
    user: '@anjali_editz',
    name: 'Anjali',
    text: 'Lighting and transitions are next level 🔥',
    time: '2m ago',
    likes: 24,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    user: '@harry_beats',
    name: 'Harry',
    text: 'Beat sync bahut mast hai bro 👏',
    time: '9m ago',
    likes: 15,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    user: '@studio_vibe',
    name: 'Studio Vibe',
    text: 'Camera movement smooth hai. Kis device pe shoot kiya?',
    time: '18m ago',
    likes: 8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    user: '@neha.creates',
    name: 'Neha',
    text: 'Costume colors and frame composition dono perfect lag rahe hain ✨',
    time: '34m ago',
    likes: 11,
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop',
  },
];

export default function PostCommentsScreen() {
  const params = useLocalSearchParams();
  const [comment, setComment] = useState('');

  const postTitle = useMemo(() => {
    return typeof params.title === 'string' ? params.title : 'Epic Dance Battle';
  }, [params.title]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text style={styles.headerTitle}>Comments</Text>
          <Text style={styles.headerSub} numberOfLines={1}>
            {postTitle}
          </Text>
        </View>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="filter-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.highlightCard}>
        <View style={styles.highlightLeft}>
          <Ionicons name="chatbubbles-outline" size={22} color="#7C3AED" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.highlightTitle}>1,284 Comments</Text>
            <Text style={styles.highlightSub}>Most reactions in last 24 hours</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {commentsData.map((item) => (
          <View key={item.id} style={styles.commentCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.commentBody}>
              <View style={styles.commentTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.username}>{item.user}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                <TouchableOpacity style={styles.likeChip}>
                  <Ionicons name="heart-outline" size={14} color="#fff" />
                  <Text style={styles.likeChipText}>{item.likes}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.commentText}>{item.text}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionMiniBtn}>
                  <Ionicons name="chatbubble-outline" size={16} color="#CBD5E1" />
                  <Text style={styles.actionMiniText}>Reply</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionMiniBtn}>
                  <Ionicons name="heart-outline" size={16} color="#CBD5E1" />
                  <Text style={styles.actionMiniText}>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionMiniBtn}>
                  <Ionicons name="flag-outline" size={16} color="#CBD5E1" />
                  <Text style={styles.actionMiniText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputWrap}>
        <View style={styles.inputBox}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Write a comment..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
          <TouchableOpacity style={styles.emojiBtn}>
            <Ionicons name="happy-outline" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
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
    backgroundColor: '#121826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
  },
  headerSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  highlightCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#121826',
    borderRadius: 18,
    padding: 14,
  },
  highlightLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  highlightSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 110,
  },
  commentCard: {
    flexDirection: 'row',
    backgroundColor: '#121826',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  commentBody: {
    flex: 1,
  },
  commentTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  time: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 3,
  },
  likeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 5,
  },
  likeChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  commentText: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 10,
  },
  actionMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1F2937',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionMiniText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  inputWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#121826',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  emojiBtn: {
    marginLeft: 8,
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