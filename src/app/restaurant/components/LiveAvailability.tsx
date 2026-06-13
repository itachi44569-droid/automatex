"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simulate tables decreasing over the evening
function getTables() {
  const now = new Date();
  const hour = now.getHours();
  // More urgency between 17:00 and 22:00
  if (hour < 11 || hour > 22) return 0; // closed
  if (hour < 17) return 8;
  if (hour < 18) return 6;
  if (hour < 19) return 4;
  if (hour < 20) return 2;
  return 1;
}

export default function LiveAvailability() {
  const [tables, setTables] = useState(5);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTables(getTables() || 5); // default 5 for demo
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Slowly tick down one table every 8 minutes for urgency
    const tick = setInterval(() => {
      setTables((t) => Math.max(1, t - 1));
    }, 480000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(tick);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed top-24 right-6 z-[9985] border border-[#2A2218] bg-[#0A1810]/95 backdrop-blur-md px-5 py-4 flex items-center gap-3 shadow-2xl"
        >
          {/* Pulsing dot */}
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A96E]" />
          </div>
          <div>
            <p className="text-[#D4C4A8] text-[11px] font-semibold leading-tight">
              {tables === 1 ? "Last table" : `${tables} tables`} tonight
            </p>
            <p className="text-[#3A3028] text-[8px] tracking-[0.2em] uppercase mt-0.5">
              {tables <= 2 ? "Booking fast" : "Available now"}
            </p>
          </div>
          <a
            href="#reservation"
            className="text-[7px] tracking-[0.25em] uppercase text-[#C9A96E] border border-[#C9A96E]/40 px-3 py-1.5 hover:bg-[#C9A96E]/10 transition-all duration-200 whitespace-nowrap"
          >
            Reserve →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
