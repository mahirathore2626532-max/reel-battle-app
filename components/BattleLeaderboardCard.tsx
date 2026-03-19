import { StyleSheet, Text, View } from 'react-native';

export default function BattleLeaderboardCard({ item, index }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View>
        <Text style={styles.name}>{item.caption || 'Untitled Entry'}</Text>
        <Text>Votes: {item.voteCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});