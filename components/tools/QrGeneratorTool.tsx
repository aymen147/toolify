"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const SIZES = [200, 400, 800];

export default function QrGeneratorTool() {
  const [text, setText] = useState("https://toolify.fr");
  const [size, setSize] = useState(400);
  const [fg, setFg] = useState("#0a0a0a");
  const [bg, setBg] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!text.trim()) {
      setDataUrl("");
      setError(null);
      return;
    }
    (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, {
          width: 600,
          margin: 2,
          color: { dark: fg, light: bg },
        });
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de générer le QR code pour ce contenu.");
          setDataUrl("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, fg, bg]);

  async function downloadPng() {
    if (!text.trim()) return;
    const QRCode = (await import("qrcode")).default;
    const url = await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: { dark: fg, light: bg },
    });
    triggerDownload(url, `qr-code-${size}.png`);
  }

  async function downloadSvg() {
    if (!text.trim()) return;
    const QRCode = (await import("qrcode")).default;
    const svg = await QRCode.toString(text, {
      type: "svg",
      width: size,
      margin: 2,
      color: { dark: fg, light: bg },
    });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "qr-code.svg");
    URL.revokeObjectURL(url);
  }

  function triggerDownload(href: string, filename: string) {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* Réglages */}
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="qr-text"
              className="mb-2 block text-[0.9rem] font-medium"
            >
              Texte ou URL
            </label>
            <textarea
              id="qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://exemple.com ou n'importe quel texte"
              className="min-h-[88px] w-full resize-y rounded-md border border-border bg-bg p-3 text-[0.95rem] outline-none focus:border-ink"
            />
          </div>

          <div>
            <span className="mb-2 block text-[0.9rem] font-medium">
              Taille du fichier
            </span>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 rounded-sm border px-3 py-2 text-[0.85rem] font-medium transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-bg"
                      : "border-border bg-surface hover:border-ink"
                  }`}
                >
                  {s}×{s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="qr-fg"
                className="mb-2 block text-[0.9rem] font-medium"
              >
                Couleur du code
              </label>
              <input
                id="qr-fg"
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-11 w-full cursor-pointer rounded-sm border border-border bg-transparent"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="qr-bg"
                className="mb-2 block text-[0.9rem] font-medium"
              >
                Couleur du fond
              </label>
              <input
                id="qr-bg"
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-11 w-full cursor-pointer rounded-sm border border-border bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Aperçu */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-border bg-bg p-5">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt="Aperçu du QR code"
              className="h-auto w-full max-w-[220px] rounded-sm"
            />
          ) : (
            <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-sm border border-dashed border-border text-center text-[0.85rem] text-hint">
              {error ?? "Saisis un texte pour générer le QR code"}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
        <button
          type="button"
          onClick={downloadPng}
          disabled={!dataUrl}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} />
          Télécharger PNG
        </button>
        <button
          type="button"
          onClick={downloadSvg}
          disabled={!dataUrl}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-surface px-8 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <Download size={16} />
          Télécharger SVG
        </button>
      </div>
    </div>
  );
}
