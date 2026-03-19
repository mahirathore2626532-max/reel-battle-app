import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BattleCard from '../components/BattleCard';
import { autoCloseBattles } from '../lib/admin';
import { supabase } from '../lib/supabase';

export default function Battles() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [hours, setHours] = useState('24');
  const [search, setSearch] = useState('');
  const [battles, setBattles] = useState<any[]>([]);

  const loadBattles = async () => {
    await autoCloseBattles();

    const { data } = await supabase
      .from('battles')
      .select('*')
      .order('created_at', { ascending: false });

    setBattles(data || []);
  };

  useEffect(() => {
    loadBattles();
  }, []);

  const createBattle = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return Alert.alert('Error', 'Login required');

    const fee = Number(entryFee || 0);
    const endsAt = new Date(Date.now() + Number(hours || 24) * 60 * 60 * 1000).toISOString();

    const { error } = await supabase.from('battles').insert({
      creator_id: user.id,
      title,
      description,
      entry_fee: fee,
      prize_pool: 0,
      status: 'open',
      ends_at: endsAt,
    });

    if (error) return Alert.alert('Error', error.message);

    setTitle('');
    setDescription('');
    setEntryFee('');
    setHours('24');
    loadBattles();
  };

  const filteredBattles = battles.filter((b: any) => {
    const q = search.toLowerCase();
    return (
      (b.title || '').toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Rooms</Text>

      <TextInput style={styles.input} placeholder="Search battles" value={search} onChangeText={setSearch} />
      <TextInput style={styles.input} placeholder="Battle title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Entry fee" value={entryFee} onChangeText={setEntryFee} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Ends in hours" value={hours} onChangeText={setHours} keyboardType="numeric" />

      <TouchableOpacity style={styles.btn} onPress={createBattle}>
        <Text style={styles.btnText}>Create Battle Room</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredBattles}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <BattleCard item={item} onPress={() => router.push(`/battle-detail?id=${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 14 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});