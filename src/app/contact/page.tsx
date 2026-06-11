import type { Metadata } from "next";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}`,
};

const channels = [
  { label: "github", value: site.links.github },
  { label: "x / twitter", value: site.links.twitter },
  { label: "hackerone", value: site.links.hackerone },
  { label: "email", value: site.links.email },
];

function display(v: string) {
  return v.replace(/^mailto:/, "").replace(/^https?:\/\//, "");
}

export default function Contact() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        <span className="accent">$</span> contact --me
      </h1>

      <p className="text-muted mb-8">
        Reach out for security findings, collaboration, or just to say hi.
      </p>

      <ul className="space-y-3">
        {channels.map((c) => (
          <li
            key={c.label}
            className="flex items-center gap-3 border border-bd rounded px-4 py-3 hover:border-accent/50 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest text-muted w-28 shrink-0">
              {c.label}
            </span>
            <a
              href={c.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors break-all"
            >
              {display(c.value)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
