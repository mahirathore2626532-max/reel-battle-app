import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { markNotificationRead } from '../lib/notifications';
import { supabase } from '../lib/supabase';

export default function Notifications() {
  const [items, setItems] = useState<any[]>([]);

  const loadNotifications = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const onRead = async (id: string) => {
    await markNotificationRead(id);
    loadNotifications();
  };

  const markAllRead = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Success', 'All notifications marked as read');
    loadNotifications();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <TouchableOpacity style={styles.btn} onPress={markAllRead}>
        <Text style={styles.btnText}>Mark All Read</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[styles.card, item.is_read ? styles.read : styles.unread]}
            onPress={() => onRead(item.id)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={styles.meta}>{item.is_read ? 'Read' : 'Unread'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No notifications</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 12, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: { borderRadius: 10, padding: 12, marginBottom: 10 },
  unread: { backgroundColor: '#eaf4ff' },
  read: { backgroundColor: '#f5f5f5' },
  cardTitle: { fontWeight: 'bold', marginBottom: 4 },
  meta: { marginTop: 6, fontSize: 12, color: '#666' },
});