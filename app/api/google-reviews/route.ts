import { NextResponse } from 'next/server';
import { fetchGoogleBusinessReviews } from '@/lib/google-reviews';

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await fetchGoogleBusinessReviews();
    return NextResponse.json(
      { data, message: 'Google reviews fetched successfully' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load Google reviews.';
    const status = message.includes('not configured') ? 503 : 502;

    return NextResponse.json({ error: message, data: null }, { status });
  }
}
