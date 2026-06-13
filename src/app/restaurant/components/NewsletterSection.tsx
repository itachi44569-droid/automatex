"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-[#F5EDD8]">
      {/* Large decorative watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[clamp(5rem,18vw,18rem)] font-bold tracking-[0.5em] text-[#C9A96E]/[0.07] leading-none uppercase" style={{ fontFamily: "Georgia, serif" }}>
          AURUM
        </span>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#C9A96E]/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#C9A96E]/30 pointer-events-none" />

      <div className="relative max-w-xl mx-auto text-center py-28 lg:py-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#8B6914] text-[9px] tracking-[0.6em] uppercase mb-6 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/50" /> The Inner Table <span className="w-10 h-px bg-[#C9A96E]/50" />
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#1A1208] mb-5 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Join Our{" "}
            <span className="text-[#9A6E1A] italic">Private Circle</span>
          </h2>
          <p className="text-[#6B5530] text-xs leading-loose tracking-[0.08em] mb-10">
            Receive invitations to exclusive tasting evenings, new menu previews,
            seasonal recipes from Chef Moreau, and first access to reservations.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#C9A96E]/40 bg-[#C9A96E]/10 py-8 px-10"
              >
                <p className="text-[#8B6914] text-[8px] tracking-[0.5em] uppercase mb-3">Welcome</p>
                <p className="text-[#1A1208] text-sm font-semibold">You've joined the inner table.</p>
                <p className="text-[#6B5530] text-[10px] mt-2 tracking-wide">
                  Expect your first letter from Chef Moreau shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex gap-0 border-2 border-[#C9A96E]/40 focus-within:border-[#C9A96E] transition-colors duration-300 bg-white/40 backdrop-blur-sm"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-[#1A1208] placeholder-[#A08B6E] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C9A96E] text-[#0C0B09] px-8 py-4 text-[9px] font-bold tracking-[0.35em] uppercase hover:bg-[#B8943A] disabled:opacity-60 transition-all duration-300 whitespace-nowrap"
                >
                  {loading ? "…" : "Join"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[8px] tracking-[0.25em] text-[#A08B6E] uppercase mt-5">
            No spam. Unsubscribe at any time. Your details are never shared.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
