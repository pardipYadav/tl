import type { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Book Your Tour',
  description:
    'Start your travel booking with Divine Simparna Holidays. Share trip details for Dubai, Bali, Thailand, Maldives, Europe, Goa, Himachal and get a personalized tour quote.',
  path: '/booking',
  keywords: [
    'book tour online',
    'travel booking',
    'holiday enquiry',
    'custom tour package',
    'Divine Simparna booking'
  ]
});

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Breadcrumbs items={[{ name: 'Book a Trip', path: '/booking' }]} />
      <header className="text-center">
        <h1 className="text-4xl font-bold">Start Your Booking</h1>
        <p className="mt-2 text-slate-600">
          Fill out your travel details and our team will share a personalized quote.
        </p>
      </header>
      <BookingForm />
    </div>
  );
}
