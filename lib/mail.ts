import type { Fields } from "./contact";

/**
 * Contact-form delivery.
 *
 * Uses Resend's REST API directly over `fetch` — no SDK dependency. Configure:
 *
 *   RESEND_API_KEY      re_...  (from resend.com)
 *   CONTACT_TO_EMAIL    where enquiries land, e.g. studio@ateliernord.com
 *   CONTACT_FROM_EMAIL  a verified sender, e.g. "Atelier Nord <site@ateliernord.com>"
 *
 * If the mailer is unconfigured this throws rather than pretending to succeed,
 * so a misconfigured deploy surfaces immediately instead of dropping leads.
 * The one exception is local development, where it logs to the terminal.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function plainTextBody(f: Fields): string {
  return [
    `Name:    ${f.name}`,
    `Email:   ${f.email}`,
    `Company: ${f.company.trim() || "—"}`,
    "",
    "Project details:",
    f.message,
  ].join("\n");
}

export async function deliverContactMessage(fields: Fields): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] Mailer not configured — logging instead of sending.\n" +
          "Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to deliver for real.\n" +
          plainTextBody(fields),
      );
      return;
    }
    throw new Error(
      "Contact mailer is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).",
    );
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      // So hitting reply in the inbox answers the visitor, not the site.
      replyTo: fields.email,
      subject: `New enquiry — ${fields.name}`,
      text: plainTextBody(fields),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
