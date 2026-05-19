import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: now, priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: now, priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
