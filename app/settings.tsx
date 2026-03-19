import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [userId, setUserId] = useState('');

  const loadSettings = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    setUserId(user.id);

    const { data: settings } = await supabase
      .from('app_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (settings) {
      setNotificationsEnabled(!!settings.notifications_enabled);
      setPrivateAccount(!!settings.private_account);
    } else {
      await supabase.from('app_settings').insert({
        user_id: user.id,
        notifications_enabled: true,
        private_account: false,
      });
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async () => {
    if (!userId) return;

    const { error } = await supabase.from('app_settings').upsert({
      user_id: userId,
      notifications_enabled: notificationsEnabled,
      private_account: privateAccount,
    });

    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Success', 'Settings saved');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <View style={styles.row}>
        <Text>Private Account</Text>
        <Switch value={privateAccount} onValueChange={setPrivateAccount} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={saveSettings}>
        <Text style={styles.btnText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});