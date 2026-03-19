import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { autoCloseBattles } from '../lib/admin';
import { requireAdmin } from '../lib/authz';

export default function BattleMaintenance() {
  const [running, setRunning] = useState(false);

  const runMaintenance = async () => {
    try {
      setRunning(true);
      await requireAdmin();
      await autoCloseBattles();
      Alert.alert('Success', 'Ended battles closed');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Maintenance</Text>

      <TouchableOpacity style={styles.btn} onPress={runMaintenance} disabled={running}>
        <Text style={styles.btnText}>
          {running ? 'Running...' : 'Close Ended Battles'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});