"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — story */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-eyebrow mb-3">About Us</p>
            <h2 className="t-display-md mb-6" style={{ color: "var(--fg-ink)" }}>
              Bidar's authorised{" "}
              <span style={{ color: "var(--accent)" }}>Greentech source.</span>
            </h2>
            <div className="flex flex-col gap-4 t-body" style={{ color: "var(--fg-secondary)" }}>
              <p>
                Sindhole Polymers was established in 2025 with one aim: bring
                genuine, ISO-certified Greentech uPVC profile systems to fabricators
                and developers across North Karnataka — from a real showroom, with
                real stock, and real support.
              </p>
              <p>
                As an authorised Greentech dealer, we supply the same profiles,
                with the same certifications, that Greentech distributes across India —
                but we're the closest source to Bidar, Kalaburagi, and Gulbarga.
                That means faster supply, local relationships, and someone you can
                actually walk in and talk to.
              </p>
              <p>
                Our showroom on Manahalli Road is open Monday to Saturday.
                Fabricators are welcome to inspect samples, review technical
                documentation, and discuss project requirements in person.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium t-body-sm border transition-all hover:bg-[var(--surface-1)]"
                style={{ borderColor: "var(--border-default)", color: "var(--fg-ink)" }}
              >
                Visit our showroom
              </a>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium t-body-sm transition-all hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--accent-on)" }}
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          {/* Right — photo + details */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Showroom / building photo */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=900&q=80&auto=format&fit=crop"
                alt="Modern building with uPVC windows — representative of Greentech installations"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.8) contrast(1.05)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)" }}
              />
              <span
                className="absolute bottom-4 left-4 t-body-xs px-3 py-1.5 rounded-full border backdrop-blur-sm"
                style={{
                  background: "rgba(250,250,248,0.85)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--fg-secondary)",
                }}
              >
                Greentech uPVC installation — representative image
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Location card */}
              <div
                className="p-6 rounded-2xl border"
                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                  >
                    <MapPinIcon />
                  </div>
                  <div>
                    <h3 className="t-body font-semibold mb-1" style={{ color: "var(--fg-ink)" }}>Showroom</h3>
                    <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                      Sindhole Polymers uPVC<br />
                      Manahalli Road, Basaveshwara Nagar<br />
                      Bidar, Karnataka 585403
                    </p>
                    <a
                      href="https://maps.app.goo.gl/8QN8vBpzAieTppRc8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 t-body-xs font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      Open in Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* Region card */}
              <div
                className="p-6 rounded-2xl border"
                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                  >
                    <GlobeIcon />
                  </div>
                  <div>
                    <h3 className="t-body font-semibold mb-1" style={{ color: "var(--fg-ink)" }}>Region served</h3>
                    <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                      Bidar · Kalaburagi · Gulbarga · North Karnataka
                    </p>
                    <p className="t-body-xs mt-1.5" style={{ color: "var(--fg-muted)" }}>
                      Kalaburagi and Gulbarga refer to the same city — we serve both.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div
                className="p-6 rounded-2xl border"
                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                  >
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="t-body font-semibold mb-1" style={{ color: "var(--fg-ink)" }}>Business hours</h3>
                    <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>Mon–Sat: 10:00 AM – 5:00 PM</p>
                    <p className="t-body-xs mt-1" style={{ color: "var(--fg-muted)" }}>Sunday: closed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M10 3c-2 3-2 11 0 14M10 3c2 3 2 11 0 14M3 10h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
