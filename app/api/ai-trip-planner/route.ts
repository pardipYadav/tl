import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { destination, days, budget, travelType } = await request.json();

  // Template-based AI planner fallback. Replace with an LLM service in production.
  const plan = {
    summary: `A ${days}-day ${travelType} itinerary for ${destination} under budget ${budget}.`,
    tips: [
      'Book flights at least 30-45 days in advance for better rates.',
      'Keep one buffer day for weather or local transport delays.',
      'Buy local SIM/eSIM for easier navigation and communication.'
    ],
    itinerary: Array.from({ length: Number(days) || 3 }).map((_, i) => ({
      day: i + 1,
      title: `Day ${i + 1} in ${destination}`,
      activities: ['Local sightseeing', 'Popular attraction visit', 'Food exploration']
    }))
  };

  return NextResponse.json({ data: plan });
}
