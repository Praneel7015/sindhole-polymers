"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem, FaqCategory } from "@/content/faq";
import { siteConfig } from "@/content/meta";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Props {
  faqs: FaqItem[];
  categories: ReadonlyArray<{ id: FaqCategory; label: string }>;
}

export default function FaqClient({ faqs, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <Header />
      <main className="page-offset section-pad" style={{ background: "var(--surface-0)" }}>
      <div className="container max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="t-overline mb-2" style={{ color: "var(--accent)" }}>
            FAQ
          </p>
          <h1 className="t-display-lg mb-4" style={{ color: "var(--fg-ink)" }}>
            Frequently asked questions
          </h1>
          <p className="t-body max-w-xl" style={{ color: "var(--fg-secondary)" }}>
            Everything you need to know about uPVC profiles, Greentech systems, and working with
            Sindhole Polymers.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenId(null);
              }}
              className="px-4 py-1.5 rounded-full t-body-sm font-medium border transition-all"
              style={{
                background: activeCategory === cat.id ? "var(--accent)" : "transparent",
                color:
                  activeCategory === cat.id ? "var(--accent-on)" : "var(--fg-secondary)",
                borderColor:
                  activeCategory === cat.id ? "var(--accent)" : "var(--border-default)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--border-subtle)" }}>
          {filtered.map((item) => (
            <div key={item.id}>
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                aria-expanded={openId === item.id}
              >
                <span className="t-body font-medium" style={{ color: "var(--fg-ink)" }}>
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 mt-0.5 transition-transform duration-200"
                  style={{
                    transform: openId === item.id ? "rotate(45deg)" : "rotate(0deg)",
                    color: "var(--accent)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="t-body pb-5 leading-relaxed"
                      style={{ color: "var(--fg-secondary)" }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 p-8 rounded-2xl border text-center"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
        >
          <h2 className="t-display-sm mb-2" style={{ color: "var(--fg-ink)" }}>
            Still have questions?
          </h2>
          <p className="t-body mb-5" style={{ color: "var(--fg-secondary)" }}>
            We're happy to talk through your project or specific requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/#enquiry"
              className="px-5 py-2.5 rounded-full t-body-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--accent)", color: "var(--accent-on)" }}
            >
              Send an enquiry
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full t-body-sm font-medium border transition-colors hover:bg-[var(--surface-2)]"
              style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
