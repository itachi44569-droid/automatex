"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Place your royalty-free jazz file at /public/audio/ambient.mp3
    // Free options: freemusicarchive.org, bensound.com (with attribution)
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => {
      // File not found — still show the button, just disabled gracefully
      setReady(false);
    });
    audioRef.current = audio;

    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      audio.pause();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={toggle}
          title={playing ? "Pause ambient music" : "Play ambient jazz"}
          className="fixed bottom-8 left-8 z-[9990] w-11 h-11 border border-[#223D28] bg-[#0A1810]/90 backdrop-blur-sm flex items-center justify-center hover:border-[#C9A96E]/50 transition-all duration-300 group cursor-none"
        >
          {playing ? (
            /* Pause bars */
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
              <rect x="1" y="0.5" width="3.5" height="12" rx="0.5" fill="#C9A96E" />
              <rect x="6.5" y="0.5" width="3.5" height="12" rx="0.5" fill="#C9A96E" />
            </svg>
          ) : (
            /* Music note */
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
              <path d="M5 11V2.5L12 1V9.5" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="3" cy="11" r="2.2" fill="#C9A96E" />
              <circle cx="10" cy="9.5" r="2.2" fill="#C9A96E" />
            </svg>
          )}

          {/* Tooltip */}
          <span className="absolute left-14 whitespace-nowrap text-[8px] tracking-[0.25em] uppercase text-[#C9A96E] bg-[#0A1810] border border-[#223D28] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {playing ? "Pause music" : "Play jazz"}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
