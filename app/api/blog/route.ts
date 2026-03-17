import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: blogs });
}
