import { TransitionLink } from "@/components/ui/TransitionLink";
import { Logo } from "./Logo";
import { NAV_LINKS, SOCIALS, COMPANY } from "@/lib/site";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div className="space-y-6">
            <Logo tone="light" />
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              A creative studio for fashion, beauty and lifestyle brands —
              shaping identities, art-directing campaigns and seeing every
              launch through from mood board to final frame.
            </p>
            <ArrowLink href="/contact" tone="light">
              Start a project
            </ArrowLink>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sage">
              Sitemap
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <TransitionLink
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-sage"
                  >
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sage">
              Connect
            </h4>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-sage"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/70">{COMPANY.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <span>{COMPANY.address}</span>
        </div>
      </div>
    </footer>
  );
}
