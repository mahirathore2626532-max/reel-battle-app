import { supabase } from './supabase';

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return data || null;
}

export async function isAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === 'admin';
}

export async function requireAdmin() {
  const ok = await isAdmin();
  if (!ok) {
    throw new Error('Admin access required');
  }
  return true;
}