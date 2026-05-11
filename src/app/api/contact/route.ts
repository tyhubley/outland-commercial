import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '@/data/site';

export const runtime = 'nodejs';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, message, company } = body as Record<string, string>;

    // Honeypot — bots tend to fill this hidden field
    if (company) return NextResponse.json({ ok: true });

    if (!name || !email) {
      return NextResponse.json({ error: 'Please provide your name and email.' }, { status: 400 });
    }

    if (!resend) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Mail service not configured.' }, { status: 500 });
    }

    const fromAddress = process.env.RESEND_FROM || 'OUTLAND Website <onboarding@resend.dev>';
    // RESEND_TO accepts a single address or a comma-separated list.
    // Every recipient receives the same email at once (Resend treats them
    // as standard To: recipients).
    const toAddresses = (process.env.RESEND_TO || SITE.email)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const subject = `New inquiry from ${name}`;
    const safe = (s: string | undefined) =>
      (s || '').replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] || c));
    const text =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || '-'}\n` +
      `Address: ${address || '-'}\n\n` +
      `Message:\n${message || '-'}\n`;
    const html =
      `<h2>New website inquiry</h2>` +
      `<p><strong>Name:</strong> ${safe(name)}</p>` +
      `<p><strong>Email:</strong> <a href="mailto:${safe(email)}">${safe(email)}</a></p>` +
      `<p><strong>Phone:</strong> ${safe(phone)}</p>` +
      `<p><strong>Address:</strong> ${safe(address)}</p>` +
      `<hr />` +
      `<p style="white-space:pre-wrap">${safe(message)}</p>`;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddresses,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error('Resend error', error);
      return NextResponse.json({ error: 'Could not send your message. Please try again or call us.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
