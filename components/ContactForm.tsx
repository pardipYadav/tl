'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactInquirySchema } from '@/lib/validations';
import { z } from 'zod';
import { destinations } from '@/data/destinations';

type ContactFormValues = z.infer<typeof contactInquirySchema>;

const fieldClass =
  'w-full rounded-xl border border-[#e8e0d0] bg-white px-4 py-3 text-[15px] text-[#0B2548] outline-none transition placeholder:text-slate-400 focus:border-[#C4A053] focus:ring-2 focus:ring-[#C4A053]/25';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      numberOfDays: 5
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle');
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const body = (await res.json().catch(() => null)) as {
        message?: string;
        error?: unknown;
      } | null;

      if (!res.ok) {
        setStatus('error');
        setMessage(body?.message || 'Unable to send your inquiry right now. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(body?.message || 'Thank you! Your inquiry has been sent.');
      reset({
        fullName: '',
        email: '',
        phone: '',
        destination: '',
        numberOfDays: 5
      });
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-[#e8e0d0] bg-white p-6 shadow-card md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-[#0B2548]">
            Full Name
          </label>
          <input
            id="fullName"
            {...register('fullName')}
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClass}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#0B2548]">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[#0B2548]">
            Contact Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label htmlFor="destination" className="mb-1.5 block text-sm font-semibold text-[#0B2548]">
            Destination
          </label>
          <input
            id="destination"
            list="destination-options"
            {...register('destination')}
            placeholder="e.g. Dubai, Bali, Himachal"
            className={fieldClass}
            aria-invalid={Boolean(errors.destination)}
          />
          <datalist id="destination-options">
            {destinations.map((d) => (
              <option key={d.slug} value={d.name} />
            ))}
          </datalist>
          {errors.destination ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.destination.message}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2 sm:max-w-xs">
          <label htmlFor="numberOfDays" className="mb-1.5 block text-sm font-semibold text-[#0B2548]">
            Number of Days for the Trip
          </label>
          <input
            id="numberOfDays"
            type="number"
            min={1}
            max={365}
            {...register('numberOfDays', { valueAsNumber: true })}
            placeholder="5"
            className={fieldClass}
            aria-invalid={Boolean(errors.numberOfDays)}
          />
          {errors.numberOfDays ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.numberOfDays.message}</p>
          ) : null}
        </div>
      </div>

      {status !== 'idle' && message ? (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm ${
            status === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#0B2548] px-6 py-3.5 text-[14px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#143861] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
      >
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
