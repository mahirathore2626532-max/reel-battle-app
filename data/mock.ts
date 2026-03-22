import { BattleItem, JoinedBattle, UserProfile, WalletTransaction } from "../types";

export const mockUser: UserProfile = {
  uid: "test_user_001",
  name: "Test User",
  mobile: "9999999999",
  email: "test@example.com",
  gameName: "BattleKing",
  gameUid: "BGMI123456",
  walletBalance: 350,
  winnings: 0,
  joinedBattles: 0,
  wins: 0,
};

export const mockBattles: BattleItem[] = [
  {
    id: "battle1",
    title: "Solo Clash Night",
    mode: "Solo",
    entryFee: 20,
    prizePool: 200,
    totalSpots: 20,
    filledSpots: 8,
    time: "Today, 8:00 PM",
    map: "Erangel",
    status: "Upcoming",
    description: "Solo battle for practice and quick rewards.",
  },
  {
    id: "battle2",
    title: "Duo Domination",
    mode: "Duo",
    entryFee: 50,
    prizePool: 500,
    totalSpots: 25,
    filledSpots: 12,
    time: "Today, 10:00 PM",
    map: "Miramar",
    status: "Upcoming",
    description: "Play duo and win bigger rewards.",
  },
  {
    id: "battle3",
    title: "Squad Thunder",
    mode: "Squad",
    entryFee: 100,
    prizePool: 1200,
    totalSpots: 25,
    filledSpots: 25,
    time: "Tomorrow, 7:30 PM",
    map: "Sanhok",
    status: "Closed",
    description: "Full room squad contest.",
  },
];

export const mockTransactions: WalletTransaction[] = [
  {
    id: "tx1",
    userId: "test_user_001",
    type: "debit",
    title: "Battle Joined",
    subtitle: "Solo Clash Night",
    amount: 20,
    createdAt: Date.now(),
  },
];

export const mockJoinedBattles: JoinedBattle[] = [
  {
    id: "jb1",
    battleId: "battle1",
    userId: "test_user_001",
    battleTitle: "Solo Clash Night",
    entryFee: 20,
    joinedAt: Date.now(),
    status: "Joined",
  },
];