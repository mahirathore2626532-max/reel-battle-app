import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { approveWithdrawal, rejectWithdrawal } from '../lib/admin';
import { supabase } from '../lib/supabase';

export default function AdminWithdrawals() {
  const [items, setItems] = useState<any[]>([]);

  const loadItems = async () => {
    const { data } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('type', 'withdrawal')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onApprove = async (item: any) => {
    try {
      await approveWithdrawal(item);
      Alert.alert('Approved');
      loadItems();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const onReject = async (item: any) => {
    try {
      await rejectWithdrawal(item);
      Alert.alert('Rejected');
      loadItems();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Withdrawals</Text>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text>User: {item.user_id}</Text>
            <Text>Amount: ₹{item.amount}</Text>
            <Text>Status: {item.status}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => onApprove(item)}>
              <Text style={styles.btnText}>Approve</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.rejectBtn]} onPress={() => onReject(item)}>
              <Text style={styles.btnText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No pending withdrawals</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 10, borderRadius: 8, marginTop: 8 },
  rejectBtn: { backgroundColor: 'crimson' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});