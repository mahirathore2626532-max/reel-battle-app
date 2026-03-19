import { calculateWinner } from './helpers';
import { supabase } from './supabase';

export function getRemainingTime(endsAt) {
  if (!endsAt) return 'No timer';
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return 'Ended';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m left`;
}

export async function distributeBattleReward(battleId) {
  const { data: battle } = await supabase.from('battles').select('*').eq('id', battleId).single();
  if (!battle) throw new Error('Battle not found');

  const { data: entries } = await supabase.from('battle_entries').select('*').eq('battle_id', battleId);
  const { data: votes } = await supabase.from('votes').select('*').eq('battle_id', battleId);

  const result = calculateWinner(entries || [], votes || []);
  if (!result.winnerPostId) throw new Error('No winner found');

  const winnerEntry = (entries || []).find((e) => e.post_id === result.winnerPostId);
  if (!winnerEntry) throw new Error('Winner entry missing');

  await supabase
    .from('battles')
    .update({
      winner_post_id: result.winnerPostId,
      status: 'closed',
    })
    .eq('id', battleId);

  const { data: wallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', winnerEntry.user_id)
    .single();

  const currentBalance = Number(wallet?.balance || 0);
  const prize = Number(battle.prize_pool || 0);

  await supabase.from('wallets').upsert({
    user_id: winnerEntry.user_id,
    balance: currentBalance + prize,
  });

  await supabase.from('wallet_transactions').insert({
    user_id: winnerEntry.user_id,
    type: 'reward',
    amount: prize,
    status: 'approved',
  });

  await supabase.from('notifications').insert({
    user_id: winnerEntry.user_id,
    title: 'Battle Winner',
    body: `You won ${battle.title} and received ₹${prize}`,
    type: 'battle_win',
  });

  return { winnerUserId: winnerEntry.user_id, prize };
}