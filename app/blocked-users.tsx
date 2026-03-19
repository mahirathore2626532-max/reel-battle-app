import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function BlockedUsersScreen() {
  const [items, setItems] = useState<any[]>([]);

  const loadBlockedUsers = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from('blocked_users')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  const unblockUser = async (id: string) => {
    const { error } = await supabase.from('blocked_users').delete().eq('id', id);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Success', 'User unblocked');
    loadBlockedUsers();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blocked Users</Text>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text>Blocked User ID: {item.blocked_user_id}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => unblockUser(item.id)}>
              <Text style={styles.btnText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No blocked users</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, marginBottom: 10 },
  btn: { backgroundColor: '#111', padding: 10, borderRadius: 8, marginTop: 8 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});