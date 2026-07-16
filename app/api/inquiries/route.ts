import { NextResponse } from 'next/server';
import { contactInquirySchema } from '@/lib/validations';
import { tryConnectDB } from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import {
  buildContactInquiryEmail,
  getAdminNotifyEmails,
  isMailConfigured,
  sendEmail
} from '@/lib/mail';

/**
 * Legacy inquiries endpoint — forwards to the same contact-inquiry flow.
 * Prefer POST /api/contact for new clients.
 */
export async function POST(request: Request) {
  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = contactInquirySchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    if (isMailConfigured()) {
      const { subject, html, text } = buildContactInquiryEmail(data);
      await sendEmail({
        to: getAdminNotifyEmails(),
        subject,
        html,
        text,
        replyTo: data.email
      });
    }

    const conn = await tryConnectDB();
    if (!conn) {
      return NextResponse.json(
        { error: 'Database unavailable', message: 'Unable to save inquiry right now.' },
        { status: 503 }
      );
    }

    const inquiry = await Inquiry.create({
      ...data,
      name: data.fullName,
      message: `${data.destination} · ${data.numberOfDays} days`,
      source: 'inquiries',
      emailSent: isMailConfigured()
    });

    return NextResponse.json({ data: inquiry }, { status: 201 });
  } catch (err) {
    console.error('Inquiries API error:', err);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const conn = await tryConnectDB();
  if (!conn) {
    return NextResponse.json({ data: [] });
  }
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: inquiries });
}
