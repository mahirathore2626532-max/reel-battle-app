export type UserProfile = {
  uid: string;
  name: string;
  mobile: string;
  email?: string;
  gameName: string;
  gameUid: string;
  walletBalance: number;
  winnings: number;
  joinedBattles: number;
  wins: number;
  createdAt?: number;
  updatedAt?: number;
};

export type BattleItem = {
  id: string;
  title: string;
  mode: string;
  entryFee: number;
  prizePool: number;
  totalSpots: number;
  filledSpots: number;
  time: string;
  map: string;
  status: "Live" | "Upcoming" | "Closed";
  description: string;
};

export type WalletTransaction = {
  id: string;
  userId: string;
  type: "credit" | "debit";
  title: string;
  subtitle?: string;
  amount: number;
  createdAt: number;
};

export type JoinedBattle = {
  id: string;
  battleId: string;
  userId: string;
  battleTitle: string;
  entryFee: number;
  joinedAt: number;
  status: "Joined" | "Completed" | "Cancelled";
};

export type SupportMessage = {
  id: string;
  userId: string;
  message: string;
  createdAt: number;
};