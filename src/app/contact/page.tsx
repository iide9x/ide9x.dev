import type { Metadata } from "next";
import { site } from "@/lib/config";
import { SocialIcon, Prompt } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}`,
};

function display(href: string) {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Contact() {
  const email = site.socials.find((s) => s.key === "email");
  const work = site.socials.filter((s) => s.key === "hackerone" || s.key === "bugcrowd");
  const socials = site.socials.filter((s) => s.key !== "email" && s.key !== "hackerone" && s.key !== "bugcrowd");

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground mb-2">
        <span className="accent">$</span> contact <span className="text-muted">--me</span>
      </h1>

      <p className="text-muted mb-8">
        Security findings, collaboration, or just to say hi.
      </p>

      {email && (
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest text-muted mb-3">
            {"// direct"}
          </h2>
          <a
            href={email.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-bd rounded-lg px-4 py-3 bg-surface/40 hover:border-accent/60 hover:bg-surface transition-all"
          >
            <span className="text-muted group-hover:text-accent transition-colors">
              <SocialIcon name="email" className="w-5 h-5" />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                {email.label}
              </span>
              <span className="text-xs text-muted truncate">{display(email.href)}</span>
            </span>
            <span className="ml-auto text-muted/40 group-hover:text-accent transition-colors">
              <Prompt className="w-4 h-4" />
            </span>
          </a>
        </div>
      )}

      <div>
        <h2 className="text-sm uppercase tracking-widest text-muted mb-3">
          {"// bug bounty platforms"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {work.map((s) => (
            <a
              key={s.key}
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
          ))}
        </div>

        <h2 className="text-sm uppercase tracking-widest text-muted mb-3">
          {"// socials"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map((s) => (
            <a
              key={s.key}
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
          ))}
        </div>
      </div>
    </div>
  );
}