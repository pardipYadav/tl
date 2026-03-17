import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const travelType = searchParams.get('travelType');
  const minPrice = Number(searchParams.get('minPrice') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER);
  const sort = searchParams.get('sort') || 'featured';

  const query: Record<string, unknown> = {
    priceINR: { $gte: minPrice, $lte: maxPrice }
  };

  if (country) query.country = country;
  if (travelType) query.travelType = travelType;

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    featured: { featured: -1, createdAt: -1 },
    priceLowHigh: { priceINR: 1 },
    priceHighLow: { priceINR: -1 },
    rating: { rating: -1 }
  };

  const packages = await Package.find(query).sort(sortMap[sort] || sortMap.featured).lean();
  return NextResponse.json({ data: packages });
}
