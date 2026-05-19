"use client";

import { useMemo, useState } from "react";

type Mode = "of" | "ratio" | "change";

const MODES: { id: Mode; label: string }[] = [
  { id: "of", label: "% d'un nombre" },
  { id: "ratio", label: "Proportion" },
  { id: "change", label: "Variation" },
];

const FIELDS: Record<Mode, { a: string; b: string }> = {
  of: { a: "Pourcentage (%)", b: "Nombre" },
  ratio: { a: "Valeur", b: "Total" },
  change: { a: "Valeur initiale", b: "Valeur finale" },
};

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const { value, sentence } = useMemo(() => {
    const x = parseFloat(a.replace(",", "."));
    const y = parseFloat(b.replace(",", "."));
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return { value: null as number | null, sentence: "" };
    }
    if (mode === "of") {
      return {
        value: (x / 100) * y,
        sentence: `${formatResult(x)} % de ${formatResult(y)}`,
      };
    }
    if (mode === "ratio") {
      return {
        value: y === 0 ? NaN : (x / y) * 100,
        sentence: `${formatResult(x)} représente ce pourcentage de ${formatResult(y)}`,
      };
    }
    return {
      value: x === 0 ? NaN : ((y - x) / x) * 100,
      sentence: `variation de ${formatResult(x)} à ${formatResult(y)}`,
    };
  }, [mode, a, b]);

  const suffix = mode === "of" ? "" : " %";
  const fields = FIELDS[mode];

  return (
    <div className="tool-panel mx-auto max-w-[640px] p-6 sm:p-8">
      {/* Sélecteur de mode */}
      <div className="mb-7 grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setMode(m.id);
              setA("");
              setB("");
            }}
            className={`rounded-sm border px-2 py-2.5 text-[0.85rem] font-medium transition-colors ${
              mode === m.id
                ? "border-ink bg-ink text-bg"
                : "border-border bg-surface hover:border-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label mb-2 block" htmlFor="pct-a">
            {fields.a}
          </label>
          <input
            id="pct-a"
            type="number"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="0"
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="field-label mb-2 block" htmlFor="pct-b">
            {fields.b}
          </label>
          <input
            id="pct-b"
            type="number"
            inputMode="decimal"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="0"
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Résultat */}
      <div className="rounded-lg border border-cat-calc bg-cat-calc/40 p-6 text-center">
        <div className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-cat-calcInk">
          Résultat
        </div>
        <div className="mt-1.5 font-mono text-[2.6rem] font-bold leading-none text-ink">
          {value === null ? "—" : `${formatResult(value)}${suffix}`}
        </div>
        {value !== null && sentence && (
          <div className="mt-2 text-[0.9rem] text-muted">{sentence}</div>
        )}
      </div>
    </div>
  );
}
