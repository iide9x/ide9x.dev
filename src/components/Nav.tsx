import Link from "next/link";
import { site } from "@/lib/config";

const links = [
  { href: "/", label: "blog" },
  { href: "/about/", label: "about" },
  { href: "/contact/", label: "contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-bd bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tight text-foreground hover:text-accent transition-colors"
        >
          <span className="accent">~/</span>
          {site.handle}
          <span className="accent animate-pulse">_</span>
        </Link>
        <ul className="flex gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-3 py-1.5 rounded text-muted hover:text-accent hover:bg-surface transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
