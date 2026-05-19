import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, type Tool, type ToolCategory } from "@/lib/tools";
import { absoluteUrl } from "@/lib/seo";
import AdSlot from "./AdSlot";
import RelatedTools from "./RelatedTools";
import FAQ, { type FaqItem } from "./FAQ";

const APP_CATEGORY: Record<ToolCategory, string> = {
  image: "MultimediaApplication",
  pdf: "BusinessApplication",
  text: "UtilitiesApplication",
  util: "UtilitiesApplication",
  design: "DesignApplication",
  calc: "UtilitiesApplication",
};

const BENEFIT_ICONS: LucideIcon[] = [Zap, ShieldCheck, Sparkles];

const PRIVACY = [
  { icon: ShieldCheck, label: "100% local" },
  { icon: Lock, label: "Aucun upload" },
  { icon: Zap, label: "Gratuit & instantané" },
];

export interface Step {
  title: string;
  text: string;
}

export interface Benefit {
  title: string;
  text: string;
}

interface ToolPageProps {
  tool: Tool;
  /** L'outil interactif lui-même. */
  children: React.ReactNode;
  steps: Step[];
  benefits: Benefit[];
  faq: FaqItem[];
}

export default function ToolPage({
  tool,
  children,
  steps,
  benefits,
  faq,
}: ToolPageProps) {
  const category = CATEGORIES[tool.category];
  const Icon = tool.icon;
  const url = absoluteUrl(`/tools/${tool.slug}`);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
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
      "@type": "HowTo",
      name: tool.h1,
      step: steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
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
          item: absoluteUrl("/#tools"),
        },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ===== HERO ===== */}
      <section
        className="border-b border-border"
        style={{
          background: `linear-gradient(180deg, ${category.hex} 0%, rgba(250,250,249,0) 80%)`,
        }}
      >
        <div className="site-shell px-5 pb-12 pt-7 sm:px-8 lg:px-12">
          <nav
            aria-label="Fil d'Ariane"
            className="text-[0.85rem] text-muted"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              Accueil
            </Link>
            <span className="mx-1.5 text-border">/</span>
            <Link
              href="/#tools"
              className="transition-colors hover:text-ink"
            >
              {category.label}
            </Link>
            <span className="mx-1.5 text-border">/</span>
            <span className="text-ink">{tool.name}</span>
          </nav>

          <div className="mt-9 flex flex-col items-center text-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-border bg-surface shadow-card">
              <Icon size={34} className={category.inkClass} strokeWidth={2} />
            </div>
            <h1 className="mt-5 text-[clamp(2rem,5vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              {tool.h1}
            </h1>
            <p className="mt-3.5 max-w-[560px] text-[1.08rem] leading-relaxed text-muted">
              {tool.tagline}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {PRIVACY.map(({ icon: PIcon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-muted"
                >
                  <PIcon size={14} className="text-[#16a34a]" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUTIL ===== */}
      <section className="site-shell px-5 py-10 sm:px-8 lg:px-12">
        {children}
      </section>

      <AdSlot slot="tool-top" label="728×90 ou responsive" />

      {/* ===== COMMENT ÇA MARCHE ===== */}
      <section className="site-shell px-5 py-12 sm:px-8 lg:px-12">
        <div className="mb-9 text-center">
          <span
            className={`text-[0.8rem] font-semibold uppercase tracking-[0.08em] ${category.inkClass}`}
          >
            Mode d&apos;emploi
          </span>
          <h2 className="mt-2 text-[1.9rem] font-bold tracking-[-0.025em]">
            Comment ça marche
          </h2>
        </div>
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-md font-mono text-[1.05rem] font-bold"
                style={{
                  backgroundColor: category.hex,
                  color: category.inkHex,
                }}
              >
                {i + 1}
              </div>
              <h3 className="mb-1.5 text-[1.05rem] font-semibold">
                {step.title}
              </h3>
              <p className="text-[0.92rem] leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section className="border-y border-border bg-surface">
        <div className="site-shell px-5 py-12 sm:px-8 lg:px-12">
          <div className="mb-9 text-center">
            <span
              className={`text-[0.8rem] font-semibold uppercase tracking-[0.08em] ${category.inkClass}`}
            >
              Avantages
            </span>
            <h2 className="mt-2 text-[1.9rem] font-bold tracking-[-0.025em]">
              Pourquoi utiliser cet outil
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((benefit, i) => {
              const BIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-bg p-6"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[11px] ${category.bgClass}`}
                  >
                    <BIcon
                      size={20}
                      className={category.inkClass}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-1.5 text-[1.05rem] font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-muted">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AdSlot slot="tool-bottom" label="Responsive" />

      {/* ===== FAQ ===== */}
      <section className="site-shell px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-3 text-center text-[1.9rem] font-bold tracking-[-0.025em]">
            Questions fréquentes
          </h2>
          <FAQ items={faq} />
        </div>
      </section>

      <RelatedTools slug={tool.slug} />
    </>
  );
}
