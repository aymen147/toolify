"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const FORMATS = [
  { mime: "image/jpeg", label: "JPG", ext: "jpg" },
  { mime: "image/png", label: "PNG", ext: "png" },
];

export default function PdfToImagesTool() {
  const [pages, setPages] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [mime, setMime] = useState("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasesRef = useRef<HTMLCanvasElement[]>([]);

  const format = FORMATS.find((f) => f.mime === mime) ?? FORMATS[0];
  const baseName = fileName.replace(/\.pdf$/i, "") || "page";

  async function handleFiles(files: File[]) {
    const file = files[0];
    setFileName(file.name);
    setLoading(true);
    setError(null);
    setPages([]);
    canvasesRef.current = [];
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) })
        .promise;
      const thumbs: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport }).promise;
        canvasesRef.current.push(canvas);
        thumbs.push(canvas.toDataURL("image/png"));
      }
      setPages(thumbs);
    } catch {
      setError(
        "Impossible de lire ce PDF. Il est peut-être protégé par un mot de passe ou endommagé.",
      );
      setFileName("");
    } finally {
      setLoading(false);
    }
  }

  function downloadPage(index: number) {
    const canvas = canvasesRef.current[index];
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${baseName}-page-${index + 1}.${format.ext}`;
        link.click();
        URL.revokeObjectURL(url);
      },
      format.mime,
      0.92,
    );
  }

  async function downloadAll() {
    for (let i = 0; i < canvasesRef.current.length; i++) {
      downloadPage(i);
      await new Promise((r) => setTimeout(r, 350));
    }
  }

  function reset() {
    setPages([]);
    setFileName("");
    setError(null);
    canvasesRef.current = [];
  }

  if (pages.length === 0 && !loading) {
    return (
      <>
        <FileUpload
          accept="application/pdf,.pdf"
          maxSizeMB={100}
          onFiles={handleFiles}
          title="Dépose ton fichier PDF ici"
          subtitle="ou clique pour le sélectionner"
          formatsLabel="PDF · Un seul fichier · Max 100 MB"
          buttonLabel="Choisir un PDF"
        />
        {error && (
          <p
            role="alert"
            className="mt-3 rounded-sm border border-cat-pdf bg-cat-pdf/40 px-4 py-2.5 text-[0.88rem] font-medium text-cat-pdfInk"
          >
            {error}
          </p>
        )}
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 tool-panel px-6 py-20 text-center">
        <Loader2 size={28} className="animate-spin text-muted" />
        <p className="text-[0.95rem] text-muted">
          Conversion des pages du PDF en images…
        </p>
      </div>
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">
          {pages.length} page{pages.length > 1 ? "s" : ""}
        </h2>
        <div className="flex gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.mime}
              type="button"
              onClick={() => setMime(f.mime)}
              className={`rounded-sm border px-3 py-1.5 text-[0.82rem] font-medium transition-colors ${
                mime === f.mime
                  ? "border-ink bg-ink text-bg"
                  : "border-border bg-surface hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {pages.map((thumb, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-md border border-border bg-bg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={`Page ${index + 1}`}
              className="h-auto w-full"
            />
            <button
              type="button"
              onClick={() => downloadPage(index)}
              className="flex w-full items-center justify-center gap-1.5 border-t border-border py-2 text-[0.8rem] font-medium text-muted transition-colors hover:bg-borderSoft hover:text-ink"
            >
              <Download size={13} />
              Page {index + 1}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
        <button
          type="button"
          onClick={downloadAll}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90"
        >
          <Download size={18} />
          Tout télécharger ({format.label})
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
