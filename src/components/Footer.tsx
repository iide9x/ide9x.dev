import { site } from "@/lib/config";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-bd/70 mt-24">
      <div className="max-w-3xl mx-auto px-5 py-8 flex items-center justify-between text-xs text-faint">
        <p>
          © {year} <span className="text-muted">{site.name}</span>
        </p>
        <p className="font-mono">{site.domain}</p>
      </div>
    </footer>
  );
}
