"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const marks = [
  {
    id: "iso",
    badge: "ISO 9001:2015",
    title: "Quality Management",
    desc: "Greentech uPVC India Pvt. Ltd. is ISO 9001:2015 certified — meaning every production batch is manufactured under a documented, audited quality management system.",
  },
  {
    id: "dimex",
    badge: "DIMEX Heritage",
    title: "German Engineering",
    desc: "Greentech profiles draw on compounding expertise from DIMEX GmbH, Germany — a uPVC profile extrusion specialist operating since 1979. Proven European technology, adapted for Indian conditions.",
  },
  {
    id: "lead-free",
    badge: "Lead-Free",
    title: "Safe Compound",
    desc: "All Greentech profiles use a lead-free stabiliser system — compliant with modern environmental and occupant-safety expectations for residential and commercial projects.",
  },
  {
    id: "en12068",
    badge: "Class B — EN 12068",
    title: "Gasket Standard",
    desc: "TPE gaskets in every Greentech profile system are tested and classified to EN 12068 Class B — the European standard for elastomeric seals in window and door profiles.",
  },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="section-gap-sm"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="container">
        <motion.div
          className="text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-eyebrow mb-3">Quality & Certification</p>
          <h2 className="t-display-md" style={{ color: "var(--fg-ink)" }}>
            Standards you can{" "}
            <span style={{ color: "var(--accent)" }}>point to.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marks.map((m, i) => (
            <motion.div
              key={m.id}
              className="flex flex-col gap-3 p-6 rounded-2xl border"
              style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="self-start px-2.5 py-1 rounded-full text-xs font-bold tracking-wide"
                style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              >
                {m.badge}
              </span>
              <h3 className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                {m.title}
              </h3>
              <p className="t-body-xs" style={{ color: "var(--fg-secondary)" }}>
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="t-body-xs text-center mt-8"
          style={{ color: "var(--fg-muted)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          All certifications and standards refer to Greentech uPVC India Pvt. Ltd. products.
          Sindhole Polymers is an authorised dealer. Specific test reports available on request.
        </motion.p>
      </div>
    </section>
  );
}
