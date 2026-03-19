import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { bootstrapUserAccount } from '../lib/bootstrap';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const sendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Success', 'OTP bhej diya gaya');
  };

  const verifyOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (data.user) {
      await bootstrapUserAccount(data.user);
    }

    Alert.alert('Success', 'Login ho gaya');
    router.replace('/(tabs)/feed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile OTP Login</Text>

      <TextInput
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={sendOtp}>
        <Text style={styles.btnText}>Send OTP</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={verifyOtp}>
        <Text style={styles.btnText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, marginBottom: 14 },
  btn: { backgroundColor: '#111', padding: 14, borderRadius: 10, marginBottom: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});