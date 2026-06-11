import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        <span className="accent">404</span> — not found
      </h1>
      <p className="text-muted mb-6">This path doesn&apos;t resolve.</p>
      <Link href="/" className="text-accent hover:underline">
        ← back home
      </Link>
    </div>
  );
}
