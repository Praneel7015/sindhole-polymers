import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackNavProps {
  /** Override link destination (defaults to "/") */
  href?: string;
  /** Override label text (defaults to "Back to home") */
  label?: string;
}

/**
 * Slim top navigation bar used on standalone pages (FAQ, legal, 404)
 * to give users a clear path back to the homepage.
 */
export function BackNav({ href = "/", label = "Back to home" }: BackNavProps) {
  return (
    <nav
      className="sticky top-0 z-40 border-b"
      style={{
        background: "var(--surface-0)",
        borderColor: "var(--border-subtle)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="container flex items-center justify-between h-14">
        {/* Left — back link */}
        <Link
          href={href}
          className="inline-flex items-center gap-2 t-body-sm font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--fg-secondary)" }}
        >
          <ArrowLeft size={15} strokeWidth={2} />
          {label}
        </Link>

        {/* Right — wordmark so users know where they are */}
        <Link
          href="/"
          className="t-body-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          style={{ color: "var(--fg-ink)" }}
        >
          Sindhole Polymers
        </Link>
      </div>
    </nav>
  );
}
