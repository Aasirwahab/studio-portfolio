"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { sendContactMessage } from "@/app/contact/actions";
import {
  EMPTY_FIELDS,
  validate,
  type Errors,
  type Fields,
} from "@/lib/contact";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function update<K extends keyof Fields>(key: K, value: string) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  }

  function blur(key: keyof Fields) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    setTouched({ name: true, email: true, company: true, message: true });
    if (Object.keys(eMap).length > 0) return;

    setFailure(null);
    startTransition(async () => {
      const result = await sendContactMessage(values);
      if (result.ok) {
        setSent(true);
        setValues(EMPTY_FIELDS);
        setTouched({});
        setErrors({});
      } else {
        // Only ever show success once the message has actually been delivered.
        setFailure(result.message);
        if (result.fieldErrors) setErrors(result.fieldErrors);
      }
    });
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={(v) => update("name", v)}
          onBlur={() => blur("name")}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={(v) => update("email", v)}
          onBlur={() => blur("email")}
        />
      </div>
      <Field
        label="Company (optional)"
        name="company"
        value={values.company}
        onChange={(v) => update("company", v)}
        onBlur={() => blur("company")}
      />
      <Field
        label="Project details"
        name="message"
        textarea
        value={values.message}
        error={touched.message ? errors.message : undefined}
        onChange={(v) => update("message", v)}
        onBlur={() => blur("message")}
      />

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <MagneticButton
          type="submit"
          disabled={pending}
          className="group flex items-center gap-4 bg-green px-9 py-5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
            →
          </span>
        </MagneticButton>

        <AnimatePresence mode="wait">
          {sent && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: EASE_OUT_EXPO }}
              className="text-sm font-semibold text-green-700"
              role="status"
            >
              ✓ Thanks — we&apos;ll be in touch within two weeks.
            </motion.p>
          )}
          {failure && (
            <motion.p
              key="failed"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: EASE_OUT_EXPO }}
              className="max-w-sm text-sm font-medium text-red-600"
              role="alert"
            >
              {failure}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "peer w-full border-b bg-transparent pb-3 pt-6 text-ink placeholder-transparent transition-colors focus:outline-hidden";
  const border = error
    ? "border-red-500"
    : "border-ink/20 focus:border-green";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          className={`${base} ${border}`}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-0 text-xs font-semibold uppercase tracking-[0.16em] text-ink/60 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/65 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-green-700"
      >
        {label}
      </label>
      {error && (
        <p className="mt-2 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
