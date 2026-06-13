import Link from "next/link";
import { getAllPostsMeta, formatDate } from "@/lib/posts";
import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";

export default function Home() {
  const posts = getAllPostsMeta();
  const heroSocials = site.socials.filter((s) => s.key !== "email");

  return (
    <div>
      {/* Terminal-card hero */}
      <section className="mb-16">
        <div className="rounded-xl border border-bd bg-surface/50 overflow-hidden shadow-[0_0_40px_-20px_rgba(57,255,20,0.4)]">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bd bg-surface/80">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-muted">{site.handle}@ide9x:~</span>
          </div>
          <div className="px-5 py-6 space-y-2">
            <p className="text-sm text-muted">
              <span className="accent">$</span> whoami
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {site.name}
            </h1>
            <p className="text-muted leading-relaxed">
              {site.role}. Writeups and findings from the things I break.
            </p>
            <p className="text-sm text-muted pt-1">
              <span className="accent">$</span>{" "}
              <span className="text-foreground">cat</span> ./focus &rarr; web ·
              api · auth · cloud
              <span className="accent animate-pulse">_</span>
            </p>

            {/* Quick links + socials */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/about/"
                className="text-sm rounded-md border border-bd px-3 py-1.5 text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              >
                about
              </Link>
              <Link
                href="/contact/"
                className="text-sm rounded-md border border-bd px-3 py-1.5 text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              >
                contact
              </Link>
              <span className="hidden sm:block w-px h-5 bg-bd mx-1" />
              <div className="flex items-center gap-1">
                {heroSocials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="p-2 rounded-md text-muted hover:text-accent hover:bg-surface transition-colors"
                  >
                    <SocialIcon name={s.key} className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-6">
          {"// posts"}
        </h2>

        {posts.length === 0 ? (
          <div className="border border-bd rounded-xl bg-surface/40 px-6 py-12 text-center">
            <p className="text-foreground font-semibold mb-1">
              <span className="accent">~</span> Coming soon
            </p>
            <p className="text-sm text-muted">
              Writeups are on the way. Check back shortly.
            </p>
          </div>
        ) : (
          <ul className="space-y-1">
            {posts.map((p) => (
              <li key={p.slug} className="group">
                <Link
                  href={`/blog/${p.slug}/`}
                  className="block rounded-lg px-3 py-3 -mx-3 hover:bg-surface/60 transition-colors"
                >
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
