import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { subscribeToPosts, unsubscribeChannel } from '../lib/realtime';
import { supabase } from '../lib/supabase';
import { sortPostsByTrending } from '../lib/trending';

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [likesMap, setLikesMap] = useState<any>({});
  const [commentsMap, setCommentsMap] = useState<any>({});
  const [savesMap, setSavesMap] = useState<any>({});

  const loadFeed = async () => {
    const { data: postData } = await supabase.from('posts').select('*').neq('deleted', true);
    const { data: likesData } = await supabase.from('likes').select('*');
    const { data: commentsData } = await supabase.from('comments').select('*');
    const { data: savesData } = await supabase.from('saved_posts').select('*');

    const lMap: any = {};
    const cMap: any = {};
    const sMap: any = {};

    (likesData || []).forEach((item: any) => {
      lMap[item.post_id] = (lMap[item.post_id] || 0) + 1;
    });
    (commentsData || []).forEach((item: any) => {
      cMap[item.post_id] = (cMap[item.post_id] || 0) + 1;
    });
    (savesData || []).forEach((item: any) => {
      sMap[item.post_id] = (sMap[item.post_id] || 0) + 1;
    });

    setLikesMap(lMap);
    setCommentsMap(cMap);
    setSavesMap(sMap);
    setPosts(sortPostsByTrending(postData || [], lMap, cMap, sMap));
  };

  useEffect(() => {
    loadFeed();
    const channel = subscribeToPosts(loadFeed);
    return () => unsubscribeChannel(channel);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <PostCard
            item={item}
            likeCount={likesMap[item.id] || 0}
            commentCount={commentsMap[item.id] || 0}
            saveCount={savesMap[item.id] || 0}
            onRefresh={loadFeed}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});