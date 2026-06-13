"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Laurent Moreau", role: "Executive Chef", since: "1989", img: "1551024601-da923bd3b9a1" },
  { name: "Sophie Blanc", role: "Head Pastry Chef", since: "2004", img: "1414235077428-338989a2e8c0" },
  { name: "Julien Favre", role: "Head Sommelier", since: "2010", img: "1549488297-7d1b7b5f3b3a" },
  { name: "Amélie Rousseau", role: "Sous Chef", since: "2016", img: "1467003909585-2f8a72700288" },
];

export default function ChefSection() {
  return (
    <section className="relative py-28 lg:py-40 bg-[#091508] overflow-hidden">
      {/* Bg texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A96E 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-6 flex items-center gap-4"
        >
          <span className="w-8 h-px bg-[#C9A96E]/40" /> The Artists Behind Aurum
        </motion.p>

        {/* Main chef — two-column */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=85&auto=format&fit=crop"
                alt="Chef Laurent Moreau"
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091508]/80 via-transparent to-transparent" />
              {/* Floating year badge */}
              <div className="absolute bottom-8 left-8 border border-[#C9A96E]/30 px-5 py-3 backdrop-blur-sm bg-[#091508]/60">
                <p className="text-[#C9A96E] text-[8px] tracking-[0.5em] uppercase">Head Chef since</p>
                <p className="text-[#F5F0E8] text-3xl font-bold" style={{ fontFamily: "Georgia, serif" }}>1989</p>
              </div>
            </div>
            {/* Decorative corner lines */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-[#C9A96E]/30" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-[#C9A96E]/30" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-[#F5F0E8] leading-tight mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Laurent
            </h2>
            <h2 className="text-5xl lg:text-6xl font-bold italic text-[#C9A96E] leading-tight mb-8" style={{ fontFamily: "Georgia, serif" }}>
              Moreau
            </h2>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-[#C9A96E]/40 pl-6 mb-8">
              <p className="text-[#D4C4A8] text-lg lg:text-xl leading-relaxed italic" style={{ fontFamily: "Georgia, serif" }}>
                "A plate is not finished when there is nothing left to add — it is finished when there is nothing left to take away."
              </p>
            </blockquote>

            <p className="text-[#7A6A55] text-sm leading-loose tracking-wide mb-6">
              Born in Lyon in 1961, Laurent Moreau trained under Paul Bocuse before charting his own path through Paris. His cuisine refuses categories — it is simply honest, seasonal, and obsessive in its pursuit of flavour. Three Michelin stars since 2006. Still cooking every service.
            </p>
            <p className="text-[#7A6A55] text-sm leading-loose tracking-wide mb-10">
              His philosophy: source from the same 24 producers his father used. Butcher the animals himself on Tuesdays. Change the menu entirely when the first frost arrives.
            </p>

            {/* Signature stats */}
            <div className="grid grid-cols-3 gap-0 border border-[#1A3520]">
              {[["35+", "Years in kitchens"], ["24", "Trusted producers"], ["12", "Dishes on menu"]].map(([n, l]) => (
                <div key={l} className="px-6 py-5 border-r last:border-r-0 border-[#1A3520] text-center">
                  <p className="text-[#C9A96E] text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>{n}</p>
                  <p className="text-[#4A3D2E] text-[10px] tracking-[0.15em] uppercase">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A96E]/20" />
            <p className="text-[#C9A96E] text-[9px] tracking-[0.5em] uppercase">The Brigade</p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A96E]/20" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${member.img}?w=400&q=80&auto=format&fit=crop&crop=faces`}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-[#091508]/30 group-hover:bg-[#091508]/10 transition-all duration-500" />
                </div>
                <p className="text-[#D4C4A8] text-sm font-medium mb-0.5">{member.name}</p>
                <p className="text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase mb-0.5">{member.role}</p>
                <p className="text-[#3A3028] text-[10px]">Since {member.since}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
