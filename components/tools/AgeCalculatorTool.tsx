"use client";

import { useMemo, useState } from "react";

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default function AgeCalculatorTool() {
  const [birth, setBirth] = useState("");

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    const now = new Date();
    if (Number.isNaN(b.getTime()) || b > now) return null;

    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    let days = now.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      days += daysInMonth(now.getFullYear(), now.getMonth() - 1);
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - b.getTime()) / 86400000);
    return { years, months, days, totalDays };
  }, [birth]);

  const stats = result
    ? [
        { value: result.years, label: result.years > 1 ? "ans" : "an" },
        { value: result.months, label: "mois" },
        { value: result.days, label: result.days > 1 ? "jours" : "jour" },
      ]
    : [];

  return (
    <div className="tool-panel mx-auto max-w-[640px] p-6 sm:p-8">
      <div className="mb-7">
        <label className="field-label mb-2 block" htmlFor="age-date">
          Date de naissance
        </label>
        <input
          id="age-date"
          type="date"
          value={birth}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full rounded-md border border-border bg-bg px-4 py-3 font-mono text-[1.05rem] outline-none focus:border-ink"
        />
      </div>

      <div className="rounded-lg border border-cat-calc bg-cat-calc/40 p-6 text-center">
        <div className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-cat-calcInk">
          Âge exact
        </div>
        {result ? (
          <>
            <div className="mt-3 flex items-end justify-center gap-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[2.4rem] font-bold leading-none text-ink">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[0.82rem] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-cat-calcInk/20 pt-3 text-[0.9rem] text-muted">
              soit{" "}
              <span className="font-semibold text-ink">
                {result.totalDays.toLocaleString("fr-FR")}
              </span>{" "}
              jours vécus
            </div>
          </>
        ) : (
          <div className="mt-1.5 font-mono text-[2.6rem] font-bold leading-none text-ink">
            —
          </div>
        )}
      </div>
    </div>
  );
}
