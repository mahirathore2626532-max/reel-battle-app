import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';

export default function SavedPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  const loadSaved = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data: saved } = await supabase
      .from('saved_posts')
      .select('*')
      .eq('user_id', userId);

    const ids = (saved || []).map((s: any) => s.post_id);

    if (!ids.length) {
      setPosts([]);
      return;
    }

    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .in('id', ids);

    setPosts(postData || []);
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Posts</Text>

      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <PostCard item={item} onRefresh={loadSaved} />}
        ListEmptyComponent={<Text>No saved posts</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});