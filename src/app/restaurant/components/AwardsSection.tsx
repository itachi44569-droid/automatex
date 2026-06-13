"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const awards = [
  { year: "1992", title: "First Michelin Star", body: "Guide Michelin France" },
  { year: "1998", title: "Second Michelin Star", body: "Guide Michelin France" },
  { year: "2003", title: "James Beard Award", body: "Outstanding Chef, Europe" },
  { year: "2006", title: "Third Michelin Star", body: "Guide Michelin France" },
  { year: "2011", title: "World's 50 Best", body: "#4 — Best Restaurant" },
  { year: "2015", title: "OAD Top 100", body: "Opinionated About Dining" },
  { year: "2018", title: "GaultMillau Chef", body: "Chef of the Year — 19/20" },
  { year: "2021", title: "La Liste", body: "Top 10 — Global Ranking" },
  { year: "2023", title: "World's 50 Best", body: "#2 — Best Restaurant" },
  { year: "2024", title: "Restaurant of the Year", body: "Le Fooding, France" },
];

export default function AwardsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-36 border-t border-[#2A3D24] overflow-hidden relative bg-[#0A1A0D]">
      <div className="absolute inset-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=20&auto=format&fit=crop" alt="" aria-hidden className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A0D]/60 via-transparent to-[#0A1A0D]/60" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-[#C9A96E]/40" /> Accolades
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Three Decades of{" "}
              <span className="text-[#C9A96E] italic">Recognition</span>
            </h2>
          </div>
          {/* Arrow controls */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-[#223D28] flex items-center justify-center hover:border-[#C9A96E]/50 hover:text-[#C9A96E] text-[#4A3D2E] transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-[#223D28] flex items-center justify-center hover:border-[#C9A96E]/50 hover:text-[#C9A96E] text-[#4A3D2E] transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll timeline */}
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {awards.map((a, i) => (
            <motion.div
              key={a.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative flex-shrink-0 w-56 pr-10 group"
            >
              {/* Connector line */}
              <div className="absolute top-[21px] left-0 right-0 h-px bg-[#1C3020] group-last:right-10" />

              {/* Year dot */}
              <div className="relative w-3 h-3 border border-[#C9A96E]/60 bg-[#0A1810] rounded-full mb-6 group-hover:bg-[#C9A96E] group-hover:border-[#C9A96E] transition-all duration-300" />

              {/* Content */}
              <p
                className="text-3xl font-bold text-[#223D28] mb-2 group-hover:text-[#C9A96E]/40 transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {a.year}
              </p>
              <p className="text-[#D4C4A8] text-sm font-medium mb-1 leading-snug">{a.title}</p>
              <p className="text-[#3A3028] text-[10px] tracking-[0.15em] uppercase">{a.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Gold rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent mt-4" />
      </div>
    </section>
  );
}
