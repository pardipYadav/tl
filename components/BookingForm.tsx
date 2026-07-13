'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/lib/validations';
import { z } from 'zod';

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm({ packageId, destination }: { packageId?: string; destination?: string }) {
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destination: destination || '',
      dateFlexibility: 'fixed',
      budgetRange: '50k-1L',
      travelers: 2
    }
  });

  const onSubmit = async (values: BookingFormValues) => {
    setStatus('Submitting...');
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, packageId })
    });

    if (!res.ok) {
      setStatus('Unable to submit booking right now.');
      return;
    }

    setStatus('Booking request submitted successfully. Our team will contact you shortly.');
    reset();
  };

  return (
    <div className="relative">
      {/* Temporarily unavailable */}
      <div className="pointer-events-none select-none blur-[2px] opacity-50 grayscale-[30%]" aria-hidden>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
          <h3 className="text-xl font-semibold text-[#0B2548]">Book Your Tour</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input {...register('fullName')} placeholder="Full Name" className="rounded-xl border p-3" />
            <input {...register('email')} placeholder="Email" className="rounded-xl border p-3" />
            <input {...register('phone')} placeholder="Phone" className="rounded-xl border p-3" />
            <input {...register('destination')} placeholder="Destination" className="rounded-xl border p-3" />
            <input type="number" {...register('travelers', { valueAsNumber: true })} placeholder="Travelers" className="rounded-xl border p-3" />
            <input type="date" {...register('travelDate')} className="rounded-xl border p-3" />
            <select {...register('dateFlexibility')} className="rounded-xl border p-3">
              <option value="fixed">Fixed Date</option>
              <option value="flexible">Flexible Date</option>
            </select>
            <select {...register('budgetRange')} className="rounded-xl border p-3">
              <option value="<50k">Less than 50k</option>
              <option value="50k-1L">50k - 1L</option>
              <option value="1L-2L">1L - 2L</option>
              <option value=">2L">Above 2L</option>
            </select>
          </div>

          <textarea {...register('message')} placeholder="Message" className="w-full rounded-xl border p-3" rows={4} />

          {Object.keys(errors).length > 0 ? (
            <p className="text-sm text-red-600">Please correct highlighted fields before submitting.</p>
          ) : null}
          {status ? <p className="text-sm text-[#0B2548]">{status}</p> : null}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#0B2548] px-4 py-3 font-medium text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[#0B2548]/25 backdrop-blur-[1px]">
        <div className="mx-4 rounded-2xl border border-[#C4A053]/50 bg-[#0B2548]/95 px-8 py-5 text-center shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4A053]">Coming Soon</p>
          <p className="mt-2 text-[15px] font-semibold text-white">Booking Form</p>
          <p className="mt-1 text-sm text-white/75">Online booking is temporarily unavailable.</p>
        </div>
      </div>
    </div>
  );
}
