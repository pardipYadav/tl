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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold text-brandBlue">Book Your Tour</h3>
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

      {Object.keys(errors).length > 0 ? <p className="text-sm text-red-600">Please correct highlighted fields before submitting.</p> : null}
      {status ? <p className="text-sm text-brandBlue">{status}</p> : null}

      <button disabled={isSubmitting} className="w-full rounded-xl bg-brandBlue px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}
