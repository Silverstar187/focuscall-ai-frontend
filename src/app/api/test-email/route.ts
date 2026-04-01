import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ⚠️ SECURITY WARNING: Never commit real API keys to git!
// This is for testing only. Use process.env.RESEND_API_KEY in production.
const resend = new Resend('re_NFznWM1W_QNZ8NdHrQkSoPNyGHyB9qYoB');

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'oliver.spitzkat@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
