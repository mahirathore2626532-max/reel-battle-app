import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function MyCommentsScreen() {
  const [comments, setComments] = useState<any[]>([]);

  const loadComments = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('user_id', userId)
      .neq('deleted', true)
      .order('created_at', { ascending: false });

    setComments(data || []);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const deleteComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .update({ deleted: true })
      .eq('id', id);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Deleted', 'Comment deleted');
    loadComments();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.comment}>{item.content}</Text>
            <Text style={styles.meta}>Post ID: {item.post_id}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => deleteComment(item.id)}>
              <Text style={styles.btnText}>Delete Comment</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No comments yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, marginBottom: 10 },
  comment: { fontSize: 15, fontWeight: '500' },
  meta: { marginTop: 6, fontSize: 12, color: '#666' },
  btn: { backgroundColor: 'crimson', padding: 10, borderRadius: 8, marginTop: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});