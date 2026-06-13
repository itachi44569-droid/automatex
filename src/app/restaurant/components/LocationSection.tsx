"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const HOURS = [
  { day: "Monday – Friday", lunch: "12:00 – 14:30", dinner: "19:00 – 22:00" },
  { day: "Saturday", lunch: "Closed", dinner: "19:00 – 22:30" },
  { day: "Sunday", lunch: "Closed", dinner: "19:00 – 21:30" },
];

function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const h = now.getHours() + now.getMinutes() / 60;
  const isWeekday = day >= 1 && day <= 5;
  const isSat = day === 6;
  const lunchOpen = isWeekday && h >= 12 && h < 14.5;
  const dinnerOpen = (isWeekday || isSat || day === 0) && h >= 19 && h < 22.5;
  return lunchOpen || dinnerOpen;
}

export default function LocationSection() {
  const open = isOpenNow();

  return (
    <section id="location" className="border-t border-[#1A1612] py-24 lg:py-36 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908] to-[#0C0B09] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Find Us <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Visit <span className="text-[#C9A96E] italic">Aurum</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Open / Closed badge */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 border text-[9px] tracking-[0.3em] uppercase font-medium ${
                open
                  ? "border-emerald-800/40 text-emerald-400 bg-emerald-900/10"
                  : "border-[#2A2218] text-[#4A3D2E] bg-transparent"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-emerald-400 animate-pulse" : "bg-[#3A3028]"}`} />
                {open ? "Open Now" : "Currently Closed"}
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-2">Address</p>
                <p className="text-[#D4C4A8] text-sm leading-relaxed">
                  12 Rue de la Paix<br />
                  75002 Paris, France
                </p>
                <a
                  href="https://www.openstreetmap.org/?mlat=48.8691&mlon=2.3308&zoom=17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-2">Reservations</p>
                <a href="tel:+33142860000" className="text-[#D4C4A8] text-sm hover:text-[#C9A96E] transition-colors">
                  +33 1 42 86 00 00
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-2">Email</p>
                <a href="mailto:reservations@aurum-paris.com" className="text-[#D4C4A8] text-sm hover:text-[#C9A96E] transition-colors break-all">
                  reservations@aurum-paris.com
                </a>
              </div>
            </div>

            {/* Hours table */}
            <div className="flex gap-4">
              <Clock className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
              <div className="w-full">
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-4">Opening Hours</p>
                <div className="space-y-0 border border-[#1E1812] divide-y divide-[#1A1612]">
                  {/* Column headers */}
                  <div className="grid grid-cols-3 px-4 py-2.5 bg-[#0A0908]">
                    <span className="text-[7px] tracking-[0.3em] uppercase text-[#3A3028]"></span>
                    <span className="text-[7px] tracking-[0.3em] uppercase text-[#3A3028]">Lunch</span>
                    <span className="text-[7px] tracking-[0.3em] uppercase text-[#3A3028]">Dinner</span>
                  </div>
                  {HOURS.map((row) => (
                    <div key={row.day} className="grid grid-cols-3 px-4 py-3 hover:bg-[#0E0C0A] transition-colors">
                      <span className="text-[#5C4E3A] text-[9px]">{row.day}</span>
                      <span className={`text-[9px] ${row.lunch === "Closed" ? "text-[#3A3028]" : "text-[#C4B49C]"}`}>{row.lunch}</span>
                      <span className="text-[#C4B49C] text-[9px]">{row.dinner}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[7px] text-[#2A2218] tracking-[0.2em] mt-3 uppercase">
                  Last orders 30 min before closing · Holiday hours may vary
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden border border-[#1E1812]" style={{ height: 480 }}>
              {/* OpenStreetMap iframe — no API key needed */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3208%2C48.8641%2C2.3408%2C48.8741&layer=mapnik&marker=48.8691%2C2.3308"
                title="Aurum Restaurant Location"
                className="w-full h-full border-0"
                style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) brightness(0.75)" }}
                loading="lazy"
              />
              {/* Dark overlay to match luxury aesthetic */}
              <div className="absolute inset-0 pointer-events-none bg-[#0C0B09]/25" />
              {/* Custom pin label */}
              <div className="absolute bottom-5 left-5 bg-[#0C0B09]/95 border border-[#C9A96E]/30 px-4 py-3 backdrop-blur-sm pointer-events-none">
                <p className="text-[#C9A96E] text-[8px] tracking-[0.4em] uppercase">Aurum Paris</p>
                <p className="text-[#5C4E3A] text-[9px] mt-0.5">12 Rue de la Paix, 75002</p>
              </div>
            </div>

            {/* Transport note */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { icon: "🚇", label: "Métro", detail: "Opéra · Line 3, 7, 8" },
                { icon: "🚌", label: "Bus", detail: "Lines 20, 21, 27, 29" },
                { icon: "🚘", label: "Parking", detail: "Vendôme · 3 min walk" },
              ].map(({ icon, label, detail }) => (
                <div key={label} className="border border-[#1A1612] px-4 py-3 text-center">
                  <div className="text-lg mb-1">{icon}</div>
                  <p className="text-[#C9A96E] text-[7px] tracking-[0.3em] uppercase mb-0.5">{label}</p>
                  <p className="text-[#3A3028] text-[8px]">{detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
