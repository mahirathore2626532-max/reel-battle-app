import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState({ text = 'No data found' }: { text?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: '#666',
  },
});