import { StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Common Help</Text>
        <Text>1. Login problem → OTP dubara bhejo</Text>
        <Text>2. Upload problem → internet aur Supabase bucket check karo</Text>
        <Text>3. Battle join nahi ho raha → wallet balance aur uploaded post check karo</Text>
        <Text>4. Notification nahi aa rahi → settings me notifications on rakho</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Support</Text>
        <Text>Email: support@yourapp.com</Text>
        <Text>WhatsApp: +91XXXXXXXXXX</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 14, marginBottom: 12 },
  heading: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
});