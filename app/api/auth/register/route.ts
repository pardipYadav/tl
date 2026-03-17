import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const existing = await User.findOne({ email: parsed.data.email }).lean();
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  const password = await bcrypt.hash(parsed.data.password, 10);
  const user = await User.create({ ...parsed.data, password, role: 'user' });

  return NextResponse.json({ data: { id: user._id.toString(), email: user.email } }, { status: 201 });
}
