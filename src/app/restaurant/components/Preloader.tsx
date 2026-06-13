"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0C0B09] flex flex-col items-center justify-center"
        >
          {/* Decorative ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-48 h-48 border border-[#C9A96E]/10 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-36 h-36 border border-[#C9A96E]/15 rounded-full"
          />

          {/* Logo block */}
          <div className="relative text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-16 h-px bg-[#C9A96E]/40 mx-auto mb-5"
            />

            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[#C9A96E] text-2xl font-bold uppercase block"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Aurum
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#3A3028] text-[8px] tracking-[0.55em] uppercase mt-2 block"
            >
              Fine Dining · Est. 1987
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="w-16 h-px bg-[#C9A96E]/40 mx-auto mt-5"
            />
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-14 w-36 h-px bg-[#1A1612]">
            <motion.div
              className="h-full bg-[#C9A96E]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 text-[7px] tracking-[0.5em] text-[#2A2218] uppercase"
          >
            Paris, France
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
