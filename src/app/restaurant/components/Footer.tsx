"use client";

import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = ["About", "Menu", "Gallery", "Reservations", "Gift Cards", "Private Dining", "Press"];
const legalLinks = ["Privacy Policy", "Terms & Conditions", "Accessibility"];

const hours = [
  { day: "Mon – Tue", time: "Closed" },
  { day: "Wed – Fri", time: "12:00–14:30 · 19:00–22:30" },
  { day: "Saturday", time: "19:00–23:00" },
  { day: "Sunday", time: "12:00–15:00" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#1A3520] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="text-[#C9A96E] text-xl font-bold tracking-[0.35em] uppercase block">Aurum</span>
              <span className="text-[#3A3028] text-[8px] tracking-[0.55em] uppercase mt-1 block">Fine Dining · Est. 1987</span>
            </div>
            <p className="text-[#3A3028] text-xs leading-relaxed mb-6">
              Three Michelin stars.
              <br />
              One unforgettable experience.
            </p>
            <div className="w-8 h-px bg-[#C9A96E]/40" />
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7 font-bold">Visit Us</h4>
            <div className="space-y-5">
              <div className="flex gap-3 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96E]/50 shrink-0 mt-0.5" />
                <span className="text-[#3A3028] leading-relaxed">
                  14 Rue de Rivoli
                  <br />
                  Paris, France 75001
                </span>
              </div>
              <div className="flex gap-3 text-xs">
                <Phone className="w-3.5 h-3.5 text-[#C9A96E]/50 shrink-0 mt-0.5" />
                <span className="text-[#3A3028]">+33 1 42 86 XX XX</span>
              </div>
              <div className="flex gap-3 text-xs">
                <Mail className="w-3.5 h-3.5 text-[#C9A96E]/50 shrink-0 mt-0.5" />
                <span className="text-[#3A3028]">reservations@aurum.fr</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7 font-bold">Opening Hours</h4>
            <div className="space-y-3.5">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between gap-4 text-xs">
                  <span className="text-[#4A3D2E]">{day}</span>
                  <span className="text-[#3A3028] text-right">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7 font-bold">Navigation</h4>
            <ul className="space-y-3.5">
              {navLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-[#3A3028] hover:text-[#C9A96E] transition-colors duration-300 tracking-[0.08em]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with logo */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 h-px bg-[#1A3520]" />
          <span className="text-[#223D28] text-xs tracking-[0.5em] uppercase">Aurum</span>
          <div className="flex-1 h-px bg-[#1A3520]" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[9px] text-[#223D28] tracking-[0.2em]">
            © 2025 Aurum Fine Dining, Paris. All rights reserved.
          </p>
          <div className="flex gap-8">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="text-[9px] text-[#223D28] hover:text-[#C9A96E] transition-colors tracking-[0.15em]">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
