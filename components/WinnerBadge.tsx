import { StyleSheet, Text, View } from 'react-native';

export default function WinnerBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>🏆 Winner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});