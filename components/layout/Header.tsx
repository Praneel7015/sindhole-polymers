"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

const navItems = [
  {
    label: "Products",
    href: "#products",
    sub: [
      { label: "52mm Casement Series", href: "#products", desc: "5-chamber precision profile" },
      { label: "60mm Casement Series", href: "#products", desc: "Slimline frame, max daylight" },
      { label: "80mm Sliding Series", href: "#products", desc: "Smooth, weather-tight glide" },
    ],
  },
  { label: "Why Greentech", href: "#why-greentech" },
  { label: "Finishes", href: "#finishes" },
  { label: "For Fabricators", href: "#fabricators" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [headerH, setHeaderH] = useState(96);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(headerRef.current.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled, mobileOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "";
      setMobileProductsOpen(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const headerSolid = scrolled || mobileOpen;

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)]"
        style={{
          background: headerSolid ? "rgba(250,250,248,0.98)" : "transparent",
          backdropFilter: headerSolid ? "blur(12px)" : "none",
          borderBottom: headerSolid ? "1px solid var(--border-subtle)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-xs)" : "none",
        }}
      >
        {/* Utility bar */}
        <motion.div
          className="border-b overflow-hidden"
          style={{ borderColor: "var(--border-subtle)" }}
          initial={{ height: 32 }}
          animate={{ height: scrolled ? 0 : 32 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="container flex items-center justify-between h-8 gap-3 min-w-0">
            <span className="t-body-xs truncate min-w-0" style={{ color: "var(--fg-muted)" }}>
              <span className="sm:hidden">Bidar · North Karnataka</span>
              <span className="hidden sm:inline">Bidar · Kalaburagi · Gulbarga · North Karnataka</span>
            </span>
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <a
                href="tel:+919391905091"
                className="t-body-xs flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--fg-secondary)" }}
              >
                <PhoneIcon />
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">+91 93919 05091</span>
              </a>
              <span className="hidden sm:inline" style={{ color: "var(--border-default)" }}>|</span>
              <a
                href="#fabricators"
                className="t-body-xs font-medium transition-colors hover:text-[var(--accent)] hidden sm:inline"
                style={{ color: "var(--fg-secondary)" }}
              >
                Become a Fabricator
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main nav */}
        <div className="container flex items-center h-16 gap-8">
          {/* Wordmark */}
          <Link href="/" className="flex-shrink-0 group">
            <Wordmark />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map((item) =>
              item.sub ? (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProductsOpen((v) => !v)}
                    className="flex items-center gap-1 px-3 py-2 rounded t-body-sm font-medium transition-colors hover:bg-[var(--surface-1)]"
                    style={{ color: "var(--fg-ink)" }}
                  >
                    {item.label}
                    <ChevronDown
                      className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-72 rounded-xl border p-2"
                        style={{
                          background: "var(--surface-0)",
                          borderColor: "var(--border-subtle)",
                          boxShadow: "var(--shadow-md)",
                        }}
                      >
                        {item.sub.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            onClick={() => setProductsOpen(false)}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg transition-colors hover:bg-[var(--surface-1)]"
                          >
                            <span className="t-body-sm font-medium" style={{ color: "var(--fg-ink)" }}>
                              {s.label}
                            </span>
                            <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>
                              {s.desc}
                            </span>
                          </a>
                        ))}
                        <div className="mt-1 pt-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                          <a
                            href="#products"
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center gap-1 px-3 py-2 t-body-xs font-medium rounded-lg transition-colors hover:bg-[var(--accent-light)]"
                            style={{ color: "var(--accent)" }}
                          >
                            View all product ranges →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded t-body-sm font-medium transition-colors hover:bg-[var(--surface-1)]"
                  style={{ color: "var(--fg-ink)" }}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            {/* Enquire CTA */}
            <a
              href="#enquiry"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full t-body-sm font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-px active:translate-y-0"
              style={{
                background: "var(--accent)",
                color: "var(--accent-on)",
              }}
            >
              Enquire
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg -mr-1"
              style={{ background: mobileOpen ? "var(--surface-2)" : "transparent" }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 mx-auto rounded-full"
                style={{ background: "var(--fg-ink)", transformOrigin: "center" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-[1.5px] w-5 mx-auto rounded-full"
                style={{ background: "var(--fg-ink)" }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 mx-auto rounded-full"
                style={{ background: "var(--fg-ink)", transformOrigin: "center" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#FAFAF8" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="flex-1 min-h-0 flex flex-col"
              style={{
                paddingTop: headerH + 8,
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
              }}
            >
              <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col px-4 sm:px-6">
                {navItems.map((item, i) => (
                  <div key={item.label}>
                    {item.sub ? (
                      <>
                        <motion.button
                          type="button"
                          onClick={() => setMobileProductsOpen((v) => !v)}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full flex items-center justify-between py-3.5 sm:py-4 border-b text-base sm:text-lg font-medium min-h-[48px] text-left"
                          style={{
                            borderColor: "var(--border-subtle)",
                            color: "var(--fg-ink)",
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                          aria-expanded={mobileProductsOpen}
                        >
                          {item.label}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                              color: "var(--fg-muted)",
                              flexShrink: 0,
                              transform: mobileProductsOpen ? "rotate(90deg)" : "none",
                              transition: "transform 0.2s ease",
                            }}
                            aria-hidden="true"
                          >
                            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-b"
                              style={{ borderColor: "var(--border-subtle)" }}
                            >
                              <a
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-2.5 pl-3 t-body-sm min-h-[44px] flex items-center font-medium"
                                style={{ color: "var(--accent)" }}
                              >
                                View all product ranges →
                              </a>
                              {item.sub.map((s) => (
                                <a
                                  key={s.label}
                                  href={s.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2.5 pl-3 t-body-sm min-h-[44px] flex flex-col justify-center"
                                  style={{ color: "var(--fg-secondary)" }}
                                >
                                  <span className="font-medium" style={{ color: "var(--fg-ink)" }}>{s.label}</span>
                                  <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>{s.desc}</span>
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-between py-3.5 sm:py-4 border-b text-base sm:text-lg font-medium min-h-[48px]"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--fg-ink)",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.label}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--fg-muted)", flexShrink: 0 }} aria-hidden="true">
                          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.a>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex-shrink-0 px-4 sm:px-6 pt-4 flex flex-col gap-2.5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <a
                  href="#enquiry"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-xl text-center t-body font-semibold transition-opacity hover:opacity-90 min-h-[48px] flex items-center justify-center"
                  style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                >
                  Enquire Now
                </a>
                <a
                  href="https://wa.me/919391905091"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-xl text-center t-body font-medium border flex items-center justify-center gap-2 transition-colors hover:bg-[var(--surface-1)] min-h-[48px]"
                  style={{ borderColor: "#25D366", color: "#1a6637" }}
                >
                  <WhatsAppMiniIcon />
                  WhatsApp Us
                </a>
                <div className="pt-2 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="t-body-xs" style={{ color: "var(--fg-muted)" }}>Call us</p>
                    <a
                      href="tel:+919391905091"
                      className="t-body-sm font-semibold break-all"
                      style={{ color: "var(--fg-ink)" }}
                    >
                      +91 93919 05091
                    </a>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <p className="t-body-xs" style={{ color: "var(--fg-muted)" }}>Hours</p>
                    <p className="t-body-xs font-medium" style={{ color: "var(--fg-secondary)" }}>
                      Mon–Sat, 10–5 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Sub-components ─────────────────────────── */

function Wordmark() {
  return (
    <svg
      width="180"
      height="32"
      viewBox="0 0 180 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sindhole Polymers"
      className="w-[148px] sm:w-[180px] h-auto"
    >
      {/* S mark — geometric notched rectangle */}
      <rect x="1" y="4" width="12" height="12" rx="1" fill="var(--accent)" />
      <rect x="1" y="16" width="12" height="12" rx="1" fill="var(--accent)" opacity="0.35" />
      <rect x="5" y="10" width="4" height="4" fill="var(--surface-0)" />
      {/* Wordmark text */}
      <text x="20" y="22" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="500" letterSpacing="-0.02em" fill="var(--fg-ink)">SINDHOLE</text>
      {/* Polymers — smaller */}
      <text x="20" y="30" fontFamily="'DM Sans', sans-serif" fontSize="7.5" fontWeight="400" letterSpacing="0.09em" fill="var(--fg-secondary)">POLYMERS</text>
    </svg>
  );
}

function PhoneIcon() {
  return <Phone size={12} strokeWidth={1.75} />;
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatsAppMiniIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
