import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = buildMetadata({
  title: "Page Not Found",
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="page-offset flex items-center justify-center section-pad"
        style={{ background: "var(--surface-0)", minHeight: "60vh" }}
      >
        <div className="container max-w-lg mx-auto text-center">
          <p
            className="text-8xl font-light mb-6"
            style={{ color: "var(--accent-mid)", fontFamily: "var(--font-dm-sans)" }}
          >
            404
          </p>
          <h1 className="t-display-md mb-3" style={{ color: "var(--fg-ink)" }}>
            Page not found.
          </h1>
          <p className="t-body mb-8" style={{ color: "var(--fg-secondary)" }}>
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Try heading back
            to the homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full t-body-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--accent)", color: "var(--accent-on)" }}
            >
              Back to home
            </Link>
            <Link
              href="/#enquiry"
              className="px-6 py-3 rounded-full t-body-sm font-medium border transition-colors hover:bg-[var(--surface-1)]"
              style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
