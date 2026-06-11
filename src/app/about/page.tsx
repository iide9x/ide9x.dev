import type { Metadata } from "next";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}`,
};

export default function About() {
  const programs = [
    { name: "Autodesk", type: "SaaS / CAD" },
    { name: "ABB", type: "Industrial Automation" },
    { name: "IBM", type: "Cloud / Enterprise" },
    { name: "Anthropic", type: "AI Safety" },
    { name: "Whoer VPN", type: "Privacy / Network" },
    { name: "FastRetailing", type: "Retail / E-commerce" },
    { name: "Redis", type: "Database / Infrastructure" },
    { name: "Hexagon", type: "Manufacturing / Geospatial" },
    { name: "Western Union", type: "Fintech" },
    { name: "Workato", type: "Integration / Automation" },
    { name: "GetYourGuide", type: "Travel / Marketplace" },
    { name: "Aboitiz", type: "Conglomerate / Energy" },
    { name: "Smule", type: "Social / Audio" },
  ];

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-6">
        <span className="accent">$</span> cat <span className="text-muted">about.txt</span>
      </h1>

      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          I&apos;m <span className="text-foreground">{site.realName}</span>, also known as
          <span className="text-foreground">{site.name}</span> — a{" "}
          {site.role.toLowerCase()}.
        </p>
        <p>
          I hunt bugs across web applications, APIs, and cloud infrastructure. My approach:
          deep recon, understanding business logic, and chaining low-severity findings into
          critical impact.
        </p>
        <p>
          <span className="text-foreground">Notable programs:</span> I&apos;ve reported
          vulnerabilities to {programs.length}+ organizations including:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ml-4">
          {programs.map((p) => (
            <li key={p.name} className="flex items-center gap-2">
              <span className="accent">▸</span>
              <span className="text-foreground">{p.name}</span>
              <span className="text-muted/60">({p.type})</span>
            </li>
          ))}
        </ul>
        <p>
          <span className="text-foreground">Focus areas:</span> web application security,
          API testing, authentication and access-control flaws, cloud misconfigurations,
          and chaining low-severity issues into critical ones.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-sm uppercase tracking-widest text-muted mb-3">
          {"// stack"}
        </h2>
        <ul className="text-sm text-muted space-y-1">
          <li>— recon &amp; content discovery (custom wordlists, JS analysis)</li>
          <li>— Burp Suite, custom tooling, a lot of curl</li>
          <li>— bug bounty platforms: HackerOne, Bugcrowd</li>
          <li>— Node.js / Next.js internals, prototype pollution, path normalization</li>
          <li>— cloud infra: AWS, GCP, Azure, Kubernetes</li>
        </ul>
      </div>
    </div>
  );
}