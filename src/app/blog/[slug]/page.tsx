import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/config";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllSlugs();
  // Provide a placeholder param when there are no posts yet so the
  // static export step doesn't fail on an empty dynamic route.
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found" };

  const baseMetadata: Metadata = {
    title: post.title,
    description: post.excerpt,
  };

  if (post.image) {
    const imageUrl = `${site.url}${post.image.startsWith('/') ? post.image : `/${post.image}`}`;
    // Open Graph
    baseMetadata.openGraph = {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    };
    // Twitter
    baseMetadata.twitter = {
      card: 'summary_large_image',
      images: [imageUrl],
    };
  }

  return baseMetadata;
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
        className="text-sm text-faint hover:text-foreground transition-colors"
      >
        ← Back to writeups
      </Link>

      <header className="mt-6 mb-10">
        <div className="text-xs text-faint font-mono mb-3">
          {formatDate(post.date)}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-faint border border-bd px-2 py-0.5 rounded-full"
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
