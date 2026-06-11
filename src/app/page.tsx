import Link from "next/link";
import { getAllPostsMeta, formatDate } from "@/lib/posts";
import { site } from "@/lib/config";

export default function Home() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          <span className="accent">$</span> whoami
        </h1>
        <p className="text-muted leading-relaxed">
          {site.name} ({site.realName}) — {site.role}. Notes, writeups, and
          findings from the things I break.
        </p>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-6">
          {"// posts"}
        </h2>

        {posts.length === 0 ? (
          <p className="text-muted text-sm">
            No posts yet. Drop a{" "}
            <code className="text-accent">.md</code> file in{" "}
            <code className="text-accent">content/posts/</code>.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug} className="group">
                <Link href={`/blog/${p.slug}/`} className="block">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs text-muted font-mono shrink-0">
                      {formatDate(p.date)}
                    </span>
                    <span className="text-foreground group-hover:text-accent transition-colors font-semibold">
                      {p.title}
                    </span>
                  </div>
                  {p.excerpt && (
                    <p className="text-sm text-muted mt-1 line-clamp-2">
                      {p.excerpt}
                    </p>
                  )}
                  {p.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-muted border border-bd px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
