"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "light" | "dark";

function getInitial(): Mode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Mode | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(mode: Mode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.classList.toggle("light", mode === "light");
  localStorage.setItem("theme", mode);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitial();
    setMode(initial);
    apply(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    apply(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted hover:bg-sunken hover:text-fg"
    >
      {mounted && mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
