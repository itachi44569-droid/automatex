"use client";

import { CalendarDays, Globe, MessageSquare, Camera } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Community", "Webinars", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  },
];

const socials = [
  { icon: Globe, label: "X / Twitter" },
  { icon: MessageSquare, label: "LinkedIn" },
  { icon: Camera, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800/60 pt-16 pb-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/20">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">Schedulr</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              The booking platform built for businesses that care about client experience.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2025 Schedulr, Inc. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Made with ♥ for small businesses everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
