"use client";

import { motion } from "framer-motion";
import { Bell, Calendar, Users, Palette, BarChart3, Link2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI analyzes your availability and client preferences to surface perfect meeting times — zero back-and-forth.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "hover:border-violet-200 dark:hover:border-violet-700/50",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Beautiful SMS and email reminders that reduce no-shows by up to 80%. Set once, runs forever.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "hover:border-pink-200 dark:hover:border-pink-700/50",
    glow: "group-hover:shadow-pink-500/10",
  },
  {
    icon: Link2,
    title: "Calendar Sync",
    description: "Two-way sync with Google, Apple, and Outlook calendars. Your schedule is always accurate, everywhere.",
    gradient: "from-orange-400 to-amber-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "hover:border-orange-200 dark:hover:border-orange-700/50",
    glow: "group-hover:shadow-orange-500/10",
  },
  {
    icon: Palette,
    title: "Custom Booking Pages",
    description: "Beautiful branded booking pages in minutes. Your logo, colors, domain — no developer needed.",
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "hover:border-teal-200 dark:hover:border-teal-700/50",
    glow: "group-hover:shadow-teal-500/10",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage multiple staff from one dashboard. Assign bookings, set individual schedules, track performance.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "hover:border-blue-200 dark:hover:border-blue-700/50",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Revenue trends, peak hours, client retention — all in one clear view. Know your business better.",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "hover:border-emerald-200 dark:hover:border-emerald-700/50",
    glow: "group-hover:shadow-emerald-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-violet-100/60 dark:bg-violet-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-[0.22em] mb-4">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Everything you need to run
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              your bookings beautifully
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From solo practitioners to growing teams — Schedulr gives you every tool to make scheduling feel effortless.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${f.border} rounded-3xl p-7 hover:-translate-y-1.5 hover:shadow-2xl ${f.glow} transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5.5 h-5.5 text-white w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2.5">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
