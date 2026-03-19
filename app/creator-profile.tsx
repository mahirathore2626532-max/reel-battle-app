import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';

export default function CreatorProfile() {
  const { id } = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const loadData = async () => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', id)
      .neq('deleted', true)
      .order('created_at', { ascending: false });

    setProfile(profileData || null);
    setPosts(postData || []);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  return (
    <View style={styles.container}>
      {profile?.avatar_url ? (
        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
      ) : null}

      <Text style={styles.name}>
        {profile?.full_name || profile?.username || 'Creator'}
      </Text>
      <Text style={styles.bio}>{profile?.bio || 'No bio'}</Text>

      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <PostCard item={item} onRefresh={loadData} />}
        ListEmptyComponent={<Text>No posts found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatar: { width: 90, height: 90, borderRadius: 45, alignSelf: 'center', marginBottom: 12 },
  name: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  bio: { textAlign: 'center', marginBottom: 16, marginTop: 4 },
});