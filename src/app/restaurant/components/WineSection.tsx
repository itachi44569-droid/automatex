"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const wines = [
  { id: "w1", name: "Pétrus 2015", region: "Pomerol, Bordeaux", type: "Red", grape: "Merlot", price: "€680", notes: "Velvet tannins, dark cherry, graphite minerality", pairs: "Wagyu tenderloin" },
  { id: "w2", name: "Montrachet Grand Cru", region: "Burgundy", type: "White", grape: "Chardonnay", price: "€420", notes: "Golden, rich butterscotch, honeysuckle, extraordinary length", pairs: "Brittany lobster" },
  { id: "w3", name: "Dom Pérignon 2013", region: "Champagne", type: "Sparkling", grape: "Pinot Noir & Chardonnay", price: "€380", notes: "Fine persistent bubbles, brioche, white peach, chalk", pairs: "Oyster amuse-bouche" },
  { id: "w4", name: "Hermitage Rouge 2017", region: "Rhône Valley", type: "Red", grape: "Syrah", price: "€290", notes: "Deep purple, smoked meat, black olive, full and structured", pairs: "Périgord duck breast" },
  { id: "w5", name: "Château d'Yquem 2016", region: "Sauternes, Bordeaux", type: "Dessert", grape: "Sémillon", price: "€340", notes: "Liquid gold, apricot jam, saffron, extraordinary sweetness", pairs: "Foie gras mi-cuit" },
  { id: "w6", name: "Chablis Premier Cru", region: "Chablis, Burgundy", type: "White", grape: "Chardonnay", price: "€185", notes: "Steely, oyster shell, citrus, precise mineral finish", pairs: "Turbot en papillote" },
];

const TYPE_COLORS: Record<string, string> = {
  Red: "bg-[#8B2500]/20 text-[#C96A40] border-[#8B2500]/30",
  White: "bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/25",
  Sparkling: "bg-[#E8E0CC]/10 text-[#D4C4A8] border-[#D4C4A8]/25",
  Dessert: "bg-[#C9A96E]/15 text-[#D4A850] border-[#C9A96E]/30",
};

export default function WineSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-28 lg:py-40 bg-[#0A1810] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1549488297-7d1b7b5f3b3a?w=1920&q=30&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-[0.08]"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1810] via-transparent to-[#0A1810]" />
      </div>


      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center gap-4">
            <span className="w-8 h-px bg-[#C9A96E]/40" /> The Cellar
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Curated by our <span className="text-[#C9A96E] italic">Sommelier</span>
            </h2>
            <p className="text-[#5A4A35] text-sm leading-relaxed max-w-xs">
              Over 2,400 labels. Every bottle chosen to amplify a dish, not just accompany it.
            </p>
          </div>
        </motion.div>

        {/* Wine grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#1A3520]">
          {wines.map((wine, i) => (
            <motion.div
              key={wine.id}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="relative border-b border-r border-[#1A3520] p-7 cursor-pointer group overflow-hidden"
              onMouseEnter={() => setHovered(wine.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover bg */}
              <div className={`absolute inset-0 bg-[#C9A96E]/4 transition-opacity duration-300 ${hovered === wine.id ? "opacity-100" : "opacity-0"}`} />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-[10px] tracking-[0.2em] uppercase border px-2 py-0.5 ${TYPE_COLORS[wine.type] || ""}`}>
                    {wine.type}
                  </span>
                  <span className="text-[#C9A96E] font-bold" style={{ fontFamily: "Georgia, serif" }}>{wine.price}</span>
                </div>

                <h3 className="text-[#F5F0E8] font-bold text-lg mb-1 leading-snug" style={{ fontFamily: "Georgia, serif" }}>{wine.name}</h3>
                <p className="text-[#C9A96E] text-[10px] tracking-[0.15em] uppercase mb-1">{wine.region}</p>
                <p className="text-[#4A3D2E] text-[11px] mb-4">{wine.grape}</p>

                <p className="text-[#7A6A55] text-xs leading-relaxed italic mb-4">"{wine.notes}"</p>

                <AnimatePresence>
                  {hovered === wine.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-[#1A3520] pt-4"
                    >
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]/60 mb-1">Perfect with</p>
                      <p className="text-[#D4C4A8] text-xs font-medium">{wine.pairs}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-[#5A4A35] text-sm mb-5">Request a private tasting session with our head sommelier</p>
          <a
            href="#reservation"
            className="inline-block px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase hover:bg-[#C9A96E]/8 hover:border-[#C9A96E]/60 transition-all duration-300"
          >
            Book a Sommelier Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
