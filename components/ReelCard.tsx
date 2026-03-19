import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MediaPreview from './MediaPreview';

export default function ReelCard({ item }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/reel-player?id=${item.id}`)}
    >
      <MediaPreview url={item.media_url} type={item.media_type} />
      <Text style={styles.caption}>{item.caption || 'No caption'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  caption: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
  },
});