import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createNotification } from '../lib/notifications';
import { supabase } from '../lib/supabase';

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState('');

  const loadData = async () => {
    const { data: postData } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    setPost(postData);

    const { data: commentsData } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .neq('deleted', true)
      .order('created_at', { ascending: false });

    setComments(commentsData || []);
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const addComment = async () => {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;

    if (!userId) {
      Alert.alert('Error', 'Login required');
      return;
    }

    if (!text.trim()) {
      Alert.alert('Error', 'Comment likho');
      return;
    }

    const { error } = await supabase.from('comments').insert({
      post_id: id,
      user_id: userId,
      content: text.trim(),
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (post?.user_id && post.user_id !== userId) {
      await createNotification(
        post.user_id,
        'New Comment',
        'Someone commented on your post',
        'comment'
      );
    }

    setText('');
    loadData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Detail</Text>
      <Text style={styles.caption}>{post?.caption || 'No caption'}</Text>
      <Text numberOfLines={1}>{post?.media_url}</Text>

      <TextInput
        style={styles.input}
        placeholder="Write comment"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.btn} onPress={addComment}>
        <Text style={styles.btnText}>Add Comment</Text>
      </TouchableOpacity>

      <FlatList
        data={comments}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.commentText}>{item.content}</Text>
            <Text style={styles.commentMeta}>{item.user_id}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No comments yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  caption: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
  },
  btn: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 15,
    fontWeight: '500',
  },
  commentMeta: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
});