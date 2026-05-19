"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Download } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface Swatch {
  hex: string;
  rgb: string;
  textColor: string;
}

export default function ColorPaletteExtractorTool() {
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [colors, setColors] = useState<Swatch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(
    () => () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u)),
    [],
  );

  async function handleFiles(files: File[]) {
    const file = files[0];
    const url = URL.createObjectURL(file);
    urlsRef.current.push(url);
    setFileName(file.name);
    setError(null);

    const img = new Image();
    img.onload = async () => {
      try {
        const { getPaletteSync } = await import("colorthief");
        const palette = getPaletteSync(img, { colorCount: 8 });
        if (!palette || palette.length === 0) {
          setError("Aucune couleur n'a pu être extraite de cette image.");
          return;
        }
        setColors(
          palette.map((c) => {
            const { r, g, b } = c.rgb();
            return {
              hex: c.hex().toUpperCase(),
              rgb: `rgb(${r}, ${g}, ${b})`,
              textColor: c.textColor,
            };
          }),
        );
        setImageUrl(url);
      } catch {
        setError("L'extraction des couleurs a échoué. Réessaie avec une autre image.");
      }
    };
    img.onerror = () => setError("Impossible de lire cette image.");
    img.src = url;
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${value} copié !`);
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }

  function reset() {
    setImageUrl("");
    setColors([]);
    setError(null);
  }

  function downloadPalette() {
    if (colors.length === 0) return;
    const block = 220;
    const canvas = document.createElement("canvas");
    canvas.width = block * colors.length;
    canvas.height = block;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    colors.forEach((c, i) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(i * block, 0, block, block);
      ctx.fillStyle = c.textColor;
      ctx.font = "600 22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(c.hex, i * block + block / 2, block - 28);
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "palette-toolify.png";
    link.click();
  }

  if (!imageUrl && !error) {
    return (
      <FileUpload
        accept="image/*"
        maxSizeMB={50}
        onFiles={handleFiles}
        title="Dépose ton image ici"
        subtitle="ou clique pour parcourir tes fichiers"
        formatsLabel="JPG · PNG · WebP · Max 50 MB"
        buttonLabel="Choisir une image"
      />
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      {error ? (
        <div className="text-center">
          <p role="alert" className="mb-4 text-[0.95rem] font-medium text-cat-pdfInk">
            {error}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-[10px] border border-border bg-surface px-5 py-2.5 text-[0.9rem] font-medium transition-colors hover:border-ink"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-[260px_1fr]">
            <div className="overflow-hidden rounded-md border border-border bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={fileName}
                className="h-48 w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => copy(c.hex)}
                  className="group overflow-hidden rounded-md border border-border text-left"
                >
                  <div
                    className="flex h-16 items-center justify-end p-2"
                    style={{ backgroundColor: c.hex }}
                  >
                    <Copy
                      size={14}
                      style={{ color: c.textColor }}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <div className="px-2 py-1.5">
                    <div className="font-mono text-[0.78rem] font-semibold">
                      {c.hex}
                    </div>
                    <div className="font-mono text-[0.7rem] text-hint">
                      {c.rgb}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
            <button
              type="button"
              onClick={downloadPalette}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90"
            >
              <Download size={18} />
              Télécharger la palette (PNG)
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-[10px] border border-border bg-surface px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink"
            >
              Nouvelle image
            </button>
          </div>
        </>
      )}

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
