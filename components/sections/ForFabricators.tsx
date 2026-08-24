"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone } from "lucide-react";

const benefits = [
  {
    icon: "supply",
    title: "Reliable profile supply",
    desc: "Stock available across all three series — 52mm casement, 60mm casement, and 80mm sliding. Place your order, collect from our Bidar showroom or arrange local delivery.",
  },
  {
    icon: "tech",
    title: "Technical support",
    desc: "Greentech provides fabrication guides, welding specs, and section drawings. We pass them to you. If you run into a fit or weld issue, we'll help troubleshoot.",
  },
  {
    icon: "competitive",
    title: "Trade pricing",
    desc: "Dedicated pricing for registered fabricators and contractors. Volume orders, project quotes, and consignment arrangements available — talk to us.",
  },
  {
    icon: "partner",
    title: "Authorised source",
    desc: "Buying from an authorised Greentech dealer means genuine profiles, full certifications, and a supply chain you can put in your project documentation.",
  },
];

export default function ForFabricators() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="fabricators"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left — headline block */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-eyebrow mb-3">For Fabricators & Contractors</p>
            <h2 className="t-display-md mb-5" style={{ color: "var(--fg-ink)" }}>
              Your local{" "}
              <span style={{ color: "var(--accent)" }}>Greentech partner.</span>
            </h2>
            <p className="t-body" style={{ color: "var(--fg-secondary)" }}>
              If you fabricate windows and doors in Bidar, Kalaburagi, Gulbarga, or
              anywhere across North Karnataka — Sindhole Polymers is the closest
              authorised Greentech dealer to your workshop.
            </p>

            <div
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: "var(--accent)",
                color: "var(--accent-on)",
              }}
            >
              <div className="t-display-sm font-medium mb-2">Ready to register?</div>
              <p className="t-body-sm mb-5 opacity-80">
                Fill in the fabricator application form and we&apos;ll get in touch within one business day.
              </p>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:-translate-y-px"
                style={{ background: "var(--accent-on)", color: "var(--accent)" }}
              >
                Apply as fabricator →
              </a>
            </div>

            <div className="mt-6 flex gap-4 flex-wrap">
              <a
                href="tel:+919391905091"
                className="flex items-center gap-2 t-body-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--fg-secondary)" }}
              >
                <PhoneIcon />
                +91 93919 05091
              </a>
              <a
                href="https://wa.me/919391905091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 t-body-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--fg-secondary)" }}
              >
                <WaIcon />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — benefit cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{ background: "var(--surface-0)", border: "1px solid var(--border-subtle)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  <BenefitIcon type={b.icon} />
                </div>
                <h3 className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                  {b.title}
                </h3>
                <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    supply: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 8l4 2-4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="6" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <line x1="6" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    tech: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="7" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M7 9l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    competitive: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l1.8 5h5.2l-4.2 3 1.6 5L10 13l-4.4 3 1.6-5L3 8h5.2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    partner: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M3 17c0-3 2-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 12l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}

function PhoneIcon() {
  return <Phone size={14} strokeWidth={1.75} />;
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
