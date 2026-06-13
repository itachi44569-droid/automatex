"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, ShieldCheck, Clock } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "No credit card required" },
  { icon: Clock, text: "Setup in under 5 minutes" },
  { icon: CalendarDays, text: "Cancel anytime" },
];

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] overflow-hidden"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400" />

          {/* Soft light blobs */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 20% 50%, white, transparent 55%), radial-gradient(ellipse at 80% 20%, white, transparent 50%)",
            }}
          />

          {/* Animated floating rings */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full"
          />

          <div className="relative px-8 py-20 sm:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium px-5 py-2 rounded-full mb-7">
              <CalendarDays className="w-4 h-4" />
              Start booking in under 5 minutes
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.07] mb-5 max-w-2xl mx-auto">
              Your clients deserve a better booking experience.
            </h2>

            {/* Body */}
            <p className="text-white/75 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Join 2,000+ businesses already using Schedulr to save time, reduce no-shows, and grow their revenue — effortlessly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all hover:shadow-2xl hover:-translate-y-0.5 text-base shadow-xl shadow-black/20"
              >
                Start for free — no card needed
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/25 font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-base"
              >
                Book a demo
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
                    <Icon className="w-4 h-4 text-white/90" />
                    {b.text}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
