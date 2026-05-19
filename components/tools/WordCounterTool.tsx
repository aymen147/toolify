"use client";

import { useMemo, useState } from "react";
import { Check, Clock, Copy, Mic, Trash2 } from "lucide-react";
import { formatNumber } from "@/lib/format";

function computeStats(text: string) {
  const trimmed = text.trim();
  return {
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: trimmed
      ? trimmed
          .split(/[.!?…]+/)
          .map((s) => s.trim())
          .filter(Boolean).length
      : 0,
    paragraphs: trimmed
      ? trimmed
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean).length
      : 0,
  };
}

function estimate(words: number, wordsPerMinute: number): string {
  if (words === 0) return "0 min";
  return `${Math.max(1, Math.round(words / wordsPerMinute))} min`;
}

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => computeStats(text), [text]);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const statRows = [
    { label: "Caractères", value: stats.characters },
    { label: "Sans espaces", value: stats.charactersNoSpaces },
    { label: "Phrases", value: stats.sentences },
    { label: "Paragraphes", value: stats.paragraphs },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col overflow-hidden tool-panel">
        <div className="flex items-center justify-between border-b border-borderSoft px-5 py-3.5">
          <span className="text-[0.85rem] font-medium text-muted">
            Ton texte
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-[0.8rem] text-muted transition-colors hover:bg-bg hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copié !" : "Copier"}
            </button>
            <button
              type="button"
              onClick={() => setText("")}
              disabled={!text}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-[0.8rem] text-muted transition-colors hover:bg-bg hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={13} />
              Vider
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            "Commence à écrire ou colle ton texte ici...\n\nLes statistiques se mettent à jour automatiquement à chaque caractère que tu tapes."
          }
          className="min-h-[460px] w-full resize-y bg-surface p-6 text-base leading-relaxed text-ink outline-none placeholder:text-[#a3a3a3]"
        />
      </div>

      <aside className="h-fit tool-panel p-6 lg:sticky lg:top-24">
        <h2 className="mb-5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-hint">
          Statistiques
        </h2>

        <div className="flex items-center justify-between border-b border-borderSoft py-3.5">
          <span className="text-[0.9rem] text-muted">Mots</span>
          <span className="font-mono text-[1.5rem] font-semibold text-cat-textInk">
            {formatNumber(stats.words)}
          </span>
        </div>

        {statRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-borderSoft py-3.5 last:border-b-0"
          >
            <span className="text-[0.9rem] text-muted">{row.label}</span>
            <span className="font-mono text-[1.05rem] font-semibold">
              {formatNumber(row.value)}
            </span>
          </div>
        ))}

        <div className="mt-5 border-t border-borderSoft pt-5">
          <div className="mb-2 text-[0.78rem] uppercase tracking-[0.08em] text-hint">
            Estimation
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[0.88rem] text-muted">
              <Clock size={14} className="text-[#a3a3a3]" />
              Lecture
            </span>
            <span className="font-mono text-[0.9rem] font-semibold">
              {estimate(stats.words, 200)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[0.88rem] text-muted">
              <Mic size={14} className="text-[#a3a3a3]" />
              Parole
            </span>
            <span className="font-mono text-[0.9rem] font-semibold">
              {estimate(stats.words, 130)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
