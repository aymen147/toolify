"use client";

import { useMemo, useState } from "react";

export default function DateDifferenceTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = new Date(start);
    const b = new Date(end);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;

    const from = a <= b ? a : b;
    const to = a <= b ? b : a;
    const totalDays = Math.round((to.getTime() - from.getTime()) / 86400000);

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { totalDays, years, months, days };
  }, [start, end]);

  return (
    <div className="tool-panel mx-auto max-w-[640px] p-6 sm:p-8">
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label mb-2 block" htmlFor="dd-start">
            Date de début
          </label>
          <input
            id="dd-start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="field-label mb-2 block" htmlFor="dd-end">
            Date de fin
          </label>
          <input
            id="dd-end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="rounded-lg border border-cat-calc bg-cat-calc/40 p-6 text-center">
        <div className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-cat-calcInk">
          Durée totale
        </div>
        <div className="mt-1.5 font-mono text-[2.6rem] font-bold leading-none text-ink">
          {result ? result.totalDays.toLocaleString("fr-FR") : "—"}
          {result && (
            <span className="ml-2 text-[1.1rem] font-medium text-muted">
              jour{Math.abs(result.totalDays) > 1 ? "s" : ""}
            </span>
          )}
        </div>
        {result && (
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-cat-calcInk/20 pt-4 text-[0.9rem] sm:grid-cols-2">
            <div>
              <span className="font-semibold text-ink">
                {(result.totalDays / 7).toLocaleString("fr-FR", {
                  maximumFractionDigits: 1,
                })}
              </span>{" "}
              <span className="text-muted">semaines</span>
            </div>
            <div>
              <span className="font-semibold text-ink">
                {result.years} a · {result.months} m · {result.days} j
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
