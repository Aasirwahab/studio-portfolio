import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY, SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Atelier Nord",
  description:
    "Tell us about your brand and what's coming next. Atelier Nord will send back a first creative direction within two weeks.",
};

export default function ContactPage() {
  return (
    <section className="relative bg-paper pt-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — info + dark panel */}
        <div className="flex flex-col justify-between gap-12 bg-ink px-5 py-16 text-white sm:px-10 lg:px-12 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-sage" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                Contact
              </span>
            </div>
            <AnimatedText
              as="h1"
              text="Let's start a project"
              className="font-display text-5xl font-extrabold leading-[0.92] tracking-tightest sm:text-6xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">
                Tell us about your brand and what's coming next. We'll respond
                with a first creative direction within two weeks.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="space-y-6">
            <InfoRow label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <InfoRow label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone}`} />
            <InfoRow label="Studio" value={COMPANY.address} />
            <div className="flex gap-6 pt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-sage"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={0.15}>
            <div className="relative h-44 overflow-hidden rounded-xs border border-white/10 bg-ink-900">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,92,53,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,53,0.28) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="relative mx-auto block h-4 w-4 rounded-full bg-sage">
                  <span className="absolute inset-0 rounded-full bg-sage motion-safe:animate-pulse-ring" />
                </span>
                <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {COMPANY.address}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — form */}
        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
          <Reveal>
            <h2 className="mb-10 font-display text-2xl font-extrabold tracking-tight text-ink">
              Send us a message
            </h2>
          </Reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-sage">
        {label}
      </span>
      <span className="mt-1 block text-base text-white/85">{value}</span>
    </>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}
