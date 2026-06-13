"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Target: Autumn menu reveal
const TARGET = new Date("2026-09-22T19:00:00");

function pad(n: number) { return String(n).padStart(2, "0"); }

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-[clamp(3rem,8vw,6rem)] font-bold text-[#C9A96E] leading-none tabular-nums"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {value}
        </motion.div>
      </div>
      <div className="w-full h-px bg-[#C9A96E]/20 my-3" />
      <span className="text-[7px] tracking-[0.5em] uppercase text-[#3A3028]">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-24 lg:py-40 px-6 overflow-hidden border-t border-[#1A3520]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=50&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center opacity-10"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-[#091508]/90" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Coming Soon <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#F5F0E8] mb-4 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The Autumn Collection
          </h2>
          <p className="text-[#4A3D2E] text-xs tracking-[0.2em] mb-16">
            Chef Moreau's new tasting menu unveils 22 September 2026 · Paris
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-6 md:gap-14 max-w-2xl mx-auto mb-14">
            <Digit value={pad(time.days)} label="Days" />
            <Digit value={pad(time.hours)} label="Hours" />
            <Digit value={pad(time.mins)} label="Minutes" />
            <Digit value={pad(time.secs)} label="Seconds" />
          </div>

          {/* Separators */}
          <div className="flex justify-between max-w-2xl mx-auto -mt-28 mb-20 pointer-events-none px-20 md:px-32">
            {[0, 1, 2].map((i) => (
              <span key={i} className="text-[#C9A96E]/30 text-4xl font-thin self-start mt-4">·</span>
            ))}
          </div>

          <a
            href="#"
            className="inline-block text-[9px] tracking-[0.45em] uppercase border border-[#C9A96E]/40 text-[#C9A96E] px-12 py-4 hover:bg-[#C9A96E]/8 hover:border-[#C9A96E]/80 transition-all duration-400"
          >
            Join the Priority List
          </a>
        </motion.div>
      </div>
    </section>
  );
}
