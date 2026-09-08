"use client";

import { motion } from "framer-motion";
import { SOCIALS } from "@/lib/site";
import { useLayout } from "@/context/LayoutContext";

export const RAIL_WIDTH = 84; // px — kept in sync with the wrapper padding in layout
export const NAV_HEIGHT = 72; // px — green search cell height matches the navbar

/**
 * The signature right-edge column from the north-star screenshot: a single
 * fixed vertical strip whose TOP cell is the green search button and whose
 * body is the social rail — FACEBOOK / TWITTER / INSTAGRAM rotated 90°
 * with a share glyph pinned to the base. Desktop only; on smaller screens the
 * search lives in the nav and this rail is hidden.
 */
export function SocialRail() {
  const { setSearchOpen, setShareOpen } = useLayout();

  return (
    <aside
      aria-label="Search and social links"
      style={{ width: RAIL_WIDTH }}
      className="fixed right-0 top-0 z-95 hidden h-screen flex-col border-l border-ink/10 bg-paper lg:flex"
    >
      {/* Green search cell */}
      <button
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
        style={{ height: NAV_HEIGHT }}
        className="group grid shrink-0 place-items-center bg-green text-white transition-colors duration-300 hover:bg-green-700"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 ease-out-expo group-hover:scale-110"
        >
          <circle cx="9" cy="9" r="6.6" stroke="currentColor" strokeWidth="1.9" />
          <path
            d="M14 14l6 6"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Social body — white, so the column reads as part of the page */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-10 text-ink/70">
        {SOCIALS.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="vert-text text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 hover:text-green"
            whileHover={{ y: -4 }}
          >
            {s.label}
          </motion.a>
        ))}

        <button
          onClick={() => setShareOpen(true)}
          aria-label="Share this page"
          className="absolute bottom-6 grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-green hover:bg-green hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="3" cy="8" r="2" fill="currentColor" />
            <circle cx="13" cy="3" r="2" fill="currentColor" />
            <circle cx="13" cy="13" r="2" fill="currentColor" />
            <path
              d="M4.7 7L11.3 3.7M4.7 9l6.6 3.3"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
