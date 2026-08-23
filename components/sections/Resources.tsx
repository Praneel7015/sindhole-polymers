"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { resources, resourceCategories, type ResourceItem } from "@/content/resources";

type Category = typeof resourceCategories[number]["id"];

export default function Resources() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = resources.filter(
    (r) => activeFilter === "all" || r.category === activeFilter
  );

  return (
    <section
      id="resources"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="t-eyebrow mb-2">Downloads & Resources</p>
            <h2 className="t-display-md" style={{ color: "var(--fg-ink)" }}>
              Technical{" "}
              <span style={{ color: "var(--accent)" }}>documentation.</span>
            </h2>
          </div>
          <p className="t-body-sm max-w-xs" style={{ color: "var(--fg-secondary)" }}>
            Brochures, datasheets, and fabrication guides. Can't find what you need?
            {" "}<a href="#contact" style={{ color: "var(--accent)" }}>Ask us.</a>
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {resourceCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.id)}
              className="px-4 py-1.5 rounded-full t-body-sm font-medium border transition-all duration-200"
              style={{
                background: activeFilter === c.id ? "var(--accent)" : "var(--surface-0)",
                color: activeFilter === c.id ? "var(--accent-on)" : "var(--fg-secondary)",
                borderColor: activeFilter === c.id ? "var(--accent)" : "var(--border-default)",
              }}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Resource list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex items-center gap-5 p-5 rounded-xl border transition-colors"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "var(--surface-0)",
                  opacity: r.url ? 1 : 0.7,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--surface-2)", color: "var(--fg-secondary)" }}
                >
                  <DocIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="t-body-sm font-semibold" style={{ color: "var(--fg-ink)" }}>
                      {r.title}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                      style={{ background: "var(--surface-2)", color: "var(--fg-muted)" }}
                    >
                      {r.category}
                    </span>
                  </div>
                  <p className="t-body-xs mt-0.5" style={{ color: "var(--fg-secondary)" }}>
                    {r.desc}
                  </p>
                  {!r.url && (
                    <p className="t-body-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
                      Available soon — request from us directly.
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>
                    {r.size}
                  </span>
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg t-body-xs font-medium transition-all hover:opacity-90"
                      style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                    >
                      Download
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="px-3 py-1.5 rounded-lg t-body-xs font-medium border transition-colors hover:bg-[var(--surface-1)]"
                      style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
                    >
                      Request
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2h7l3 3v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.25" fill="none"/>
      <path d="M11 2v3h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}
