import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { sendBookingEmail } from '@/lib/mail';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional()
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten(), message: 'Invalid email or name.' },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    await connectDB();

    await Newsletter.findOneAndUpdate(
      { email },
      { $set: { email, name, source: 'homepage' } },
      { upsert: true, new: true }
    );

    const ownerEmail = 'diviensimparna@gmail.com';
    const subject = 'New newsletter subscription';
    const html = `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
      ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
      <p>Source: homepage newsletter box.</p>
    `;

    await sendBookingEmail(ownerEmail, subject, html);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('Newsletter API error:', err);
    return NextResponse.json(
      { error: 'Newsletter subscription failed', message },
      { status: 500 }
    );
  }
}

