"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.menu, href: "#menu" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.privateDining, href: "#private-dining" },
    { label: t.nav.giftCards, href: "#gift-cards" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D0A07]/95 backdrop-blur-md border-b border-[#C9A96E]/15 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-b from-[#0C0B09]/70 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col items-start group">
          <span className="text-[#C9A96E] text-xl font-bold tracking-[0.35em] uppercase group-hover:tracking-[0.45em] transition-all duration-500">
            Aurum
          </span>
          <span className="text-[#5C4E3A] text-[8px] tracking-[0.55em] uppercase mt-0.5">
            Fine Dining
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[9px] font-medium tracking-[0.25em] uppercase text-[#8B7355] hover:text-[#C9A96E] transition-colors duration-300 group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-400" />
            </a>
          ))}
        </div>

        {/* Right side: Lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-5">
          {/* EN / FR toggle */}
          <div className="flex items-center border border-[#1E1812]">
            <button
              onClick={() => setLang("en")}
              className={`text-[8px] tracking-[0.3em] uppercase px-3 py-2 transition-all duration-200 ${
                lang === "en"
                  ? "bg-[#C9A96E] text-[#0C0B09] font-bold"
                  : "text-[#4A3D2E] hover:text-[#C9A96E]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`text-[8px] tracking-[0.3em] uppercase px-3 py-2 transition-all duration-200 ${
                lang === "fr"
                  ? "bg-[#C9A96E] text-[#0C0B09] font-bold"
                  : "text-[#4A3D2E] hover:text-[#C9A96E]"
              }`}
            >
              FR
            </button>
          </div>

          {/* Reserve CTA */}
          <a
            href="#reservation"
            className="text-[9px] font-bold tracking-[0.35em] uppercase border border-[#C9A96E] text-[#C9A96E] px-7 py-3 hover:bg-[#C9A96E] hover:text-[#0C0B09] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/20"
          >
            {t.nav.reserve}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#C9A96E] hover:text-[#D4B47A] transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0C0B09]/98 border-t border-[#1E1812] overflow-hidden"
          >
            <div className="px-8 py-10 flex flex-col gap-7">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] tracking-[0.35em] uppercase text-[#8B7355] hover:text-[#C9A96E] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              {/* Mobile lang toggle */}
              <div className="flex gap-3 mt-2">
                {(["en", "fr"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[8px] tracking-[0.3em] uppercase border px-4 py-2 transition-all ${
                      lang === l
                        ? "border-[#C9A96E] bg-[#C9A96E] text-[#0C0B09] font-bold"
                        : "border-[#2A2218] text-[#4A3D2E]"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <a
                href="#reservation"
                onClick={() => setMobileOpen(false)}
                className="mt-1 text-[10px] tracking-[0.35em] uppercase border border-[#C9A96E] text-[#C9A96E] px-6 py-3.5 text-center hover:bg-[#C9A96E] hover:text-[#0C0B09] transition-all"
              >
                {t.nav.reserve}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
