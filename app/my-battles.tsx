import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BattleCard from '../components/BattleCard';
import { supabase } from '../lib/supabase';

export default function MyBattles() {
  const [items, setItems] = useState<any[]>([]);

  const loadBattles = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from('battles')
      .select('*')
      .eq('creator_id', userId);

    setItems(data || []);
  };

  useEffect(() => {
    loadBattles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Battles</Text>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <BattleCard item={item} />}
        ListEmptyComponent={<Text>No battles</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});