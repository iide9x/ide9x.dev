import { site } from "@/lib/config";
import { SocialIcon } from "@/components/Icons";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-bd mt-20">
      <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <span className="text-sm text-muted">
          © {year}{" "}
          <span className="text-foreground">{site.name}</span>
          <span className="text-muted/60"> — all systems operational</span>
        </span>
        <ul className="flex gap-3">
          {site.socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="text-muted hover:text-accent transition-colors"
              >
                <SocialIcon name={s.key} className="w-[18px] h-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
