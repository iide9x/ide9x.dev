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
    {
      title: "Web & API security",
      desc: "Hunting logic flaws and injection across modern web apps and APIs.",
    },
    {
      title: "Auth & access control",
      desc: "Broken authentication, IDORs, and privilege-escalation paths.",
    },
    {
      title: "Cloud & infra",
      desc: "Misconfigurations, exposed services, and metadata exploitation.",
    },
    {
      title: "Impact chaining",
      desc: "Turning low-severity bugs into critical, demonstrable impact.",
    },
  ];

  const stack = [
    "Recon",
    "Content discovery",
    "Custom wordlists",
    "JS analysis",
    "Burp Suite",
    "Custom tooling",
    "curl",
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
              small bugs into bigger impact. This site is where I publish my
              writeups and findings.
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

      {/* Focus areas — numbered cards */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// focus areas"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {focus.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-lg border border-bd bg-surface/40 p-4 hover:border-accent/50 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-foreground font-semibold">{f.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack — tool chips */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// stack"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="text-sm rounded-md border border-bd bg-surface/40 px-3 py-1.5 text-foreground hover:border-accent/50 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
