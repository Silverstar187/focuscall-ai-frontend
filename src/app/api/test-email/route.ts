import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  if (!resend) {
    return NextResponse.json({ success: false, error: 'RESEND_API_KEY not set' }, { status: 500 });
  }

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
