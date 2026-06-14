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
      desc: "Logic flaws and injection across modern web applications and APIs.",
    },
    {
      title: "Auth & access control",
      desc: "Broken authentication, IDORs, and privilege-escalation paths.",
    },
    {
      title: "Cloud & infrastructure",
      desc: "Misconfigurations, exposed services, and metadata exploitation.",
    },
    {
      title: "Impact chaining",
      desc: "Turning small bugs into critical, demonstrable impact.",
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
      </section>

      {/* Focus areas */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-5">
          What I focus on
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {focus.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-bd bg-surface/40 p-5 hover:bg-surface/70 transition-colors"
            >
              <h3 className="text-foreground font-medium mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-5">
          How I work
        </h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="text-sm font-mono rounded-full border border-bd bg-surface/40 px-3 py-1.5 text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
