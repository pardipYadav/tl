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

export async function POST(request: Request) {
  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body', message: 'Invalid request.' }, { status: 400 });
    }

    const parsed = contactInquirySchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten(),
          message: 'Please correct the highlighted fields and try again.'
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error: 'Email service is not configured',
          message: 'Unable to send your inquiry right now. Please try again later or call us.'
        },
        { status: 503 }
      );
    }

    const { subject, html, text } = buildContactInquiryEmail(data);
    const mailResult = await sendEmail({
      to: getAdminNotifyEmails(),
      subject,
      html,
      text,
      replyTo: data.email
    });

    if (!mailResult.ok) {
      return NextResponse.json(
        {
          error: mailResult.error,
          message: 'We could not send your inquiry email. Please try again in a moment.'
        },
        { status: 502 }
      );
    }

    let saved = false;
    const conn = await tryConnectDB();
    if (conn) {
      try {
        await Inquiry.create({
          ...data,
          name: data.fullName,
          message: `${data.destination} · ${data.numberOfDays} days`,
          source: 'contact',
          emailSent: true
        });
        saved = true;
      } catch (dbErr) {
        // Email already sent — do not fail the user request if persistence fails.
        console.error('Contact inquiry DB save failed:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      saved,
      message: 'Thank you! Your inquiry has been sent. We will get back to you shortly.'
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Contact inquiry failed', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
