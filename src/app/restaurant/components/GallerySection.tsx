"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    label: "Signature Creation",
    sub: "Chef's Tasting Menu",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "The Wine Cellar",
    sub: "4,000+ References",
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "Chef at Work",
    sub: "Laurent Moreau",
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "The Grand Salon",
    sub: "Private Events",
    src: "https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=900&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "Dessert Artistry",
    sub: "Soufflé Grand Marnier",
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "Garden Terrace",
    sub: "Summer Dining",
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=85&auto=format&fit=crop&crop=entropy",
    srcFull: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1800&q=90&auto=format&fit=crop",
  },
  {
    label: "Table Setting",
    sub: "Every Detail Matters",
    src: "https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=600&q=85&auto=format&fit=crop",
    srcFull: "https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=1800&q=90&auto=format&fit=crop",
  },
];

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const photo = photos[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060E08]/97 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 border border-[#223D28] flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/50 transition-all z-10"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E]">
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 lg:left-8 w-12 h-12 border border-[#223D28] flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/50 transition-all z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl max-h-[80vh] w-full mx-20 lg:mx-28 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.srcFull}
          alt={photo.label}
          className="w-full max-h-[72vh] object-contain"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
        />
        {/* Caption */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[#C9A96E] text-[8px] tracking-[0.45em] uppercase">{photo.label}</p>
            <p className="text-[#4A3D2E] text-[10px] mt-1">{photo.sub}</p>
          </div>
          {/* Dot nav */}
          <div className="flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => i < index ? onPrev() : i > index ? onNext() : undefined}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-[#C9A96E] w-5" : "bg-[#223D28] hover:bg-[#4A3D2E]"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 lg:right-8 w-12 h-12 border border-[#223D28] flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/50 transition-all z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function GalleryCard({ photo, delay, index, onOpen }: {
  photo: typeof photos[0]; delay: number; index: number; onOpen: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden group cursor-pointer"
      style={{ minHeight: 180 }}
      onClick={() => onOpen(index)}
    >
      <img
        src={photo.src}
        alt={photo.label}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-[#0A1810]/20 group-hover:bg-[#0A1810]/5 transition-all duration-500" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A1810]/90 via-[#0A1810]/30 to-transparent" />
      <div className="absolute inset-2 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/50 transition-all duration-500 pointer-events-none" />
      <div className="absolute top-3 left-3 w-5 h-px bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute top-3 left-3 w-px h-5 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-3 right-3 w-5 h-px bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-3 right-3 w-px h-5 bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[#C9A96E] text-[8px] tracking-[0.45em] uppercase font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {photo.label}
        </p>
        <p className="text-[#8B7355] text-[7px] tracking-[0.2em] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {photo.sub}
        </p>
      </div>
      {/* Expand hint */}
      <div className="absolute top-4 right-4 w-7 h-7 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1V6" stroke="#C9A96E" strokeWidth="1.2"/></svg>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => i === null ? null : (i - 1 + photos.length) % photos.length), []);
  const next = useCallback(() => setLightbox((i) => i === null ? null : (i + 1) % photos.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, close, prev, next]);

  return (
    <section id="gallery" className="py-24 lg:py-40 px-6 relative bg-[#080E08]">
      {/* Decorative top + bottom gold gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Gallery <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            A Feast for <span className="text-[#C9A96E] italic">the Eyes</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "320px 220px 240px" }}>

          {/* Feature — col 1-2, rows 1-2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
            onClick={() => setLightbox(0)}
          >
            <img src={photos[0].src} alt={photos[0].label}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-[#0A1810]/15 group-hover:bg-[#0A1810]/5 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/80 via-transparent to-transparent" />
            <div className="absolute inset-3 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-[#C9A96E] text-[8px] tracking-[0.5em] uppercase mb-1">{photos[0].label}</p>
              <p className="text-[#F5F0E8] text-xl font-bold opacity-80" style={{ fontFamily: "Georgia, serif" }}>{photos[0].sub}</p>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1V6" stroke="#C9A96E" strokeWidth="1.2"/></svg>
            </div>
          </motion.div>

          {/* Row 1, col 3 */}
          <GalleryCard photo={photos[1]} delay={0.1} index={1} onOpen={setLightbox} />
          {/* Row 1, col 4 */}
          <GalleryCard photo={photos[2]} delay={0.15} index={2} onOpen={setLightbox} />

          {/* Row 2, col 3-4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ gridColumn: "3 / 5", gridRow: "2 / 3" }}
            onClick={() => setLightbox(3)}
          >
            <img src={photos[3].src} alt={photos[3].label}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-[#0A1810]/20 group-hover:bg-[#0A1810]/5 transition-all duration-500" />
            <div className="absolute inset-3 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500 pointer-events-none" />
            <div className="absolute bottom-5 left-6">
              <p className="text-[#C9A96E] text-[8px] tracking-[0.4em] uppercase opacity-80 group-hover:opacity-100">{photos[3].label}</p>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1V6" stroke="#C9A96E" strokeWidth="1.2"/></svg>
            </div>
          </motion.div>

          {/* Row 3 cards */}
          <GalleryCard photo={photos[4]} delay={0.25} index={4} onOpen={setLightbox} />
          <GalleryCard photo={photos[5]} delay={0.3} index={5} onOpen={setLightbox} />
          <GalleryCard photo={photos[6]} delay={0.35} index={6} onOpen={setLightbox} />

          {/* Gold promo card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative bg-[#C9A96E] flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:bg-[#D4B47A] transition-colors duration-300"
          >
            <div className="w-8 h-px bg-[#0A1810]/30 mb-5" />
            <p className="text-[#0A1810] text-[8px] tracking-[0.5em] uppercase font-bold mb-3">Private<br />Dining</p>
            <p className="text-[#0A1810]/60 text-[7px] tracking-[0.3em] uppercase mb-5">Exclusive<br />Events</p>
            <a href="#private-dining" className="text-[7px] tracking-[0.3em] uppercase text-[#0A1810] border border-[#0A1810]/40 px-4 py-2 hover:bg-[#0A1810]/10 transition-all">
              Enquire →
            </a>
            <div className="w-8 h-px bg-[#0A1810]/30 mt-5" />
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox index={lightbox} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  );
}
