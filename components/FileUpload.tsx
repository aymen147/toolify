"use client";

import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, Upload } from "lucide-react";
import { formatBytes } from "@/lib/format";

interface FileUploadProps {
  /** Valeur de l'attribut `accept` de l'input, ex. "image/jpeg,image/png,image/webp". */
  accept: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFiles: (files: File[]) => void;
  title?: string;
  subtitle?: string;
  /** Libellé des formats affiché sous le bouton. */
  formatsLabel?: string;
  buttonLabel?: string;
}

function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

export default function FileUpload({
  accept,
  multiple = false,
  maxSizeMB,
  onFiles,
  title = "Dépose ton fichier ici",
  subtitle = "ou clique pour parcourir tes fichiers",
  formatsLabel,
  buttonLabel = "Choisir un fichier",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validateAndSend(list: FileList | null) {
    if (!list || list.length === 0) return;
    const files = multiple ? Array.from(list) : Array.from(list).slice(0, 1);
    const maxBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : Infinity;

    for (const file of files) {
      if (!matchesAccept(file, accept)) {
        setError(
          `Format non supporté : « ${file.name} ». Formats acceptés : ${
            formatsLabel ?? accept
          }.`,
        );
        return;
      }
      if (file.size > maxBytes) {
        setError(
          `Fichier trop volumineux : « ${file.name} » (${formatBytes(
            file.size,
          )}). Taille maximale : ${maxSizeMB} MB.`,
        );
        return;
      }
    }

    setError(null);
    onFiles(files);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    validateAndSend(e.dataTransfer.files);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`cursor-pointer rounded-lg border-2 border-dashed bg-surface px-6 py-16 text-center transition-colors ${
          dragActive
            ? "border-ink bg-bg"
            : "border-[#d4d4d3] hover:border-ink hover:bg-bg"
        }`}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] bg-borderSoft">
          <UploadCloud size={28} className="text-muted" strokeWidth={2} />
        </div>
        <h3 className="mb-1 text-[1.25rem] font-semibold">{title}</h3>
        <p className="mb-5 text-[0.95rem] text-hint">{subtitle}</p>
        <span className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-6 py-2.5 text-[0.95rem] font-medium text-bg">
          <Upload size={16} strokeWidth={2} />
          {buttonLabel}
        </span>
        {formatsLabel && (
          <div className="mt-4 text-[0.78rem] text-[#a3a3a3]">
            {formatsLabel}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            validateAndSend(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-sm border border-cat-pdf bg-cat-pdf/40 px-4 py-2.5 text-[0.88rem] font-medium text-cat-pdfInk"
        >
          {error}
        </p>
      )}
    </div>
  );
}
