/**
 * Shared contact-form contract. Imported by both the client form and the
 * server action so the two can never disagree about what counts as valid.
 */

export interface Fields {
  name: string;
  email: string;
  company: string;
  message: string;
}

export type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generous ceilings — they exist to bound what reaches the mail API, not to
// police the visitor.
const MAX = { name: 120, email: 200, company: 160, message: 5000 } as const;

export const EMPTY_FIELDS: Fields = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function validate(values: Fields): Errors {
  const e: Errors = {};

  if (!values.name.trim()) e.name = "Please enter your name.";
  else if (values.name.length > MAX.name) e.name = "That name is too long.";

  if (!values.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email)) e.email = "That email looks off.";
  else if (values.email.length > MAX.email) e.email = "That email is too long.";

  if (values.company.length > MAX.company) e.company = "That company name is too long.";

  if (!values.message.trim() || values.message.trim().length < 10)
    e.message = "Tell us a little more (10+ characters).";
  else if (values.message.length > MAX.message)
    e.message = "That message is too long — please trim it a little.";

  return e;
}

/** Result handed back to the form. `fieldErrors` re-renders inline messages. */
export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Errors };
