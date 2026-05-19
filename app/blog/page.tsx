import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Guides et conseils pratiques sur les images, les PDF, la sécurité et les outils du quotidien — par l'équipe Toolify.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="site-shell px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <h1 className="mb-3 text-[clamp(2rem,5vw,2.75rem)] font-bold tracking-[-0.035em]">
        Le blog Toolify
      </h1>
      <p className="mb-10 text-[1.1rem] leading-relaxed text-muted">
        Guides et conseils pratiques pour tirer le meilleur de tes images, de
        tes PDF et de tes outils du quotidien.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted">Les premiers articles arrivent bientôt.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-card"
            >
              <time
                dateTime={post.date}
                className="text-[0.8rem] font-medium uppercase tracking-wide text-hint"
              >
                {formatDate(post.date)}
              </time>
              <h2 className="mb-1.5 mt-1 text-[1.3rem] font-semibold tracking-[-0.01em]">
                {post.title}
              </h2>
              <p className="mb-3 text-[0.95rem] leading-relaxed text-muted">
                {post.description}
              </p>
              <span className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-ink">
                Lire l&apos;article
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
