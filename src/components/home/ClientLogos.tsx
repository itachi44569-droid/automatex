"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "TechScale", tagline: "SaaS" },
  { name: "GrowthPath", tagline: "Agency" },
  { name: "DataSync", tagline: "Enterprise" },
  { name: "Nexus Digital", tagline: "E-commerce" },
  { name: "Velocity Commerce", tagline: "Retail" },
  { name: "LuxeGroup", tagline: "Luxury" },
  { name: "FinEdge", tagline: "FinTech" },
  { name: "CloudBase", tagline: "SaaS" },
  { name: "Apex Systems", tagline: "Tech" },
  { name: "FutureFlow", tagline: "Logistics" },
  { name: "BrightCore", tagline: "HealthTech" },
  { name: "Zenith Labs", tagline: "Research" },
];

const doubled = [...clients, ...clients];

export function ClientLogos() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle separator lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background" />

      <div className="relative container mx-auto px-4 mb-8">
        <p className="text-center text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.2em]">
          Trusted by 200+ businesses worldwide
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
        <motion.div
          className="flex gap-6 items-center shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl glass-card border border-border/30 hover:border-border/60 transition-all group shrink-0 cursor-default"
            >
              {/* Color dot */}
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              <span className="text-sm font-bold font-display text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors whitespace-nowrap">
                {client.name}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground/25 group-hover:text-muted-foreground/40 transition-colors border-l border-border/30 pl-3 whitespace-nowrap">
                {client.tagline}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
