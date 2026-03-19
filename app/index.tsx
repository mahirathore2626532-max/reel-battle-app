import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reel Battle</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
        <Text style={styles.btnText}>Login OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/feed')}>
        <Text style={styles.btnText}>Open App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/following-feed')}>
        <Text style={styles.btnText}>Following Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/search')}>
        <Text style={styles.btnText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/notifications')}>
        <Text style={styles.btnText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/stats')}>
        <Text style={styles.btnText}>App Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/admin-withdrawals')}>
        <Text style={styles.btnText}>Admin Withdrawals</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/reports')}>
        <Text style={styles.btnText}>Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/battle-maintenance')}>
        <Text style={styles.btnText}>Battle Maintenance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});