import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Creators() {
  const [users, setUsers] = useState<any[]>([]);

  const loadUsers = async () => {
    const { data } = await supabase.from('profiles').select('*');
    setUsers(data || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creators</Text>

      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/creator-profile?id=${item.id}`)}
          >
            <Text>{item.full_name || item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 12, backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 8 },
});