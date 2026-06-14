import Link from "next/link";
import { getAllPostsMeta, formatDate } from "@/lib/posts";
import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";

export default function Home() {
  const posts = getAllPostsMeta();
  const heroSocials = site.socials.filter((s) => s.key !== "email");
  const focus = ["Web", "API", "Auth", "Cloud"];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-2">
        <p className="eyebrow mb-4">Security Researcher</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance">
          Hi, I&apos;m {site.name}.
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl text-balance">
          I find and report security vulnerabilities, then write about how
          they work. This is where I share my findings and writeups.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {focus.map((f) => (
            <span
              key={f}
              className="text-xs font-mono rounded-full border border-bd bg-surface/60 px-3 py-1 text-muted"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/about/"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            About me
          </Link>
          <Link
            href="/contact/"
            className="rounded-lg border border-bd px-4 py-2 text-sm font-medium text-foreground hover:bg-surface transition-colors"
          >
            Get in touch
          </Link>
          <span className="hidden sm:block w-px h-6 bg-bd mx-1" />
          <div className="flex items-center gap-1">
            {heroSocials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="p-2 rounded-md text-faint hover:text-accent hover:bg-surface transition-colors"
              >
                <SocialIcon name={s.key} className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Writeups */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Writeups
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-bd bg-surface/40 px-6 py-14 text-center">
            <p className="text-foreground font-medium mb-1">Coming soon</p>
            <p className="text-sm text-muted">
              Writeups are on the way — check back shortly.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}/`}
                  className="block rounded-xl border border-transparent hover:border-bd hover:bg-surface/50 px-4 py-4 -mx-4 transition-colors"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs text-faint font-mono shrink-0">
                      {formatDate(p.date)}
                    </span>
                    <span className="text-foreground font-medium">
                      {p.title}
                    </span>
                  </div>
                  {p.excerpt && (
                    <p className="text-sm text-muted mt-1.5 line-clamp-2">
                      {p.excerpt}
                    </p>
                  )}
                  {p.tags.length > 0 && (
                    <div className="flex gap-2 mt-2.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-faint border border-bd px-2 py-0.5 rounded-full"
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
