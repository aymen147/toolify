"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { TOOLS, CATEGORIES, type Tool } from "@/lib/tools";
import Input from "./Input";

interface SearchBarProps {
  /** "lg" used on homepage hero, "md" used in header. */
  size?: "md" | "lg";
  placeholder?: string;
  /** Show the keyboard hint chip (⌘K). */
  showHint?: boolean;
  /** Listen for the cmd/ctrl+K global hotkey and auto-focus on `/` keypress. */
  globalShortcut?: boolean;
  className?: string;
}

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function score(tool: Tool, q: string): number {
  const n = normalize(q);
  if (!n) return 0;
  const fields = [tool.name, tool.h1, tool.shortDescription, tool.tagline];
  let best = 0;
  for (const f of fields) {
    const nf = normalize(f);
    if (nf.startsWith(n)) best = Math.max(best, 3);
    else if (nf.includes(" " + n)) best = Math.max(best, 2);
    else if (nf.includes(n)) best = Math.max(best, 1);
  }
  return best;
}

export default function SearchBar({
  size = "md",
  placeholder = "Cherche un outil…",
  showHint = true,
  globalShortcut = false,
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return TOOLS
      .map((t) => ({ t, s: score(t, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.t);
  }, [q]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    if (!globalShortcut) return;
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [globalShortcut]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      if (q) {
        setQ("");
      } else {
        inputRef.current?.blur();
        setOpen(false);
      }
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const tool = results[active];
      if (tool) router.push(`/tools/${tool.slug}`);
    }
  }

  const showPanel = open && q.trim().length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      <Input
        ref={inputRef}
        inputSize={size}
        type="search"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls="search-listbox"
        aria-autocomplete="list"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        leading={<Search size={size === "lg" ? 20 : 16} aria-hidden />}
        trailing={
          q ? (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
              className="rounded-md p-1 text-fg-subtle hover:bg-sunken hover:text-fg"
            >
              <X size={14} />
            </button>
          ) : showHint ? (
            <kbd className="hidden items-center gap-1 rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[11px] font-mono text-fg-subtle sm:inline-flex">
              <span aria-hidden>⌘</span>K
            </kbd>
          ) : null
        }
      />

      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-lg border border-line bg-elevated shadow-pop">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-fg-subtle">
              Aucun outil ne correspond à « {q} ».
            </div>
          ) : (
            <ul
              id="search-listbox"
              role="listbox"
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto py-1"
            >
              {results.map((tool, i) => {
                const cat = CATEGORIES[tool.category];
                const ToolIcon = tool.icon;
                return (
                  <li key={tool.slug} role="option" aria-selected={i === active}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      className={
                        "flex items-center gap-3 px-3 py-2.5 text-sm " +
                        (i === active ? "bg-sunken" : "")
                      }
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${cat.bgClass}`}
                      >
                        <ToolIcon size={16} className={cat.inkClass} aria-hidden />
                      </span>
                      <span className="flex-1 truncate">
                        <span className="font-medium text-fg">{tool.name}</span>{" "}
                        <span className="text-fg-subtle">— {tool.shortDescription}</span>
                      </span>
                      <span className="hidden text-xs text-fg-subtle sm:inline">
                        {cat.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
