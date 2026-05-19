"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { formatBytes } from "@/lib/format";

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [quality, setQuality] = useState(75);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlsRef = useRef<string[]>([]);

  function trackUrl(url: string) {
    urlsRef.current.push(url);
    return url;
  }

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setProcessing(true);
      setError(null);
      try {
        const imageCompression = (await import("browser-image-compression"))
          .default;
        const result = await imageCompression(file, {
          useWebWorker: true,
          maxSizeMB: 100,
          initialQuality: quality / 100,
        });
        if (cancelled) return;
        const output =
          result instanceof File
            ? result
            : new File([result], file.name, { type: file.type });
        setCompressed(output);
        setCompressedUrl(trackUrl(URL.createObjectURL(output)));
      } catch {
        if (!cancelled) {
          setError(
            "La compression a échoué. Essaie avec une autre image ou un format différent.",
          );
        }
      } finally {
        if (!cancelled) setProcessing(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [file, quality]);

  function handleFiles(files: File[]) {
    const next = files[0];
    setFile(next);
    setOriginalUrl(trackUrl(URL.createObjectURL(next)));
    setCompressed(null);
    setCompressedUrl("");
  }

  function reset() {
    setFile(null);
    setOriginalUrl("");
    setCompressed(null);
    setCompressedUrl("");
    setError(null);
    setQuality(75);
  }

  function download() {
    if (!compressed) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed-${file?.name ?? "image"}`;
    link.click();
  }

  if (!file) {
    return (
      <FileUpload
        accept="image/jpeg,image/png,image/webp"
        maxSizeMB={50}
        onFiles={handleFiles}
        title="Dépose ton image ici"
        subtitle="ou clique pour parcourir tes fichiers"
        formatsLabel="JPG · PNG · WebP · Max 50 MB"
        buttonLabel="Choisir une image"
      />
    );
  }

  const reduction =
    compressed && file.size > 0
      ? Math.round((1 - compressed.size / file.size) * 100)
      : 0;

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">Réglages de compression</h2>
        <span className="font-mono text-[0.85rem] text-hint">
          {file.name} · {formatBytes(file.size)}
        </span>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-[0.9rem] font-medium">
          <span>Qualité</span>
          <span className="rounded-sm bg-borderSoft px-2.5 py-0.5 font-mono text-[0.85rem]">
            {quality}%
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border bg-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt="Image originale"
            className="h-44 w-full object-contain"
          />
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div>
              <div className="text-[0.78rem] text-hint">Avant</div>
              <div className="text-[0.95rem] font-semibold">
                {formatBytes(file.size)}
              </div>
            </div>
            <span className="rounded-full bg-borderSoft px-2.5 py-1 text-[0.75rem] font-semibold text-hint">
              100%
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-bg">
          <div className="relative h-44 w-full">
            {compressedUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={compressedUrl}
                alt="Image compressée"
                className="h-44 w-full object-contain"
              />
            )}
            {processing && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 text-hint">
                <Loader2 size={24} className="animate-spin" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div>
              <div className="text-[0.78rem] text-hint">Après</div>
              <div className="text-[0.95rem] font-semibold">
                {compressed ? formatBytes(compressed.size) : "—"}
              </div>
            </div>
            {compressed && (
              <span
                className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${
                  reduction > 0
                    ? "bg-cat-util text-cat-utilInk"
                    : "bg-borderSoft text-hint"
                }`}
              >
                {reduction > 0 ? `−${reduction}%` : `${reduction}%`}
              </span>
            )}
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
          onClick={download}
          disabled={!compressed || processing}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={18} />
          Télécharger
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
