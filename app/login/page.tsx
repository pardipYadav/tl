'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@divinesimparnaholidays.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError('Invalid credentials');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-1 text-sm text-slate-600">Access bookings, wishlist, and personalized dashboard.</p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-lg border p-3" placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-lg border p-3" placeholder="Password" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-lg bg-brandBlue py-2 font-medium text-white">Sign In</button>
      </form>

      <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="mt-3 w-full rounded-lg border py-2 text-sm">
        Continue with Google
      </button>
    </div>
  );
}
