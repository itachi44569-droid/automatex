"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 lg:py-44 px-6 overflow-hidden relative bg-[#0A1A0D]">
      {/* Giant watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
        <span className="text-[22rem] font-bold text-[#C9A96E]/[0.025] leading-none tracking-tighter" style={{ fontFamily: "Georgia, serif" }}>35</span>
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* Left: Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Gold vertical accent */}
          <div className="absolute -left-5 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/50 to-transparent" />

          {/* Main visual card */}
          <div className="relative h-[520px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=900&q=85&auto=format&fit=crop"
              alt="Aurum restaurant interior"
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-[#0A1810]/20" />
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A1810]/60 to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-10 -right-6 bg-[#0E1E10] border border-[#223D28] p-7 shadow-2xl"
          >
            <p
              className="text-5xl font-bold text-[#C9A96E] leading-none mb-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              35
            </p>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#4A3D2E]">Years of Passion</p>
          </motion.div>

          {/* Small decorative second card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
            className="absolute -top-6 -right-4 bg-[#0E1E10] border border-[#223D28] px-5 py-4 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3].map(i => (
                  <span key={i} className="text-[#C9A96E] text-sm">★</span>
                ))}
              </div>
              <span className="text-[9px] tracking-[0.2em] text-[#5C4E3A] uppercase ml-1">Michelin</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-7 font-medium flex items-center gap-4">
            <span className="w-8 h-px bg-[#C9A96E]/50" /> Our Story
          </p>

          <h2
            className="text-4xl lg:text-[3.2rem] font-bold text-[#F5F0E8] leading-tight mb-8 tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            A Legacy Built on
            <br />
            <span className="text-[#C9A96E] italic">Passion &amp; Precision</span>
          </h2>

          <div className="w-10 h-px bg-[#C9A96E]/50 mb-8" />

          <p className="text-[#6B5A45] leading-8 mb-5 text-sm">
            Founded in 1987 by Chef Laurent Moreau, Aurum was born from a simple belief: that dining is one of life&apos;s most profound pleasures. Nestled in the heart of Paris, our restaurant has been a sanctuary for those who seek more than a meal — they seek an experience that transcends the ordinary.
          </p>

          <p className="text-[#6B5A45] leading-8 mb-12 text-sm">
            Every dish we create is a dialogue between heritage and the present — honoring classical French techniques while embracing the finest seasonal ingredients from local artisan producers. Three Michelin stars later, our commitment to this philosophy has never wavered.
          </p>

          {/* Chef signature block */}
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2A1F0F] to-[#1A1208] border border-[#3A2E1E] flex items-center justify-center shrink-0">
              <span className="text-[#C9A96E] text-xs font-bold tracking-wider">LM</span>
            </div>
            <div>
              <p className="text-[#D4C4A8] text-sm font-semibold">Chef Laurent Moreau</p>
              <p className="text-[#4A3D2E] text-[9px] tracking-[0.25em] uppercase mt-1">
                Founder &amp; Executive Chef
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
