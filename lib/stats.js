import { supabase } from './supabase';

export async function getAppStats() {
  const [
    postsRes,
    battlesRes,
    usersRes,
    commentsRes,
    likesRes,
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('battles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('likes').select('*', { count: 'exact', head: true }),
  ]);

  return {
    posts: postsRes.count || 0,
    battles: battlesRes.count || 0,
    users: usersRes.count || 0,
    comments: commentsRes.count || 0,
    likes: likesRes.count || 0,
  };
}