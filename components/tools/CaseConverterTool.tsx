"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";

function splitWords(text: string): string[] {
  return text
    .replace(/([a-zà-ÿ0-9])([A-ZÀ-Ÿ])/g, "$1 $2")
    .split(/[^a-zA-ZÀ-ÿ0-9]+/)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const CONVERSIONS: { key: string; label: string; fn: (t: string) => string }[] =
  [
    { key: "upper", label: "MAJUSCULES", fn: (t) => t.toUpperCase() },
    { key: "lower", label: "minuscules", fn: (t) => t.toLowerCase() },
    {
      key: "title",
      label: "Title Case",
      fn: (t) =>
        t
          .toLowerCase()
          .replace(/(^|\s)(\S)/gu, (_m, sep, c) => sep + c.toUpperCase()),
    },
    {
      key: "sentence",
      label: "Sentence case",
      fn: (t) =>
        t
          .toLowerCase()
          .replace(/(^\s*|[.!?…]\s+)(\S)/gu, (_m, sep, c) =>
            sep + c.toUpperCase(),
          ),
    },
    {
      key: "camel",
      label: "camelCase",
      fn: (t) =>
        splitWords(t)
          .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
          .join(""),
    },
    {
      key: "pascal",
      label: "PascalCase",
      fn: (t) => splitWords(t).map(capitalize).join(""),
    },
    {
      key: "snake",
      label: "snake_case",
      fn: (t) =>
        splitWords(t)
          .map((w) => w.toLowerCase())
          .join("_"),
    },
    {
      key: "kebab",
      label: "kebab-case",
      fn: (t) =>
        splitWords(t)
          .map((w) => w.toLowerCase())
          .join("-"),
    },
  ];

export default function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!mode) return input;
    const conversion = CONVERSIONS.find((c) => c.key === mode);
    return conversion ? conversion.fn(input) : input;
  }, [input, mode]);

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden tool-panel">
        <div className="border-b border-borderSoft px-5 py-3.5 text-[0.85rem] font-medium text-muted">
          Ton texte
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Colle ou écris ton texte ici..."
          className="min-h-[160px] w-full resize-y bg-surface p-5 text-base leading-relaxed outline-none placeholder:text-[#a3a3a3]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CONVERSIONS.map((conversion) => (
          <button
            key={conversion.key}
            type="button"
            onClick={() => setMode(conversion.key)}
            className={`rounded-sm border px-3 py-2.5 text-[0.85rem] font-medium transition-colors ${
              mode === conversion.key
                ? "border-ink bg-ink text-bg"
                : "border-border bg-surface text-ink hover:border-ink"
            }`}
          >
            {conversion.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden tool-panel">
        <div className="flex items-center justify-between border-b border-borderSoft px-5 py-3.5">
          <span className="text-[0.85rem] font-medium text-muted">
            Résultat
          </span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-[0.8rem] text-muted transition-colors hover:bg-bg hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copié !" : "Copier le résultat"}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Le texte converti apparaîtra ici."
          className="min-h-[160px] w-full resize-y bg-bg p-5 text-base leading-relaxed outline-none placeholder:text-[#a3a3a3]"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          setInput("");
          setMode(null);
        }}
        disabled={!input}
        className="inline-flex w-fit items-center gap-1.5 text-[0.85rem] font-medium text-hint transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={14} />
        Tout effacer
      </button>
    </div>
  );
}
