import { router } from 'expo-router';
import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNotification } from '../lib/notifications';
import { supabase } from '../lib/supabase';
import MediaPreview from './MediaPreview';

export default function PostCard({
  item,
  likeCount = 0,
  commentCount = 0,
  saveCount = 0,
  onRefresh,
  showDelete = false,
}: any) {
  const getUserId = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.user?.id;
  };

  const likePost = async () => {
    const userId = await getUserId();
    if (!userId) return;

    const { data: existing } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', item.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      await supabase.from('likes').delete().eq('id', existing.id);
    } else {
      await supabase.from('likes').insert({ post_id: item.id, user_id: userId });

      if (item.user_id && item.user_id !== userId) {
        await createNotification(
          item.user_id,
          'New Like',
          'Someone liked your post',
          'like'
        );
      }
    }

    onRefresh?.();
  };

  const savePost = async () => {
    const userId = await getUserId();
    if (!userId) return;

    const { data: existing } = await supabase
      .from('saved_posts')
      .select('*')
      .eq('post_id', item.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      await supabase.from('saved_posts').delete().eq('id', existing.id);
    } else {
      await supabase.from('saved_posts').insert({ post_id: item.id, user_id: userId });
    }

    onRefresh?.();
  };

  const sharePost = async () => {
    await Share.share({ message: item.media_url });
  };

  const deletePost = async () => {
    const { error } = await supabase.from('posts').update({ deleted: true }).eq('id', item.id);
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Deleted');
    onRefresh?.();
  };

  const reportPost = async () => {
    const userId = await getUserId();
    if (!userId) return;

    await supabase.from('reports').insert({
      reporter_id: userId,
      target_user_id: item.user_id,
      post_id: item.id,
      reason: 'Inappropriate content',
    });

    Alert.alert('Reported');
  };

  const blockUser = async () => {
    const userId = await getUserId();
    if (!userId) return;

    await supabase.from('blocked_users').upsert({
      user_id: userId,
      blocked_user_id: item.user_id,
    });

    Alert.alert('User blocked');
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push(`/creator-profile?id=${item.user_id}`)}>
        <Text style={styles.owner}>Open Creator Profile</Text>
      </TouchableOpacity>

      <Text style={styles.caption}>{item.caption || 'No caption'}</Text>
      <MediaPreview url={item.media_url} type={item.media_type} />

      <View style={styles.row}>
        <Text>❤️ {likeCount}</Text>
        <Text>💬 {commentCount}</Text>
        <Text>🔖 {saveCount}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={likePost}>
        <Text style={styles.btnText}>Like / Unlike</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={savePost}>
        <Text style={styles.btnText}>Save / Unsave</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={sharePost}>
        <Text style={styles.btnText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push(`/post-detail?id=${item.id}`)}>
        <Text style={styles.btnText}>Comments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push(`/edit-post?id=${item.id}`)}>
        <Text style={styles.btnText}>Edit Post</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={reportPost}>
        <Text style={styles.btnText}>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={blockUser}>
        <Text style={styles.btnText}>Block User</Text>
      </TouchableOpacity>

      {showDelete ? (
        <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={deletePost}>
          <Text style={styles.btnText}>Delete Post</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginBottom: 12 },
  owner: { fontWeight: 'bold', marginBottom: 8, color: '#111' },
  caption: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  btn: { backgroundColor: '#111', padding: 10, borderRadius: 8, marginTop: 8 },
  deleteBtn: { backgroundColor: 'crimson' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});