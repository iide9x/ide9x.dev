import { site } from "@/lib/config";

const social = [
  { href: site.links.github, label: "github" },
  { href: site.links.twitter, label: "x" },
  { href: site.links.hackerone, label: "hackerone" },
  { href: site.links.email, label: "email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bd mt-16">
      <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted">
        <span>
          © {site.handle} — {site.realName}
        </span>
        <ul className="flex gap-4">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
