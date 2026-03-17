'use client';

import { useState } from 'react';

export default function AITripPlanner() {
  const [destination, setDestination] = useState('Bali');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('1L-2L');
  const [travelType, setTravelType] = useState('Honeymoon');
  const [plan, setPlan] = useState<string>('');

  const generatePlan = async () => {
    const res = await fetch('/api/ai-trip-planner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination, days, budget, travelType })
    });
    const data = await res.json();
    setPlan(data.data?.summary || 'Unable to generate plan.');
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold text-brandBlue">AI Trip Planner</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-lg border p-2" placeholder="Destination" />
        <input value={days} onChange={(e) => setDays(Number(e.target.value))} type="number" className="rounded-lg border p-2" placeholder="Days" />
        <input value={budget} onChange={(e) => setBudget(e.target.value)} className="rounded-lg border p-2" placeholder="Budget" />
        <input value={travelType} onChange={(e) => setTravelType(e.target.value)} className="rounded-lg border p-2" placeholder="Travel Type" />
      </div>
      <button onClick={generatePlan} className="mt-4 rounded-lg bg-brandBlue px-4 py-2 text-white">Generate Itinerary</button>
      {plan ? <p className="mt-3 text-sm text-slate-700">{plan}</p> : null}
    </div>
  );
}
