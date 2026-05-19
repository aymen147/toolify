import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, type Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  /** Compact variant — used in dense grids/scrollers. */
  compact?: boolean;
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  const cat = CATEGORIES[tool.category];
  const ToolIcon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col rounded-xl border border-line bg-elevated p-5 transition-colors duration-fast ease-out hover:border-fg/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-md ${cat.bgClass}`}
          aria-hidden
        >
          <ToolIcon size={20} className={cat.inkClass} strokeWidth={1.75} />
        </span>
        <span
          className="text-fg-subtle opacity-0 transition-opacity duration-fast group-hover:opacity-100"
          aria-hidden
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      <h3 className="text-base font-semibold tracking-tight text-fg">
        {tool.name}
      </h3>
      {!compact && (
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">
          {tool.shortDescription}
        </p>
      )}

      <div className="mt-auto pt-4">
        <span className="inline-flex items-center text-[11px] uppercase tracking-wider text-fg-subtle">
          {cat.label}
        </span>
      </div>
    </Link>
  );
}
