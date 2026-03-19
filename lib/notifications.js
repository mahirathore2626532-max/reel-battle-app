import { supabase } from './supabase';

export async function createNotification(userId, title, body, type = 'general') {
  if (!userId) return;

  await supabase.from('notifications').insert({
    user_id: userId,
    title,
    body,
    type,
    is_read: false,
  });
}

export async function markNotificationRead(id) {
  await supabase.from('notifications').update({ is_read: true }).eq('id', id);
}