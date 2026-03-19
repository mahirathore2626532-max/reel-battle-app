import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingView({ text = 'Loading...' }: { text?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
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
    marginTop: 10,
    fontSize: 15,
  },
});