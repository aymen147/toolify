"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { formatBytes } from "@/lib/format";

export type ImgFmt = "jpg" | "png" | "webp";

const FORMATS: Record<
  ImgFmt,
  { label: string; mime: string; ext: string; hasQuality: boolean }
> = {
  jpg: { label: "JPG", mime: "image/jpeg", ext: "jpg", hasQuality: true },
  png: { label: "PNG", mime: "image/png", ext: "png", hasQuality: false },
  webp: { label: "WebP", mime: "image/webp", ext: "webp", hasQuality: true },
};

interface ImageConverterToolProps {
  /** Lock the input format. Hides the upload "all formats" hint and restricts the file picker. */
  from?: ImgFmt;
  /** Lock the output format. When set, hides the format selector. */
  to?: ImgFmt;
}

export default function ImageConverterTool({
  from,
  to,
}: ImageConverterToolProps = {}) {
  const ORDER: ImgFmt[] = ["jpg", "png", "webp"];
  const initialOut: ImgFmt = to ?? "jpg";

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [outFmt, setOutFmt] = useState<ImgFmt>(initialOut);
  const [quality, setQuality] = useState(90);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const urlsRef = useRef<string[]>([]);

  const format = FORMATS[outFmt];

  // Keep state aligned if `to` prop changes (shouldn't in practice).
  useEffect(() => {
    if (to) setOutFmt(to);
  }, [to]);

  const accept = useMemo(() => (from ? FORMATS[from].mime : "image/*"), [from]);
  const fromLabel = from ? FORMATS[from].label : null;

  function trackUrl(url: string) {
    urlsRef.current.push(url);
    return url;
  }

  useEffect(() => {
    return () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setProcessing(true);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessing(false);
        return;
      }
      if (format.mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(image, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (cancelled || !blob) {
            setProcessing(false);
            return;
          }
          setResultUrl(trackUrl(URL.createObjectURL(blob)));
          setResultSize(blob.size);
          setProcessing(false);
        },
        format.mime,
        quality / 100,
      );
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [image, format.mime, quality]);

  function handleFiles(files: File[]) {
    const next = files[0];
    const url = trackUrl(URL.createObjectURL(next));
    const img = new Image();
    img.onload = () => {
      setFile(next);
      setImage(img);
    };
    img.src = url;
  }

  function reset() {
    setFile(null);
    setImage(null);
    setResultUrl("");
    setResultSize(0);
  }

  function download() {
    if (!resultUrl) return;
    const base = (file?.name ?? "image").replace(/\.[^.]+$/, "");
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `${base}.${format.ext}`;
    link.click();
  }

  if (!file) {
    return (
      <FileUpload
        accept={accept}
        maxSizeMB={50}
        onFiles={handleFiles}
        title={fromLabel ? `Dépose ton fichier ${fromLabel}` : "Dépose ton image ici"}
        subtitle="ou clique pour parcourir tes fichiers"
        formatsLabel={
          fromLabel
            ? `${fromLabel} uniquement · Max 50 MB`
            : "Tous formats image · Max 50 MB"
        }
        buttonLabel={fromLabel ? `Choisir un ${fromLabel}` : "Choisir une image"}
      />
    );
  }

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">
          {to ? `Conversion en ${format.label}` : "Format de sortie"}
        </h2>
        <span className="font-mono text-[0.85rem] text-hint">
          {file.name} · {formatBytes(file.size)}
        </span>
      </div>

      {!to && (
        <div className="mb-6 flex gap-2">
          {ORDER.map((k) => {
            const f = FORMATS[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() => setOutFmt(k)}
                className={`flex-1 rounded-sm border px-3 py-2.5 text-[0.9rem] font-medium transition-colors ${
                  outFmt === k
                    ? "border-ink bg-ink text-bg"
                    : "border-border bg-surface hover:border-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      {format.hasQuality && (
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
      )}

      <div className="relative mb-4 flex min-h-[200px] items-center justify-center overflow-hidden rounded-md border border-border bg-bg p-4">
        {resultUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resultUrl}
            alt="Aperçu converti"
            className="max-h-[280px] max-w-full object-contain"
          />
        )}
        {processing && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/70 text-hint">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
      </div>

      <div className="mb-6 text-[0.88rem] text-muted">
        {resultSize > 0 && (
          <span>
            Fichier converti : {format.label} · {formatBytes(resultSize)}
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
        <button
          type="button"
          onClick={download}
          disabled={!resultUrl || processing}
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
