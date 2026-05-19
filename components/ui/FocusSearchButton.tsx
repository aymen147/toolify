"use client";

import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";

interface FocusSearchButtonProps {
  targetId?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Hero CTA — scrolls to the live search and focuses its input. Keeps the
 * homepage as a single conversion path: read the headline → find a tool.
 */
export default function FocusSearchButton({
  targetId = "tool-search",
  className = "",
  children,
}: FocusSearchButtonProps) {
  function onClick() {
    const root = document.getElementById(targetId);
    if (!root) return;
    root.scrollIntoView({ behavior: "smooth", block: "start" });
    const input = root.querySelector<HTMLInputElement>('input[type="search"]');
    // Wait a tick so scroll settles before focus on mobile.
    setTimeout(() => input?.focus(), 250);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex h-12 items-center gap-2 rounded-lg bg-accent px-6 text-base font-medium text-accent-fg transition-colors duration-fast ease-out hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
        className
      }
    >
      {children}
      <ArrowDown size={16} aria-hidden />
    </button>
  );
}
