"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop"
          alt="Fine dining"
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* Lighter overlay — let the photo breathe */}
        <div className="absolute inset-0 bg-[#0A1810]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1810]/50 via-transparent to-[#0A1810]/80" />
        {/* Subtle gold grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,169,110,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.8) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Giant AURUM watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="text-[clamp(6rem,20vw,22rem)] font-bold tracking-[0.4em] text-[#C9A96E]/[0.04] leading-none uppercase" style={{ fontFamily: "Georgia, serif" }}>AURUM</span>
      </div>

      {/* Decorative horizontal rule */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/15 to-transparent pointer-events-none" />

      {/* Decorative vertical lines */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/10 to-transparent hidden lg:block" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/10 to-transparent hidden lg:block" />

      {/* Main content */}
      <div className="relative text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-5 mb-10"
        >
          <div className="w-16 h-px bg-[#C9A96E]/40" />
          <span className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase font-medium">
            {t.hero.eyebrow}
          </span>
          <div className="w-16 h-px bg-[#C9A96E]/40" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,10vw,8rem)] font-bold text-[#F5F0E8] leading-[0.88] tracking-[-0.02em] mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.hero.line1}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,10vw,8rem)] font-bold italic text-[#C9A96E] leading-[0.88] tracking-[-0.02em] mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.hero.line2}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,10vw,8rem)] font-bold text-[#F5F0E8] leading-[0.88] tracking-[-0.02em] mb-10"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.hero.line3}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-9"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-[#6B5A45] text-xs tracking-[0.22em] uppercase max-w-md mx-auto mb-12 font-light leading-loose"
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#reservation"
            className="px-12 py-4 bg-[#C9A96E] text-[#0A1810] text-[10px] font-bold tracking-[0.35em] uppercase hover:bg-[#D4B47A] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#C9A96E]/25"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#menu"
            className="px-12 py-4 border border-[#3A2E1E] text-[#A08B6E] text-[10px] font-semibold tracking-[0.35em] uppercase hover:border-[#C9A96E]/60 hover:text-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-300"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] tracking-[0.5em] text-[#3A3028] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#C9A96E]/60" />
      </motion.div>
    </section>
  );
}
