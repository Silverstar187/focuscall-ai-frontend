import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, lang = 'de' } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 });
    }

    // NOTE: With onboarding@resend.dev, we can only send to the account owner
    // To send to users, verify domain at https://resend.com/domains
    const { data, error } = await resend.emails.send({
      from: 'FocusCall Waitlist <onboarding@resend.dev>',
      to: 'oliver.spitzkat@gmail.com',
      subject: `Neue Wartelisten-Anmeldung: ${email}`,
      html: `
        <h2>Neue Anmeldung auf der Warteliste</h2>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Sprache:</strong> ${lang}</p>
        <p><strong>Zeitpunkt:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>Hinweis: Um Bestätigungsmails an User zu senden, Domain bei Resend verifizieren.</em></p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to process' },
      { status: 500 }
    );
  }
}
