"use client";

import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import {
  buildPalette,
  hexToRgb,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsv,
} from "@/lib/color";

export default function ColorConverterTool() {
  const [hex, setHex] = useState("#2563eb");
  const [toast, setToast] = useState<string | null>(null);

  const values = useMemo(() => {
    const { r, g, b } = hexToRgb(hex);
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    return [
      { label: "HEX", value: hex.toUpperCase() },
      { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
      { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
      { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
      {
        label: "CMYK",
        value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      },
    ];
  }, [hex]);

  const palette = useMemo(() => {
    const { lighter, darker } = buildPalette(hex);
    return [...lighter.slice().reverse(), ...darker];
  }, [hex]);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${value} copié !`);
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[200px_1fr]">
        <div>
          <label
            htmlFor="color-input"
            className="mb-2 block text-[0.85rem] font-medium text-muted"
          >
            Choisis une couleur
          </label>
          <input
            id="color-input"
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-36 w-full cursor-pointer rounded-md border border-border bg-transparent"
          />
        </div>

        <div className="flex flex-col">
          {values.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => copy(item.value)}
              className="flex items-center justify-between gap-4 border-b border-borderSoft py-3 text-left transition-colors last:border-b-0 hover:bg-bg"
            >
              <span className="w-14 shrink-0 text-[0.8rem] font-semibold uppercase tracking-wide text-hint">
                {item.label}
              </span>
              <span className="flex-1 font-mono text-[0.95rem] text-ink">
                {item.value}
              </span>
              <Copy size={15} className="shrink-0 text-hint" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-2 text-[0.85rem] font-medium text-muted">
          Palette de nuances
        </div>
        <div className="grid grid-cols-10 overflow-hidden rounded-md border border-border">
          {palette.map((shade, i) => (
            <button
              key={`${shade}-${i}`}
              type="button"
              onClick={() => copy(shade.toUpperCase())}
              title={`${shade.toUpperCase()} — cliquer pour copier`}
              className="aspect-square w-full transition-transform hover:scale-110"
              style={{ backgroundColor: shade }}
            />
          ))}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[0.85rem] font-medium text-bg shadow-card"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
