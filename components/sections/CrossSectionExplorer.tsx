"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const labels = [
  {
    id: "outer-wall",
    label: "Outer wall",
    desc: "3.0 mm uPVC — UV-stabilised, lead-free compound.",
    dot: { x: 150, y: 80 },
    textX: 130, textY: 80, anchor: "end" as const, side: "left" as const,
  },
  {
    id: "chamber-1",
    label: "Chamber 1–2",
    desc: "Sealed air chambers — thermal break core.",
    dot: { x: 150, y: 130 },
    textX: 130, textY: 130, anchor: "end" as const, side: "left" as const,
  },
  {
    id: "reinf-slot",
    label: "Steel reinf. slot",
    desc: "Galvanised steel reinforcement — structural rigidity.",
    dot: { x: 150, y: 209 },
    textX: 130, textY: 209, anchor: "end" as const, side: "left" as const,
  },
  {
    id: "gasket",
    label: "TPE gasket",
    desc: "Twin TPE gaskets — Class B per EN 12068.",
    dot: { x: 350, y: 80 },
    textX: 370, textY: 80, anchor: "start" as const, side: "right" as const,
  },
  {
    id: "glazing-bead",
    label: "Glazing bead",
    desc: "Snap-fit bead — accommodates 4–30 mm glass.",
    dot: { x: 350, y: 110 },
    textX: 370, textY: 110, anchor: "start" as const, side: "right" as const,
  },
  {
    id: "inner-wall",
    label: "Inner wall",
    desc: "Clean interior face — paintable, easy to clean.",
    dot: { x: 350, y: 170 },
    textX: 370, textY: 170, anchor: "start" as const, side: "right" as const,
  },
];

export default function CrossSectionExplorer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const shouldReduceMotion = useReducedMotion();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const active = labels.find((l) => l.id === activeLabel);

  return (
    <section
      id="cross-section"
      ref={ref}
      className="section-gap overflow-x-clip"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-overline mb-3" style={{ color: "var(--accent)" }}>
            Profile Cross-Section
          </p>
          <h2 className="t-display-md mb-4" style={{ color: "var(--fg-ink)" }}>
            Every chamber{" "}
            <span style={{ color: "var(--accent)" }}>earns its place.</span>
          </h2>
          <p className="t-body" style={{ color: "var(--fg-secondary)" }}>
            A Greentech 5-chamber uPVC casement outer frame — showing the chambers,
            reinforcement slot, twin TPE gaskets, and glazing bead. Click any label to
            learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-start">
          {/* SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full overflow-x-auto -mx-1 px-1"
          >
            <CrossSectionSVG
              inView={inView}
              reduced={shouldReduceMotion ?? false}
              activeLabel={activeLabel}
              onLabelClick={(id) => setActiveLabel(activeLabel === id ? null : id)}
            />
          </motion.div>

          {/* Label panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <ul className="flex flex-col gap-1.5">
              {labels.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveLabel(activeLabel === l.id ? null : l.id)}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
                    style={{
                      background:
                        activeLabel === l.id ? "var(--accent-light)" : "transparent",
                      border: `1px solid ${
                        activeLabel === l.id ? "var(--accent-mid)" : "transparent"
                      }`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: "var(--accent)",
                        opacity: activeLabel === l.id ? 1 : 0.35,
                      }}
                    />
                    <div className="min-w-0">
                      <span
                        className="t-body-sm font-medium block"
                        style={{ color: "var(--fg-ink)" }}
                      >
                        {l.label}
                      </span>
                      {activeLabel === l.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="t-body-xs mt-0.5 leading-relaxed"
                          style={{ color: "var(--fg-secondary)" }}
                        >
                          {l.desc}
                        </motion.p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Active description card on mobile */}
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl border lg:hidden"
                style={{
                  borderColor: "var(--accent-mid)",
                  background: "var(--accent-light)",
                }}
              >
                <p
                  className="t-body-sm font-semibold mb-1"
                  style={{ color: "var(--accent-dark)" }}
                >
                  {active.label}
                </p>
                <p className="t-body-xs" style={{ color: "var(--fg-secondary)" }}>
                  {active.desc}
                </p>
              </motion.div>
            )}

            <p className="t-body-xs mt-5" style={{ color: "var(--fg-subtle)" }}>
              Generic 5-chamber uPVC casement frame illustration. Actual Greentech
              section drawings replace this diagram when available.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── SVG ─────────────────────────────────────────────────────────────────── */
function CrossSectionSVG({
  inView,
  reduced,
  activeLabel,
  onLabelClick,
}: {
  inView: boolean;
  reduced: boolean;
  activeLabel: string | null;
  onLabelClick: (id: string) => void;
}) {
  const d = (n: number) => (reduced ? 0 : n);

  type MG = React.ComponentProps<typeof motion.g>;
  const ca = (offsetY: number, delay: number): Partial<MG> => ({
    initial: { y: reduced ? 0 : offsetY, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : undefined,
    transition: {
      duration: reduced ? 0 : 0.65,
      delay: d(delay),
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  /*
   * Profile bounds: x 150–350  (200px wide = "60mm depth")
   *                 y  50–250  (200px tall = "60mm face height")
   * Roughly square — matches a real uPVC outer frame cross-section.
   * Left labels:  textX ≤ 130, leader line goes right to x=150
   * Right labels: textX ≥ 370, leader line goes left to x=350
   */
  return (
    <svg
      viewBox="0 0 500 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ maxHeight: 380 }}
    >
      {/* ── OUTER SHELL ── */}
      <motion.g {...ca(-20, 0.2)}>
        <rect x="150" y="50" width="200" height="200"
          stroke="var(--fg-ink)" strokeWidth="2.5" fill="var(--surface-0)" />
        {/* Inner rebate line */}
        <rect x="168" y="68" width="164" height="164"
          stroke="var(--border-strong)" strokeWidth="1" fill="none" />
      </motion.g>

      {/* ── CHAMBER 1 — top (glazing zone) ── */}
      <motion.g {...ca(-14, 0.32)}>
        <line x1="150" y1="110" x2="350" y2="110"
          stroke="var(--border-default)" strokeWidth="1" />
        <rect x="152" y="52" width="196" height="56"
          fill="var(--accent)" fillOpacity={activeLabel === "chamber-1" ? 0.14 : 0.05} />
      </motion.g>

      {/* ── CHAMBER 2 ── */}
      <motion.g {...ca(-8, 0.4)}>
        <line x1="150" y1="148" x2="350" y2="148"
          stroke="var(--border-default)" strokeWidth="1" />
        <rect x="152" y="112" width="196" height="34"
          fill="var(--surface-3)" fillOpacity="0.7" />
      </motion.g>

      {/* ── CHAMBER 3 — centre ── */}
      <motion.g {...ca(0, 0.46)}>
        <line x1="150" y1="188" x2="350" y2="188"
          stroke="var(--border-default)" strokeWidth="1" />
        <rect x="152" y="150" width="196" height="36"
          fill="var(--surface-2)" fillOpacity="0.9" />
      </motion.g>

      {/* ── CHAMBER 4 — steel reinforcement ── */}
      <motion.g {...ca(8, 0.52)}>
        <line x1="150" y1="228" x2="350" y2="228"
          stroke="var(--border-default)" strokeWidth="1" />
        {/* Reinf. rect */}
        <rect x="166" y="192" width="168" height="34"
          fill={activeLabel === "reinf-slot" ? "var(--accent)" : "#9aada0"}
          fillOpacity={activeLabel === "reinf-slot" ? 0.2 : 0.15}
          stroke={activeLabel === "reinf-slot" ? "var(--accent)" : "var(--border-default)"}
          strokeWidth="0.75" />
        {/* Hatching */}
        {[0,1,2,3,4,5,6,7].map((n) => (
          <line key={n}
            x1={172 + n * 20} y1="193"
            x2={162 + n * 20} y2="225"
            stroke="var(--border-strong)" strokeWidth="0.75" strokeOpacity="0.4" />
        ))}
      </motion.g>

      {/* ── CHAMBER 5 — inner ── */}
      <motion.g {...ca(12, 0.58)}>
        <rect x="152" y="230" width="196" height="68"
          fill="var(--surface-1)" fillOpacity="0.9" />
      </motion.g>

      {/* ── GASKETS ── */}
      <motion.g
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={inView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: d(0.75), ease: [0.16,1,0.3,1] as any }}
        style={{ transformOrigin: "250px 150px" }}
      >
        <rect x="147" y="68" width="5" height="162"
          fill={activeLabel === "gasket" ? "var(--accent)" : "#2A2A25"}
          fillOpacity={activeLabel === "gasket" ? 0.55 : 0.5} rx="2.5" />
        <rect x="348" y="68" width="5" height="162"
          fill={activeLabel === "gasket" ? "var(--accent)" : "#2A2A25"}
          fillOpacity={activeLabel === "gasket" ? 0.55 : 0.5} rx="2.5" />
        <rect x="168" y="245" width="164" height="5"
          fill={activeLabel === "gasket" ? "var(--accent)" : "#2A2A25"}
          fillOpacity={activeLabel === "gasket" ? 0.55 : 0.5} rx="2.5" />
      </motion.g>

      {/* ── GLAZING ZONE LABEL ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.4, delay: d(0.85) }}
      >
        <path d="M168 72 L168 56 L332 56 L332 72"
          stroke={activeLabel === "glazing-bead" ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth={activeLabel === "glazing-bead" ? 2 : 1.25} fill="none" />
        <text x="250" y="67" textAnchor="middle" fontSize="7.5"
          fill="var(--fg-secondary)" fontFamily="var(--font-dm-sans),sans-serif" letterSpacing="0.04em">
          GLAZING ZONE — 4 to 30 mm
        </text>
      </motion.g>

      {/* ── CALLOUT LINES + DOTS ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.45, delay: d(0.95) }}
      >
        {labels.map((l) => {
          const isActive = activeLabel === l.id;
          return (
            <g key={l.id}
              onClick={() => onLabelClick(l.id)}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={l.label}
            >
              <circle
                cx={l.dot.x} cy={l.dot.y}
                r={isActive ? 4.5 : 3}
                fill={isActive ? "var(--accent)" : "var(--surface-0)"}
                stroke={isActive ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth="1.25"
              />
              <line
                x1={l.dot.x} y1={l.dot.y}
                x2={l.textX} y2={l.textY}
                stroke={isActive ? "var(--accent)" : "var(--border-default)"}
                strokeWidth={isActive ? 1.25 : 0.75}
                strokeDasharray={isActive ? "0" : "3 2"}
              />
              <text
                x={l.textX + (l.side === "left" ? -6 : 6)}
                y={l.textY + 4}
                textAnchor={l.anchor}
                fontSize="9.5"
                fontWeight={isActive ? "600" : "400"}
                fill={isActive ? "var(--accent)" : "var(--fg-secondary)"}
                fontFamily="var(--font-dm-sans),sans-serif"
                letterSpacing="0.01em"
              >
                {l.label}
              </text>
            </g>
          );
        })}
      </motion.g>

      {/* ── DIMENSION ANNOTATIONS ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 0.35, delay: d(1.1) }}
      >
        {/* Width (depth) — below profile */}
        <line x1="150" y1="276" x2="350" y2="276"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <line x1="150" y1="272" x2="150" y2="280"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <line x1="350" y1="272" x2="350" y2="280"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <text x="250" y="291" textAnchor="middle" fontSize="8.5"
          fill="var(--fg-muted)" fontFamily="var(--font-dm-sans),sans-serif">
          60 mm frame depth (series-dependent)
        </text>

        {/* Height — right of profile */}
        <line x1="374" y1="50" x2="374" y2="250"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <line x1="370" y1="50" x2="378" y2="50"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <line x1="370" y1="250" x2="378" y2="250"
          stroke="var(--border-default)" strokeWidth="0.75" />
        <text x="390" y="154" textAnchor="middle" fontSize="8.5"
          fill="var(--fg-muted)" fontFamily="var(--font-dm-sans),sans-serif"
          transform="rotate(90 390 154)">
          5 chambers
        </text>
      </motion.g>
    </svg>
  );
}
