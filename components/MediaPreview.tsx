import { ResizeMode, Video } from 'expo-av';
import { Image, StyleSheet, View } from 'react-native';

export default function MediaPreview({ url, type }: { url: string; type: string }) {
  if (type === 'video') {
    return (
      <View>
        <Video
          source={{ uri: url }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
        />
      </View>
    );
  }

  return <Image source={{ uri: url }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#ddd',
  },
  video: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#000',
  },
});