"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const cards = [
  {
    amount: "€150",
    title: "The Aperitif",
    desc: "A curated welcome — champagne, canapés, and the first act of the Aurum experience.",
    note: "Perfect for 1–2 guests",
    highlight: false,
  },
  {
    amount: "€350",
    title: "The Tasting",
    desc: "Our signature 7-course tasting menu with sommelier-curated wine pairings for two.",
    note: "Most popular gift",
    highlight: true,
  },
  {
    amount: "€750",
    title: "The Carte Blanche",
    desc: "Full evening for four — Chef's choice menu, prestige wine flight, and a personalised keepsake.",
    note: "The ultimate gift",
    highlight: false,
  },
];

export default function GiftCardsSection() {
  return (
    <section id="gift-cards" className="py-24 lg:py-40 px-6 border-t border-[#1A3520]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Gift Experiences <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Give the Gift of{" "}
            <span className="text-[#C9A96E] italic">Fine Dining</span>
          </h2>
          <p className="text-[#4A3D2E] text-xs leading-loose tracking-[0.1em] max-w-sm mx-auto">
            Our beautifully presented gift cards are available in three experiences.
            Printed on textured cotton paper, delivered by post.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.amount}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative border p-9 flex flex-col transition-all duration-500 group hover:-translate-y-1 ${
                c.highlight
                  ? "border-[#C9A96E]/50 bg-gradient-to-b from-[#C9A96E]/5 to-transparent"
                  : "border-[#1C3020] hover:border-[#C9A96E]/30"
              }`}
            >
              {/* Top gold line for highlighted */}
              {c.highlight && (
                <div className="absolute top-0 left-9 right-9 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />
              )}

              {/* Note badge */}
              <div className="text-[7px] tracking-[0.35em] uppercase text-[#C9A96E] mb-7 flex items-center gap-2">
                <Gift className="w-3 h-3" />
                {c.note}
              </div>

              {/* Amount */}
              <div
                className="text-5xl font-bold text-[#C9A96E] mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {c.amount}
              </div>

              {/* Title */}
              <h3 className="text-[#D4C4A8] text-lg font-semibold mb-4">{c.title}</h3>

              {/* Divider */}
              <div className="w-8 h-px bg-[#C9A96E]/30 mb-5" />

              {/* Description */}
              <p className="text-[#4A3D2E] text-sm leading-7 mb-9 flex-1">{c.desc}</p>

              {/* CTA */}
              <button className={`w-full py-4 text-[9px] font-bold tracking-[0.35em] uppercase transition-all duration-300 ${
                c.highlight
                  ? "bg-[#C9A96E] text-[#0A1810] hover:bg-[#D4B47A]"
                  : "border border-[#223D28] text-[#6B5A45] hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
              }`}>
                Purchase Gift Card
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[8px] tracking-[0.3em] text-[#223D28] uppercase mt-10"
        >
          Valid for 12 months · Non-refundable · Printed &amp; posted within 48 hours · Custom amounts available on request
        </motion.p>
      </div>
    </section>
  );
}
