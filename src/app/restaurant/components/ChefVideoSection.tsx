"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// Replace YOUTUBE_VIDEO_ID with the client's actual YouTube video ID
const VIDEO_ID = "YOUTUBE_VIDEO_ID";
const THUMBNAIL = `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop`;

export default function ChefVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-0 overflow-hidden bg-[#091508]">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pt-24 pb-14 px-6"
      >
        <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
          <span className="w-10 h-px bg-[#C9A96E]/40" /> The Chef's Story <span className="w-10 h-px bg-[#C9A96E]/40" />
        </p>
        <h2
          className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Three Stars.{" "}
          <span className="text-[#C9A96E] italic">One Vision.</span>
        </h2>
        <p className="text-[#4A3D2E] text-xs leading-loose tracking-[0.1em] max-w-sm mx-auto mt-5">
          Thirty-five years of devotion to a single craft — watch the film.
        </p>
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-6 lg:mx-16 mb-0"
        style={{ aspectRatio: "16/9" }}
      >
        <AnimatePresence>
          {!playing ? (
            <motion.div
              key="thumbnail"
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <img
                src={THUMBNAIL}
                alt="Chef Laurent Moreau — The Film"
                className="w-full h-full object-cover object-center"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0A1810]/55 group-hover:bg-[#0A1810]/40 transition-all duration-500" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-20 h-20 border border-[#C9A96E]/60 flex items-center justify-center group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10 transition-all duration-400"
                >
                  <Play className="w-7 h-7 text-[#C9A96E] fill-[#C9A96E] ml-1" />
                </motion.div>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[#C9A96E] text-[8px] tracking-[0.45em] uppercase">
                  Chef Laurent Moreau · A Portrait
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Chef Laurent Moreau"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom fade */}
      <div className="h-24 bg-gradient-to-b from-[#091508] to-[#0A1810]" />
    </section>
  );
}
