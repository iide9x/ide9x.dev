import Link from "next/link";
import { site } from "@/lib/config";

const links = [
  { href: "/", label: "blog" },
  { href: "/about/", label: "about" },
  { href: "/contact/", label: "contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-bd">
      <nav className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-foreground hover:text-accent transition-colors">
          <span className="accent">~/</span>
          {site.handle}
        </Link>
        <ul className="flex gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-muted hover:text-accent transition-colors"
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
