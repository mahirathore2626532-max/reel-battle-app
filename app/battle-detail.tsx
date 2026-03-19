import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MediaPreview from '../components/MediaPreview';
import WinnerBadge from '../components/WinnerBadge';
import { distributeBattleReward, getRemainingTime } from '../lib/battle';
import { supabase } from '../lib/supabase';

export default function BattleDetail() {
  const { id } = useLocalSearchParams();
  const [battle, setBattle] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const { data: battleData, error: battleError } = await supabase
        .from('battles')
        .select('*')
        .eq('id', id)
        .single();

      if (battleError) {
        Alert.alert('Error', battleError.message);
        return;
      }

      setBattle(battleData);

      const { data: entriesData, error: entriesError } = await supabase
        .from('battle_entries')
        .select('*')
        .eq('battle_id', id);

      if (entriesError) {
        Alert.alert('Error', entriesError.message);
        return;
      }

      if (entriesData?.length) {
        const postIds = entriesData.map((e: any) => e.post_id);

        const { data: postData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .in('id', postIds)
          .neq('deleted', true);

        if (postsError) {
          Alert.alert('Error', postsError.message);
          return;
        }

        setPosts(postData || []);
      } else {
        setPosts([]);
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const joinBattleWithFirstPost = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        Alert.alert('Error', 'Login required');
        return;
      }

      if (!battle) {
        Alert.alert('Error', 'Battle not loaded');
        return;
      }

      const { data: existingEntry } = await supabase
        .from('battle_entries')
        .select('*')
        .eq('battle_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingEntry) {
        Alert.alert('Info', 'Aap already is battle me join kar chuke ho');
        return;
      }

      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (walletError) {
        Alert.alert('Error', walletError.message);
        return;
      }

      const currentBalance = Number(wallet?.balance || 0);
      const fee = Number(battle?.entry_fee || 0);

      if (currentBalance < fee) {
        Alert.alert('Error', 'Not enough wallet balance');
        return;
      }

      const { data: myPosts, error: myPostsError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .neq('deleted', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (myPostsError) {
        Alert.alert('Error', myPostsError.message);
        return;
      }

      if (!myPosts?.length) {
        Alert.alert('Error', 'Pehle post upload karo');
        return;
      }

      const { error: joinError } = await supabase.from('battle_entries').insert({
        battle_id: id,
        user_id: user.id,
        post_id: myPosts[0].id,
      });

      if (joinError) {
        Alert.alert('Error', joinError.message);
        return;
      }

      if (fee > 0) {
        const { error: walletUpdateError } = await supabase.from('wallets').upsert({
          user_id: user.id,
          balance: currentBalance - fee,
        });

        if (walletUpdateError) {
          Alert.alert('Error', walletUpdateError.message);
          return;
        }

        const { error: txError } = await supabase.from('wallet_transactions').insert({
          user_id: user.id,
          type: 'withdrawal',
          amount: fee,
          status: 'approved',
        });

        if (txError) {
          Alert.alert('Error', txError.message);
          return;
        }

        const { error: prizeError } = await supabase
          .from('battles')
          .update({ prize_pool: Number(battle?.prize_pool || 0) + fee })
          .eq('id', id);

        if (prizeError) {
          Alert.alert('Error', prizeError.message);
          return;
        }
      }

      Alert.alert('Success', 'Battle joined successfully');
      loadData();
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }
  };

  const votePost = async (postId: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        Alert.alert('Error', 'Login required');
        return;
      }

      const { error } = await supabase.from('votes').insert({
        battle_id: id,
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      const post = posts.find((p) => p.id === postId);

      if (post?.user_id && post.user_id !== user.id) {
        await supabase.from('notifications').insert({
          user_id: post.user_id,
          title: 'New Vote',
          body: 'Someone voted on your battle post',
          type: 'vote',
        });
      }

      Alert.alert('Success', 'Vote submitted');
      loadData();
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }
  };

  const autoSelectWinner = async () => {
    try {
      await distributeBattleReward(String(id));
      Alert.alert('Success', 'Winner selected and reward sent');
      loadData();
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Winner select nahi hua');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{battle?.title || 'Battle Detail'}</Text>
      <Text style={styles.text}>{battle?.description || 'No description'}</Text>
      <Text style={styles.text}>Entry Fee: ₹{battle?.entry_fee || 0}</Text>
      <Text style={styles.text}>Prize Pool: ₹{battle?.prize_pool || 0}</Text>
      <Text style={styles.text}>{getRemainingTime(battle?.ends_at)}</Text>
      <Text style={styles.text}>
        Winner Post: {battle?.winner_post_id || 'Not selected'}
      </Text>

      <TouchableOpacity style={styles.btn} onPress={joinBattleWithFirstPost}>
        <Text style={styles.btnText}>Join Battle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={autoSelectWinner}>
        <Text style={styles.btnText}>Auto Select Winner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push(`/leaderboard?battleId=${id}`)}
      >
        <Text style={styles.btnText}>View Leaderboard</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.empty}>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <View style={styles.card}>
              <Text style={styles.caption}>{item.caption || 'No caption'}</Text>

              <MediaPreview url={item.media_url} type={item.media_type} />

              {battle?.winner_post_id === item.id ? <WinnerBadge /> : null}

              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => votePost(item.id)}
              >
                <Text style={styles.btnText}>Vote</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No entries yet</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 6,
  },
  btn: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  smallBtn: {
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 14,
  },
  caption: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});