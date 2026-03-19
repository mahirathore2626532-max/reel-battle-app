import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { uploadToBucket } from '../lib/uploadMedia';

export default function Profile() {
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    bio: '',
    avatar_url: '',
  });

  const loadProfile = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.log('Profile load error:', error.message);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          username: data.username || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
        });
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Profile load failed');
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const pickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission required', 'Gallery permission allow karo');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
      });

      if (!res.canceled) {
        const url = await uploadToBucket(res.assets[0].uri, 'avatars', 'avatar');
        setProfile((prev) => ({
          ...prev,
          avatar_url: url,
        }));
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Avatar pick failed');
    }
  };

  const saveProfile = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        Alert.alert('Error', 'Login required');
        return;
      }

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: profile.full_name,
        username: profile.username,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      Alert.alert('Success', 'Profile saved');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Profile save failed');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      Alert.alert('Logged out');
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Logout failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {profile.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>No Avatar</Text>
          </View>
        )}

        <TouchableOpacity style={styles.btn} onPress={pickAvatar}>
          <Text style={styles.btnText}>Pick Avatar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={profile.full_name}
          onChangeText={(v) => setProfile({ ...profile, full_name: v })}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={profile.username}
          onChangeText={(v) => setProfile({ ...profile, username: v })}
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Bio"
          value={profile.bio}
          onChangeText={(v) => setProfile({ ...profile, bio: v })}
          multiline
        />

        <TouchableOpacity style={styles.btn} onPress={saveProfile}>
          <Text style={styles.btnText}>Save Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/my-posts')}>
          <Text style={styles.btnText}>My Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/settings')}>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/search')}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/stats')}>
          <Text style={styles.btnText}>App Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/wallet')}>
          <Text style={styles.btnText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/saved')}>
          <Text style={styles.btnText}>Saved Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/my-battles')}>
          <Text style={styles.btnText}>My Battles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/creator')}>
          <Text style={styles.btnText}>Creators</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/notifications')}>
          <Text style={styles.btnText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/following-feed')}>
          <Text style={styles.btnText}>Following Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/blocked-users')}>
          <Text style={styles.btnText}>Blocked Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/my-comments')}>
          <Text style={styles.btnText}>My Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/help')}>
          <Text style={styles.btnText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/battle-maintenance')}>
          <Text style={styles.btnText}>Battle Maintenance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/admin-withdrawals')}>
          <Text style={styles.btnText}>Admin Withdrawals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.push('/reports')}>
          <Text style={styles.btnText}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e5e5e5',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarPlaceholderText: {
    color: '#555',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  bioInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  logoutBtn: {
    backgroundColor: 'crimson',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});