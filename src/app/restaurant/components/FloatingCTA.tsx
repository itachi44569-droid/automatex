"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#reservation"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-8 z-[9990] bg-[#C9A96E] text-[#0A1810] px-7 py-3.5 text-[9px] font-bold tracking-[0.35em] uppercase shadow-2xl shadow-[#C9A96E]/20 hover:bg-[#D4B47A] hover:-translate-y-0.5 transition-all duration-300 cursor-none"
        >
          Reserve a Table
        </motion.a>
      )}
    </AnimatePresence>
  );
}
