"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { formatBytes } from "@/lib/format";

export default function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const urlsRef = useRef<string[]>([]);

  function trackUrl(url: string) {
    urlsRef.current.push(url);
    return url;
  }

  useEffect(() => {
    return () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  useEffect(() => {
    if (!image || width < 1 || height < 1) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setProcessing(true);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessing(false);
        return;
      }
      ctx.drawImage(image, 0, 0, width, height);
      const type = file?.type || "image/png";
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
        type,
        0.92,
      );
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [image, width, height, file]);

  function handleFiles(files: File[]) {
    const next = files[0];
    const url = trackUrl(URL.createObjectURL(next));
    const img = new Image();
    img.onload = () => {
      setFile(next);
      setImage(img);
      setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = url;
  }

  function changeWidth(value: number) {
    setWidth(value);
    if (keepRatio && natural.w > 0) {
      setHeight(Math.max(1, Math.round((value * natural.h) / natural.w)));
    }
  }

  function changeHeight(value: number) {
    setHeight(value);
    if (keepRatio && natural.h > 0) {
      setWidth(Math.max(1, Math.round((value * natural.w) / natural.h)));
    }
  }

  function reset() {
    setFile(null);
    setImage(null);
    setResultUrl("");
    setResultSize(0);
  }

  function download() {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `resized-${file?.name ?? "image"}`;
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

  return (
    <div className="tool-panel p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-borderSoft pb-4">
        <h2 className="text-[1.1rem] font-semibold">Dimensions</h2>
        <span className="font-mono text-[0.85rem] text-hint">
          Original : {natural.w}×{natural.h} px
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="resize-w"
            className="mb-1.5 block text-[0.9rem] font-medium"
          >
            Largeur (px)
          </label>
          <input
            id="resize-w"
            type="number"
            min={1}
            value={width}
            onChange={(e) => changeWidth(Number(e.target.value))}
            className="w-full rounded-md border border-border bg-bg px-3 py-2.5 font-mono outline-none focus:border-ink"
          />
        </div>
        <div>
          <label
            htmlFor="resize-h"
            className="mb-1.5 block text-[0.9rem] font-medium"
          >
            Hauteur (px)
          </label>
          <input
            id="resize-h"
            type="number"
            min={1}
            value={height}
            onChange={(e) => changeHeight(Number(e.target.value))}
            className="w-full rounded-md border border-border bg-bg px-3 py-2.5 font-mono outline-none focus:border-ink"
          />
        </div>
      </div>

      <label className="mb-6 flex w-fit cursor-pointer items-center gap-2 text-[0.9rem]">
        <input
          type="checkbox"
          checked={keepRatio}
          onChange={(e) => setKeepRatio(e.target.checked)}
          className="accent-ink"
        />
        Conserver les proportions
      </label>

      <div className="relative mb-6 flex min-h-[200px] items-center justify-center overflow-hidden rounded-md border border-border bg-bg p-4">
        {resultUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resultUrl}
            alt="Aperçu redimensionné"
            className="max-h-[280px] max-w-full object-contain"
          />
        )}
        {processing && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/70 text-hint">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between text-[0.88rem] text-muted">
        <span>
          Nouvelle taille : {width}×{height} px
        </span>
        {resultSize > 0 && <span>{formatBytes(resultSize)}</span>}
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
