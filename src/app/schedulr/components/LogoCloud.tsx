"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Bloom Studio", emoji: "🌸" },
  { name: "Oakwood Clinic", emoji: "🏥" },
  { name: "Saffron Spa", emoji: "✨" },
  { name: "Mesa Legal", emoji: "⚖️" },
  { name: "Forge Fitness", emoji: "💪" },
  { name: "Harbor Media", emoji: "📸" },
  { name: "Crest Dental", emoji: "🦷" },
  { name: "Nova Coaching", emoji: "🚀" },
];

export default function LogoCloud() {
  return (
    <section className="py-14 border-y border-gray-100 dark:border-gray-800/60 bg-white/50 dark:bg-gray-900/20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-[0.25em] mb-10"
        >
          Trusted by 2,000+ businesses worldwide
        </motion.p>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
          {companies.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2.5 opacity-40 hover:opacity-70 transition-opacity cursor-default group"
            >
              <span className="text-lg grayscale">{c.emoji}</span>
              <span className="font-bold text-sm tracking-tight text-gray-700 dark:text-gray-300">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
