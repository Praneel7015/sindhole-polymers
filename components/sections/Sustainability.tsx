"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lifecycle = [
  { phase: "Raw material", note: "Lead-free virgin uPVC compound + stabilisers", icon: "material" },
  { phase: "Extrusion", note: "ISO 9001:2015 controlled process — dimensional precision to ±0.1mm", icon: "process" },
  { phase: "Fabrication", note: "Cut, reinforce, weld, glaze — supported by Greentech technical guides", icon: "fabricate" },
  { phase: "30+ year life", note: "No painting, no rust, no rot — virtually zero maintenance", icon: "life" },
  { phase: "End of life", note: "100% recyclable back into PVC production stream", icon: "recycle" },
];

export default function Sustainability() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="sustainability"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-eyebrow mb-3">Sustainability</p>
            <h2 className="t-display-md mb-5" style={{ color: "var(--fg-ink)" }}>
              Durability{" "}
              <span style={{ color: "var(--accent)" }}>is the greenest choice.</span>
            </h2>
            <p className="t-body" style={{ color: "var(--fg-secondary)" }}>
              A window profile that lasts 30+ years, needs no repainting, contains no
              lead, and is fully recyclable at end of life — the embodied carbon case
              writes itself.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { val: "Lead-free", note: "compound formula" },
                { val: "100%", note: "recyclable at EOL" },
                { val: "30+yr", note: "service life" },
                { val: "Zero", note: "paint or treatment" },
              ].map((s) => (
                <div
                  key={s.val}
                  className="p-4 rounded-xl"
                  style={{ background: "var(--accent-light)", border: "1px solid var(--accent-mid)" }}
                >
                  <div className="t-display-sm font-medium" style={{ color: "var(--accent)" }}>
                    {s.val}
                  </div>
                  <div className="t-body-xs mt-0.5" style={{ color: "var(--fg-secondary)" }}>
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lifecycle visual */}
          <div className="lg:col-span-8">
            <div className="relative">
              {lifecycle.map((l, i) => (
                <motion.div
                  key={l.phase}
                  className="flex items-start gap-5 relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Connector line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                    >
                      <LifecycleIcon type={l.icon} />
                    </div>
                    {i < lifecycle.length - 1 && (
                      <div className="w-px flex-1 min-h-[2.5rem]" style={{ background: "var(--accent-mid)" }} />
                    )}
                  </div>

                  <div className="pb-8">
                    <h3 className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                      {l.phase}
                    </h3>
                    <p className="t-body-sm mt-1" style={{ color: "var(--fg-secondary)" }}>
                      {l.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LifecycleIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    material: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
    process: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h4l2-4 2 8 2-4h2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    fabricate: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" fill="none"/>
        <path d="M10 6l3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M11 4l2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    life: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" fill="none"/>
        <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    recycle: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 13l-3-3 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 6a5 5 0 0 1-8 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}
