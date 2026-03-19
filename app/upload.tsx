import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getMediaType } from '../lib/helpers';
import { supabase } from '../lib/supabase';
import { uploadToBucket } from '../lib/uploadMedia';

export default function Upload() {
  const [uri, setUri] = useState('');
  const [caption, setCaption] = useState('');

  const pickMedia = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 1,
    });

    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const savePost = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return Alert.alert('Error', 'Login required');
    if (!uri) return Alert.alert('Error', 'Media select karo');

    const mediaType = getMediaType(uri);
    const mediaUrl = await uploadToBucket(uri, 'posts', 'post');

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      media_url: mediaUrl,
      media_type: mediaType,
      caption,
    });

    if (error) return Alert.alert('Error', error.message);

    setUri('');
    setCaption('');
    Alert.alert('Success', 'Upload ho gaya');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Reel / Photo</Text>
      <TouchableOpacity style={styles.btn} onPress={pickMedia}>
        <Text style={styles.btnText}>{uri ? 'Selected ✅' : 'Pick Media'}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Caption" value={caption} onChangeText={setCaption} />
      <TouchableOpacity style={styles.btn} onPress={savePost}>
        <Text style={styles.btnText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});