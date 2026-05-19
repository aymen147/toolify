import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Lock, Gift, ArrowUpRight } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import CategoryCard from "@/components/ui/CategoryCard";
import SearchBar from "@/components/ui/SearchBar";
import FocusSearchButton from "@/components/ui/FocusSearchButton";
import {
  CATEGORIES,
  TOOLS,
  getToolBySlug,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";
import {
  absoluteUrl,
  buildMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE_NAME} — ${TOOLS.length} outils gratuits en ligne`,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  title: { absolute: `${SITE_NAME} — ${TOOLS.length} outils gratuits en ligne` },
};

const CATEGORY_ORDER: ToolCategory[] = ["image", "pdf", "text", "util", "design", "calc"];

// Hand-picked trending slugs — surface the strongest entry points first.
const TRENDING_SLUGS = [
  "image-compressor",
  "merge-pdf",
  "word-counter",
  "password-generator",
  "qr-generator",
  "color-converter",
  "percentage-calculator",
  "image-converter",
];

const TRENDING = TRENDING_SLUGS
  .map((s) => getToolBySlug(s))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Rapide, sans recharger",
    body: "Tous les outils tournent dans ton navigateur. Pas de file d'attente, pas de serveur à attendre — les résultats sont immédiats.",
  },
  {
    icon: Lock,
    title: "Traitement local",
    body: "Tes fichiers ne quittent jamais ton appareil. Pas d'upload, pas de stockage, pas de compte — c'est privé par construction.",
  },
  {
    icon: Gift,
    title: "Gratuit, sans inscription",
    body: "Aucun mur de paiement, aucun mot de passe à créer. Tu ouvres l'outil, tu l'utilises, tu repars — c'est tout.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "fr",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Outils Toolify",
    itemListElement: TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(`/tools/${tool.slug}`),
    })),
  },
];

export default function Home() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* 1. Hero ─────────────────────────────────────────────── */}
      <section className="bg-grain border-b border-line">
        <div className="site-shell pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-fg-subtle">
              {TOOLS.length} outils — tous gratuits
            </p>
            <h1 className="text-display text-fg">
              Des outils nets,
              <br />
              <span className="italic text-fg-muted">sans détour.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Compresse, convertis, calcule, génère. Toolify regroupe {TOOLS.length}{" "}
              petits outils qui font une seule chose — bien, vite, et dans ton
              navigateur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <FocusSearchButton>Choisir un outil</FocusSearchButton>
              <Link
                href="#categories"
                className="inline-flex h-12 items-center text-sm font-medium text-fg-muted hover:text-fg"
              >
                Parcourir par catégorie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live search ──────────────────────────────────────── */}
      <section
        id="tool-search"
        aria-label="Recherche d'outil"
        className="border-b border-line scroll-mt-24"
      >
        <div className="site-shell py-10 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <label htmlFor="hero-search" className="field-label mb-3 block">
              Trouve un outil
            </label>
            <SearchBar
              size="lg"
              placeholder="Compresser une image, convertir un PDF, générer un mot de passe…"
              showHint
            />
            <p className="mt-3 text-xs text-fg-subtle">
              Astuce — appuie sur <kbd className="rounded border border-line bg-elevated px-1 font-mono text-[10px]">/</kbd> depuis n&apos;importe où pour ouvrir la recherche.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Category grid ────────────────────────────────────── */}
      <section id="categories" className="site-shell py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="field-label mb-2">Catégories</p>
            <h2 className="text-h2 font-serif font-normal text-fg">
              Trouve par usage
            </h2>
          </div>
          <Link
            href="#all-tools"
            className="hidden text-sm font-medium text-fg-muted hover:text-fg sm:inline-flex"
          >
            Voir tous les outils →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((c) => (
            <CategoryCard key={c} category={c} />
          ))}
        </div>
      </section>

      {/* 4. Trending tools ───────────────────────────────────── */}
      <section className="border-y border-line bg-elevated">
        <div className="site-shell py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="field-label mb-2">Populaires</p>
              <h2 className="text-h2 font-serif font-normal text-fg">
                Les plus utilisés cette semaine
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-article ad ────────────────────────────────────── */}
      <div className="site-shell">
        <AdSlot slot="home-mid" size="rectangle" />
      </div>

      {/* 6. Why Toolify ──────────────────────────────────────── */}
      <section className="site-shell py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="field-label mb-2">Pourquoi Toolify</p>
          <h2 className="text-h2 font-serif font-normal text-fg">
            Trois choses, faites correctement
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((vp) => {
            const VPIcon = vp.icon;
            return (
              <article
                key={vp.title}
                className="flex flex-col rounded-xl border border-line bg-elevated p-6"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <VPIcon size={18} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-h4 text-fg">{vp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{vp.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7. All categories — full SEO list ───────────────────── */}
      <section id="all-tools" className="site-shell pb-24">
        <div className="mb-10">
          <p className="field-label mb-2">Tous les outils</p>
          <h2 className="text-h2 font-serif font-normal text-fg">
            {TOOLS.length} outils, classés par usage
          </h2>
        </div>

        <div className="space-y-14">
          {CATEGORY_ORDER.map((c) => {
            const meta = CATEGORIES[c];
            const tools = getToolsByCategory(c);
            return (
              <div key={c} id={`cat-${c}`} className="scroll-mt-24">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${meta.bgClass}`} aria-hidden />
                    <h3 className="text-h3 font-semibold text-fg">{meta.label}</h3>
                    <span className="text-xs text-fg-subtle">
                      {tools.length} outil{tools.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-line bg-elevated px-4 py-3 transition-colors duration-fast hover:border-line-strong"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${meta.bgClass}`}
                        aria-hidden
                      >
                        <tool.icon size={16} className={meta.inkClass} strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-fg">
                          {tool.name}
                        </span>
                        <span className="block truncate text-xs text-fg-subtle">
                          {tool.shortDescription}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
