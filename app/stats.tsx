import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoadingView from '../components/LoadingView';
import { getAppStats } from '../lib/stats';

export default function StatsScreen() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAppStats();
      setStats(data);
    };
    load();
  }, []);

  if (!stats) {
    return <LoadingView text="Loading stats..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Stats</Text>

      <View style={styles.card}><Text>Total Users: {stats.users}</Text></View>
      <View style={styles.card}><Text>Total Posts: {stats.posts}</Text></View>
      <View style={styles.card}><Text>Total Battles: {stats.battles}</Text></View>
      <View style={styles.card}><Text>Total Likes: {stats.likes}</Text></View>
      <View style={styles.card}><Text>Total Comments: {stats.comments}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 14, marginBottom: 10 },
});