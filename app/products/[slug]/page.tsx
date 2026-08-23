import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/content/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/meta";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) return buildMetadata({ title: "Product Not Found", noIndex: true });
  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.id}`,
  });
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="section-pad" style={{ background: "var(--surface-0)" }}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product.name, product.description)),
        }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 t-body-sm mb-8" style={{ color: "var(--fg-subtle)" }}>
          <Link href="/" className="hover:text-[var(--fg-ink)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-[var(--fg-ink)] transition-colors">Products</Link>
          <span>/</span>
          <span style={{ color: "var(--fg-secondary)" }}>{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
          {/* Left — product info */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full t-body-xs font-semibold mb-4"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              {product.code}
            </span>
            <h1 className="t-display-lg mb-3" style={{ color: "var(--fg-ink)" }}>
              {product.name}
            </h1>
            <p className="t-display-sm mb-6" style={{ color: "var(--accent)" }}>
              {product.tagline}
            </p>
            <p className="t-body max-w-xl leading-relaxed mb-8" style={{ color: "var(--fg-secondary)" }}>
              {product.description}
            </p>

            {/* Profile chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {product.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-lg t-body-sm font-medium"
                  style={{ background: "var(--surface-2)", color: "var(--fg-secondary)" }}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`/#enquiry`}
                className="px-6 py-3 rounded-full t-body-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--accent)", color: "var(--accent-on)" }}
              >
                Enquire about this series
              </a>
              <a
                href={siteConfig.whatsappPrefilled}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full t-body-sm font-medium border transition-colors hover:bg-[var(--surface-1)]"
                style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
              >
                Ask on WhatsApp
              </a>
            </div>

            {product.imageCredit && (
              <p className="t-body-xs mt-8" style={{ color: "var(--fg-subtle)" }}>
                Product imagery © {product.imageCredit}
              </p>
            )}
          </div>

          {/* Right — spec card */}
          <div
            className="rounded-2xl border p-6"
            style={{ background: "var(--surface-1)", borderColor: "var(--border-subtle)" }}
          >
            <h2 className="t-body font-semibold mb-4" style={{ color: "var(--fg-ink)" }}>
              Technical specifications
            </h2>
            <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3">
                  <span className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                    {spec.label}
                  </span>
                  <span className="t-body-sm font-medium" style={{ color: "var(--fg-ink)" }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="t-body-xs mt-4" style={{ color: "var(--fg-subtle)" }}>
              Specifications are indicative. Confirm tolerances and section codes with us before
              project documentation.
            </p>
          </div>
        </div>

        {/* Other products */}
        <div className="mt-20 pt-10 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <h2 className="t-display-sm mb-6" style={{ color: "var(--fg-ink)" }}>
            Other series
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter((p) => p.id !== product.id)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="block p-5 rounded-xl border transition-shadow hover:shadow-sm"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--surface-1)",
                  }}
                >
                  <span
                    className="t-body-xs font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {p.code}
                  </span>
                  <p className="t-body font-medium mt-1" style={{ color: "var(--fg-ink)" }}>
                    {p.name}
                  </p>
                  <p className="t-body-sm mt-0.5" style={{ color: "var(--fg-secondary)" }}>
                    {p.tagline}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
