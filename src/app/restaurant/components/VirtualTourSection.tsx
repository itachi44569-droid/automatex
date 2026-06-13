"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const spaces = [
  {
    id: "dining",
    name: "Main Dining Room",
    subtitle: "Seats 42 guests",
    desc: "High ceilings, candlelight, and the quiet hum of a room where every table matters equally.",
    img: "1467003909585-2f8a72700288",
    accent: "#C9A96E",
  },
  {
    id: "bar",
    name: "The Bar",
    subtitle: "Pre-dinner & late evenings",
    desc: "Aged Cognac and perfect cocktails. A place to begin, or to linger long after dessert.",
    img: "1510812431401-41d2bd2722f3",
    accent: "#8B4513",
  },
  {
    id: "chefs-table",
    name: "The Chef's Table",
    subtitle: "Private — 6 guests max",
    desc: "Inside the kitchen, watching every plate leave the pass. The most intimate seat in the house.",
    img: "1414235077428-338989a2e8c0",
    accent: "#C9A96E",
  },
  {
    id: "cellar",
    name: "Wine Cellar",
    subtitle: "2,400 labels",
    desc: "Eighteenth-century stone vaults housing bottles that predate the republic. Private dinners available.",
    img: "1549488297-7d1b7b5f3b3a",
    accent: "#7A3B5A",
  },
];

export default function VirtualTourSection() {
  const [active, setActive] = useState(0);
  const space = spaces[active];

  return (
    <section className="relative py-28 lg:py-40 bg-[#0A1A0D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center gap-4">
            <span className="w-8 h-px bg-[#C9A96E]/40" /> Explore the Space
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Four rooms. <span className="text-[#C9A96E] italic">One story.</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-0 mb-0 border border-[#1A3520] border-b-0 overflow-x-auto">
          {spaces.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`px-6 py-4 text-[10px] tracking-[0.25em] uppercase whitespace-nowrap border-r border-[#1A3520] transition-all duration-200 last:border-r-0 ${
                active === i
                  ? "bg-[#C9A96E]/10 text-[#C9A96E]"
                  : "text-[#4A3D2E] hover:text-[#7A6A55] hover:bg-[#1A3520]/40"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Main image + description */}
        <div className="border border-[#1A3520]">
          <AnimatePresence mode="wait">
            <motion.div
              key={space.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-3"
            >
              {/* Image */}
              <div className="lg:col-span-2 relative" style={{ aspectRatio: "16/9" }}>
                <img
                  src={`https://images.unsplash.com/photo-${space.img}?w=1200&q=85&auto=format&fit=crop`}
                  alt={space.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A1A0D]/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1A0D]/80" />
              </div>

              {/* Text panel */}
              <div className="flex flex-col justify-center px-10 py-12 border-l border-[#1A3520]">
                <p className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase mb-3">{space.subtitle}</p>
                <h3 className="text-[#F5F0E8] text-2xl font-bold mb-5" style={{ fontFamily: "Georgia, serif" }}>
                  {space.name}
                </h3>
                <p className="text-[#7A6A55] text-sm leading-relaxed mb-8">{space.desc}</p>

                <div className="flex gap-2">
                  {spaces.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`transition-all duration-300 rounded-full ${i === active ? "w-8 h-1 bg-[#C9A96E]" : "w-2 h-1 bg-[#3A3028]"}`}
                      aria-label={`Space ${i + 1}`}
                    />
                  ))}
                </div>

                <a
                  href="#reservation"
                  className="mt-10 self-start text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase border-b border-[#C9A96E]/30 pb-0.5 hover:border-[#C9A96E] transition-colors duration-200"
                >
                  Reserve this space →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
