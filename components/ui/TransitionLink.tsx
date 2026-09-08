"use client";

import { useLayout } from "@/context/LayoutContext";
import type { AnchorHTMLAttributes } from "react";

interface TransitionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Drop-in replacement for next/link that routes internal navigation through
 * the curtain transition (cover → swap → reveal). External links, new-tab
 * clicks and modifier-clicks fall through to default anchor behaviour.
 */
export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const { transitionTo } = useLayout();

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // let the browser handle new-tab / external / modified clicks
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        )
          return;
        if (!href.startsWith("/")) return;
        e.preventDefault();
        transitionTo(href, { x: e.clientX, y: e.clientY });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
