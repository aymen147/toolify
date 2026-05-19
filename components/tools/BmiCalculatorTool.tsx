"use client";

import { useMemo, useState } from "react";

const CATEGORIES = [
  { max: 18.5, label: "Maigreur", color: "#2563eb" },
  { max: 25, label: "Corpulence normale", color: "#059669" },
  { max: 30, label: "Surpoids", color: "#d97706" },
  { max: 35, label: "Obésité modérée", color: "#ea580c" },
  { max: Infinity, label: "Obésité sévère", color: "#dc2626" },
];

export default function BmiCalculatorTool() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const h = parseFloat(height.replace(",", ".")) / 100;
    const w = parseFloat(weight.replace(",", "."));
    if (Number.isNaN(h) || Number.isNaN(w) || h <= 0 || w <= 0) return null;
    const bmi = w / (h * h);
    if (!Number.isFinite(bmi)) return null;
    const category =
      CATEGORIES.find((c) => bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1];
    return { bmi, category };
  }, [height, weight]);

  return (
    <div className="tool-panel mx-auto max-w-[640px] p-6 sm:p-8">
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label mb-2 block" htmlFor="bmi-h">
            Taille (cm)
          </label>
          <input
            id="bmi-h"
            type="number"
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="field-label mb-2 block" htmlFor="bmi-w">
            Poids (kg)
          </label>
          <input
            id="bmi-w"
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="65"
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="rounded-lg border border-cat-calc bg-cat-calc/40 p-6 text-center">
        <div className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-cat-calcInk">
          Ton IMC
        </div>
        <div className="mt-1.5 font-mono text-[2.6rem] font-bold leading-none text-ink">
          {result ? result.bmi.toLocaleString("fr-FR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }) : "—"}
        </div>
        {result && (
          <div
            className="mt-2.5 inline-block rounded-full px-3 py-1 text-[0.85rem] font-semibold"
            style={{
              backgroundColor: `${result.category.color}1f`,
              color: result.category.color,
            }}
          >
            {result.category.label}
          </div>
        )}
      </div>

      <p className="mt-4 text-[0.8rem] leading-relaxed text-hint">
        L&apos;IMC est un indicateur indicatif qui ne tient pas compte de la
        masse musculaire ni de la morphologie. Il ne remplace pas l&apos;avis
        d&apos;un professionnel de santé.
      </p>
    </div>
  );
}
