import { createNotification } from './notifications';
import { supabase } from './supabase';

export async function approveWithdrawal(transaction) {
  const { data: wallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', transaction.user_id)
    .single();

  const currentBalance = Number(wallet?.balance || 0);
  const amount = Number(transaction.amount || 0);

  if (currentBalance < amount) {
    throw new Error('Insufficient balance in wallet');
  }

  await supabase
    .from('wallets')
    .upsert({
      user_id: transaction.user_id,
      balance: currentBalance - amount,
    });

  await supabase
    .from('wallet_transactions')
    .update({ status: 'approved' })
    .eq('id', transaction.id);

  await createNotification(
    transaction.user_id,
    'Withdrawal approved',
    `Your withdrawal of ₹${amount} has been approved`,
    'withdrawal'
  );
}

export async function rejectWithdrawal(transaction) {
  await supabase
    .from('wallet_transactions')
    .update({ status: 'rejected' })
    .eq('id', transaction.id);

  await createNotification(
    transaction.user_id,
    'Withdrawal rejected',
    `Your withdrawal of ₹${transaction.amount} has been rejected`,
    'withdrawal'
  );
}

export async function autoCloseBattles() {
  await supabase.rpc('close_ended_battles');
}