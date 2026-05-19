import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "fr",
    author: { "@type": "Person", name: post.author },
    mainEntityOfPage: url,
    url,
  };

  return (
    <article className="site-shell px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Fil d'Ariane"
        className="mb-6 text-[0.85rem] text-hint"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Accueil
        </Link>
        <span className="mx-1.5 text-border">/</span>
        <Link href="/blog" className="transition-colors hover:text-ink">
          Blog
        </Link>
        <span className="mx-1.5 text-border">/</span>
        <span className="text-muted">{post.title}</span>
      </nav>

      <time
        dateTime={post.date}
        className="text-[0.8rem] font-medium uppercase tracking-wide text-hint"
      >
        {formatDate(post.date)} · par {post.author}
      </time>
      <h1 className="mb-8 mt-2 text-[clamp(1.9rem,4.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
        {post.title}
      </h1>

      <div className="tool-prose">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          href="/blog"
          className="text-[0.9rem] font-medium text-cat-textInk hover:underline"
        >
          ← Tous les articles
        </Link>
      </div>
    </article>
  );
}
