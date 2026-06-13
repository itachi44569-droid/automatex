"use client";

import { motion } from "framer-motion";

const steps = [
  { time: "19:00", emoji: "🥂", title: "Arrival & Welcome", desc: "Your table awaits. A Kir Royal is poured as you are shown to your seat. The bread arrives warm." },
  { time: "19:15", emoji: "🍾", title: "Champagne Reception", desc: "Our sommelier presents the evening's wine journey. Tonight: a 2013 Dom Pérignon to open the palate." },
  { time: "19:30", emoji: "✦", title: "Amuse-Bouche", desc: "Three bites from the kitchen — today's arrival from the market. A declaration of intent." },
  { time: "19:50", emoji: "🦞", title: "First Course", desc: "Brittany lobster, cucumber water, yuzu gel. Cold, precise, oceanic." },
  { time: "20:20", emoji: "🥩", title: "Main Course", desc: "Wagyu côte de bœuf, seasonal truffle, potato cloud. The fire behind every other quiet dish." },
  { time: "21:00", emoji: "🧀", title: "Cheese Trolley", desc: "Twelve French cheeses at perfect temperature. Our maître d' will guide you." },
  { time: "21:20", emoji: "🍮", title: "Pre-Dessert & Dessert", desc: "A palate cleanser, then the dessert: Valrhona chocolate, salted caramel, hazelnut praline." },
  { time: "22:00", emoji: "☕", title: "Mignardises & Digestif", desc: "Petits fours by Chef Sophie Blanc. Armagnac, Calvados, or herbal tea to close the evening." },
];

export default function EveningTimelineSection() {
  return (
    <section className="relative py-28 lg:py-40 bg-[#091508] overflow-hidden">

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#C9A96E]/40" /> An Evening at Aurum <span className="w-8 h-px bg-[#C9A96E]/40" />
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Three hours of <span className="text-[#C9A96E] italic">pure presence</span>
          </h2>
          <p className="text-[#5A4A35] text-sm mt-5 max-w-md mx-auto leading-relaxed">
            We believe a great dinner is not a meal — it is an evening. Here is yours.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/20 to-transparent" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.time}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7 }}
                className={`relative flex gap-8 lg:gap-0 pb-12 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Content side */}
                <div className={`lg:w-[calc(50%-40px)] ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"} pl-[100px] lg:pl-0`}>
                  <p className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase mb-2">{step.time}</p>
                  <h3 className="text-[#D4C4A8] font-bold text-base mb-2" style={{ fontFamily: "Georgia, serif" }}>{step.title}</h3>
                  <p className="text-[#5A4A35] text-xs leading-relaxed">{step.desc}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-[80px] lg:left-1/2 lg:-translate-x-1/2 top-1 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-[#C9A96E]/40 bg-[#091508] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#C9A96E]/60" />
                  </div>
                </div>

                {/* Empty side on desktop */}
                <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="#reservation"
            className="inline-block px-12 py-4 bg-[#C9A96E] text-[#091508] text-[10px] font-bold tracking-[0.35em] uppercase hover:bg-[#D4B47A] transition-all duration-300 hover:-translate-y-0.5"
          >
            Reserve Your Evening
          </a>
        </motion.div>
      </div>
    </section>
  );
}
