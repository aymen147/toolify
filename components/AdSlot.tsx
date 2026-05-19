type AdSize = "leaderboard" | "rectangle" | "in-article" | "sidebar";

interface AdSlotProps {
  /** Identifiant de l'emplacement AdSense (data-ad-slot), à renseigner après approbation. */
  slot?: string;
  /** Format AdSense (data-ad-format), ex. "auto", "horizontal". */
  format?: string;
  /** Taille / placement déterminant la hauteur réservée. */
  size?: AdSize;
  /** Label "Advertisement" affiché au-dessus (visible et accessible). */
  label?: string;
  className?: string;
}

/**
 * Reserved-height container for AdSense units. Reserves space to prevent CLS
 * and always renders a visible "Advertisement" label above the unit.
 *
 * AdSense compliance:
 *  - "Publicité" label is always visible (not styled like content or a button)
 *  - Minimum 24px margin separates the slot from surrounding content
 *  - Min-heights are reserved so the layout never shifts when an ad loads
 *  - Never styled to look like part of the tool UI
 */
export default function AdSlot({
  slot,
  format = "auto",
  size = "in-article",
  label,
  className = "",
}: AdSlotProps) {
  // Reserved heights match common AdSense unit sizes — keep generous to avoid CLS.
  const sizeStyles: Record<AdSize, string> = {
    leaderboard:
      "min-h-[100px] sm:min-h-[100px] md:min-h-[90px]", // 728x90 / responsive
    rectangle: "min-h-[280px]", // 300x250 / 336x280
    "in-article": "min-h-[250px]",
    sidebar: "min-h-[600px]", // 300x600 tall
  };

  const sizeLabel: Record<AdSize, string> = {
    leaderboard: "Bannière",
    rectangle: "Rectangle",
    "in-article": "Encart",
    sidebar: "Colonne latérale",
  };

  return (
    <aside
      role="complementary"
      aria-label="Publicité"
      className={`my-8 ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle">
        Publicité
      </p>
      <div
        className={`flex items-center justify-center rounded-md border border-dashed border-line bg-sunken text-xs text-fg-subtle ${sizeStyles[size]}`}
      >
        {/*
          Après approbation AdSense, remplacer le placeholder par :
          <ins className="adsbygoogle" style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true" />
        */}
        <span className="font-mono">
          [ Emplacement AdSense — {sizeLabel[size]} ]
        </span>
      </div>
    </aside>
  );
}
