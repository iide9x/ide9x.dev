import type { Metadata } from "next";
import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";
import type { Social } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}`,
};

function display(href: string) {
  return href
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

function Card({ s }: { s: Social }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 rounded-xl border border-bd bg-surface/40 px-4 py-3.5 hover:bg-surface/80 hover:border-faint/40 transition-all"
    >
      <span className="text-faint group-hover:text-accent transition-colors">
        <SocialIcon name={s.key} className="w-5 h-5" />
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-foreground">{s.label}</span>
        <span className="text-xs text-faint truncate font-mono">
          {display(s.href)}
        </span>
      </span>
      <span className="ml-auto text-faint/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </a>
  );
}

export default function Contact() {
  const email = site.socials.find((s) => s.key === "email");
  const rest = site.socials.filter(
    (s) => s.key !== "email" && s.key !== "hackerone" && s.key !== "bugcrowd",
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Let&apos;s get in touch.
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl text-balance">
          Security findings, collaboration, or just to say hi — reach me
          through any of these.
        </p>
      </section>

      {email && (
        <section>
          <h2 className="eyebrow mb-4">Email</h2>
          <Card s={email} />
        </section>
      )}

      <section>
        <h2 className="eyebrow mb-4">Elsewhere</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rest.map((s) => (
            <Card key={s.key} s={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
