import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);
  const [battles, setBattles] = useState<any[]>([]);

  const searchAll = async (q: string) => {
    setQuery(q);

    if (!q.trim()) {
      setPosts([]);
      setCreators([]);
      setBattles([]);
      return;
    }

    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .ilike('caption', `%${q}%`)
      .neq('deleted', true)
      .limit(10);

    const { data: creatorData } = await supabase
      .from('profiles')
      .select('*')
      .or(`full_name.ilike.%${q}%,username.ilike.%${q}%`)
      .limit(10);

    const { data: battleData } = await supabase
      .from('battles')
      .select('*')
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
      .limit(10);

    setPosts(postData || []);
    setCreators(creatorData || []);
    setBattles(battleData || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Search posts, creators, battles"
        value={query}
        onChangeText={searchAll}
      />

      <Text style={styles.section}>Creators</Text>
      <FlatList
        data={creators}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/creator-profile?id=${item.id}`)}>
            <Text>{item.full_name || item.username || item.phone}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.section}>Battles</Text>
      <FlatList
        data={battles}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/battle-detail?id=${item.id}`)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.section}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/post-detail?id=${item.id}`)}>
            <Text>{item.caption || 'Untitled Post'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 14 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 8, marginBottom: 8 },
  card: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 10, marginBottom: 8 },
});