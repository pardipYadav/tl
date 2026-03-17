import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { sendBookingEmail } from '@/lib/mail';
import { bookingSchema } from '@/lib/validations';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const session = await getServerSession(authOptions);

  const booking = await Booking.create({
    ...parsed.data,
    user: session?.user?.id || undefined,
    // Persist as a Date for easier status tracking and reporting.
    travelDate: new Date(parsed.data.travelDate)
  });

  await sendBookingEmail(
    parsed.data.email,
    'Booking Received - Divine Simparna Holidays',
    `<p>Dear ${parsed.data.fullName}, your booking request for ${parsed.data.destination} has been received.</p>`
  );

  if (process.env.SMTP_ADMIN_TO || process.env.SMTP_USER) {
    await sendBookingEmail(
      process.env.SMTP_ADMIN_TO || process.env.SMTP_USER || parsed.data.email,
      'New Booking Alert',
      `<p>New booking created by ${parsed.data.fullName} for ${parsed.data.destination}</p>`
    );
  }

  return NextResponse.json({ data: booking, message: 'Booking created successfully' }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().populate('package').sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: bookings });
}
