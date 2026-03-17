import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/api/auth/signin');

  await connectDB();
  const bookings = await Booking.find({ user: session.user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold">My Bookings</h2>
        <div className="mt-4 space-y-3">
          {bookings.length ? (
            bookings.map((booking) => (
              <div key={booking._id.toString()} className="rounded-xl border p-4">
                <p className="font-medium">{booking.destination}</p>
                <p className="text-sm text-slate-600">Status: {booking.status} | Payment: {booking.paymentStatus}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">No bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
