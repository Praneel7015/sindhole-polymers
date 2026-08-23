"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 30, suffix: "+", unit: "year", note: "Expected profile service life", prefix: "" },
  { value: 5,  suffix: "",  unit: "chambers", note: "Multi-chamber thermal design", prefix: "" },
  { value: 30, suffix: "mm", unit: "max glass", note: "Accommodated by glazing bead", prefix: "" },
  { value: 9001, suffix: ":2015", unit: "ISO", note: "Greentech quality certification", prefix: "ISO " },
];

const pillars = [
  {
    icon: "thermal",
    title: "Thermal performance",
    body: "Multi-chamber profiles reduce heat transfer by trapping still air — cutting air-conditioning loads in Indian summers. EPDM/TPE gaskets prevent hot air infiltration.",
  },
  {
    icon: "acoustic",
    title: "Acoustic comfort",
    body: "The profile geometry and twin gasket system, combined with a thick sealed glass unit, measurably reduces road, construction, and rain noise.",
  },
  {
    icon: "security",
    title: "Security",
    body: "Galvanised steel reinforcement in the profile slot enables multi-point locking hardware. The frame itself cannot be flexed or levered open.",
  },
  {
    icon: "maintenance",
    title: "Zero maintenance",
    body: "uPVC doesn't rust, warp, flake, or need painting. Wipe with a damp cloth. In 30 years, the only maintenance is hardware lubrication.",
  },
];

export default function Performance() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="performance"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-eyebrow mb-3">Performance</p>
          <h2 className="t-display-lg" style={{ color: "var(--fg-ink)" }}>
            Numbers that{" "}
            <span style={{ color: "var(--accent)" }}>matter to fabricators.</span>
          </h2>
          <p className="t-body-lg mt-4" style={{ color: "var(--fg-secondary)" }}>
            Greentech profiles are specified, tested, and certified to deliver
            consistent performance — so your finished windows pass inspection
            and delight the end-user.
          </p>
        </motion.div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-16" style={{ background: "var(--border-subtle)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.unit}
              className="flex flex-col gap-2 p-8"
              style={{ background: "var(--surface-1)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-end gap-0.5 leading-none">
                {s.prefix && (
                  <span className="t-body-sm font-semibold mb-1" style={{ color: "var(--accent)" }}>
                    {s.prefix}
                  </span>
                )}
                <AnimatedNumber value={s.value} inView={inView} reduced={shouldReduceMotion ?? false} />
                <span className="t-display-md font-medium" style={{ color: "var(--accent)" }}>
                  {s.suffix}
                </span>
              </div>
              <span className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                {s.unit}
              </span>
              <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>
                {s.note}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Performance pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="flex gap-5 p-6 rounded-2xl"
              style={{ background: "var(--surface-0)", border: "1px solid var(--border-subtle)" }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              >
                <PillarIcon type={p.icon} />
              </div>
              <div>
                <h3 className="t-body font-semibold mb-1.5" style={{ color: "var(--fg-ink)" }}>
                  {p.title}
                </h3>
                <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Animated counter ─────────────────────── */
function AnimatedNumber({
  value,
  inView,
  reduced,
}: {
  value: number;
  inView: boolean;
  reduced: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <span className="t-display-lg font-medium t-tabular" style={{ color: "var(--fg-ink)" }}>
      {display.toLocaleString("en-IN")}
    </span>
  );
}

function PillarIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    thermal: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="10" y1="3" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="6" x2="7.5" y2="7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <line x1="14" y1="6" x2="12.5" y2="7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    acoustic: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 7.5h2l3.5-4 3.5 9L17 8.5h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="1 2"/>
      </svg>
    ),
    security: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V5l-6-3Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    maintenance: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4a6 6 0 1 0 0 12A6 6 0 0 0 10 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}
