import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';
import Booking from '@/models/Booking';
import Blog from '@/models/Blog';
import Inquiry from '@/models/Inquiry';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') redirect('/');

  await connectDB();
  const [packagesCount, bookingsCount, blogsCount, inquiriesCount] = await Promise.all([
    Package.countDocuments(),
    Booking.countDocuments(),
    Blog.countDocuments(),
    Inquiry.countDocuments()
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-card">Packages: {packagesCount}</div>
        <div className="rounded-2xl bg-white p-5 shadow-card">Bookings: {bookingsCount}</div>
        <div className="rounded-2xl bg-white p-5 shadow-card">Blogs: {blogsCount}</div>
        <div className="rounded-2xl bg-white p-5 shadow-card">Inquiries: {inquiriesCount}</div>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold">Admin Actions</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          <li>Add / edit packages</li>
          <li>Upload images to Cloudinary</li>
          <li>Manage bookings and inquiries</li>
          <li>Create and publish blog posts</li>
          <li>Monitor analytics and conversion trends</li>
        </ul>
      </div>
    </div>
  );
}
