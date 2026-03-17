'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('Creating account...');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      setMessage('Unable to create account. Try another email.');
      return;
    }

    setMessage('Account created. Redirecting to login...');
    setTimeout(() => router.push('/login'), 900);
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full rounded-lg border p-3" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-lg border p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-lg border p-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        <button className="w-full rounded-lg bg-brandBlue py-2 text-white">Create Account</button>
      </form>
    </div>
  );
}
