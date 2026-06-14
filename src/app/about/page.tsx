import type { Metadata } from "next";
import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}`,
};

export default function About() {
  const programs = [
    "Autodesk",
    "ABB",
    "IBM",
    "Anthropic",
    "WhoX VPN",
    "GetYourGuide",
    "Aboitizpower",
  ];

  const platforms = site.socials.filter(
    (s) => s.key === "hackerone" || s.key === "bugcrowd",
  );

  const focus = [
    {
      title: "Web & API security",
      tags: ["Business logic", "Injection", "Access control", "GraphQL"],
    },
    {
      title: "Authentication & authorization",
      tags: ["Account takeover", "IDOR", "OAuth", "Privilege escalation"],
    },
  ];

  const work = [
    {
      title: "Map the attack surface",
      desc: "Deep recon — subdomains, endpoints, and JavaScript — to understand how an application is really put together.",
    },
    {
      title: "Hunt with intent",
      desc: "Manual testing guided by how the app behaves, not a checklist. The interesting bugs live in the edge cases.",
    },
    {
      title: "Prove real impact",
      desc: "Every finding ships with a working proof of concept and a clear write-up of what an attacker actually gains.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Intro */}
      <section>
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {site.realName}, also known as {site.name}.
        </h1>
        <div className="mt-6 space-y-4 text-muted leading-relaxed max-w-xl">
          <p>
            I&apos;m a {site.role.toLowerCase()}. I spend my time finding and
            reporting vulnerabilities, and turning small bugs into bigger,
            demonstrable impact.
          </p>
          <p>
            This site is where I publish my writeups and the things I learn
            along the way.
          </p>
        </div>
      </section>

      {/* My work */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          My work
        </h2>
        <p className="text-muted leading-relaxed mb-5">
          I&apos;ve reported vulnerabilities to many companies, including:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {programs.map((p) => (
            <span
              key={p}
              className="rounded-lg border border-bd bg-surface/40 px-3.5 py-2 text-sm text-foreground"
            >
              {p}
            </span>
          ))}
          <span className="rounded-lg px-3.5 py-2 text-sm text-faint italic">
            and others…
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {platforms.map((p) => (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-lg border border-bd bg-surface/40 px-3.5 py-2.5 text-sm hover:bg-surface/80 hover:border-faint/40 transition-all"
            >
              <SocialIcon name={p.key} className="w-5 h-5" />
              <span className="font-medium text-foreground">{p.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Focus areas */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          What I focus on
        </h2>
        <p className="text-muted leading-relaxed mb-6 max-w-xl">
          Where I spend most of my research time.
        </p>
        <div className="space-y-3">
          {focus.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-bd bg-surface/40 p-5 hover:bg-surface/70 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-foreground font-medium">{f.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border border-bd bg-background/60 px-2.5 py-1 text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          How I work
        </h2>
        <p className="text-muted leading-relaxed mb-6 max-w-xl">
          A simple loop I keep coming back to on every target.
        </p>
        <ol className="space-y-4">
          {work.map((w, i) => (
            <li key={w.title} className="flex gap-4">
              <span className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg border border-bd bg-surface/40 text-sm font-mono text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-foreground font-medium mb-1">{w.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-xl">
                  {w.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
