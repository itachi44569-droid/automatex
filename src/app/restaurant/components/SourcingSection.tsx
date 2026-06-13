"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const producers = [
  { id: "p1", name: "Maison Pic Truffe", region: "Périgord", product: "Black truffle", x: 37, y: 62, desc: "Hand-harvested winter truffles from a family estate in the Dordogne. Laurent has sourced from them for 28 years." },
  { id: "p2", name: "Côte d'Arvor", region: "Brittany", product: "Blue lobster", x: 15, y: 30, desc: "Wild-caught Homard Bleu from the cold Atlantic waters off Roscoff. Delivered live every Tuesday and Friday." },
  { id: "p3", name: "Rungis Primeurs", region: "Île-de-France", product: "Heritage vegetables", x: 45, y: 30, desc: "Rare heirloom varieties sourced directly from market gardeners at Rungis each morning at 4am." },
  { id: "p4", name: "Lur Berri", region: "Landes, Gascony", product: "Foie gras", x: 28, y: 75, desc: "Label Rouge duck raised in open woodland. The finest foie gras in France, and Laurent would argue, the world." },
  { id: "p5", name: "Berger Alpin", region: "Savoie", product: "Alpine lamb", x: 68, y: 50, desc: "Agneau de Sisteron, raised at altitude on wild herbs. Slaughtered on Tuesdays, on the plate by Thursday." },
  { id: "p6", name: "Sel de Guérande", region: "Loire-Atlantique", product: "Fleur de sel", x: 18, y: 42, desc: "Hand-raked from the salt marshes of the Guérande peninsula. Finishing salt for nearly every dish." },
];

export default function SourcingSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeProducer = producers.find((p) => p.id === active);

  return (
    <section className="relative py-28 lg:py-40 bg-[#0C1C10] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center gap-4">
            <span className="w-8 h-px bg-[#C9A96E]/40" /> The Provenance
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              From France's finest <span className="text-[#C9A96E] italic">terroir</span>
            </h2>
            <p className="text-[#5A4A35] text-sm max-w-xs leading-relaxed">
              24 producers. Some relationships spanning three generations. Click any dot to learn more.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* SVG Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full" style={{ filter: "drop-shadow(0 0 40px rgba(12,28,16,0.8))" }}>
              {/* Simplified France silhouette */}
              <path
                d="M28,8 L35,6 L42,8 L50,5 L58,8 L64,12 L70,10 L75,15 L78,22 L76,28 L80,34 L82,42 L78,48 L80,55 L76,62 L70,68 L65,72 L60,78 L55,82 L48,85 L42,82 L36,80 L30,75 L24,70 L20,62 L16,55 L14,48 L16,40 L14,32 L18,25 L22,18 L26,12 Z"
                fill="none"
                stroke="#1A3520"
                strokeWidth="0.8"
              />
              <path
                d="M28,8 L35,6 L42,8 L50,5 L58,8 L64,12 L70,10 L75,15 L78,22 L76,28 L80,34 L82,42 L78,48 L80,55 L76,62 L70,68 L65,72 L60,78 L55,82 L48,85 L42,82 L36,80 L30,75 L24,70 L20,62 L16,55 L14,48 L16,40 L14,32 L18,25 L22,18 L26,12 Z"
                fill="#0A1810"
                opacity="0.7"
              />

              {/* Grid lines */}
              {[20, 40, 60, 80].map((v) => (
                <g key={v}>
                  <line x1={v} y1="0" x2={v} y2="100" stroke="#1A3520" strokeWidth="0.3" strokeDasharray="1,3" opacity="0.5" />
                  <line x1="0" y1={v} x2="100" y2={v} stroke="#1A3520" strokeWidth="0.3" strokeDasharray="1,3" opacity="0.5" />
                </g>
              ))}

              {/* Producer dots */}
              {producers.map((p) => (
                <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setActive(active === p.id ? null : p.id)}>
                  {/* Pulse ring */}
                  <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity={active === p.id ? 0.6 : 0.2} />
                  {/* Dot */}
                  <circle
                    cx={p.x} cy={p.y} r="2"
                    fill={active === p.id ? "#C9A96E" : "#C9A96E"}
                    opacity={active === p.id ? 1 : 0.45}
                  />
                  {/* Label */}
                  <text
                    x={p.x} y={p.y - 4}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="#C9A96E"
                    opacity={active === p.id ? 0.9 : 0.4}
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {p.product}
                  </text>
                </g>
              ))}
            </svg>

            <p className="text-[#3A3028] text-[10px] tracking-[0.15em] text-center mt-2 uppercase">Tap a dot to explore</p>
          </motion.div>

          {/* Producer list / detail */}
          <div className="lg:col-span-2 space-y-0 border border-[#1A3520]">
            {producers.map((p) => (
              <div
                key={p.id}
                onClick={() => setActive(active === p.id ? null : p.id)}
                className={`border-b border-[#1A3520] px-6 py-4 cursor-pointer transition-colors duration-200 ${active === p.id ? "bg-[#C9A96E]/6" : "hover:bg-[#1A3520]/40"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D4C4A8] text-sm font-medium">{p.product}</p>
                    <p className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase">{p.region}</p>
                  </div>
                  <span className={`text-[#C9A96E] text-lg transition-transform duration-200 ${active === p.id ? "rotate-45" : ""}`}>+</span>
                </div>

                <AnimatePresence>
                  {active === p.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#7A6A55] text-xs leading-relaxed mt-3">{p.desc}</p>
                      <p className="text-[#3A3028] text-[10px] mt-2 italic">{p.name}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
