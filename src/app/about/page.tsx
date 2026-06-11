import type { Metadata } from "next";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} (${site.realName})`,
};

export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        <span className="accent">$</span> cat about.txt
      </h1>

      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          I&apos;m <span className="text-foreground">{site.name}</span> (
          {site.realName}), a {site.role.toLowerCase()}.
        </p>
        <p>
          I spend my time finding and reporting vulnerabilities, reading source
          code, and turning small bugs into bigger impact. This site is where I
          publish writeups and notes from that work.
        </p>
        <p>
          <span className="text-foreground">Focus areas:</span> web application
          security, API testing, authentication and access-control flaws, and
          chaining low-severity issues into critical ones.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-sm uppercase tracking-widest text-muted mb-3">
          {"// stack"}
        </h2>
        <ul className="text-sm text-muted space-y-1">
          <li>— recon &amp; content discovery</li>
          <li>— source-code review of open-source components</li>
          <li>— Burp Suite, custom tooling, a lot of curl</li>
        </ul>
      </div>
    </div>
  );
}
