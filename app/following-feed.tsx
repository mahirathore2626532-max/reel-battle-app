import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';

export default function FollowingFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  const loadFeed = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data: follows } = await supabase
      .from('follows')
      .select('*')
      .eq('follower_id', userId);

    const ids = (follows || []).map((f: any) => f.following_id);

    if (!ids.length) {
      setPosts([]);
      return;
    }

    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .in('user_id', ids)
      .neq('deleted', true)
      .order('created_at', { ascending: false });

    setPosts(postData || []);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Following Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <PostCard item={item} onRefresh={loadFeed} />}
        ListEmptyComponent={<Text>No posts from followed creators</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});