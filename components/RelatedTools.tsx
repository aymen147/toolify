import Link from "next/link";
import { CATEGORIES, getRelatedTools } from "@/lib/tools";

export default function RelatedTools({ slug }: { slug: string }) {
  const related = getRelatedTools(slug, 4);

  return (
    <section className="site-shell px-5 pb-16 pt-4 sm:px-8 lg:px-12">
      <h2 className="mb-6 text-[1.6rem] font-bold tracking-[-0.02em]">
        Outils similaires
      </h2>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((tool) => {
          const category = CATEGORIES[tool.category];
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-md border border-border bg-surface p-[1.1rem] transition-all duration-150 hover:-translate-y-0.5 hover:border-ink"
            >
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-[9px] ${category.bgClass}`}
              >
                <Icon size={18} className={category.inkClass} strokeWidth={2} />
              </div>
              <h3 className="mb-1 text-[0.95rem] font-semibold">{tool.name}</h3>
              <p className="text-[0.8rem] leading-relaxed text-hint">
                {tool.shortDescription}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
