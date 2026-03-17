'use client';

import { useState } from 'react';

export default function PaymentOptions({ amount }: { amount: number }) {
  const [message, setMessage] = useState('');

  const payWithStripe = async () => {
    setMessage('Creating Stripe payment intent...');
    const res = await fetch('/api/payments/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 })
    });

    if (!res.ok) {
      setMessage('Stripe is not configured yet. Add env keys to enable this.');
      return;
    }

    const data = await res.json();
    setMessage(data.clientSecret ? 'Stripe payment intent created. Connect frontend checkout for live transaction.' : 'Stripe failed.');
  };

  const payWithRazorpay = async () => {
    setMessage('Creating Razorpay order...');
    const res = await fetch('/api/payments/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 })
    });

    if (!res.ok) {
      setMessage('Razorpay is not configured yet. Add env keys to enable this.');
      return;
    }

    const data = await res.json();
    setMessage(data.data?.id ? 'Razorpay order created. Attach checkout.js for production payment flow.' : 'Razorpay failed.');
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold">Pay Online</h3>
      <p className="mt-1 text-sm text-slate-600">Supports cards, Google Pay, UPI, and wallet flows via Stripe/Razorpay checkout.</p>
      <div className="mt-4 grid gap-2">
        <button onClick={payWithStripe} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">Pay with Stripe</button>
        <button onClick={payWithRazorpay} className="rounded-lg bg-brandBlue px-4 py-2 text-sm font-medium text-white">Pay with Razorpay</button>
      </div>
      {message ? <p className="mt-3 text-xs text-slate-600">{message}</p> : null}
    </div>
  );
}
