import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);

  const loadWallet = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    const { data: wallet } = await supabase.from('wallets').select('*').eq('user_id', user.id).single();
    if (wallet) setBalance(Number(wallet.balance || 0));

    const { data: tx } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setTransactions(tx || []);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const deposit = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    const amt = Number(amount);
    if (!amt) return Alert.alert('Error', 'Amount invalid');

    await supabase.from('wallet_transactions').insert({
      user_id: user.id,
      type: 'deposit',
      amount: amt,
      status: 'approved',
    });

    await supabase.from('wallets').upsert({
      user_id: user.id,
      balance: balance + amt,
    });

    setAmount('');
    loadWallet();
  };

  const requestWithdraw = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    const amt = Number(amount);
    if (!amt) return Alert.alert('Error', 'Amount invalid');
    if (amt > balance) return Alert.alert('Error', 'Low balance');

    await supabase.from('wallet_transactions').insert({
      user_id: user.id,
      type: 'withdrawal',
      amount: amt,
      status: 'pending',
    });

    await supabase.from('notifications').insert({
      user_id: user.id,
      title: 'Withdrawal requested',
      body: `Your request for ₹${amt} is pending`,
      type: 'withdrawal',
    });

    setAmount('');
    loadWallet();
    Alert.alert('Success', 'Withdrawal request created');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.balance}>Balance: ₹{balance}</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.btn} onPress={deposit}>
        <Text style={styles.btnText}>Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={requestWithdraw}>
        <Text style={styles.btnText}>Withdraw Request</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text>{item.type} - ₹{item.amount}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  balance: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: { padding: 12, backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 8 },
});