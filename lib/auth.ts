import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "logged_in_user";

export type AppUser = {
  uid: string;
  name: string;
  phone: string;
  username: string;
};

export async function saveLoggedInUser(user: AppUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getLoggedInUser(): Promise<AppUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export async function logoutUser() {
  await AsyncStorage.removeItem(USER_KEY);
}