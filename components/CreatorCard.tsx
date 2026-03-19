import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CreatorCard({ item, isFollowing, onToggle }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.full_name || item.username || item.phone}</Text>
      <Text>{item.bio || 'No bio'}</Text>

      <TouchableOpacity style={styles.btn} onPress={onToggle}>
        <Text style={styles.btnText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});