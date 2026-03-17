import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const pkg = await Package.findOne({ slug }).lean();

  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }

  return NextResponse.json({ data: pkg });
}
