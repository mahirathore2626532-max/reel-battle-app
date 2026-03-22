import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "logged_in_user";
const OTP_USER_KEY = "pending_otp_user";

export type LoggedInUser = {
  id: string;
  name: string;
  phone: string;
};

export async function saveLoggedInUser(user: LoggedInUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getLoggedInUser(): Promise<LoggedInUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function removeLoggedInUser() {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function savePendingOtpUser(user: LoggedInUser) {
  await AsyncStorage.setItem(OTP_USER_KEY, JSON.stringify(user));
}

export async function getPendingOtpUser(): Promise<LoggedInUser | null> {
  const raw = await AsyncStorage.getItem(OTP_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function removePendingOtpUser() {
  await AsyncStorage.removeItem(OTP_USER_KEY);
}