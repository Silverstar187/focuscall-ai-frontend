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

    if (resend) {
      // Send confirmation email to user
      await resend.emails.send({
        from: 'FocusCall <noreply@focuscall.ai>',
        to: email,
        subject: lang === 'de' 
          ? 'Du bist auf der FocusCall Warteliste!' 
          : 'You\'re on the FocusCall waitlist!',
        html: lang === 'de' ? `
          <h2>Willkommen bei FocusCall!</h2>
          <p>Vielen Dank für dein Interesse. Du bist jetzt auf unserer Warteliste.</p>
          <p>Wir benachrichtigen dich, sobald der Early Access startet.</p>
          <br>
          <p>Beste Grüße,<br>Das FocusCall Team</p>
        ` : `
          <h2>Welcome to FocusCall!</h2>
          <p>Thank you for your interest. You're now on our waitlist.</p>
          <p>We'll notify you as soon as Early Access starts.</p>
          <br>
          <p>Best regards,<br>The FocusCall Team</p>
        `,
      });

      // Send notification to support
      await resend.emails.send({
        from: 'FocusCall Waitlist <noreply@focuscall.ai>',
        to: 'support@focuscall.ai',
        subject: `Neue Wartelisten-Anmeldung: ${email}`,
        html: `
          <h2>Neue Anmeldung auf der Warteliste</h2>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Sprache:</strong> ${lang}</p>
          <p><strong>Zeitpunkt:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } else {
      console.log('Waitlist signup (email not sent - no RESEND_API_KEY):', { email, lang });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to process' },
      { status: 500 }
    );
  }
}
