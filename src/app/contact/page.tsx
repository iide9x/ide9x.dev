import type { Metadata } from "next";
import { site } from "@/lib/config";
import { SocialIcon, Prompt } from "@/components/Icons";
import type { Social } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}`,
};

function display(href: string) {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function Card({ s }: { s: Social }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 border border-bd rounded-lg px-4 py-3 bg-surface/40 hover:border-accent/60 hover:bg-surface transition-all"
    >
      <span className="text-muted group-hover:text-accent transition-colors">
        <SocialIcon name={s.key} className="w-5 h-5" />
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-sm text-foreground group-hover:text-accent transition-colors">
          {s.label}
        </span>
        <span className="text-xs text-muted truncate">{display(s.href)}</span>
      </span>
      <span className="ml-auto text-muted/40 group-hover:text-accent transition-colors">
        <Prompt className="w-4 h-4" />
      </span>
    </a>
  );
}

export default function Contact() {
  const email = site.socials.find((s) => s.key === "email");
  const work = site.socials.filter(
    (s) => s.key === "hackerone" || s.key === "bugcrowd",
  );
  const socials = site.socials.filter(
    (s) => s.key !== "email" && s.key !== "hackerone" && s.key !== "bugcrowd",
  );

  return (
    <div className="space-y-12">
      {/* Header — terminal card */}
      <section>
        <div className="rounded-xl border border-bd bg-surface/50 overflow-hidden shadow-[0_0_40px_-20px_rgba(57,255,20,0.4)]">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bd bg-surface/80">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-muted">contact --me</span>
          </div>
          <div className="px-5 py-6">
            <p className="text-muted leading-relaxed">
              Security findings, collaboration, or just to say hi
              <span className="accent animate-pulse">_</span>
            </p>
          </div>
        </div>
      </section>

      {email && (
        <section>
          <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
            {"// direct"}
          </h2>
          <Card s={email} />
        </section>
      )}

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// bug bounty platforms"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {work.map((s) => (
            <Card key={s.key} s={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-4">
          {"// socials"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map((s) => (
            <Card key={s.key} s={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
