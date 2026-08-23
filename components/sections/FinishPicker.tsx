"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const finishes = [
  {
    id: "white",
    name: "Classic White",
    desc: "The timeless standard — bright, clean, suits every architectural style.",
    hex: "#F5F4F0",
    border: "#D8D6CE",
    frameColor: "#EFEFEB",
    frameStroke: "#C8C6BC",
  },
  {
    id: "black",
    name: "Jet Black",
    desc: "Architect-favourite. Bold contrast, refined lines, strong kerb appeal.",
    hex: "#2A2A25",
    border: "#1A1A14",
    frameColor: "#232320",
    frameStroke: "#111110",
  },
  {
    id: "golden-oak",
    name: "Golden Oak",
    desc: "Warm woodgrain foil — the natural look, without the natural maintenance.",
    hex: "#9E6B36",
    border: "#7A5024",
    frameColor: "#A87040",
    frameStroke: "#7A5024",
    isWoodgrain: true,
  },
  {
    id: "dark-walnut",
    name: "Dark Walnut",
    desc: "Deeper woodgrain for contemporary interiors and premium residential projects.",
    hex: "#5C3D20",
    border: "#3E2810",
    frameColor: "#5C3D20",
    frameStroke: "#3E2810",
    isWoodgrain: true,
  },
  {
    id: "rosewood",
    name: "Rosewood",
    desc: "A reddish-brown grain with warmth and depth — popular in villas.",
    hex: "#7D3C28",
    border: "#5C2A18",
    frameColor: "#7D3C28",
    frameStroke: "#5C2A18",
    isWoodgrain: true,
  },
];

export default function FinishPicker() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [selected, setSelected] = useState(finishes[0]);

  return (
    <section
      id="finishes"
      ref={ref}
      className="section-gap"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — picker controls */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="t-eyebrow mb-3">Finishes & Colours</p>
              <h2 className="t-display-md mb-4" style={{ color: "var(--fg-ink)" }}>
                White, black,{" "}
                <span style={{ color: "var(--accent)" }}>or the warmth of wood.</span>
              </h2>
              <p className="t-body mb-8" style={{ color: "var(--fg-secondary)" }}>
                Greentech profiles are available in a range of foil finishes —
                supply us your project requirement and we'll confirm availability.
              </p>

              {/* Swatch grid */}
              <div className="flex flex-wrap gap-3 mb-8">
                {finishes.map((f, i) => (
                  <motion.button
                    key={f.id}
                    onClick={() => setSelected(f)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1.5 group"
                    aria-pressed={selected.id === f.id}
                  >
                    <div
                      className="w-12 h-12 rounded-xl transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: f.isWoodgrain
                          ? `repeating-linear-gradient(100deg, ${f.hex} 0px, ${f.border}88 2px, ${f.hex} 3px, ${f.border}44 5px, ${f.hex} 7px)`
                          : f.hex,
                        boxShadow:
                          selected.id === f.id
                            ? `0 0 0 2px var(--surface-0), 0 0 0 4px var(--accent)`
                            : `0 0 0 1.5px ${f.border}55`,
                        transform: selected.id === f.id ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    <span
                      className="t-body-xs font-medium text-center leading-tight max-w-[3.5rem]"
                      style={{
                        color: selected.id === f.id ? "var(--fg-ink)" : "var(--fg-muted)",
                      }}
                    >
                      {f.name.split(" ")[0]}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Selected finish info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: "var(--border-subtle)", background: "var(--surface-1)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded-md flex-shrink-0"
                      style={{
                        background: selected.isWoodgrain
                          ? `repeating-linear-gradient(100deg, ${selected.hex} 0px, ${selected.border}88 2px, ${selected.hex} 3px, ${selected.border}44 5px)`
                          : selected.hex,
                        boxShadow: `0 0 0 1px ${selected.border}44`,
                      }}
                    />
                    <span className="t-body font-semibold" style={{ color: "var(--fg-ink)" }}>
                      {selected.name}
                    </span>
                    {selected.isWoodgrain && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        Woodgrain foil
                      </span>
                    )}
                  </div>
                  <p className="t-body-sm" style={{ color: "var(--fg-secondary)" }}>
                    {selected.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <p className="t-body-xs mt-4" style={{ color: "var(--fg-muted)" }}>
                Dual-colour (interior/exterior different finishes) available on selected series.
                Enquire for your project requirement.
              </p>
            </motion.div>
          </div>

          {/* Right — window preview */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <WindowPreviewSVG finish={selected} />
                </motion.div>
              </AnimatePresence>

              {/* Room context label */}
              <div
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg t-body-xs font-medium"
                style={{
                  background: "rgba(250,250,248,0.88)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--fg-secondary)",
                }}
              >
                Finish preview · {selected.name}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WindowPreviewSVG({ finish }: { finish: (typeof finishes)[0] }) {
  const fc = finish.frameColor;
  const fs = finish.frameStroke;
  const isWood = finish.isWoodgrain;
  const woodId = `wood-${finish.id}`;
  const wallId = `wall-${finish.id}`;
  const clipId = `glass-${finish.id}`;
  const fill   = isWood ? `url(#${woodId})` : fc;

  // Chunkier bars — 30px sides, 28px top/bottom, 22px mullion, 20px transom
  const bars = [
    { x:  60, y:  28, w: 320, h:  28 }, // top rail
    { x:  60, y: 412, w: 320, h:  28 }, // bottom rail
    { x:  60, y:  28, w:  30, h: 412 }, // left jamb
    { x: 350, y:  28, w:  30, h: 412 }, // right jamb
    { x: 209, y:  56, w:  22, h: 356 }, // centre mullion
    { x:  90, y: 222, w: 280, h:  20 }, // transom
  ];

  // Glass panes — fills the openings between bars
  const panes = [
    { x:  90, y:  56, w: 117, h: 164 }, // TL
    { x: 231, y:  56, w: 117, h: 164 }, // TR
    { x:  90, y: 242, w: 117, h: 170 }, // BL
    { x: 231, y: 242, w: 117, h: 170 }, // BR
  ];

  return (
    <svg viewBox="0 0 440 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id={wallId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F0EDE6" />
          <stop offset="100%" stopColor="#E4E0D8" />
        </linearGradient>
        {isWood && (
          <pattern id={woodId} patternUnits="userSpaceOnUse" width="8" height="40" patternTransform="rotate(8)">
            <rect width="8" height="40" fill={fc} />
            <line x1="2" y1="0" x2="2" y2="40" stroke={fs} strokeWidth="1"   opacity="0.4" />
            <line x1="5" y1="0" x2="5" y2="40" stroke={fs} strokeWidth="0.5" opacity="0.2" />
          </pattern>
        )}
        {/* Single clip region covering all 4 glass panes */}
        <clipPath id={clipId}>
          {panes.map((g, i) => <rect key={i} {...g} />)}
        </clipPath>
      </defs>

      {/* Wall */}
      <rect width="440" height="480" fill={`url(#${wallId})`} />
      <rect x="0" y="448" width="440" height="32" fill="#D8D3C8" />
      <rect x="0" y="444" width="440" height="4"  fill="#C4BFB2" />
      {/* Frame drop shadow */}
      <rect x="56" y="32" width="328" height="416" rx="5" fill="rgba(0,0,0,0.09)" />

      {/* Glass panes — sky blue base */}
      {panes.map((g, i) => <rect key={i} {...g} fill="#8EC5E0" />)}
      {/* Brighter sky at top half of each pane */}
      {panes.map((g, i) => (
        <rect key={i} x={g.x} y={g.y} width={g.w} height={Math.round(g.h * 0.5)} fill="#C0DCF0" />
      ))}

      {/* ONE diagonal reflection sweep across the whole window — clipped to glass */}
      <polygon
        points="90,56 348,56 90,412"
        fill="white" fillOpacity="0.18"
        clipPath={`url(#${clipId})`}
      />
      {/* Bright leading edge of that sweep */}
      <polygon
        points="90,56 210,56 90,220"
        fill="white" fillOpacity="0.20"
        clipPath={`url(#${clipId})`}
      />

      {/* Frame bars — on top of glass */}
      {bars.map((b, i) => <rect key={i} {...b} fill={fill} />)}
      {/* Outer frame stroke */}
      <rect x="60" y="28" width="320" height="412" rx="2"
        fill="none" stroke={fs} strokeWidth="1.5" />
      {/* Subtle inset shadow on glass edges */}
      {panes.map((g, i) => (
        <rect key={i} {...g} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
      ))}

      {/* Handle */}
      <rect
        x="335" y="222" width="9" height="26" rx="4.5"
        fill={isWood ? "#A08060" : finish.id === "black" ? "#777" : "#C8C4BC"}
        stroke={`${fs}44`} strokeWidth="0.75"
      />
      {/* Ground shadow */}
      <ellipse cx="220" cy="434" rx="152" ry="6" fill="rgba(0,0,0,0.07)" />
    </svg>
  );
}
