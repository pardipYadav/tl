import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import Inquiry from '@/models/Inquiry';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const inquiry = await Inquiry.create(parsed.data);
  return NextResponse.json({ data: inquiry }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: inquiries });
}
