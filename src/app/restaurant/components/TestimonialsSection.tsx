"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "Aurum transcends the concept of dining. It is theatre, philosophy, and art — all on a single plate. Chef Moreau's Wagyu Rossini is the finest thing I have eaten in a decade of reviewing restaurants across the world.",
    author: "Catherine Dubois",
    title: "Chief Critic, Le Monde Gastronomique",
    award: "Restaurant of the Year 2024",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&crop=face",
  },
  {
    quote: "There are perhaps four restaurants in the world that justify calling themselves essential. Aurum is one of them. The langoustine ravioli alone is worth the flight to Paris. A flawless experience from aperitif to digestif.",
    author: "James Harrington",
    title: "Food Editor, The Financial Times",
    award: "Top 50 Restaurants, World",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face",
  },
  {
    quote: "Chef Moreau has achieved something genuinely rare — a restaurant where innovation and tradition speak the same language. The service is flawless. The wine list, extraordinary. A true pilgrimage destination.",
    author: "Sofia Marchetti",
    title: "Editor-in-Chief, Dining Europe",
    award: "3 Michelin Stars Confirmed",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=face",
  },
];

const publications = ["Le Monde", "Financial Times", "The Guardian", "Bon Appétit", "Condé Nast Traveller"];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-36 px-6 border-t border-[#1A1612] relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=1920&q=30&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-[0.04]"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Press &amp; Recognition <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            What the World{" "}
            <span className="text-[#C9A96E] italic">Says</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.author}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative border border-[#1E1812] p-8 group hover:border-[#C9A96E]/30 transition-all duration-500 overflow-hidden bg-[#0C0B09]/60 backdrop-blur-sm"
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

              <div className="flex gap-0.5 mb-5">
                {Array(r.stars).fill(0).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>

              <div className="inline-block text-[7px] tracking-[0.3em] text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1 mb-6 uppercase">
                ★ {r.award}
              </div>

              <p className="text-[#5C4E3A] text-sm leading-8 italic mb-8 group-hover:text-[#6B5A45] transition-colors duration-300">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author with avatar */}
              <div className="border-t border-[#1E1812] pt-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2A2218] shrink-0">
                  <img
                    src={r.avatar}
                    alt={r.author}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <p className="text-[#D4C4A8] text-sm font-semibold">{r.author}</p>
                  <p className="text-[#3A3028] text-[8px] tracking-[0.2em] uppercase mt-0.5">{r.title}</p>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-[#C9A96E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Press logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-12 mt-16 pt-12 border-t border-[#1A1612]"
        >
          {publications.map((pub) => (
            <span
              key={pub}
              className="text-[#222018] text-xs tracking-[0.35em] uppercase font-semibold hover:text-[#4A3D2E] transition-colors cursor-default select-none"
            >
              {pub}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
