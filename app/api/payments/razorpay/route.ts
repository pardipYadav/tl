import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';

export async function POST(request: Request) {
  const { amount, currency = 'INR', receipt = `rcpt_${Date.now()}` } = await request.json();

  const order = await razorpay.orders.create({
    amount,
    currency,
    receipt,
    payment_capture: true
  });

  return NextResponse.json({ data: order });
}
