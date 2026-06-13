"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TableType = { id: string; type: "round" | "rect" | "oval"; zone: string; pax: number; note?: string };

const TABLES: TableType[] = [
  // Window seats
  { id: "W1", type: "round", zone: "Window", pax: 2, note: "Street view" },
  { id: "W2", type: "round", zone: "Window", pax: 2, note: "Garden view" },
  { id: "W3", type: "round", zone: "Window", pax: 2, note: "Garden view" },
  { id: "W4", type: "round", zone: "Window", pax: 2, note: "Street view" },
  // Main dining
  { id: "M1", type: "round", zone: "Main Dining", pax: 4 },
  { id: "M2", type: "round", zone: "Main Dining", pax: 4 },
  { id: "M3", type: "round", zone: "Main Dining", pax: 4 },
  { id: "M4", type: "round", zone: "Main Dining", pax: 4 },
  { id: "M5", type: "round", zone: "Main Dining", pax: 4 },
  { id: "M6", type: "round", zone: "Main Dining", pax: 4 },
  // Banquette
  { id: "B1", type: "rect", zone: "Banquette", pax: 4, note: "Upholstered bench" },
  { id: "B2", type: "rect", zone: "Banquette", pax: 4, note: "Upholstered bench" },
  { id: "B3", type: "rect", zone: "Banquette", pax: 6, note: "Private corner" },
  // Chef's table
  { id: "CT", type: "oval", zone: "Chef's Table", pax: 6, note: "Kitchen view · By request" },
];

// Pre-determined reserved for demo
const RESERVED = new Set(["M2", "M5", "B2"]);

const SVG_POSITIONS: Record<string, { cx?: number; cy?: number; r?: number; x?: number; y?: number; w?: number; h?: number; rx?: number; ry?: number }> = {
  W1: { cx: 72, cy: 88, r: 22 },
  W2: { cx: 72, cy: 158, r: 22 },
  W3: { cx: 72, cy: 228, r: 22 },
  W4: { cx: 72, cy: 298, r: 22 },
  M1: { cx: 190, cy: 118, r: 28 },
  M2: { cx: 190, cy: 208, r: 28 },
  M3: { cx: 190, cy: 298, r: 28 },
  M4: { cx: 295, cy: 118, r: 28 },
  M5: { cx: 295, cy: 208, r: 28 },
  M6: { cx: 295, cy: 298, r: 28 },
  B1: { x: 362, y: 96, w: 82, h: 42 },
  B2: { x: 362, y: 176, w: 82, h: 42 },
  B3: { x: 362, y: 256, w: 82, h: 56 },
  CT: { cx: 528, cy: 208, rx: 58, ry: 40 },
};

export default function TableSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredTable = TABLES.find((t) => t.id === hovered);

  const getColor = (id: string) => {
    if (RESERVED.has(id)) return { fill: "#131110", stroke: "#1E1812", opacity: 0.5 };
    if (selected === id) return { fill: "#C9A96E", stroke: "#D4B47A", opacity: 1 };
    if (hovered === id) return { fill: "rgba(201,169,110,0.15)", stroke: "#C9A96E", opacity: 1 };
    return { fill: "#0F0E0A", stroke: "rgba(201,169,110,0.35)", opacity: 1 };
  };

  const renderTable = (t: TableType) => {
    const pos = SVG_POSITIONS[t.id];
    const col = getColor(t.id);
    const isReserved = RESERVED.has(t.id);
    const cursor = isReserved ? "not-allowed" : "pointer";
    const events = isReserved
      ? {}
      : {
          onMouseEnter: () => setHovered(t.id),
          onMouseLeave: () => setHovered(null),
          onClick: () => onSelect(selected === t.id ? "" : t.id),
        };

    let shape = null;
    if (t.type === "round" && pos.cx !== undefined) {
      shape = (
        <circle
          cx={pos.cx} cy={pos.cy} r={pos.r}
          fill={col.fill} stroke={col.stroke} strokeWidth={1.5}
          opacity={col.opacity} style={{ cursor }}
          {...events}
        />
      );
    } else if (t.type === "rect" && pos.x !== undefined) {
      shape = (
        <rect
          x={pos.x} y={pos.y} width={pos.w} height={pos.h}
          fill={col.fill} stroke={col.stroke} strokeWidth={1.5}
          opacity={col.opacity} style={{ cursor }}
          {...events}
        />
      );
    } else if (t.type === "oval" && pos.cx !== undefined) {
      shape = (
        <ellipse
          cx={pos.cx} cy={pos.cy} rx={pos.rx} ry={pos.ry}
          fill={col.fill} stroke={col.stroke} strokeWidth={1.5}
          opacity={col.opacity} style={{ cursor }}
          {...events}
        />
      );
    }

    // Label inside shape
    const lx = pos.cx ?? ((pos.x ?? 0) + (pos.w ?? 0) / 2);
    const ly = pos.cy ?? ((pos.y ?? 0) + (pos.h ?? 0) / 2);
    const isSelected = selected === t.id;

    return (
      <g key={t.id}>
        {shape}
        <text
          x={lx} y={ly + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={t.type === "oval" ? 8 : 7}
          fill={isSelected ? "#0C0B09" : isReserved ? "#2A2218" : "rgba(201,169,110,0.7)"}
          fontFamily="Georgia, serif"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {t.id}
        </text>
        {isSelected && (
          <text
            x={lx} y={ly + 10}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={5.5}
            fill="#0C0B09"
            style={{ pointerEvents: "none" }}
          >
            ✓
          </text>
        )}
      </g>
    );
  };

  return (
    <div>
      <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-5 flex items-center gap-3">
        <span className="w-5 h-px bg-[#C9A96E]/30" />
        Select Your Preferred Table
        <span className="w-5 h-px bg-[#C9A96E]/30" />
      </p>

      <div className="relative border border-[#1E1812] overflow-hidden bg-[#080706]">
        <svg
          viewBox="0 0 620 390"
          className="w-full"
          style={{ maxHeight: 340 }}
        >
          {/* Room boundary */}
          <rect x="8" y="8" width="604" height="374" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />

          {/* Window markers (left wall) */}
          {[88, 158, 228, 298].map((y) => (
            <rect key={y} x="8" y={y - 18} width="3" height="36" fill="rgba(201,169,110,0.3)" />
          ))}
          <text x="18" y="22" fontSize="6" fill="rgba(201,169,110,0.25)" fontFamily="Georgia">WINDOWS</text>

          {/* Bar counter (top right) */}
          <rect x="445" y="12" width="165" height="52" rx="2" fill="#0F0E0A" stroke="rgba(201,169,110,0.15)" strokeWidth="1" />
          <text x="527" y="41" textAnchor="middle" fontSize="7" fill="rgba(201,169,110,0.3)" fontFamily="Georgia">BAR</text>
          {[460, 480, 500, 520, 540, 560, 580, 600].map((x) => (
            <circle key={x} cx={x} cy="75" r="5" fill="#0F0E0A" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />
          ))}

          {/* Kitchen area top */}
          <rect x="8" y="8" width="130" height="55" fill="#0A0908" stroke="rgba(201,169,110,0.08)" strokeWidth="1" />
          <text x="73" y="38" textAnchor="middle" fontSize="6" fill="rgba(201,169,110,0.2)" fontFamily="Georgia">KITCHEN</text>

          {/* Separator line */}
          <line x1="140" y1="8" x2="140" y2="63" stroke="rgba(201,169,110,0.08)" strokeWidth="1" strokeDasharray="3,4" />

          {/* Zone labels */}
          <text x="72" y="370" textAnchor="middle" fontSize="6" fill="rgba(201,169,110,0.2)">Window</text>
          <text x="240" y="370" textAnchor="middle" fontSize="6" fill="rgba(201,169,110,0.2)">Main Dining</text>
          <text x="403" y="370" textAnchor="middle" fontSize="6" fill="rgba(201,169,110,0.2)">Banquette</text>
          <text x="528" y="370" textAnchor="middle" fontSize="6" fill="rgba(201,169,110,0.2)">Chef's Table</text>

          {/* Zone dividers */}
          <line x1="128" y1="70" x2="128" y2="355" stroke="rgba(201,169,110,0.06)" strokeWidth="1" strokeDasharray="4,5" />
          <line x1="338" y1="70" x2="338" y2="355" stroke="rgba(201,169,110,0.06)" strokeWidth="1" strokeDasharray="4,5" />
          <line x1="458" y1="70" x2="458" y2="355" stroke="rgba(201,169,110,0.06)" strokeWidth="1" strokeDasharray="4,5" />

          {/* Entrance */}
          <rect x="265" y="375" width="90" height="6" rx="1" fill="rgba(201,169,110,0.12)" />
          <text x="310" y="389" textAnchor="middle" fontSize="5.5" fill="rgba(201,169,110,0.2)">ENTRANCE</text>

          {/* Render all tables */}
          {TABLES.map(renderTable)}
        </svg>

        {/* Hovered table tooltip */}
        <AnimatePresence>
          {hoveredTable && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-3 left-3 bg-[#0C0B09]/95 border border-[#C9A96E]/30 px-4 py-3 backdrop-blur-sm pointer-events-none"
            >
              <p className="text-[#C9A96E] text-[8px] tracking-[0.3em] uppercase">{hoveredTable.id} · {hoveredTable.zone}</p>
              <p className="text-[#D4C4A8] text-xs mt-0.5">{hoveredTable.pax} guests · {hoveredTable.note || "Standard dining"}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 flex-wrap">
        {[
          { col: "border-[#C9A96E]/35 bg-[#0F0E0A]", label: "Available" },
          { col: "border-[#C9A96E] bg-[#C9A96E]", label: "Selected" },
          { col: "border-[#1E1812] bg-[#131110] opacity-50", label: "Reserved" },
        ].map(({ col, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border ${col}`} />
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#3A3028]">{label}</span>
          </div>
        ))}
        {selected && (
          <div className="ml-auto text-[8px] tracking-[0.2em] uppercase text-[#C9A96E]">
            Table {selected} selected
          </div>
        )}
      </div>
    </div>
  );
}
