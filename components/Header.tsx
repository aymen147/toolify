"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORIES, getToolsByCategory, type ToolCategory } from "@/lib/tools";
import SearchBar from "@/components/ui/SearchBar";
import ThemeToggle from "@/components/ui/ThemeToggle";

const CATEGORY_ORDER: ToolCategory[] = ["image", "pdf", "text", "util", "design", "calc"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="site-shell flex w-full items-center gap-4 py-3 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Toolify — accueil"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-fg text-canvas">
            <span className="font-serif text-lg leading-none">T</span>
          </span>
          <span className="hidden font-semibold tracking-tight text-fg sm:inline">
            toolify
          </span>
        </Link>

        {/* Inline search — centered in available space so the header
            balances on wide screens (logo left / search center / nav right). */}
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="w-full max-w-xl">
            <SearchBar size="md" globalShortcut placeholder="Cherche un outil…" />
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden shrink-0 items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium text-fg-muted hover:bg-sunken hover:text-fg"
            >
              Catégories
              <ChevronDown size={14} aria-hidden />
            </button>
            {megaOpen && (
              <div className="absolute right-0 top-[calc(100%+4px)] z-40 w-[640px] rounded-xl border border-line bg-elevated p-5 shadow-pop">
                <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                  {CATEGORY_ORDER.map((c) => {
                    const meta = CATEGORIES[c];
                    const tools = getToolsByCategory(c).slice(0, 4);
                    return (
                      <div key={c}>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
                          {meta.label}
                        </p>
                        <ul className="space-y-1.5">
                          {tools.map((t) => (
                            <li key={t.slug}>
                              <Link
                                href={`/tools/${t.slug}`}
                                className="text-sm text-fg hover:text-accent"
                                onClick={() => setMegaOpen(false)}
                              >
                                {t.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/blog"
            className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-fg-muted hover:bg-sunken hover:text-fg"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-fg-muted hover:bg-sunken hover:text-fg"
          >
            À propos
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-fg md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line md:hidden">
          <div className="site-shell py-4">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
              Catégories
            </p>
            <ul className="mb-4 grid grid-cols-2 gap-1.5">
              {CATEGORY_ORDER.map((c) => (
                <li key={c}>
                  <Link
                    href={`/#cat-${c}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md border border-line px-3 py-2 text-sm text-fg hover:border-line-strong"
                  >
                    {CATEGORIES[c].label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <div className="flex gap-1">
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-fg-muted hover:bg-sunken hover:text-fg"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-fg-muted hover:bg-sunken hover:text-fg"
                >
                  À propos
                </Link>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
