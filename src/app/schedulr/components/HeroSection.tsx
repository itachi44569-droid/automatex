"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Zap } from "lucide-react";

function BookingMockup() {
  const slots = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];
  const days = [
    { d: "Mon", n: 10 },
    { d: "Tue", n: 11 },
    { d: "Wed", n: 12, active: true },
    { d: "Thu", n: 13 },
    { d: "Fri", n: 14 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-2xl shadow-violet-500/10 border border-gray-100 dark:border-gray-800 overflow-hidden w-full max-w-[420px]">
      {/* Browser chrome */}
      <div className="bg-gray-50 dark:bg-gray-800/80 px-4 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-[11px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            schedulr.app/book/bloom-studio
          </div>
        </div>
      </div>

      {/* Booking UI */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Book a session</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Select a date &amp; time</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-white text-[10px] font-bold">BS</span>
          </div>
        </div>

        {/* Day picker */}
        <div className="grid grid-cols-5 gap-1.5 mb-5">
          {days.map((day) => (
            <div
              key={day.d}
              className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-2xl cursor-pointer transition-all ${
                day.active
                  ? "bg-gradient-to-b from-violet-600 to-pink-500 shadow-lg shadow-violet-500/30"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span className={`text-[10px] font-medium ${day.active ? "text-violet-200" : "text-gray-400"}`}>{day.d}</span>
              <span className={`text-sm font-bold ${day.active ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>{day.n}</span>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="space-y-2">
          {slots.map((slot, i) => (
            <div
              key={slot}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                i === 1
                  ? "border-violet-300 dark:border-violet-500/60 bg-violet-50 dark:bg-violet-900/20"
                  : "border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600"
              }`}
            >
              <span className={`text-sm font-medium ${i === 1 ? "text-violet-700 dark:text-violet-300" : "text-gray-700 dark:text-gray-300"}`}>
                {slot}
              </span>
              {i === 1 ? (
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/50 px-2 py-0.5 rounded-full">
                  Selected
                </span>
              ) : (
                <span className="text-[11px] text-gray-400">45 min</span>
              )}
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-semibold py-3 rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all">
          Confirm booking →
        </button>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Gradient mesh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] bg-violet-300/25 dark:bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-16 -left-16 w-[500px] h-[500px] bg-orange-200/25 dark:bg-orange-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700/50 text-violet-700 dark:text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-7">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Now with AI-powered scheduling
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.04] mb-6 text-gray-900 dark:text-white"
          >
            The booking
            <br />
            experience{" "}
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              your clients
            </span>
            <br />
            will love.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
          >
            Schedulr helps small businesses manage appointments effortlessly — from booking to automated reminders, all in one beautiful place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all text-base"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold px-7 py-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-base shadow-sm"
            >
              See it in action
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {[
                { l: "A", c: "bg-violet-500" },
                { l: "B", c: "bg-pink-500" },
                { l: "C", c: "bg-orange-400" },
                { l: "D", c: "bg-teal-500" },
              ].map((a) => (
                <div
                  key={a.l}
                  className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#07070C] ${a.c} flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {a.l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Loved by 2,000+ businesses</p>
            </div>
          </motion.div>
        </div>

        {/* Right: floating product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex justify-center"
        >
          {/* Soft glow behind mockup */}
          <div className="absolute inset-8 bg-gradient-to-br from-violet-400/20 to-pink-400/20 blur-3xl rounded-3xl" />

          {/* Floating + tilted mockup */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "perspective(1200px) rotateY(-6deg) rotateX(3deg)" }}
            className="relative"
          >
            <BookingMockup />
          </motion.div>

          {/* Floating badge: confirmed booking */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -left-10 top-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-base">
              ✅
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">Booking confirmed!</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Sarah J. — Tomorrow 10:30 AM</p>
            </div>
          </motion.div>

          {/* Floating badge: stat */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute -right-8 bottom-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-gray-700 px-5 py-4"
          >
            <p className="text-[10px] text-gray-400 mb-1 font-medium">This month</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white leading-none">147</p>
            <p className="text-[11px] text-emerald-500 font-semibold mt-1">↑ 23% bookings</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
