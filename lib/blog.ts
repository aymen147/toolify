import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** Date au format ISO (AAAA-MM-JJ). */
  date: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readPostFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  if (!data.title || !data.date) return null;
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    author: String(data.author ?? "Aymen"),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const file = ["mdx", "md"]
    .map((ext) => `${slug}.${ext}`)
    .find((name) => fs.existsSync(path.join(BLOG_DIR, name)));
  return file ? readPostFile(file) : null;
}
