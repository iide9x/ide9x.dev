import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-muted hover:text-accent transition-colors"
      >
        ← back
      </Link>

      <header className="mt-6 mb-8">
        <div className="text-xs text-muted font-mono mb-2">
          {formatDate(post.date)}
        </div>
        <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="flex gap-2 mt-3">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs text-muted border border-bd px-1.5 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
