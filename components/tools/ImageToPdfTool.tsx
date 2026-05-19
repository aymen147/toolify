"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, FileDown, Loader2, X } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface Item {
  id: string;
  file: File;
  url: string;
}

const PAGE_FORMATS = [
  { id: "a4", label: "A4" },
  { id: "letter", label: "Letter" },
];

const ORIENTATIONS = [
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Paysage" },
];

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("load error"));
    img.src = url;
  });
}

function toJpegDataUrl(img: HTMLImageElement): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.92);
}

export default function ImageToPdfTool() {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsRef = useRef<Item[]>([]);

  itemsRef.current = items;
  useEffect(() => {
    return () => itemsRef.current.forEach((it) => URL.revokeObjectURL(it.url));
  }, []);

  function handleFiles(files: File[]) {
    setItems((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((it) => it.id !== id);
    });
  }

  async function generate() {
    if (items.length === 0) return;
    setGenerating(true);
    setError(null);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: orientation as "portrait" | "landscape",
        unit: "pt",
        format,
      });
      const margin = 24;
      for (let i = 0; i < items.length; i++) {
        if (i > 0) doc.addPage(format, orientation as "portrait" | "landscape");
        const img = await loadImage(items[i].url);
        const pw = doc.internal.pageSize.getWidth();
        const ph = doc.internal.pageSize.getHeight();
        const ratio = Math.min(
          (pw - margin * 2) / img.naturalWidth,
          (ph - margin * 2) / img.naturalHeight,
        );
        const w = img.naturalWidth * ratio;
        const h = img.naturalHeight * ratio;
        doc.addImage(
          toJpegDataUrl(img),
          "JPEG",
          (pw - w) / 2,
          (ph - h) / 2,
          w,
          h,
        );
      }
      doc.save("toolify-images.pdf");
    } catch {
      setError("La génération du PDF a échoué. Vérifie tes images et réessaie.");
    } finally {
      setGenerating(false);
    }
  }

  if (items.length === 0) {
    return (
      <FileUpload
        accept="image/jpeg,image/png,image/webp"
        multiple
        maxSizeMB={50}
        onFiles={handleFiles}
        title="Dépose tes images ici"
        subtitle="ou clique pour en sélectionner plusieurs"
        formatsLabel="JPG · PNG · WebP · Plusieurs fichiers acceptés"
        buttonLabel="Choisir des images"
      />
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">
          {items.length} image{items.length > 1 ? "s" : ""}
        </h2>
      </div>

      <ul className="mb-6 flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-md border border-border bg-bg p-2.5"
          >
            <span className="w-5 text-center font-mono text-[0.8rem] text-hint">
              {index + 1}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt=""
              className="h-12 w-12 shrink-0 rounded-sm border border-border object-cover"
            />
            <span className="flex-1 truncate text-[0.9rem]">
              {item.file.name}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Monter"
                className="rounded-sm p-1.5 text-muted transition-colors hover:bg-borderSoft hover:text-ink disabled:opacity-30"
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Descendre"
                className="rounded-sm p-1.5 text-muted transition-colors hover:bg-borderSoft hover:text-ink disabled:opacity-30"
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label="Retirer"
                className="rounded-sm p-1.5 text-muted transition-colors hover:bg-borderSoft hover:text-cat-pdfInk"
              >
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <span className="mb-2 block text-[0.9rem] font-medium">Format</span>
          <div className="flex gap-2">
            {PAGE_FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                className={`flex-1 rounded-sm border px-3 py-2 text-[0.85rem] font-medium transition-colors ${
                  format === f.id
                    ? "border-ink bg-ink text-bg"
                    : "border-border bg-surface hover:border-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-2 block text-[0.9rem] font-medium">
            Orientation
          </span>
          <div className="flex gap-2">
            {ORIENTATIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOrientation(o.id)}
                className={`flex-1 rounded-sm border px-3 py-2 text-[0.85rem] font-medium transition-colors ${
                  orientation === o.id
                    ? "border-ink bg-ink text-bg"
                    : "border-border bg-surface hover:border-ink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-4 rounded-sm border border-cat-pdf bg-cat-pdf/40 px-4 py-2.5 text-[0.88rem] font-medium text-cat-pdfInk"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
        <button
          type="button"
          onClick={generate}
          disabled={generating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileDown size={18} />
          )}
          {generating ? "Génération…" : "Générer le PDF"}
        </button>
        <label className="cursor-pointer rounded-[10px] border border-border bg-surface px-5 py-3 text-center text-[0.95rem] font-medium text-ink transition-colors hover:border-ink">
          Ajouter des images
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(Array.from(e.target.files));
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}
