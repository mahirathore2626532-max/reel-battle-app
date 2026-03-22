import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PostDetailScreen() {
  const params = useLocalSearchParams();
  const [liked, setLiked] = useState(false);

  const title = typeof params.title === 'string' ? params.title : 'Epic Dance Battle';
  const username = typeof params.username === 'string' ? params.username : '@creator_raj';
  const likes = typeof params.likes === 'string' ? params.likes : '24.8K';
  const comments = typeof params.comments === 'string' ? params.comments : '1.2K';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.centerTitleWrap}>
          <Text style={styles.topTitle}>Post Detail</Text>
        </View>

        <TouchableOpacity style={styles.topBtn}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.videoCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop' }}
            style={styles.coverImage}
          />

          <View style={styles.overlayTop}>
            <View style={styles.tag}>
              <Ionicons name="play-circle" size={15} color="#fff" />
              <Text style={styles.tagText}>Trending Reel</Text>
            </View>
          </View>

          <View style={styles.overlayBottom}>
            <View style={styles.creatorRow}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' }}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.followers}>12.4K followers</Text>
              </View>
              <TouchableOpacity style={styles.followBtn}>
                <Text style={styles.followBtnText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.metaCard}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postDesc}>
            Full energy performance, clean transitions, smooth beat sync and strong audience vibe.
            This clip is performing really well in today’s challenge feed.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="heart" size={16} color="#EF4444" />
              <Text style={styles.statText}>{likes}</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#38BDF8" />
              <Text style={styles.statText}>{comments}</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="eye" size={16} color="#FACC15" />
              <Text style={styles.statText}>98.3K</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, liked && styles.likedBtn]}
            onPress={() => setLiked(!liked)}
          >
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color="#fff" />
            <Text style={styles.actionBtnText}>{liked ? 'Liked' : 'Like'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/post-comments')}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Performance Insight</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>89%</Text>
            <Text style={styles.insightLabel}>Watch Retention</Text>
          </View>
          <View style={styles.insightDivider} />
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>6.8%</Text>
            <Text style={styles.insightLabel}>Engagement Rate</Text>
          </View>
          <View style={styles.insightDivider} />
          <View style={styles.insightItem}>
            <Text style={styles.insightValue}>#3</Text>
            <Text style={styles.insightLabel}>Today Rank</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top Comments Preview</Text>
        <View style={styles.commentPreviewCard}>
          <View style={styles.commentPreviewRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' }}
              style={styles.smallAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.commentUser}>@anjali_editz</Text>
              <Text style={styles.commentText}>Lighting and transitions are next level 🔥</Text>
            </View>
          </View>

          <View style={styles.commentPreviewRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' }}
              style={styles.smallAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.commentUser}>@harry_beats</Text>
              <Text style={styles.commentText}>Beat sync bahut mast hai bro 👏</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => router.push('/post-comments')}
          >
            <Text style={styles.viewAllText}>View All Comments</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  topTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  content: {
    paddingBottom: 30,
  },
  videoCard: {
    marginHorizontal: 16,
    marginTop: 6,
    height: 430,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#111827',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlayTop: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  tag: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  followers: {
    color: '#E2E8F0',
    fontSize: 12,
    marginTop: 4,
  },
  followBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  followBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  metaCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 16,
  },
  postTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  postDesc: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
  },
  statText: {
    color: '#fff',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likedBtn: {
    backgroundColor: '#BE123C',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
  insightCard: {
    marginHorizontal: 16,
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
  },
  insightItem: {
    flex: 1,
    alignItems: 'center',
  },
  insightValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  insightLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 6,
  },
  insightDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  commentPreviewCard: {
    marginHorizontal: 16,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
  },
  commentPreviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  smallAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  commentUser: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  commentText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 20,
  },
  viewAllBtn: {
    marginTop: 4,
    backgroundColor: '#1F2937',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#fff',
    fontWeight: '800',
  },
});