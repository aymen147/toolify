"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "toolify-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // localStorage indisponible : on n'affiche pas la bannière.
    }
  }, []);

  function decide(choice: "accepted" | "refused") {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Ignoré si le stockage est bloqué.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <div className="mx-auto flex max-w-[760px] flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center">
        <p className="flex-1 text-[0.88rem] leading-relaxed text-muted">
          Toolify utilise un minimum de cookies pour fonctionner et, si tu
          l&apos;acceptes, afficher de la publicité qui finance le site. En
          savoir plus dans notre{" "}
          <Link href="/privacy" className="font-medium text-ink underline">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("refused")}
            className="rounded-[10px] border border-border bg-surface px-4 py-2.5 text-[0.88rem] font-medium text-ink transition-colors hover:border-ink"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-[10px] bg-ink px-4 py-2.5 text-[0.88rem] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
