"use client";

import Link from "next/link";

const siteLinks = [
  {
    heading: "Products",
    links: [
      { label: "52mm Casement Series", href: "/products/52-casement" },
      { label: "60mm Casement Series", href: "/products/60-casement" },
      { label: "80mm Sliding Series", href: "/products/80-sliding" },
      { label: "All finishes & colours", href: "/#finishes" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Sindhole Polymers", href: "/#about" },
      { label: "Why Greentech uPVC", href: "/#why-greentech" },
      { label: "Sustainability", href: "/#sustainability" },
      { label: "Certifications", href: "/#certifications" },
    ],
  },
  {
    heading: "Trade",
    links: [
      { label: "For fabricators", href: "/#fabricators" },
      { label: "Become a partner", href: "/#enquiry" },
      { label: "Resources & downloads", href: "/#resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Showroom: Bidar", href: "/#contact" },
      { label: "+91 93919 05091", href: "tel:+919391905091" },
      { label: "polymers@sindhole.com", href: "mailto:polymers@sindhole.com" },
      { label: "WhatsApp us", href: "https://wa.me/919391905091" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--fg-ink)", color: "var(--fg-inverse)" }}>
      {/* Top — fabricator CTA banner */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="t-body font-semibold" style={{ color: "var(--fg-inverse)" }}>
              Are you a fabricator or contractor?
            </p>
            <p className="t-body-sm mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
              Register for trade pricing and dedicated supply support.
            </p>
          </div>
          <a
            href="#enquiry"
            className="flex-shrink-0 px-5 py-2.5 rounded-full t-body-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--accent-on)" }}
          >
            Become a fabricator partner →
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <FooterWordmark />
            </Link>
            <p className="t-body-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              Authorised dealer of Greentech uPVC window & door profile systems.
              Serving North Karnataka from Bidar.
            </p>
            <a
              href="https://wa.me/919391905091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full t-body-xs font-medium"
              style={{ background: "#25D366", color: "#fff" }}
            >
              WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {siteLinks.map((col) => (
            <div key={col.heading}>
              <h3
                className="t-eyebrow mb-4"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="t-body-xs transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="t-body-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Sindhole Polymers. Manahalli Road, Bidar, Karnataka 585403.
            Website: polymers.sindhole.com
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="t-body-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>Privacy Policy</Link>
            <Link href="/legal/distributor" className="t-body-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>Authorised Distributor</Link>
            <Link href="/faq" className="t-body-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>FAQ</Link>
          </div>
        </div>
        <div className="container mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="t-body-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Made by{" "}
            <a
              href="https://praneel.sindhole.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white underline underline-offset-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Praneel S
            </a>
          </p>
          <p className="t-body-xs sm:text-right" style={{ color: "rgba(255,255,255,0.2)" }}>
            Greentech uPVC India Pvt. Ltd. is an independent company. Sindhole Polymers is an authorised dealer
            and is not affiliated with or owned by Greentech. All Greentech brand marks, certifications, and
            product specifications are the property of Greentech uPVC India Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterWordmark() {
  return (
    <svg width="160" height="28" viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="10" height="10" rx="1" fill="var(--accent)" />
      <rect x="1" y="13" width="10" height="10" rx="1" fill="var(--accent)" opacity="0.35" />
      <rect x="4" y="9" width="4" height="4" fill="var(--fg-ink)" />
      <text x="18" y="19" fontFamily="'DM Sans', sans-serif" fontSize="13" fontWeight="500" letterSpacing="-0.02em" fill="rgba(255,255,255,0.9)">SINDHOLE</text>
      <text x="18" y="26" fontFamily="'DM Sans', sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="0.09em" fill="rgba(255,255,255,0.4)">POLYMERS</text>
    </svg>
  );
}
