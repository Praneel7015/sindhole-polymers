"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-1)" }}
    >
      <div className="container">
        <motion.div
          className="max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-eyebrow mb-3">Contact</p>
          <h2 className="t-display-md" style={{ color: "var(--fg-ink)" }}>
            Find us in{" "}
            <span style={{ color: "var(--accent)" }}>Bidar.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Contact details */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-5"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Address */}
            <ContactCard icon={<MapPinIcon />} title="Showroom address">
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
                Open in Google Maps →
              </a>
            </ContactCard>

            {/* Phone / WA */}
            <ContactCard icon={<PhoneIcon />} title="Call or WhatsApp">
              <a
                href="tel:+919391905091"
                className="t-body-sm font-semibold block mb-1 transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--fg-ink)" }}
              >
                +91 93919 05091
              </a>
              <a
                href="https://wa.me/919391905091"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 t-body-xs font-medium transition-colors hover:opacity-80"
                style={{ color: "#25D366" }}
              >
                <WaIcon /> Chat on WhatsApp
              </a>
            </ContactCard>

            {/* Email */}
            <ContactCard icon={<MailIcon />} title="Email">
              <a
                href="mailto:polymers@sindhole.com"
                className="t-body-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--fg-ink)" }}
              >
                polymers@sindhole.com
              </a>
            </ContactCard>

            {/* Hours */}
            <ContactCard icon={<ClockIcon />} title="Business hours">
              <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                Mon–Sat: 10:00 AM – 5:00 PM
              </p>
              <p className="t-body-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
                Sunday: closed
              </p>
            </ContactCard>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-full h-80 lg:h-full min-h-80 rounded-2xl overflow-hidden border relative"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {/* Embedded Google map */}
              <iframe
                src="https://maps.google.com/maps?q=Sindhole+Polymers+uPVC,+Manahalli+Road,+Basaveshwara+Nagar,+Bidar,+Karnataka+585403&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sindhole Polymers showroom location"
              />
              {/* Overlay pin card */}
              <div
                className="absolute bottom-4 left-4 px-4 py-3 rounded-xl shadow-lg"
                style={{
                  background: "rgba(250,250,248,0.92)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <p className="t-body-sm font-semibold" style={{ color: "var(--fg-ink)" }}>
                  Sindhole Polymers uPVC
                </p>
                <p className="t-body-xs mt-0.5" style={{ color: "var(--fg-secondary)" }}>
                  Manahalli Road, Bidar · Plus Code VGW8+FGG
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div
      className="flex gap-4 p-5 rounded-2xl border"
      style={{ borderColor: "var(--border-subtle)", background: "var(--surface-0)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
      >
        {icon}
      </div>
      <div>
        <p className="t-body-xs font-semibold mb-1.5" style={{ color: "var(--fg-secondary)" }}>
          {title}
        </p>
        {children}
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5a5.5 5.5 0 0 1 5.5 5.5c0 3.7-5.5 9.5-5.5 9.5S3.5 10.7 3.5 7A5.5 5.5 0 0 1 9 1.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.25" fill="none"/>
    </svg>
  );
}
function PhoneIcon() {
  return <Phone size={18} strokeWidth={1.75} />;
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
