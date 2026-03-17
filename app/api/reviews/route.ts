import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { reviewSchema } from '@/lib/validations';
import Review from '@/models/Review';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const review = await Review.create({
    user: session.user.id,
    package: parsed.data.packageId,
    rating: parsed.data.rating,
    comment: parsed.data.comment
  });

  return NextResponse.json({ data: review }, { status: 201 });
}
