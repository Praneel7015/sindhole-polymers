"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    icon: "thermal",
    title: "Thermal comfort",
    body: "Multi-chamber profiles with twin TPE gaskets trap air to keep interiors cool in summer and warm in winter — cutting energy loads without adding complexity.",
  },
  {
    icon: "acoustic",
    title: "Acoustic insulation",
    body: "Dense chamber geometry and precision-fit glazing beads absorb street noise, dust, and rain. Measurable quiet from day one.",
  },
  {
    icon: "weather",
    title: "All-weather performance",
    body: "Designed and tested to Indian weather extremes — monsoon driving rain, heat cycling, coastal humidity. No rust, no rot, no compromise.",
  },
  {
    icon: "durability",
    title: "Long-life durability",
    body: "ISO 9001:2015 production discipline. Galvanised steel reinforcement slot standard. Dimensional accuracy that fabricators depend on for a clean weld and a square corner.",
  },
  {
    icon: "sustainability",
    title: "Sustainable by design",
    body: "Lead-free compound, fully recyclable at end of life. A 30+ year service span that makes the embodied carbon calculus straightforward.",
  },
  {
    icon: "heritage",
    title: "German-engineered compound",
    body: "Greentech profiles draw on DIMEX GmbH (Germany) uPVC compounding expertise developed since 1979 — adapted specifically for Indian heat and humidity cycles.",
  },
];

const iconMap: Record<string, React.ReactElement> = {
  thermal:      <ThermalIcon />,
  acoustic:     <AcousticIcon />,
  weather:      <WeatherIcon />,
  durability:   <DurabilityIcon />,
  sustainability: <SustainIcon />,
  heritage:     <HeritageIcon />,
};

export default function WhyGreentech() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="why-greentech"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-eyebrow mb-4">Why Greentech uPVC</p>
          <h2 className="t-display-lg mb-5" style={{ color: "var(--fg-ink)" }}>
            Performance built into{" "}
            <span style={{ color: "var(--accent)" }}>the profile itself.</span>
          </h2>
          <p className="t-body-lg" style={{ color: "var(--fg-secondary)" }}>
            Every Greentech profile ships with thermal, acoustic, and weather
            performance already engineered in — not added as an afterthought.
            When you specify Greentech, the work is already done.
          </p>
        </motion.div>

        {/* Value grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border-subtle)" }}>
          {values.map((v, i) => (
            <motion.article
              key={v.title}
              className="flex flex-col gap-4 p-8"
              style={{ background: "var(--surface-1)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              >
                {iconMap[v.icon]}
              </div>
              <h3 className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                {v.title}
              </h3>
              <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                {v.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Greentech credit line */}
        <motion.p
          className="t-body-xs mt-8 text-center"
          style={{ color: "var(--fg-muted)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          Performance data sourced from Greentech uPVC India Pvt. Ltd. — ISO 9001:2015 certified.
          Sindhole Polymers is an authorised dealer.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Icons ────────────────────────────────── */

/* Thermometer — vertical tube with bulb, heat lines */
function ThermalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v7.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="8.5" y="2.5" width="3" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" fill="none"/>
      <path d="M13.5 5h1.5M13.5 7.5h1M13.5 10h1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

/* Sound waves — speaker + radiating arcs */
function AcousticIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 7.5h2.5l3.5-3v11l-3.5-3H4V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M13 7.5a3 3 0 0 1 0 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 5.5a5.5 5.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

/* Rain cloud — cloud shape + rain drops */
function WeatherIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.5 9a3.5 3.5 0 0 1 6.8-1.2A2.5 2.5 0 1 1 14 12.5H6A2.5 2.5 0 0 1 5.5 9Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M7 15v1.5M10 14.5v1.5M13 15v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* Shield + checkmark — durability / quality */
function DurabilityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5L4 5v5c0 3.5 2.5 6.2 6 7 3.5-.8 6-3.5 6-7V5L10 2.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M7.5 10l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Recycling arrows — three curved arrows in a cycle */
function SustainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5L7 7h2v3.5a1 1 0 0 0 2 0V7h2L10 3.5Z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none"/>
      <path d="M4.5 13l1.5-4H4L2.5 13A4.5 4.5 0 0 0 10 17"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M15.5 13l-1.5-4H16L17.5 13A4.5 4.5 0 0 1 10 17"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

/* Factory / building — German engineering heritage */
function HeritageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="9" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M3 9l3.5-5h7L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="8.5" y="12" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="none"/>
      <path d="M6 12h1.5M12.5 12H14M6 15h1.5M12.5 15H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}
