import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabsMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Navigation</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/feed')}>
        <Text style={styles.btnText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/upload')}>
        <Text style={styles.btnText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/battles')}>
        <Text style={styles.btnText}>Battles</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/profile')}>
        <Text style={styles.btnText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});