import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CATEGORIES,
  TOOLS,
  getRelatedTools,
  getToolsByCategory,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";
import { absoluteUrl } from "@/lib/seo";
import AdSlot from "./AdSlot";
import FAQ, { type FaqItem } from "./FAQ";
import ToolCard from "./ToolCard";

const APP_CATEGORY: Record<ToolCategory, string> = {
  image: "MultimediaApplication",
  pdf: "BusinessApplication",
  text: "UtilitiesApplication",
  util: "UtilitiesApplication",
  design: "DesignApplication",
  calc: "UtilitiesApplication",
};

export interface HowToStep {
  /** Short imperative title, e.g. "Choisis ton fichier". */
  title: string;
  /** 1–2 sentence body. */
  body: string;
}

interface ToolLayoutProps {
  tool: Tool;
  /** L'outil interactif lui-même — rendu dans un panneau bordé 1px. */
  children: React.ReactNode;
  faq: FaqItem[];
  /**
   * 3–5 numbered steps, rendered in the "Comment l'utiliser" section.
   * If absent, the long-form `content` block is used as a fallback.
   */
  howTo?: HowToStep[];
  /**
   * Long-form SEO prose (h2, p, ol…). Rendered after the steps, before FAQ.
   * Optional — pages that have nothing extra to say can omit it.
   */
  content?: React.ReactNode;
  /**
   * 3–4 categories surfaced as chips at the bottom. Defaults to the three
   * other categories closest to the tool's own.
   */
  relatedCategories?: ToolCategory[];
}

function defaultRelatedCategories(self: ToolCategory): ToolCategory[] {
  return (Object.keys(CATEGORIES) as ToolCategory[])
    .filter((c) => c !== self)
    .slice(0, 3);
}

export default function ToolLayout({
  tool,
  children,
  faq,
  howTo,
  content,
  relatedCategories,
}: ToolLayoutProps) {
  const category = CATEGORIES[tool.category];
  const url = absoluteUrl(`/tools/${tool.slug}`);

  const related = getRelatedTools(tool.slug, 6);
  const popular = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 5);
  const chips = relatedCategories ?? defaultRelatedCategories(tool.category);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      url,
      description: tool.seoDescription,
      applicationCategory: APP_CATEGORY[tool.category],
      operatingSystem: "Web Browser",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: category.label,
          item: absoluteUrl(`/#cat-${tool.category}`),
        },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
  ];

  if (howTo && howTo.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: tool.h1,
      step: howTo.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.body,
      })),
    });
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="site-shell pb-24 pt-6">
        {/* 1. Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="text-xs text-fg-subtle">
          <Link href="/" className="hover:text-fg">
            Accueil
          </Link>
          <span className="mx-1.5 text-line">›</span>
          <Link href={`/#cat-${tool.category}`} className="hover:text-fg">
            {category.label}
          </Link>
          <span className="mx-1.5 text-line">›</span>
          <span className="text-fg-muted">{tool.name}</span>
        </nav>

        {/* 2. Title */}
        <header className="mt-5 max-w-3xl">
          <h1 className="text-h1 font-serif font-normal text-fg">{tool.h1}</h1>
          <p className="mt-3 text-lg leading-relaxed text-fg-muted">{tool.tagline}</p>
        </header>

        {/* 3. Leaderboard ad — generous margin separates it from the tool */}
        <AdSlot slot="tool-top" size="leaderboard" className="my-10" />

        {/* Single-column layout — tool flows naturally with the page,
            nothing sticks while scrolling. */}
        <div className="mx-auto max-w-4xl">
          {/* 4. Tool */}
          <section
            aria-label={`Outil : ${tool.name}`}
            className="rounded-xl border border-line bg-elevated p-6 sm:p-8"
          >
            {children}
          </section>

          {/* 5. Related tools — drives session depth */}
          <section className="mt-16">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-h3 font-semibold text-fg">Continue avec</h2>
              <Link
                href={`/#cat-${tool.category}`}
                className="text-sm font-medium text-fg-muted hover:text-fg"
              >
                Tous les {category.label.toLowerCase()} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>

          {/* Popular in category — inline, compact, no ad alongside */}
          <section className="mt-12">
            <h2 className="mb-4 text-h4 text-fg">
              Populaires dans {category.label}
            </h2>
            <ul className="divide-y divide-line rounded-lg border border-line bg-elevated">
              {popular.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-sunken"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${category.bgClass}`}
                      aria-hidden
                    >
                      <t.icon size={14} className={category.inkClass} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-fg">{t.name}</span>
                    <ArrowUpRight size={14} className="shrink-0 text-fg-subtle" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. In-article ad */}
          <AdSlot slot="tool-mid" size="rectangle" className="mx-auto max-w-prose" />

            {/* 7. How to use — numbered steps */}
            {howTo && howTo.length > 0 ? (
              <section className="mt-12">
                <p className="field-label mb-2">Mode d&apos;emploi</p>
                <h2 className="text-h2 font-serif font-normal text-fg">
                  Comment utiliser {tool.name}
                </h2>
                <ol className="mt-8 grid gap-6">
                  {howTo.map((step, i) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[auto_1fr] items-start gap-x-5"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated font-serif text-lg text-fg"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-h4 text-fg">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {/* Long-form SEO prose */}
            {content ? (
              <section className="mt-16 max-w-prose">
                <div className="tool-prose">{content}</div>
              </section>
            ) : null}

            {/* 8. FAQ — JSON-LD already injected above */}
            <section className="mt-16 max-w-prose">
              <p className="field-label mb-2">Questions fréquentes</p>
              <h2 className="text-h2 mb-6 font-serif font-normal text-fg">
                Tout savoir sur {tool.name}
              </h2>
              <FAQ items={faq} />
            </section>

            {/* 9. Related categories */}
            <section className="mt-16">
              <p className="field-label mb-3">Autres catégories</p>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => {
                  const meta = CATEGORIES[c];
                  const count = TOOLS.filter((t) => t.category === c).length;
                  return (
                    <Link
                      key={c}
                      href={`/#cat-${c}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3.5 py-1.5 text-sm text-fg hover:border-line-strong"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${meta.bgClass}`}
                        aria-hidden
                      />
                      {meta.label}
                      <span className="text-fg-subtle">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
        </div>
      </div>
    </>
  );
}
