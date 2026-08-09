import nodemailer from "nodemailer";

// Email configuration from environment variables.
// Gmail app password SMTP (same credentials used in Supabase Auth):
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_USER=<your gmail>
//   SMTP_PASS=<app password>
//   EMAIL_FROM="Help Is on the Way <chrisengada@gmail.com>"

function transporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  const transport = transporter();
  if (!transport) {
    console.error(
      "Email not configured: SMTP_USER / SMTP_PASS env vars are missing."
    );
    return { ok: false as const, error: "Email service is not configured." };
  }

  const from =
    process.env.EMAIL_FROM || "Help Is on the Way <chrisengada@gmail.com>";

  try {
    const info = await transport.sendMail({ from, to, subject, html, text });
    return { ok: true as const, id: info.messageId };
  } catch (err) {
    console.error("Failed to send email:", err);
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}

// Plain-text fallback generator for accessibility/spam filters.
export function textFromHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
