import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Rate limiting store (in-memory, resets on server restart)
const submissionTimes: Map<string, number[]> = new Map();
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Sanitize input server-side
function sanitize(input: string): string {
  return input
    .replace(/[<>&"'/]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return entities[char] || char;
    })
    .trim();
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const times = submissionTimes.get(ip) || [];
  const recent = times.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS) {
    return false;
  }

  recent.push(now);
  submissionTimes.set(ip, recent);
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Te veel verzoeken. Probeer het later opnieuw.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse body
    const body = await request.json();
    const { name, email, company, message, csrf_token, timestamp } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Alle verplichte velden zijn vereist.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ success: false, message: 'Naam moet tussen 2 en 100 tekens zijn.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(email) || email.length > 254) {
      return new Response(JSON.stringify({ success: false, message: 'Ongeldig e-mailadres.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, message: 'Bericht moet tussen 10 en 2000 tekens zijn.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (company && company.length > 100) {
      return new Response(JSON.stringify({ success: false, message: 'Bedrijfsnaam is te lang.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for spam indicators (honeypot should be empty)
    if (body.website) {
      return new Response(JSON.stringify({ success: false, message: 'Verzoek geweigerd.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check timestamp (submissions too fast are likely bots)
    if (timestamp && Date.now() - timestamp < 1000) {
      return new Response(JSON.stringify({ success: false, message: 'Verzoek geweigerd.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedCompany = company ? sanitize(company) : 'Niet opgegeven';
    const sanitizedMessage = sanitize(message);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(import.meta.env.SMTP_PORT || '587'),
      secure: import.meta.env.SMTP_SECURE === 'true',
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Contact Form" <${import.meta.env.SMTP_FROM || import.meta.env.SMTP_USER}>`,
      to: 'hallo@iwanstepanova.com',
      replyTo: sanitizedEmail,
      subject: `Nieuw contactformulier bericht van ${sanitizedName}`,
      html: `
        <h2>Nieuw Contactformulier Bericht</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Naam</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitizedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitizedEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bedrijf</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitizedCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bericht</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitizedMessage.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Verzonden op: ${new Date().toLocaleString('nl-NL')}
        </p>
      `,
      text: `
Nieuw Contactformulier Bericht

Naam: ${sanitizedName}
Email: ${sanitizedEmail}
Bedrijf: ${sanitizedCompany}

Bericht:
${sanitizedMessage}

---
Verzonden op: ${new Date().toLocaleString('nl-NL')}
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Bericht succesvol verzonden.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Er is een fout opgetreden. Probeer het opnieuw.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
