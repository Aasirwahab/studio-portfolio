"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Share sheet opened from the rail's share glyph (and the mobile menu).
 * The link is whatever page the visitor is on, read from the address bar at
 * open time — so it follows the site to any domain it is deployed on.
 */
export function ShareModal() {
  const { shareOpen, setShareOpen } = useLayout();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    if (!shareOpen) return;
    setUrl(window.location.href);
    setTitle(document.title);
    setCopied(false);
    setCanNative(typeof navigator !== "undefined" && typeof navigator.share === "function");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShareOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shareOpen, setShareOpen]);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: XIcon },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: LinkedInIcon },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FacebookIcon },
    { name: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`, icon: PinterestIcon },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: WhatsAppIcon },
    { name: "Email", href: `mailto:?subject=${t}&body=${u}`, icon: MailIcon },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the field is selectable */
    }
  };

  const native = async () => {
    try {
      await navigator.share({ title, url });
      setShareOpen(false);
    } catch {
      /* cancelled */
    }
  };

  // Strip the scheme so the field reads like a label, not a query string.
  const pretty = url.replace(/^https?:\/\//, "");

  return (
    <AnimatePresence>
      {shareOpen && (
        <motion.div
          className="fixed inset-0 z-115 grid place-items-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal
          aria-label="Share this page"
        >
          <button
            aria-label="Close share sheet"
            onClick={() => setShareOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", y: 24 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
            exit={{ clipPath: "inset(0 0 100% 0)", y: 12 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-md overflow-hidden bg-paper text-ink"
          >
            {/* Butter header band */}
            <div className="flex items-start justify-between gap-6 bg-sage px-7 pb-7 pt-8 sm:px-9">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-[3px] w-8 bg-ink" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">Share</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-none tracking-tightest sm:text-4xl">
                  Pass it along
                </h2>
              </div>
              <button
                onClick={() => setShareOpen(false)}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center border border-ink/20 transition-colors hover:bg-ink hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* The link */}
            <div className="border-b border-ink/10 px-7 py-5 sm:px-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">This page</p>
              <div className="mt-2 flex items-center gap-4">
                <p className="min-w-0 flex-1 truncate font-display text-lg font-semibold tracking-tight" title={url}>
                  {pretty}
                </p>
                <button
                  onClick={copy}
                  className="shrink-0 bg-green px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-green-700"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>

            {/* Platforms */}
            <ul className="grid grid-cols-3 gap-px bg-ink/10">
              {targets.map(({ name, href, icon: Icon }) => (
                <li key={name} className="bg-paper">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShareOpen(false)}
                    className="group flex flex-col items-center gap-3 px-3 py-6 transition-colors duration-300 hover:bg-ink hover:text-white"
                  >
                    <Icon />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{name}</span>
                  </a>
                </li>
              ))}
            </ul>

            {canNative && (
              <button
                onClick={native}
                className="flex w-full items-center justify-between border-t border-ink/10 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink sm:px-9"
              >
                More options <span aria-hidden>→</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const size = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

function XIcon() {
  return (
    <svg {...size}>
      <path d="M17.6 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.7 3h6.4l4.4 5.9L17.6 3zm-1.1 16.2h1.7L7 4.7H5.2l11.3 14.5z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg {...size}>
      <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg {...size}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg {...size}>
      <path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4-4.2-4-2.8 0-4.5 2.1-4.5 4.3 0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.3.1-1.3-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.4-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.8 2-1.2 2.6A10 10 0 1012 2z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg {...size}>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 001.8-1.2c.2-.6.2-1.1.2-1.2l-.5-.3z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg {...size} fill="none">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 6.5l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
