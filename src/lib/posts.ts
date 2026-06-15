import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  excerpt: string;
  image?: string;
  readingTime: number;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

function ensureDir(): boolean {
  return fs.existsSync(postsDir);
}

export function getAllSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  if (!ensureDir()) return [];
  const metas = getAllSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || "1970-01-01",
      tags: (data.tags as string[]) || [],
      excerpt:
        (data.excerpt as string) ||
        content.replace(/[#>*`_\-]/g, "").trim().slice(0, 160),
      image: (data.image as string) || undefined,
      readingTime: estimateReadingTime(content),
    };
  });
  // newest first
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "1970-01-01",
    tags: (data.tags as string[]) || [],
    excerpt: (data.excerpt as string) || "",
    image: (data.image as string) || undefined,
    readingTime: estimateReadingTime(content),
    contentHtml: processed.toString(),
  };
}

// Format 2026-06-11 -> "2026 · 06 · 11"
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${y} · ${m} · ${d}`;
}
