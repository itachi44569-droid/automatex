"use client";

import { motion } from "framer-motion";

const dish = {
  season: "Summer 2025",
  name: "Homard Bleu Rôti",
  subtitle: "Roasted Blue Lobster",
  description:
    "Whole Breton blue lobster, slowly roasted in cultured butter with wild tarragon and Champagne beurre blanc. Served with heritage pea royale, trout roe, and a velouté of summer squash. A celebration of the Atlantic at its finest.",
  wine: "Burgundy Meursault 'Les Charmes' 2019 — Domaine Lafon",
  tags: ["Chef's Special", "Seasonal", "Gluten-Free"],
  price: "€185",
  image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=900&q=85&auto=format&fit=crop",
};

export default function SeasonalSection() {
  return (
    <section className="py-24 lg:py-40 px-6 bg-[#0E0B08] border-t border-[#2A1F14] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Dish of the Season <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Currently on the{" "}
            <span className="text-[#C9A96E] italic">Tasting Menu</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08]/40 to-transparent" />
            </div>

            {/* Season badge */}
            <div className="absolute top-6 left-6 border border-[#C9A96E]/40 bg-[#0C0B09]/80 backdrop-blur-sm px-4 py-2">
              <span className="text-[#C9A96E] text-[8px] tracking-[0.4em] uppercase">{dish.season}</span>
            </div>

            {/* Price tag */}
            <div className="absolute bottom-6 right-6 bg-[#C9A96E] px-5 py-2.5">
              <span className="text-[#0C0B09] text-lg font-bold" style={{ fontFamily: "Georgia, serif" }}>
                {dish.price}
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex gap-2 mb-7">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[7px] tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3
              className="text-3xl lg:text-4xl font-bold text-[#F5F0E8] mb-2 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {dish.name}
            </h3>
            <p className="text-[#C9A96E] text-sm italic mb-7">{dish.subtitle}</p>

            <div className="w-10 h-px bg-[#C9A96E]/40 mb-7" />

            <p className="text-[#6B5A45] text-sm leading-8 mb-9">{dish.description}</p>

            {/* Wine pairing */}
            <div className="border border-[#1E1812] p-5 mb-9">
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#3A3028] mb-2">Sommelier's Pairing</p>
              <p className="text-[#8B7355] text-sm italic">{dish.wine}</p>
            </div>

            <a
              href="#reservation"
              className="inline-block px-10 py-4 bg-[#C9A96E] text-[#0C0B09] text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4B47A] transition-all duration-300 hover:-translate-y-0.5"
            >
              Reserve to Experience This
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
