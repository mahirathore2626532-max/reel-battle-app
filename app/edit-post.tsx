import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function EditPost() {
  const { id } = useLocalSearchParams();
  const [caption, setCaption] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single();
      if (data) setCaption(data.caption || '');
    };
    loadPost();
  }, [id]);

  const savePost = async () => {
    const { error } = await supabase.from('posts').update({ caption }).eq('id', id);
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Success', 'Post updated');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
      />
      <TouchableOpacity style={styles.btn} onPress={savePost}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});