"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Course = { id: string; name: string; desc: string; price: number; wine?: string };

const STARTERS: Course[] = [
  { id: "s1", name: "Sevruga Caviar", desc: "Blini, crème fraîche, chive oil", price: 58, wine: "Blanc de Blancs Champagne" },
  { id: "s2", name: "Langoustine Tartare", desc: "Shiso, cucumber water, dill snow", price: 48, wine: "Chablis Premier Cru" },
  { id: "s3", name: "Duck Foie Gras", desc: "Brioche toast, Sauternes gelée, hazelnuts", price: 52, wine: "Sauternes 2019" },
];

const MAINS: Course[] = [
  { id: "m1", name: "Wagyu Tenderloin A5", desc: "Black truffle, pomme purée, red wine jus", price: 145, wine: "Château Pétrus 2018" },
  { id: "m2", name: "Turbot en Croûte", desc: "Champagne beurre blanc, sea herbs, caviar", price: 128, wine: "Meursault Perrières" },
  { id: "m3", name: "Pigeon Royale", desc: "Cèpe mushroom, cacao essence, pearl onion", price: 118, wine: "Gevrey-Chambertin 2017" },
];

const DESSERTS: Course[] = [
  { id: "d1", name: "Valrhona Soufflé", desc: "Tahitian vanilla ice cream, salted caramel", price: 38, wine: "Banyuls Grand Cru" },
  { id: "d2", name: "Tarte aux Framboises", desc: "Rose-lychee cream, verbena sorbet", price: 32, wine: "Moscato d'Asti" },
  { id: "d3", name: "Fromages Affinés", desc: "Selection of 5 artisanal cheeses, honey, walnuts", price: 42, wine: "Sauternes or Port" },
];

const BASE_PRICE = 45; // Amuse-bouche + mignardises
const IMG = {
  starters: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80&auto=format&fit=crop",
  mains: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
  desserts: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop",
};

function CourseColumn({
  title, courses, selected, onSelect, img,
}: {
  title: string; courses: Course[]; selected: string; onSelect: (id: string) => void; img: string;
}) {
  return (
    <div>
      <div className="relative h-44 overflow-hidden mb-6">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-60"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-[#0C0B09]/50 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#C9A96E]/70 mb-1">Course</p>
          <h3 className="text-xl font-bold text-[#F5F0E8]" style={{ fontFamily: "Georgia, serif" }}>{title}</h3>
        </div>
      </div>

      <div className="space-y-3">
        {courses.map((c) => {
          const isSelected = selected === c.id;
          return (
            <motion.button
              key={c.id}
              onClick={() => onSelect(selected === c.id ? "" : c.id)}
              whileHover={{ x: 2 }}
              className={`w-full text-left px-5 py-4 border transition-all duration-300 relative group ${
                isSelected
                  ? "border-[#C9A96E] bg-[#C9A96E]/8"
                  : "border-[#1E1812] bg-transparent hover:border-[#C9A96E]/30"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId={`sel-${title}`}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A96E]"
                />
              )}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className={`text-sm font-semibold leading-tight mb-1 ${isSelected ? "text-[#D4B47A]" : "text-[#C4B49C]"}`} style={{ fontFamily: "Georgia, serif" }}>
                    {c.name}
                  </p>
                  <p className="text-[#3A3028] text-[10px] leading-relaxed">{c.desc}</p>
                </div>
                <span className={`text-xs shrink-0 mt-0.5 ${isSelected ? "text-[#C9A96E]" : "text-[#4A3D2E]"}`}>+€{c.price}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function TastingMenuSection() {
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");

  const selectedStarter = STARTERS.find((c) => c.id === starter);
  const selectedMain = MAINS.find((c) => c.id === main);
  const selectedDessert = DESSERTS.find((c) => c.id === dessert);

  const total = BASE_PRICE
    + (selectedStarter?.price ?? 0)
    + (selectedMain?.price ?? 0)
    + (selectedDessert?.price ?? 0);

  const progress = [!!starter, !!main, !!dessert].filter(Boolean).length;

  // Wine pairing — prioritise main, then starter
  const suggestedWine = selectedMain?.wine ?? selectedStarter?.wine ?? "Sommelier's Selection";

  const isComplete = progress === 3;

  return (
    <section id="tasting-menu" className="relative py-24 lg:py-44 px-6 border-t border-[#1A1612] overflow-hidden">

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Compose Your Evening <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#F5F0E8] mb-5 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Build Your <span className="text-[#C9A96E] italic">Tasting</span> Menu
          </h2>
          <p className="text-[#4A3D2E] text-xs tracking-[0.1em] max-w-md mx-auto leading-loose">
            Select one dish per course. Your private menu card is composed in real time.
            All menus include amuse-bouche and mignardises.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-14">
          {["Starter", "Main", "Dessert"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[8px] font-bold transition-all duration-500 ${
                (i === 0 ? !!starter : i === 1 ? !!main : !!dessert)
                  ? "border-[#C9A96E] bg-[#C9A96E] text-[#0C0B09]"
                  : "border-[#2A2218] text-[#3A3028]"
              }`}>
                {(i === 0 ? !!starter : i === 1 ? !!main : !!dessert) ? "✓" : i + 1}
              </div>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#4A3D2E]">{label}</span>
              {i < 2 && <span className="w-8 h-px bg-[#2A2218]" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr_1fr_320px] gap-8 xl:gap-12">
          {/* Course columns */}
          <CourseColumn title="Starters" courses={STARTERS} selected={starter} onSelect={setStarter} img={IMG.starters} />
          <CourseColumn title="Mains" courses={MAINS} selected={main} onSelect={setMain} img={IMG.mains} />
          <CourseColumn title="Desserts" courses={DESSERTS} selected={dessert} onSelect={setDessert} img={IMG.desserts} />

          {/* Menu card preview */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="border border-[#1E1812] p-7 bg-[#0A0908] relative overflow-hidden">
              {/* Decorative corner lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C9A96E]/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C9A96E]/30" />

              <p className="text-[8px] tracking-[0.5em] uppercase text-[#C9A96E]/50 mb-1">Your Menu</p>
              <h4 className="text-lg font-bold text-[#F5F0E8] mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Aurum Tasting
              </h4>

              {/* Always-present items */}
              <div className="space-y-2.5 mb-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#4A3D2E] text-[10px] italic">Amuse-bouche</span>
                  <span className="text-[#3A3028] text-[9px]">incl.</span>
                </div>

                {/* Starters slot */}
                <AnimatePresence mode="wait">
                  {selectedStarter ? (
                    <motion.div
                      key={selectedStarter.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex justify-between items-baseline"
                    >
                      <span className="text-[#C4B49C] text-[11px]">{selectedStarter.name}</span>
                      <span className="text-[#C9A96E] text-[9px]">€{selectedStarter.price}</span>
                    </motion.div>
                  ) : (
                    <motion.div key="empty-s" className="flex justify-between items-baseline opacity-30">
                      <span className="text-[#3A3028] text-[10px] italic">— Select a starter</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mains slot */}
                <AnimatePresence mode="wait">
                  {selectedMain ? (
                    <motion.div
                      key={selectedMain.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex justify-between items-baseline"
                    >
                      <span className="text-[#C4B49C] text-[11px]">{selectedMain.name}</span>
                      <span className="text-[#C9A96E] text-[9px]">€{selectedMain.price}</span>
                    </motion.div>
                  ) : (
                    <motion.div key="empty-m" className="flex justify-between items-baseline opacity-30">
                      <span className="text-[#3A3028] text-[10px] italic">— Select a main</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desserts slot */}
                <AnimatePresence mode="wait">
                  {selectedDessert ? (
                    <motion.div
                      key={selectedDessert.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex justify-between items-baseline"
                    >
                      <span className="text-[#C4B49C] text-[11px]">{selectedDessert.name}</span>
                      <span className="text-[#C9A96E] text-[9px]">€{selectedDessert.price}</span>
                    </motion.div>
                  ) : (
                    <motion.div key="empty-d" className="flex justify-between items-baseline opacity-30">
                      <span className="text-[#3A3028] text-[10px] italic">— Select a dessert</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-baseline">
                  <span className="text-[#4A3D2E] text-[10px] italic">Mignardises</span>
                  <span className="text-[#3A3028] text-[9px]">incl.</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#1E1812] mb-5" />

              {/* Wine pairing */}
              {(selectedMain || selectedStarter) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex gap-3 items-start"
                >
                  <img
                    src={IMG.wine}
                    alt="Wine"
                    className="w-8 h-10 object-cover opacity-70 shrink-0"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div>
                    <p className="text-[7px] tracking-[0.35em] uppercase text-[#C9A96E]/50 mb-0.5">Sommelier Suggests</p>
                    <p className="text-[#C4B49C] text-[10px] italic">{suggestedWine}</p>
                  </div>
                </motion.div>
              )}

              {/* Total */}
              <div className="flex justify-between items-baseline mb-7">
                <span className="text-[8px] tracking-[0.35em] uppercase text-[#4A3D2E]">Per Person</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15, color: "#D4B47A" }}
                  animate={{ scale: 1, color: "#C9A96E" }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl font-bold text-[#C9A96E]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  €{total}
                </motion.span>
              </div>

              {/* CTA */}
              <AnimatePresence>
                {isComplete ? (
                  <motion.a
                    href="#reservation"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="block w-full bg-[#C9A96E] text-[#0C0B09] text-center py-4 text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4B47A] transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A96E]/20"
                  >
                    Request This Menu
                  </motion.a>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center gap-1.5 mb-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-0.5 w-8 transition-all duration-500 ${i < progress ? "bg-[#C9A96E]" : "bg-[#1E1812]"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[8px] tracking-[0.2em] uppercase text-[#3A3028]">
                      {3 - progress} course{3 - progress !== 1 ? "s" : ""} remaining
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Note */}
            <p className="text-[7px] tracking-[0.2em] uppercase text-[#2A2218] text-center mt-4 leading-relaxed">
              Menu composition is a request · Final menu confirmed by Chef Moreau
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
