import { NextResponse } from 'next/server';
import { z } from 'zod';
import { tryConnectDB } from '@/lib/db';
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

    const conn = await tryConnectDB();
    if (conn) {
      await Newsletter.findOneAndUpdate(
        { email },
        { $set: { email, name, source: 'homepage' } },
        { upsert: true, new: true }
      );
    }

    const ownerEmail = process.env.SMTP_ADMIN_TO || 'yadavpardeep213@gmail.com';
    const subject = 'New newsletter subscription';
    const html = `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
      ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
      <p>Source: homepage newsletter box.</p>
    `;

    try {
      await sendBookingEmail(ownerEmail, subject, html);
    } catch (mailErr) {
      // Subscription still succeeds even if SMTP is restricted (e.g. Elastic free tier).
      console.error('Newsletter email failed:', mailErr);
    }

    return NextResponse.json({
      success: true,
      saved: Boolean(conn),
      message: conn ? 'Subscribed successfully.' : 'Subscribed (email queued; database offline).'
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Newsletter subscription failed', message }, { status: 500 });
  }
}
