import Link from "next/link";
import { CATEGORIES, getToolsByCategory, type ToolCategory } from "@/lib/tools";

const CATEGORY_ORDER: ToolCategory[] = ["image", "pdf", "text", "util", "design", "calc"];

const SITE_LINKS = [
  { href: "/", label: "Tous les outils" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/terms", label: "Conditions" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-elevated">
      <div className="site-shell py-14">
        {/* All categories — every tool linked for SEO + page depth */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_ORDER.map((c) => {
            const meta = CATEGORIES[c];
            const tools = getToolsByCategory(c);
            return (
              <div key={c}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-fg">
                  {meta.label}
                </h3>
                <ul className="space-y-1.5">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tools/${t.slug}`}
                        className="text-sm text-fg-muted hover:text-accent"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Site + legal row */}
        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-fg text-canvas">
              <span className="font-serif text-lg leading-none">T</span>
            </span>
            <span className="font-semibold tracking-tight text-fg">toolify</span>
            <span className="text-sm text-fg-subtle">— outils gratuits en ligne</span>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {SITE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-fg-muted hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <span className="hidden text-fg-subtle md:inline">·</span>
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-fg-subtle hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-xs text-fg-subtle">
          © {new Date().getFullYear()} Toolify · Traitement local, sans inscription.
        </p>
      </div>
    </footer>
  );
}
