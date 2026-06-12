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

  return (
    <div className="space-y-12">
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-6">
          <span className="accent">$</span> cat{" "}
          <span className="text-muted">about.txt</span>
        </h1>

        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            I&apos;m <span className="text-foreground">{site.realName}</span>,
            also known as{" "}
            <span className="text-foreground">{site.name}</span> — a{" "}
            {site.role.toLowerCase()}.
          </p>
          <p>
            I spend my time finding and reporting vulnerabilities, and turning
            small bugs into bigger impact. This site is where I publish writeups
            and notes from that work.
          </p>
        </div>
      </section>

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
              className="flex items-center gap-2 border border-bd rounded-lg bg-surface/40 px-3 py-2.5 text-sm hover:border-accent/50 transition-colors"
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

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// focus areas"}
        </h2>
        <ul className="space-y-2 text-muted leading-relaxed">
          <li className="flex gap-2">
            <span className="accent">▸</span> Web application &amp; API security
          </li>
          <li className="flex gap-2">
            <span className="accent">▸</span> Authentication &amp; access-control flaws
          </li>
          <li className="flex gap-2">
            <span className="accent">▸</span> Cloud &amp; infrastructure misconfigurations
          </li>
          <li className="flex gap-2">
            <span className="accent">▸</span> Chaining low-severity issues into critical impact
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// stack"}
        </h2>
        <ul className="space-y-2 text-muted leading-relaxed">
          <li className="flex gap-2">
            <span className="accent">▸</span> Recon &amp; content discovery (custom wordlists, JS analysis)
          </li>
          <li className="flex gap-2">
            <span className="accent">▸</span> Burp Suite, custom tooling, and a lot of curl
          </li>
        </ul>
      </section>
    </div>
  );
}
