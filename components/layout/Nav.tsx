"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV_HEIGHT } from "./SocialRail";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { NAV_LINKS } from "@/lib/site";
import { useLayout } from "@/context/LayoutContext";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Nav() {
  const pathname = usePathname();
  const { setSearchOpen, menuOpen, setMenuOpen } = useLayout();
  const [scrolled, setScrolled] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setDesktop(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // On the desktop home page the hero photograph runs up under the header,
  // so the logo goes white there; everywhere else it sits on white and is ink.
  const overPhoto = pathname === "/" && desktop && !scrolled;

  return (
    <>
      {/* The header is three fixed layers sharing one layout:
            1. a paper backdrop that appears on scroll — underneath, so the
               blend resolves against it there;
            2. the links in ink — they always sit on white (the home hero
               photo stays in the left column);
            3. the logo and the mobile buttons, unblended, keeping their true
               colours (the logo flips white over the home hero). */}
      <div
        aria-hidden
        style={{ height: NAV_HEIGHT }}
        className={`fixed inset-x-0 top-0 z-89 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "border-b border-ink/5 bg-paper shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-90 text-ink"
      >
        <nav style={{ height: NAV_HEIGHT }} className="lg:mr-[84px]">
          <div className="mx-auto flex h-full max-w-shell items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
            {/* Spacer keeping the links right-aligned; the logo lives in layer 3. */}
            <div aria-hidden className="h-7 w-7" />

            <ul className="hidden items-center gap-9 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <TransitionLink
                      href={link.href}
                      className="group relative text-[13px] font-semibold uppercase tracking-[0.14em] text-ink"
                    >
                      <span
                        className={`transition-opacity ${active ? "opacity-100" : "opacity-65 group-hover:opacity-100"}`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`absolute -bottom-1.5 left-0 h-[2px] bg-green transition-all duration-500 ease-out-expo ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </motion.header>

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-91"
      >
        <nav style={{ height: NAV_HEIGHT }} className="lg:mr-[84px]">
          <div className="mx-auto flex h-full max-w-shell items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
            <Logo
              tone={overPhoto ? "light" : "dark"}
              markPrimary={overPhoto ? "fill-sage" : "fill-green"}
              markSecondary={overPhoto ? "fill-white" : "fill-ink"}
              className="pointer-events-auto transition-colors duration-500"
            />

            {/* Mobile / tablet controls — on desktop search lives in the right rail */}
            <div className="pointer-events-auto flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="grid h-11 w-11 place-items-center bg-green text-white transition-colors hover:bg-green-700"
              >
                <SearchIcon />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="grid h-11 w-11 place-items-center bg-ink text-white"
              >
                <Burger open={menuOpen} />
              </button>
            </div>
          </div>
        </nav>
      </motion.div>

      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, setShareOpen } = useLayout();

  useEffect(() => {
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-80 flex flex-col bg-ink lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <div className="flex flex-1 flex-col justify-center gap-2 px-7">
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + i * 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="text-xs text-sage">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-4xl font-extrabold uppercase tracking-tight ${active ? "text-sage" : "text-white"}`}
                    >
                      {link.label}
                    </span>
                  </TransitionLink>
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-7 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Atelier Nord</span>
            <button
              onClick={() => {
                setMenuOpen(false);
                setShareOpen(true);
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage"
            >
              Share this page
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M11 11l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-3.5 w-5">
      <motion.span
        className="absolute left-0 block h-[2px] w-full bg-current"
        animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
        style={{ top: 0 }}
      />
      <motion.span
        className="absolute left-0 top-1.5 block h-[2px] w-full bg-current"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
      />
      <motion.span
        className="absolute left-0 block h-[2px] w-full bg-current"
        animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
        style={{ top: 12 }}
      />
    </div>
  );
}
