import { supabase } from './supabase';

export async function bootstrapUserAccount(user) {
  if (!user?.id) return;

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (!existingProfile) {
    await supabase.from('profiles').insert({
      id: user.id,
      phone: user.phone || '',
      role: 'user',
    });
  }

  const { data: existingWallet } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!existingWallet) {
    await supabase.from('wallets').insert({
      user_id: user.id,
      balance: 0,
    });
  }

  const { data: existingSettings } = await supabase
    .from('app_settings')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!existingSettings) {
    await supabase.from('app_settings').insert({
      user_id: user.id,
      notifications_enabled: true,
      private_account: false,
    });
  }
}