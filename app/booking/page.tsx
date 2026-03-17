import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Book Your Tour | Divine Simparna Holidays',
  description: 'Submit your travel booking request for domestic and international tours.'
};

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-center text-4xl font-bold">Start Your Booking</h1>
      <p className="text-center text-slate-600">Fill out your travel details and our team will share a personalized quote.</p>
      <BookingForm />
    </div>
  );
}
