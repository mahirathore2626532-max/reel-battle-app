import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(getApp());

export async function createOrder(uid: string, amount: number) {
  const fn = httpsCallable(functions, "createRazorpayOrder");
  const res: any = await fn({ uid, amount });
  return res.data;
}

export async function verifyPayment(payload: {
  uid: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
}) {
  const fn = httpsCallable(functions, "verifyRazorpayPayment");
  const res: any = await fn(payload);
  return res.data;
}

export async function joinBattleSecure(payload: {
  uid: string;
  battleId: string;
}) {
  const fn = httpsCallable(functions, "joinBattleSecure");
  const res: any = await fn(payload);
  return res.data;
}

export async function declareBattleResult(payload: {
  battleId: string;
  winnerUserId: string;
  prizeAmount: number;
}) {
  const fn = httpsCallable(functions, "declareBattleResult");
  const res: any = await fn(payload);
  return res.data;
}