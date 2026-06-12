import type { Metadata } from "next";
import { site } from "@/lib/config";

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
  ];

  const focus = [
    "Web application & API security",
    "Authentication & access-control flaws",
    "Cloud & infrastructure misconfigurations",
    "Chaining low-severity issues into critical impact",
  ];

  const stack = [
    "Recon & content discovery (custom wordlists, JS analysis)",
    "Burp Suite, custom tooling, and a lot of curl",
  ];

  return (
    <div className="space-y-14">
      {/* Intro — terminal card */}
      <section>
        <div className="rounded-xl border border-bd bg-surface/50 overflow-hidden shadow-[0_0_40px_-20px_rgba(57,255,20,0.4)]">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bd bg-surface/80">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-muted">cat about.txt</span>
          </div>
          <div className="px-5 py-6 space-y-4 text-muted leading-relaxed">
            <p>
              I&apos;m <span className="text-foreground">{site.realName}</span>,
              also known as{" "}
              <span className="text-foreground">{site.name}</span> — a{" "}
              {site.role.toLowerCase()}.
            </p>
            <p>
              I spend my time finding and reporting vulnerabilities, and turning
              small bugs into bigger impact. This site is where I publish
              writeups and notes from that work.
            </p>
          </div>
        </div>
      </section>

      {/* My work */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// my work"}
        </h2>
        <p className="text-muted leading-relaxed mb-5">
          I&apos;ve reported vulnerabilities to many companies, including:
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {programs.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 border border-bd rounded-lg bg-surface/40 px-3 py-2.5 text-sm hover:border-accent/50 hover:bg-surface transition-colors"
            >
              <span className="accent">▸</span>
              <span className="text-foreground">{p}</span>
            </li>
          ))}
          <li className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted italic">
            <span className="accent">▸</span>
            <span>and others…</span>
          </li>
        </ul>
      </section>

      {/* Focus areas */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// focus areas"}
        </h2>
        <ul className="space-y-2 text-muted leading-relaxed">
          {focus.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="accent">▸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// stack"}
        </h2>
        <ul className="space-y-2 text-muted leading-relaxed">
          {stack.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="accent">▸</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
