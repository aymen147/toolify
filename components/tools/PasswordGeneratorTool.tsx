"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

type SetKey = keyof typeof SETS;

const OPTIONS: { key: SetKey; label: string }[] = [
  { key: "upper", label: "Majuscules" },
  { key: "lower", label: "Minuscules" },
  { key: "digits", label: "Chiffres" },
  { key: "symbols", label: "Symboles" },
];

/** Tirage uniforme dans [0, max) via crypto.getRandomValues, sans biais modulo. */
function randomIndex(max: number): number {
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % max;
}

function shuffle(chars: string[]): string[] {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars;
}

function generatePassword(length: number, enabled: SetKey[]): string {
  if (enabled.length === 0) return "";
  const pool = enabled.map((k) => SETS[k]).join("");
  const chars: string[] = [];
  // Au moins un caractère de chaque ensemble sélectionné.
  for (const key of enabled) {
    if (chars.length < length) {
      chars.push(SETS[key][randomIndex(SETS[key].length)]);
    }
  }
  while (chars.length < length) {
    chars.push(pool[randomIndex(pool.length)]);
  }
  return shuffle(chars).join("");
}

function strengthOf(length: number, enabledKeys: SetKey[]) {
  const poolSize = enabledKeys.reduce((sum, k) => sum + SETS[k].length, 0);
  // Entropie ≈ longueur × log2(taille du jeu de caractères).
  const entropy = poolSize > 0 ? length * Math.log2(poolSize) : 0;
  if (entropy < 40) return { label: "Faible", pct: 25, color: "#dc2626" };
  if (entropy < 60) return { label: "Moyen", pct: 50, color: "#d97706" };
  if (entropy < 90) return { label: "Fort", pct: 75, color: "#2563eb" };
  return { label: "Très fort", pct: 100, color: "#059669" };
}

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [enabled, setEnabled] = useState<Record<SetKey, boolean>>({
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [batch, setBatch] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const enabledKeys = OPTIONS.map((o) => o.key).filter((k) => enabled[k]);
  const hasSet = enabledKeys.length > 0;

  const regenerate = useCallback(() => {
    const keys = OPTIONS.map((o) => o.key).filter((k) => enabled[k]);
    setPassword(generatePassword(length, keys));
    setBatch([]);
  }, [length, enabled]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  async function copy(value: string) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  const strength = strengthOf(length, enabledKeys);

  return (
    <div className="tool-panel p-6 sm:p-8">
      {/* Champ d'affichage */}
      <div className="flex items-stretch gap-2">
        <div className="flex min-h-[56px] flex-1 items-center overflow-x-auto rounded-md border border-border bg-bg px-4 font-mono text-[1.15rem] font-medium tracking-wide">
          {password || (
            <span className="text-hint">Sélectionne au moins une option</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => copy(password)}
          disabled={!password}
          aria-label="Copier le mot de passe"
          className="flex w-12 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied === password && password ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>

      {/* Indicateur de force */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[0.85rem]">
          <span className="text-muted">Force</span>
          <span className="font-medium" style={{ color: strength.color }}>
            {hasSet ? strength.label : "—"}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-borderSoft">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: hasSet ? `${strength.pct}%` : "0%",
              backgroundColor: strength.color,
            }}
          />
        </div>
      </div>

      {/* Longueur */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[0.9rem] font-medium">
          <span>Longueur</span>
          <span className="rounded-sm bg-borderSoft px-2.5 py-0.5 font-mono text-[0.85rem]">
            {length}
          </span>
        </div>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </div>

      {/* Options */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map((option) => (
          <label
            key={option.key}
            className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2.5 text-[0.9rem] transition-colors ${
              enabled[option.key]
                ? "border-ink bg-bg"
                : "border-border hover:border-muted"
            }`}
          >
            <input
              type="checkbox"
              checked={enabled[option.key]}
              onChange={(e) =>
                setEnabled((prev) => ({
                  ...prev,
                  [option.key]: e.target.checked,
                }))
              }
              className="accent-ink"
            />
            {option.label}
          </label>
        ))}
      </div>

      {!hasSet && (
        <p role="alert" className="mt-3 text-[0.85rem] font-medium text-cat-pdfInk">
          Sélectionne au moins un type de caractère.
        </p>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 border-t border-borderSoft pt-6 sm:flex-row">
        <button
          type="button"
          onClick={regenerate}
          disabled={!hasSet}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-ink px-8 py-3 text-[0.95rem] font-semibold text-bg sm:w-auto transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Générer
        </button>
        <button
          type="button"
          onClick={() =>
            setBatch(
              Array.from({ length: 5 }, () =>
                generatePassword(length, enabledKeys),
              ),
            )
          }
          disabled={!hasSet}
          className="rounded-[10px] border border-border bg-surface px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Générer 5 d&apos;un coup
        </button>
      </div>

      {/* Lot de 5 */}
      {batch.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 border-t border-borderSoft pt-5">
          {batch.map((pwd, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-sm border border-border bg-bg px-3 py-2"
            >
              <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[0.9rem]">
                {pwd}
              </code>
              <button
                type="button"
                onClick={() => copy(pwd)}
                aria-label="Copier ce mot de passe"
                className="shrink-0 text-muted transition-colors hover:text-ink"
              >
                {copied === pwd ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
