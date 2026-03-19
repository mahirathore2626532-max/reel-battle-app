import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MediaPreview from '../components/MediaPreview';
import { supabase } from '../lib/supabase';

export default function ReelPlayer() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single();
      setPost(data);
    };
    loadPost();
  }, [id]);

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <MediaPreview url={post.media_url} type={post.media_type} />
          <Text style={styles.caption}>{post.caption}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 12 },
  caption: { color: '#fff', fontSize: 16, marginTop: 14 },
});