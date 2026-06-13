"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "35+", label: "Years of Excellence", suffix: "" },
  { value: "3", label: "Michelin Stars", suffix: "★" },
  { value: "200+", label: "Signature Dishes", suffix: "" },
  { value: "50k+", label: "Happy Guests", suffix: "" },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden py-0">
      {/* Background image with heavy dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#0C0B09]/65" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1E1812]">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center text-center py-14 px-6 group hover:bg-[#C9A96E]/4 transition-colors duration-500"
          >
            <div className="flex items-baseline gap-1 mb-2">
              <span
                className="text-4xl md:text-6xl font-bold text-[#C9A96E] group-hover:scale-105 transition-transform duration-400 origin-bottom inline-block"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-[#C9A96E]/70 text-2xl">{stat.suffix}</span>
              )}
            </div>
            <div className="w-6 h-px bg-[#C9A96E]/30 mb-2.5" />
            <span className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] font-medium group-hover:text-[#6B5A45] transition-colors duration-300">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
