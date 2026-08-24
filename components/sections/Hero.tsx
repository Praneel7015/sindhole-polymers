"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pt-32 pb-20"
      style={{ background: "var(--surface-0)" }}
      aria-label="Hero"
    >
      {/* Hero background image — modern building with uPVC windows, very subtle */}
      <div className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.055, filter: "grayscale(40%) contrast(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--surface-0) 30%, transparent 70%)" }}
        />
      </div>

      {/* Very subtle grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent vertical stripe — architectural */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-px"
        style={{ background: "var(--accent)", opacity: 0.3 }}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Left — text */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="t-overline"
                style={{ color: "var(--accent)" }}
              >
                Authorised Greentech Dealer · Bidar, Karnataka
              </span>
            </motion.div>

            {/* Main headline — kinetic mask reveal */}
            <div className="overflow-hidden mb-6 pb-3">
              <motion.h1
                className="t-display-xl"
                style={{ color: "var(--fg-ink)" }}
                initial={{ y: shouldReduceMotion ? 0 : "110%", opacity: shouldReduceMotion ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                Where every{" "}
                <span style={{ color: "var(--accent)" }}>window</span>
                <br />
                starts with the{" "}
                <br className="hidden sm:block" />
                right profile.
              </motion.h1>
            </div>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="t-body-lg max-w-xl mb-10"
              style={{ color: "var(--fg-secondary)" }}
            >
              Sindhole Polymers supplies Greentech uPVC window & door profiles to
              fabricators, contractors, and developers across North Karnataka.
              Dimensionally accurate. Chemically stable. Built for Indian conditions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ background: "var(--accent)", color: "var(--accent-on)" }}
              >
                Enquire about profiles
                <ArrowRight />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium border transition-all duration-200 hover:bg-[var(--surface-1)]"
                style={{ borderColor: "var(--border-default)", color: "var(--fg-ink)" }}
              >
                Explore product ranges
              </a>
              <a
                href="https://wa.me/919391905091"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium border transition-all duration-200 hover:bg-[var(--surface-1)]"
                style={{ borderColor: "var(--border-subtle)", color: "var(--fg-secondary)" }}
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              className="flex flex-wrap gap-x-8 gap-y-3 mt-12 pt-8 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {[
                { val: "3", unit: "Greentech Series", note: "stocked & available" },
                { val: "5", unit: "Chambers", note: "multi-chamber precision" },
                { val: "ISO", unit: "9001:2015", note: "certified quality system" },
              ].map((s) => (
                <div key={s.unit} className="flex flex-col gap-0.5">
                  <span className="t-display-sm font-medium leading-none" style={{ color: "var(--fg-ink)" }}>
                    {s.val}
                  </span>
                  <span className="t-body-sm font-medium" style={{ color: "var(--fg-ink)" }}>
                    {s.unit}
                  </span>
                  <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>
                    {s.note}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — animated window assembly diagram */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <WindowAssemblyIllustration reduced={!!shouldReduceMotion} />
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="t-body-xs" style={{ color: "var(--fg-muted)" }}>Scroll to explore</span>
        <motion.div
          className="w-px h-10"
          style={{ background: "var(--border-default)" }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Window Assembly SVG ──────────────────────── */
function WindowAssemblyIllustration({ reduced }: { reduced: boolean }) {
  // Use inline animation props instead of variants to avoid TS issues with dynamic transitions
  const pathAnim = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.5 + i * 0.15, ease: "easeInOut" as const },
      opacity: { duration: 0.3, delay: reduced ? 0 : 0.5 + i * 0.15 },
    },
  });
  const panelAnim = (i: number) => ({
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  });

  return (
    <svg
      width="420"
      height="480"
      viewBox="0 0 420 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm"
    >
      {/* Outer frame */}
      <motion.rect
        x="40" y="40" width="340" height="400" rx="3"
        stroke="var(--fg-ink)" strokeWidth="3" fill="none"
        {...pathAnim(0)}
      />
      {/* Inner rebate line */}
      <motion.rect
        x="52" y="52" width="316" height="376" rx="2"
        stroke="var(--border-default)" strokeWidth="1" fill="none"
        {...pathAnim(1)}
      />

      {/* Vertical mullion */}
      <motion.line
        x1="210" y1="52" x2="210" y2="428"
        stroke="var(--fg-ink)" strokeWidth="3"
        {...pathAnim(2)}
      />

      {/* Horizontal transom */}
      <motion.line
        x1="52" y1="240" x2="368" y2="240"
        stroke="var(--fg-ink)" strokeWidth="3"
        {...pathAnim(3)}
      />

      {/* Glass panels — filled last */}
      {[
        { x: 58, y: 58, w: 146, h: 176 },
        { x: 216, y: 58, w: 146, h: 176 },
        { x: 58, y: 246, w: 146, h: 176 },
        { x: 216, y: 246, w: 146, h: 176 },
      ].map((p, i) => (
        <motion.rect
          key={i}
          x={p.x} y={p.y} width={p.w} height={p.h}
          fill="var(--accent)" fillOpacity="0.07"
          stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="0.75"
          {...panelAnim(i)}
        />
      ))}

      {/* Handle — casement right side */}
      <motion.rect
        x="338" y="218" width="6" height="24" rx="3"
        fill="var(--accent)" opacity="0.6"
        {...panelAnim(4)}
      />

      {/* Dimension annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 2.0, duration: 0.4 }}
      >
        {/* Width arrow */}
        <line x1="40" y1="460" x2="380" y2="460" stroke="var(--border-default)" strokeWidth="0.75" strokeDasharray="4 3" />
        <text x="210" y="474" textAnchor="middle" fontSize="10" fill="var(--fg-muted)" fontFamily="'DM Sans', sans-serif" letterSpacing="0.05em">PROFILE SYSTEM</text>

        {/* Series label */}
        <text x="210" y="24" textAnchor="middle" fontSize="9" fill="var(--fg-secondary)" fontFamily="'DM Sans', sans-serif" letterSpacing="0.08em">GREENTECH uPVC</text>
      </motion.g>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
