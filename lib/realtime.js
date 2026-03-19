import { supabase } from './supabase';

export function subscribeToPosts(onChange) {
  const channel = supabase
    .channel('posts-live')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      () => onChange?.()
    )
    .subscribe();

  return channel;
}

export function unsubscribeChannel(channel) {
  if (channel) supabase.removeChannel(channel);
}