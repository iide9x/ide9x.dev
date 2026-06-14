"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/config";

const links = [
  { href: "/", label: "Writeups" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-bd/70 bg-background/70 backdrop-blur-md">
      <nav className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] transition-transform group-hover:scale-125" />
          {site.name}
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-foreground bg-surface"
                      : "text-muted hover:text-foreground hover:bg-surface/60"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
