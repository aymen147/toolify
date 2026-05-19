import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, getToolsByCategory, type ToolCategory } from "@/lib/tools";

interface CategoryCardProps {
  category: ToolCategory;
  /** Anchor or route to scroll to the full category section. */
  href?: string;
  /** Max number of preview tool links to show. */
  previewCount?: number;
}

export default function CategoryCard({
  category,
  href,
  previewCount = 3,
}: CategoryCardProps) {
  const meta = CATEGORIES[category];
  const tools = getToolsByCategory(category);
  const preview = tools.slice(0, previewCount);
  const sectionHref = href ?? `/#cat-${category}`;

  return (
    <article className="group relative flex flex-col rounded-xl border border-line bg-elevated p-6 transition-colors duration-fast ease-out hover:border-line-strong">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-fg">
            <Link
              href={sectionHref}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {meta.label}
            </Link>
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-fg-subtle">
            {tools.length} outil{tools.length > 1 ? "s" : ""}
          </p>
        </div>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-md ${meta.bgClass} ${meta.inkClass}`}
          aria-hidden
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      <ul className="relative z-10 mt-auto space-y-1.5 text-sm">
        {preview.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="text-fg-muted underline-offset-2 hover:text-accent hover:underline"
            >
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
