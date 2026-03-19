import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BattleLeaderboardCard from '../components/BattleLeaderboardCard';
import { supabase } from '../lib/supabase';

export default function Leaderboard() {
  const { battleId } = useLocalSearchParams();
  const [items, setItems] = useState<any[]>([]);

  const loadLeaderboard = async () => {
    const { data: entries } = await supabase
      .from('battle_entries')
      .select('*')
      .eq('battle_id', battleId);

    const { data: votes } = await supabase
      .from('votes')
      .select('*')
      .eq('battle_id', battleId);

    const postIds = (entries || []).map((e: any) => e.post_id);
    const { data: posts } = await supabase.from('posts').select('*').in('id', postIds);

    const voteMap: any = {};
    (votes || []).forEach((v: any) => {
      voteMap[v.post_id] = (voteMap[v.post_id] || 0) + 1;
    });

    const leaderboard = (posts || []).map((post: any) => ({
      ...post,
      voteCount: voteMap[post.id] || 0,
    }));

    leaderboard.sort((a: any, b: any) => b.voteCount - a.voteCount);
    setItems(leaderboard);
  };

  useEffect(() => {
    loadLeaderboard();
  }, [battleId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Leaderboard</Text>
      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item, index }: any) => (
          <BattleLeaderboardCard item={item} index={index} />
        )}
        ListEmptyComponent={<Text>No leaderboard data</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});