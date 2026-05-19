"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, FileDown, Loader2, X } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { formatBytes } from "@/lib/format";

interface Item {
  id: string;
  file: File;
}

export default function MergePdfTool() {
  const [items, setItems] = useState<Item[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: File[]) {
    setItems((prev) => [
      ...prev,
      ...files.map((file) => ({ id: crypto.randomUUID(), file })),
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
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  async function merge() {
    if (items.length < 2) {
      setError("Ajoute au moins deux fichiers PDF à fusionner.");
      return;
    }
    setMerging(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const item of items) {
        const bytes = await item.file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const out = await merged.save();
      const blob = new Blob([out as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "toolify-fusion.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(
        "La fusion a échoué. Un des fichiers est peut-être protégé ou endommagé.",
      );
    } finally {
      setMerging(false);
    }
  }

  if (items.length === 0) {
    return (
      <FileUpload
        accept="application/pdf,.pdf"
        multiple
        maxSizeMB={100}
        onFiles={handleFiles}
        title="Dépose tes fichiers PDF ici"
        subtitle="ou clique pour en sélectionner plusieurs"
        formatsLabel="PDF · Plusieurs fichiers acceptés"
        buttonLabel="Choisir des PDF"
      />
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">
          {items.length} fichier{items.length > 1 ? "s" : ""}
        </h2>
      </div>

      <ul className="mb-6 flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-md border border-border bg-bg p-3"
          >
            <span className="w-5 text-center font-mono text-[0.8rem] text-hint">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[0.9rem] font-medium">
                {item.file.name}
              </div>
              <div className="text-[0.78rem] text-hint">
                {formatBytes(item.file.size)}
              </div>
            </div>
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
          onClick={merge}
          disabled={merging}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {merging ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileDown size={18} />
          )}
          {merging ? "Fusion…" : "Fusionner les PDF"}
        </button>
        <label className="cursor-pointer rounded-[10px] border border-border bg-surface px-5 py-3 text-center text-[0.95rem] font-medium text-ink transition-colors hover:border-ink">
          Ajouter des PDF
          <input
            type="file"
            accept="application/pdf,.pdf"
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
