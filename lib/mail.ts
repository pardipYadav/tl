import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string; skipped?: boolean };

let cachedTransporter: Transporter | null = null;
let cachedConfigKey = '';

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    return null;
  }

  return { host, user, pass, port };
}

function getTransporter(): Transporter | null {
  const config = getSmtpConfig();
  if (!config) return null;

  const configKey = `${config.host}:${config.port}:${config.user}`;
  if (cachedTransporter && cachedConfigKey === configKey) {
    return cachedTransporter;
  }

  cachedConfigKey = configKey;
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: {
      user: config.user,
      pass: config.pass
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  return cachedTransporter;
}

function stripEnvQuotes(value: string | undefined): string {
  const v = value?.trim() || '';
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1).trim();
  }
  return v;
}

function normalizeEmailList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const parts = Array.isArray(value) ? value : value.split(',');
  return Array.from(
    new Set(
      parts
        .map((p) => stripEnvQuotes(p).toLowerCase())
        .filter((p) => p.includes('@'))
    )
  );
}

/** Primary notification inboxes for contact/booking alerts (deduped). */
export function getAdminNotifyEmails(): string[] {
  const emails = normalizeEmailList([
    process.env.SMTP_ADMIN_TO || '',
    process.env.CONTACT_NOTIFY_EMAIL || '',
    // Always keep a copy on the Zoho mailbox so delivery can be verified in Sent/Inbox
    process.env.SMTP_USER || ''
  ]);

  if (emails.length === 0) {
    return ['divinesimparna@gmail.com'];
  }

  return emails;
}

/** @deprecated Prefer getAdminNotifyEmails */
export function getAdminNotifyEmail(): string {
  return getAdminNotifyEmails()[0];
}

export function isMailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

/**
 * Provider-agnostic email sender (Nodemailer + SMTP).
 * Swap SMTP_* env vars (or later add a Resend branch) without changing call sites.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const transporter = getTransporter();
  if (!transporter) {
    const message = 'SMTP env is missing (SMTP_HOST, SMTP_USER, SMTP_PASS); skipping email send';
    console.warn(message);
    return { ok: false, error: message, skipped: true };
  }

  const from =
    stripEnvQuotes(process.env.SMTP_FROM) ||
    stripEnvQuotes(process.env.SMTP_USER) ||
    undefined;
  const to = normalizeEmailList(input.to);

  if (!from || to.length === 0) {
    return { ok: false, error: 'Missing from/to address for email send' };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo
    });

    console.info('sendEmail ok', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      to
    });

    if (info.rejected && info.rejected.length > 0 && (!info.accepted || info.accepted.length === 0)) {
      return { ok: false, error: `All recipients rejected: ${info.rejected.join(', ')}` };
    }

    return { ok: true, messageId: info.messageId };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Failed to send email';
    console.error('sendEmail failed:', error);
    return { ok: false, error };
  }
}

/** @deprecated Prefer sendEmail — kept for existing booking/newsletter callers. */
export async function sendBookingEmail(to: string, subject: string, html: string) {
  const result = await sendEmail({ to, subject, html });
  if (!result.ok && !result.skipped) {
    throw new Error(result.error);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildContactInquiryEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  numberOfDays: number;
}) {
  const fullName = escapeHtml(data.fullName);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const destination = escapeHtml(data.destination);
  const days = String(data.numberOfDays);

  const subject = `New Contact Inquiry — ${data.destination} (${days} days)`;
  const text = [
    'New Contact Us inquiry',
    '',
    `Full Name: ${data.fullName}`,
    `Email Address: ${data.email}`,
    `Contact Number: ${data.phone}`,
    `Destination: ${data.destination}`,
    `Number of Days: ${data.numberOfDays}`,
    '',
    `Submitted at: ${new Date().toISOString()}`
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0B2548;max-width:560px">
      <h2 style="margin:0 0 12px;color:#0B2548">New Contact Us Inquiry</h2>
      <p style="margin:0 0 16px;color:#475569">A visitor submitted the inquiry form on Divine Simparna Holidays.</p>
      <table style="border-collapse:collapse;width:100%">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:600;width:40%">Full Name</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:600">Email Address</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:600">Contact Number</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:600">Destination</td>
          <td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${destination}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600">Number of Days</td>
          <td style="padding:8px 0">${days}</td>
        </tr>
      </table>
    </div>
  `;

  return { subject, html, text };
}
