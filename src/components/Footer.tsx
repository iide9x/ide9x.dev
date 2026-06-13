import Link from "next/link";
import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";

const navLinks = [
  { href: "/", label: "blog" },
  { href: "/about/", label: "about" },
  { href: "/contact/", label: "contact" },
];

export default function Footer() {
  const year = 2026;
  const socials = site.socials.filter((s) => s.key !== "email");

  return (
    <footer className="border-t border-bd mt-24">
      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link
            href="/"
            className="font-bold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            <span className="accent">~/</span>
            {site.handle}
          </Link>

          <nav className="flex gap-4 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <ul className="flex gap-1">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="block p-1.5 rounded text-muted hover:text-accent transition-colors"
                >
                  <SocialIcon name={s.key} className="w-[18px] h-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-muted/70 text-center sm:text-left">
          © {year} <span className="text-muted">{site.name}</span> · built with
          Next.js · hosted on GitHub Pages
        </div>
      </div>
    </footer>
  );
}
