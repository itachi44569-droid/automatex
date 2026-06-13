"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { text: "The most extraordinary meal of the decade. Laurent Moreau has achieved something that can only be called perfection.", pub: "The New York Times", author: "Pete Wells", year: "2024" },
  { text: "Aurum does not serve food — it serves memory. Every plate is a small autobiography of the French countryside.", pub: "Le Monde", author: "Chloé Durand", year: "2023" },
  { text: "In a world of over-engineered tasting menus, Moreau's restraint is thunderous. Three stars feel insufficient.", pub: "Financial Times", author: "Nicholas Lander", year: "2024" },
  { text: "If you eat one meal in Paris this year, eat it here. The lamb alone is worth the transatlantic flight.", pub: "Condé Nast Traveller", author: "Fiona Sims", year: "2023" },
  { text: "Ranked No. 2 in the world — a position that underestimates what happens at 12 Rue de la Paix.", pub: "World's 50 Best", author: "Editors", year: "2023" },
];

const logos = [
  "The New York Times", "Le Monde", "Financial Times",
  "Condé Nast", "World's 50 Best", "Michelin Guide",
  "Le Fooding", "The Guardian",
];

export default function PressSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-28 lg:py-36 bg-[#0C1E10] overflow-hidden">
      {/* Decorative large quote mark */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-[22rem] leading-none text-[#C9A96E]/[0.025] font-serif select-none pointer-events-none" style={{ fontFamily: "Georgia, serif" }}>
        "
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-16 flex items-center justify-center gap-4"
        >
          <span className="w-8 h-px bg-[#C9A96E]/40" /> As the World Sees Us <span className="w-8 h-px bg-[#C9A96E]/40" />
        </motion.p>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-20"
        >
          {logos.map((logo, i) => (
            <span
              key={logo}
              className="text-[#3A3028] text-xs tracking-[0.2em] uppercase font-medium hover:text-[#7A6A55] transition-colors duration-300"
              style={{ fontFamily: i % 2 === 0 ? "Georgia, serif" : "inherit" }}
            >
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Quote carousel */}
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#D4C4A8] text-xl lg:text-2xl leading-relaxed italic mb-8" style={{ fontFamily: "Georgia, serif" }}>
                "{quotes[active].text}"
              </p>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[#C9A96E] text-[11px] tracking-[0.3em] uppercase font-medium">{quotes[active].pub}</p>
                <p className="text-[#4A3D2E] text-[10px] tracking-[0.15em]">{quotes[active].author} · {quotes[active].year}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${i === active ? "w-6 h-1 bg-[#C9A96E]" : "w-1 h-1 bg-[#3A3028]"}`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 grid grid-cols-3 divide-x divide-[#1A3520] border border-[#1A3520] max-w-lg mx-auto"
        >
          {[["88", "Press mentions in 2024"], ["#2", "World's 50 Best 2023"], ["19/20", "GaultMillau score"]].map(([n, l]) => (
            <div key={l} className="text-center py-6 px-4">
              <p className="text-[#C9A96E] text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>{n}</p>
              <p className="text-[#4A3D2E] text-[9px] tracking-[0.15em] uppercase leading-snug">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
