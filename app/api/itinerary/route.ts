import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { destinations = [], days = 5 } = await request.json();

  const plan = Array.from({ length: Number(days) }).map((_, index) => ({
    day: index + 1,
    destination: destinations[index % Math.max(destinations.length, 1)] || 'City Center',
    morning: 'Local sightseeing and guided walking tour',
    afternoon: 'Cultural attraction visit and local cuisine',
    evening: 'Leisure time and optional premium experience'
  }));

  return NextResponse.json({ data: plan });
}
