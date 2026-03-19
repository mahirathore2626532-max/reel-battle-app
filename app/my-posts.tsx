import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  const loadPosts = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (!userId) return;

    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .neq('deleted', true)
      .order('created_at', { ascending: false });

    setPosts(data || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Posts</Text>

      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <PostCard item={item} showDelete onRefresh={loadPosts} />
        )}
        ListEmptyComponent={<Text>No posts yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});