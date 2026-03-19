import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Reports() {
  const [items, setItems] = useState<any[]>([]);

  const loadReports = async () => {
    const { data } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text>Reporter: {item.reporter_id}</Text>
            <Text>Target User: {item.target_user_id || 'N/A'}</Text>
            <Text>Post: {item.post_id || 'N/A'}</Text>
            <Text>Reason: {item.reason}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No reports found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginBottom: 12 },
});