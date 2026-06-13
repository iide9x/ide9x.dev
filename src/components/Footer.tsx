import { site } from "@/lib/config";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-bd mt-24">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <p className="text-xs text-muted/70 text-center sm:text-left">
          © {year} <span className="text-muted">{site.name}</span>
        </p>
      </div>
    </footer>
  );
}
