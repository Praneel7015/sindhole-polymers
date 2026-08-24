"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sectors = [
  {
    id: "apartments",
    label: "Apartments",
    tagline: "Mass-spec'd for multi-storey projects.",
    body: "When a developer needs 400 identical casement windows, consistency matters more than anything. Greentech profiles hold dimensional tolerances tight — so every window across every floor welds, glazes, and fits the same.",
    outcomes: ["Dimensional accuracy across large orders", "Consistent finish batch-to-batch", "Fabricator-ready sections", "Acoustic-rated glazing support"],
    icon: "apartment",
    photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=75&auto=format&fit=crop",
  },
  {
    id: "villas",
    label: "Villas & Row Houses",
    tagline: "Where aesthetics carry the brief.",
    body: "Villa owners notice the details. Slim sightlines, clean profiles, woodgrain options that don't require maintenance — Greentech's 60mm casement and the 80mm slider are the go-to for discerning residential builds.",
    outcomes: ["Woodgrain and black foil options", "Slimline 52mm casement for daylight", "Dual-colour interior/exterior", "Tilt-&-turn on request"],
    icon: "villa",
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=75&auto=format&fit=crop",
  },
  {
    id: "commercial",
    label: "Commercial Buildings",
    tagline: "Performance-first for occupied spaces.",
    body: "Offices, clinics, schools, and hotels demand windows that seal against noise, perform thermally, and require zero maintenance through heavy occupancy cycles. uPVC delivers all three.",
    outcomes: ["Acoustic insulation for noise-sensitive spaces", "Low-maintenance, high-durability", "Security-grade hardware compatibility", "Large span sliding systems"],
    icon: "commercial",
    photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75&auto=format&fit=crop",
  },
  {
    id: "replacement",
    label: "Replacement & Refurb",
    tagline: "Upgrade from wood, steel, or aluminium.",
    body: "Replacing rusting MS grilles or swollen timber frames? uPVC profiles slot into existing openings, transform thermal comfort overnight, and eliminate the paint cycles that followed every monsoon.",
    outcomes: ["Custom-cut to existing opening sizes", "No repainting, ever", "Immediate noise & thermal improvement", "Can match existing colour choices"],
    icon: "refurb",
    photo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75&auto=format&fit=crop",
  },
];

export default function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="sectors"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="container">
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-eyebrow mb-3">Sectors</p>
          <h2 className="t-display-lg" style={{ color: "var(--fg-ink)" }}>
            Built for every{" "}
            <span style={{ color: "var(--accent)" }}>kind of project.</span>
          </h2>
          <p className="t-body-lg mt-4" style={{ color: "var(--fg-secondary)" }}>
            Greentech profiles power residential towers, private villas,
            commercial fit-outs, and refurbishment projects across North Karnataka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sectors.map((s, i) => (
            <motion.article
              key={s.id}
              className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:border-[var(--accent-mid)] hover:shadow-[var(--shadow-md)]"
              style={{ borderColor: "var(--border-subtle)", background: "var(--surface-0)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Photo header */}
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.75) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, var(--surface-0) 0%, transparent 55%)" }}
                />
              </div>

              <div className="flex flex-col gap-5 p-7">
              {/* Background accent on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg, var(--accent-light) 0%, transparent 60%)" }}
              />

              <div className="flex items-start justify-between gap-4 relative">
                <div>
                  <span className="t-eyebrow" style={{ color: "var(--accent)" }}>
                    {s.label}
                  </span>
                  <h3 className="t-display-sm mt-1" style={{ color: "var(--fg-ink)" }}>
                    {s.tagline}
                  </h3>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  <SectorIcon type={s.icon} />
                </div>
              </div>

              <p className="t-body-sm relative" style={{ color: "var(--fg-secondary)" }}>
                {s.body}
              </p>

              <ul className="grid grid-cols-2 gap-2 relative">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 t-body-xs" style={{ color: "var(--fg-secondary)" }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                    {o}
                  </li>
                ))}
              </ul>

              <a
                href="#enquiry"
                className="self-start mt-auto t-body-sm font-medium flex items-center gap-1.5 relative transition-colors"
                style={{ color: "var(--accent)" }}
              >
                Enquire for this sector →
              </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    apartment: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="3" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="4" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1"/>
        <line x1="4" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1"/>
        <rect x="9" y="15" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
      </svg>
    ),
    villa: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 11L11 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5" y="11" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="9" y="14" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
      </svg>
    ),
    commercial: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="3" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="1"/>
        <line x1="11" y1="5" x2="11" y2="19" stroke="currentColor" strokeWidth="1"/>
        <rect x="5" y="11" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.75" fill="none"/>
        <rect x="13" y="11" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.75" fill="none"/>
      </svg>
    ),
    refurb: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 12a7 7 0 0 1 13.2-2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 10l.5 3.5L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}
