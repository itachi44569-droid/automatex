"use client";

import { motion } from "framer-motion";
import { Sun, Moon, CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  dark: boolean;
  setDark: (v: boolean) => void;
}

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar({ dark, setDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/40 rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/30">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">Schedulr</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#"
              className="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-2"
            >
              Sign in
            </a>
            <a
              href="#"
              className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-500 text-white px-4 py-2 rounded-xl shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get started free
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-gray-200/60 dark:border-gray-700/40 rounded-2xl px-4 py-4 shadow-xl shadow-black/10 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
