"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { products } from "@/content/products";

export default function ProductRanges() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="products" ref={ref} className="section-gap" style={{ background: "var(--surface-0)" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-lg">
            <p className="t-eyebrow mb-3">Product Ranges</p>
            <h2 className="t-display-lg" style={{ color: "var(--fg-ink)" }}>
              Three Greentech series.{" "}
              <span style={{ color: "var(--accent)" }}>One authorised source.</span>
            </h2>
          </div>
          <p className="t-body-sm max-w-xs" style={{ color: "var(--fg-secondary)" }}>
            All profile systems in stock at our Bidar showroom. Ready for
            immediate supply to fabricators across North Karnataka.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard
                product={p}
                expanded={activeId === p.id}
                onToggle={() => setActiveId(activeId === p.id ? null : p.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}
          >
            <PlusIcon />
          </div>
          <p className="t-body-sm min-w-0 flex-1" style={{ color: "var(--fg-secondary)" }}>
            <strong style={{ color: "var(--fg-ink)" }}>More series coming.</strong>{" "}
            We regularly expand our Greentech range. Contact us for tilt-&-turn, villa series, and combination systems.
          </p>
          <a
            href="#enquiry"
            className="sm:ml-auto flex-shrink-0 px-4 py-2 rounded-full t-body-xs font-medium border transition-colors hover:bg-[var(--surface-2)] self-start sm:self-auto"
            style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
          >
            Ask us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Product Card ──────────────────────── */
function ProductCard({
  product,
  expanded,
  onToggle,
}: {
  product: (typeof products)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="group flex flex-col rounded-2xl border overflow-hidden transition-shadow duration-300"
      style={{
        borderColor: expanded ? "var(--accent-mid)" : "var(--border-subtle)",
        background: "var(--surface-0)",
        boxShadow: expanded ? "var(--shadow-md)" : "var(--shadow-xs)",
      }}
    >
      {/* Photo */}
      <div
        className="relative h-52 overflow-hidden"
        style={{ background: "var(--surface-2)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ filter: "saturate(0.8) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)" }}
        />
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full t-body-xs font-semibold"
          style={{ background: "var(--accent-light)", color: "var(--accent)" }}
        >
          {product.code}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="t-display-sm" style={{ color: "var(--fg-ink)" }}>
          {product.name}
        </h3>
        <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
          {product.tagline}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {product.chips.map((c) => (
            <span
              key={c}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: "var(--surface-2)",
                color: "var(--fg-secondary)",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 mt-auto pt-4 t-body-sm font-medium transition-colors"
          style={{
            color: "var(--accent)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {expanded ? "Hide specs" : "View specifications"}
          <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </button>

        {/* Specs table — expandable */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="specs"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <table className="w-full mt-3">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <td className="py-2 pr-4 t-body-xs" style={{ color: "var(--fg-muted)" }}>
                        {s.label}
                      </td>
                      <td className="py-2 t-body-xs font-semibold t-tabular text-right" style={{ color: "var(--fg-ink)" }}>
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a
                href="#enquiry"
                className="mt-4 w-full py-2.5 rounded-full t-body-sm font-medium text-center block transition-all hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--accent-on)" }}
              >
                Enquire about this series
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

/* ─── Profile thumbnail SVG ──────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProfileThumbnail({ code }: { code: string }) {
  const isSliding = code.includes("Sliding");
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      {isSliding ? (
        /* Sliding — 2-track cross-section overview */
        <>
          <rect x="10" y="20" width="140" height="80" rx="2" stroke="var(--border-strong)" strokeWidth="1.5" fill="var(--surface-0)" />
          <line x1="80" y1="20" x2="80" y2="100" stroke="var(--border-default)" strokeWidth="1.5" />
          <rect x="20" y="30" width="52" height="60" rx="1" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="0.75" />
          <rect x="88" y="30" width="52" height="60" rx="1" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="0.75" />
          {/* track lines */}
          <line x1="10" y1="60" x2="150" y2="60" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 3" />
        </>
      ) : (
        /* Casement — frame with opened sash hint */
        <>
          <rect x="20" y="10" width="120" height="100" rx="2" stroke="var(--border-strong)" strokeWidth="1.5" fill="var(--surface-0)" />
          <rect x="28" y="18" width="104" height="84" rx="1" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="0.75" />
          {/* handle */}
          <rect x="116" y="52" width="5" height="16" rx="2.5" fill="var(--accent)" opacity="0.5" />
          {/* rebate line */}
          <rect x="32" y="22" width="96" height="76" rx="1" stroke="var(--border-subtle)" strokeWidth="0.5" fill="none" />
        </>
      )}
      {/* Depth annotation */}
      <text x="80" y="115" textAnchor="middle" fontSize="8" fill="var(--fg-muted)" fontFamily="'DM Sans', sans-serif" letterSpacing="0.04em">
        {code === "52-Casement" ? "52mm depth" : code === "60-Casement" ? "60mm depth" : "80mm track"}
      </text>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
