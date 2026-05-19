"use client";

import { useState } from "react";
import { CheckSquare, FileDown, Loader2, Square } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface PageThumb {
  pageNumber: number;
  dataUrl: string;
}

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: File[]) {
    const next = files[0];
    setFile(next);
    setLoading(true);
    setError(null);
    setPages([]);
    setSelected(new Set());
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const buffer = await next.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) })
        .promise;
      const thumbs: PageThumb[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: 220 / base.width });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        thumbs.push({ pageNumber: i, dataUrl: canvas.toDataURL() });
      }
      setPages(thumbs);
    } catch {
      setError(
        "Impossible de lire ce PDF. Il est peut-être protégé par un mot de passe ou endommagé.",
      );
      setFile(null);
    } finally {
      setLoading(false);
    }
  }

  function toggle(pageNumber: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(pageNumber)) next.delete(pageNumber);
      else next.add(pageNumber);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(pages.map((p) => p.pageNumber)));
  }

  function reset() {
    setFile(null);
    setPages([]);
    setSelected(new Set());
    setError(null);
  }

  async function extract() {
    if (!file || selected.size === 0) return;
    setExtracting(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const indices = [...selected].sort((a, b) => a - b).map((n) => n - 1);
      const copied = await out.copyPages(src, indices);
      copied.forEach((page) => out.addPage(page));
      const data = await out.save();
      const blob = new Blob([data as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "toolify-pages-extraites.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("L'extraction a échoué. Réessaie avec un autre fichier.");
    } finally {
      setExtracting(false);
    }
  }

  if (!file && !loading) {
    return (
      <FileUpload
        accept="application/pdf,.pdf"
        maxSizeMB={100}
        onFiles={handleFiles}
        title="Dépose ton fichier PDF ici"
        subtitle="ou clique pour le sélectionner"
        formatsLabel="PDF · Un seul fichier · Max 100 MB"
        buttonLabel="Choisir un PDF"
      />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 tool-panel px-6 py-20 text-center">
        <Loader2 size={28} className="animate-spin text-muted" />
        <p className="text-[0.95rem] text-muted">
          Analyse du PDF et génération des aperçus…
        </p>
      </div>
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">
          {pages.length} page{pages.length > 1 ? "s" : ""} · {selected.size}{" "}
          sélectionnée{selected.size > 1 ? "s" : ""}
        </h2>
        <div className="flex gap-2 text-[0.85rem]">
          <button
            type="button"
            onClick={selectAll}
            className="font-medium text-cat-pdfInk hover:underline"
          >
            Tout sélectionner
          </button>
          <span className="text-border">·</span>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="font-medium text-hint hover:text-ink hover:underline"
          >
            Tout désélectionner
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {pages.map((page) => {
          const isSelected = selected.has(page.pageNumber);
          return (
            <button
              key={page.pageNumber}
              type="button"
              onClick={() => toggle(page.pageNumber)}
              className={`group relative overflow-hidden rounded-md border-2 bg-bg p-2 transition-colors ${
                isSelected ? "border-ink" : "border-border hover:border-muted"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.dataUrl}
                alt={`Page ${page.pageNumber}`}
                className="mx-auto h-auto w-full"
              />
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[0.8rem] font-medium">
                {isSelected ? (
                  <CheckSquare size={15} className="text-cat-pdfInk" />
                ) : (
                  <Square size={15} className="text-hint" />
                )}
                Page {page.pageNumber}
              </div>
            </button>
          );
        })}
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
          onClick={extract}
          disabled={selected.size === 0 || extracting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {extracting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileDown size={18} />
          )}
          {extracting ? "Extraction…" : "Extraire les pages sélectionnées"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-[10px] border border-border bg-surface px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink"
        >
          Nouveau fichier
        </button>
      </div>
    </div>
  );
}
