import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET(request: NextRequest) {
  await connectDB();
  const code = request.nextUrl.searchParams.get('code');

  if (!code) return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true, expiresAt: { $gte: new Date() } }).lean();
  if (!coupon) {
    return NextResponse.json({ valid: false, message: 'Invalid or expired coupon' }, { status: 404 });
  }

  return NextResponse.json({ valid: true, discountPercent: coupon.discountPercent });
}
