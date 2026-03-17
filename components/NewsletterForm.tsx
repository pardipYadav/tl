'use client';

import { FormEvent, useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }

    setStatus('loading');
    setMessage('Subscribing...');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined })
      });

      if (!res.ok) {
        setStatus('error');
        const data = await res.json().catch(() => ({}));
        setMessage(data.message || data.error || 'Unable to subscribe right now. Please try again.');
        return;
      }

      setStatus('success');
      setMessage('You are subscribed to our newsletter.');
      setEmail('');
      setName('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
      <h3 className="text-2xl font-bold">Newsletter Subscription</h3>
      <p className="mt-3 text-slate-600">Get latest travel deals and destination guides.</p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            placeholder="Your name (optional)"
            className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-brandBlue"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-brandBlue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brandBlue px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>

        {message && (
          <p
            className={`text-xs ${
              status === 'success' ? 'text-emerald-600' : status === 'error' ? 'text-red-600' : 'text-slate-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

