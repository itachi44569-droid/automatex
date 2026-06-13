"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "Starters" as const,
    label: "Starters",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=85&auto=format&fit=crop",
    caption: "Amuse-bouche & First Courses",
  },
  {
    id: "Mains" as const,
    label: "Mains",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop&crop=center",
    caption: "Main Courses & Plats du Jour",
  },
  {
    id: "Desserts" as const,
    label: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=85&auto=format&fit=crop",
    caption: "Sweet Finales & Fromage",
  },
  {
    id: "Wine & Drinks" as const,
    label: "Wine & Drinks",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=85&auto=format&fit=crop",
    caption: "Cellar Selections & Cocktails",
  },
] as const;

type Category = (typeof categories)[number]["id"];

const menuItems: Record<
  Category,
  { name: string; desc: string; price: string; tags: string[] }[]
> = {
  Starters: [
    { name: "Foie Gras Parfait", desc: "Sauternes gelée, brioche toast, fig compote, micro herbs", price: "€32", tags: ["Chef's Pick"] },
    { name: "Oysters en Gelée", desc: "Champagne foam, Osetra caviar, lemon verbena, sea salt", price: "€45", tags: ["Seasonal"] },
    { name: "Truffle Velouté", desc: "Black winter truffle, Comté foam, truffle oil, chervil", price: "€28", tags: ["Vegetarian"] },
    { name: "Tartare de Boeuf", desc: "Wagyu beef, smoked egg yolk, capers, sourdough crisp", price: "€38", tags: [] },
    { name: "Langoustine Ravioli", desc: "Scottish langoustines, bisque beurre blanc, tarragon oil", price: "€42", tags: ["Chef's Pick"] },
    { name: "Burrata Royale", desc: "Aged balsamic, heritage tomatoes, basil oil, Maldon sea salt", price: "€24", tags: ["Vegetarian", "GF"] },
  ],
  Mains: [
    { name: "Filet de Boeuf Rossini", desc: "Wagyu tenderloin, foie gras, Périgueux sauce, seasonal vegetables", price: "€85", tags: ["Chef's Pick"] },
    { name: "Sole Meunière", desc: "Dover sole, brown butter, capers, preserved lemon, samphire", price: "€72", tags: ["GF"] },
    { name: "Rack of Lamb", desc: "Herb crust, rosemary jus, ratatouille, potato gratin dauphinois", price: "€68", tags: ["GF"] },
    { name: "Homard Bleu", desc: "Blue lobster, bisque coral butter, potato mousse, chervil oil", price: "€95", tags: ["Seasonal"] },
    { name: "Risotto aux Truffes", desc: "Carnaroli rice, black truffle, 24-month Parmesan, chive", price: "€58", tags: ["Vegetarian"] },
    { name: "Pigeon Rôti", desc: "French squab, cherry jus, celeriac purée, watercress", price: "€74", tags: [] },
  ],
  Desserts: [
    { name: "Soufflé Grand Marnier", desc: "Classic orange soufflé, crème anglaise, candied orange zest", price: "€22", tags: ["Chef's Pick"] },
    { name: "Tarte Tatin", desc: "Caramelized apple, puff pastry, Calvados crème fraîche", price: "€18", tags: [] },
    { name: "Crème Brûlée", desc: "Madagascar vanilla, caramelized sugar, seasonal berries", price: "€16", tags: ["GF"] },
    { name: "Chocolate Fondant", desc: "Valrhona 72%, liquid caramel heart, Tahitian vanilla ice cream", price: "€20", tags: ["GF"] },
    { name: "Île Flottante", desc: "Poached meringue, crème anglaise, praline, spun caramel", price: "€17", tags: ["Vegetarian"] },
    { name: "Fromage Affiné", desc: "Selection of 5 aged French cheeses, walnut bread, quince jelly", price: "€28", tags: ["GF"] },
  ],
  "Wine & Drinks": [
    { name: "Château Pétrus 2015", desc: "Pomerol AOC, Merlot dominant, full-bodied, exceptional vintage", price: "€850", tags: ["Red"] },
    { name: "Krug Grande Cuvée", desc: "Multi-vintage Champagne, brioche, toasted almond, ginger notes", price: "€280", tags: ["Sparkling"] },
    { name: "Montrachet 2019", desc: "Burgundy Chardonnay, rich, mineral, extraordinary depth", price: "€420", tags: ["White"] },
    { name: "Sommelier's Pairing", desc: "4-course wine journey curated by our head sommelier", price: "€185", tags: ["Chef's Pick"] },
    { name: "Non-Alcoholic Journey", desc: "5 bespoke pairings: kombucha, botanicals, pressed juices", price: "€65", tags: ["NA"] },
    { name: "Digestif Selection", desc: "Armagnac, Calvados, or aged Cognac — served tableside", price: "€28", tags: [] },
  ],
};

const tagColors: Record<string, string> = {
  "Chef's Pick": "text-[#C9A96E] border-[#C9A96E]/50",
  Seasonal: "text-[#7BAAA0] border-[#7BAAA0]/50",
  Vegetarian: "text-[#8BAA7B] border-[#8BAA7B]/50",
  GF: "text-[#A0A07B] border-[#A0A07B]/50",
  Red: "text-[#AA7B7B] border-[#AA7B7B]/50",
  White: "text-[#C9C9A0] border-[#C9C9A0]/50",
  Sparkling: "text-[#C9C0A0] border-[#C9C0A0]/50",
  NA: "text-[#7BAAA0] border-[#7BAAA0]/50",
};

export default function MenuSection() {
  const [active, setActive] = useState<Category>("Starters");
  const activeCat = categories.find((c) => c.id === active)!;
  const items = menuItems[active];

  return (
    <section id="menu" className="border-t border-[#1A1612]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-20 px-6"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Our Menu <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A Symphony of{" "}
            <span className="text-[#C9A96E] italic">Flavours</span>
          </h2>
        </motion.div>

        {/* Split layout: left image panel + right menu */}
        <div className="grid lg:grid-cols-[420px_1fr]">
          {/* LEFT — Sticky food photo */}
          <div className="hidden lg:block relative" style={{ minHeight: 600 }}>
            <div className="sticky top-0 h-screen overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeCat.image}
                    alt={activeCat.label}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0908]/60" />
                  <div className="absolute inset-0 bg-[#0C0B09]/35" />
                  {/* Caption */}
                  <div className="absolute bottom-10 left-8">
                    <p className="text-[#C9A96E] text-[8px] tracking-[0.5em] uppercase mb-1">{activeCat.label}</p>
                    <p className="text-[#D4C4A8]/60 text-xs italic">{activeCat.caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — Tabs + menu list */}
          <div className="bg-[#0A0908] px-6 lg:px-12 pb-20">
            {/* Category tabs */}
            <div className="flex gap-0 border-b border-[#1A1612] mb-0 sticky top-0 bg-[#0A0908] z-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex-1 py-5 text-[8px] tracking-[0.28em] uppercase font-semibold transition-all duration-300 relative ${
                    active === cat.id
                      ? "text-[#C9A96E]"
                      : "text-[#3A3028] hover:text-[#6B5A45]"
                  }`}
                >
                  {cat.label}
                  {active === cat.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile category image */}
            <div className="lg:hidden relative overflow-hidden mb-8" style={{ height: 220 }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={activeCat.image}
                  alt={activeCat.label}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center absolute inset-0"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[#0C0B09]/50" />
            </div>

            {/* Dishes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="divide-y divide-[#141210]"
              >
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group py-7 flex items-start gap-5 hover:bg-[#0E0C0A] -mx-6 lg:-mx-12 px-6 lg:px-12 transition-all duration-300 cursor-default"
                  >
                    {/* Index number */}
                    <span className="text-[#2A2218] text-[10px] mt-1 w-5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-[#D4C4A8] font-semibold text-base leading-snug group-hover:text-[#F5F0E8] transition-colors duration-300 mb-1"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-[#3A3028] text-xs leading-relaxed group-hover:text-[#5C4E3A] transition-colors duration-300 mb-3">
                            {item.desc}
                          </p>
                          {item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-[7px] tracking-[0.25em] uppercase border px-2 py-0.5 ${tagColors[tag] ?? "text-[#4A3D2E] border-[#2A2218]"}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-[#C9A96E] font-bold text-sm shrink-0 mt-0.5">{item.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Full menu CTA */}
            <div className="mt-10 pt-8 border-t border-[#141210]">
              <a
                href="#"
                className="inline-block text-[9px] tracking-[0.4em] uppercase text-[#C9A96E] border border-[#C9A96E]/35 px-12 py-4 hover:bg-[#C9A96E]/5 hover:border-[#C9A96E]/70 transition-all duration-400"
              >
                Download Full Menu (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
