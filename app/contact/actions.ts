"use server";

import { validate, type Fields, type SubmitResult } from "@/lib/contact";
import { deliverContactMessage } from "@/lib/mail";

/**
 * Receives a contact enquiry. Re-validates on the server — the client checks
 * are for feedback, not trust — then delivers it. Only returns `ok` once the
 * message has actually gone somewhere.
 */
export async function sendContactMessage(fields: Fields): Promise<SubmitResult> {
  const clean: Fields = {
    name: (fields?.name ?? "").trim(),
    email: (fields?.email ?? "").trim(),
    company: (fields?.company ?? "").trim(),
    message: (fields?.message ?? "").trim(),
  };

  const fieldErrors = validate(clean);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    await deliverContactMessage(clean);
    return { ok: true };
  } catch (err) {
    // Log the real cause server-side; keep the visitor-facing copy generic.
    console.error("[contact] Delivery failed:", err);
    return {
      ok: false,
      message:
        "Something went wrong sending that. Please try again, or email us directly at studio@ateliernord.com.",
    };
  }
}
