import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="upload" options={{ title: 'Upload' }} />
      <Stack.Screen name="feed" options={{ title: 'Feed' }} />
      <Stack.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Stack.Screen name="battles" options={{ title: 'Battles' }} />
      <Stack.Screen name="battle-detail" options={{ title: 'Battle Detail' }} />
      <Stack.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="search" options={{ title: 'Search' }} />
      <Stack.Screen name="stats" options={{ title: 'App Stats' }} />
      <Stack.Screen name="my-posts" options={{ title: 'My Posts' }} />
      <Stack.Screen name="saved" options={{ title: 'Saved Posts' }} />
      <Stack.Screen name="my-battles" options={{ title: 'My Battles' }} />
      <Stack.Screen name="creator" options={{ title: 'Creators' }} />
      <Stack.Screen name="creator-profile" options={{ title: 'Creator Profile' }} />
      <Stack.Screen name="following-feed" options={{ title: 'Following Feed' }} />
      <Stack.Screen name="edit-post" options={{ title: 'Edit Post' }} />
      <Stack.Screen name="post-detail" options={{ title: 'Post Detail' }} />
      <Stack.Screen name="reel-player" options={{ title: 'Reel Player' }} />
      <Stack.Screen name="admin-withdrawals" options={{ title: 'Admin Withdrawals' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
      <Stack.Screen name="battle-maintenance" options={{ title: 'Battle Maintenance' }} />
      <Stack.Screen name="blocked-users" options={{ title: 'Blocked Users' }} />
      <Stack.Screen name="my-comments" options={{ title: 'My Comments' }} />
      <Stack.Screen name="help" options={{ title: 'Help & Support' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}