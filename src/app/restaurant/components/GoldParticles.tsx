"use client";

// Pre-calculated positions — no Math.random() = no hydration mismatch
const PARTICLES = [
  { x: 8.3, y: 72, s: 3.0, d: 24, del: 0, o: 0.35 },
  { x: 17.1, y: 45, s: 2.2, d: 19, del: 2.4, o: 0.28 },
  { x: 25.8, y: 88, s: 3.5, d: 22, del: 5.1, o: 0.40 },
  { x: 34.2, y: 31, s: 1.8, d: 27, del: 1.7, o: 0.22 },
  { x: 42.5, y: 65, s: 2.8, d: 20, del: 8.3, o: 0.33 },
  { x: 51.7, y: 50, s: 2.5, d: 23, del: 3.9, o: 0.30 },
  { x: 60.9, y: 80, s: 3.2, d: 26, del: 6.5, o: 0.38 },
  { x: 70.3, y: 38, s: 2.0, d: 21, del: 0.8, o: 0.26 },
  { x: 79.6, y: 92, s: 2.8, d: 18, del: 4.2, o: 0.35 },
  { x: 88.4, y: 55, s: 2.3, d: 25, del: 7.6, o: 0.30 },
  { x: 5.2, y: 20, s: 1.8, d: 29, del: 2.1, o: 0.22 },
  { x: 13.8, y: 60, s: 3.0, d: 17, del: 9.4, o: 0.36 },
  { x: 22.6, y: 95, s: 2.5, d: 22, del: 5.7, o: 0.28 },
  { x: 31.4, y: 42, s: 3.2, d: 24, del: 1.3, o: 0.40 },
  { x: 40.7, y: 78, s: 2.2, d: 20, del: 8.8, o: 0.26 },
  { x: 49.1, y: 15, s: 3.0, d: 28, del: 3.5, o: 0.34 },
  { x: 58.5, y: 68, s: 2.0, d: 19, del: 6.9, o: 0.24 },
  { x: 67.9, y: 35, s: 2.8, d: 23, del: 0.4, o: 0.32 },
  { x: 77.2, y: 82, s: 2.4, d: 26, del: 4.8, o: 0.28 },
  { x: 86.6, y: 25, s: 3.4, d: 21, del: 7.2, o: 0.38 },
  { x: 93.8, y: 70, s: 2.1, d: 18, del: 2.9, o: 0.26 },
  { x: 3.4, y: 48, s: 2.8, d: 30, del: 5.4, o: 0.32 },
  { x: 11.7, y: 85, s: 1.8, d: 22, del: 8.1, o: 0.22 },
  { x: 20.5, y: 12, s: 3.2, d: 25, del: 1.6, o: 0.38 },
  { x: 29.8, y: 58, s: 2.3, d: 20, del: 6.3, o: 0.28 },
  { x: 39.2, y: 90, s: 2.7, d: 17, del: 9.7, o: 0.32 },
  { x: 48.6, y: 33, s: 2.5, d: 27, del: 3.1, o: 0.26 },
  { x: 57.3, y: 75, s: 3.0, d: 23, del: 0.6, o: 0.36 },
  { x: 66.7, y: 22, s: 2.2, d: 21, del: 4.5, o: 0.28 },
  { x: 76.1, y: 62, s: 3.5, d: 19, del: 7.8, o: 0.42 },
  { x: 85.4, y: 40, s: 2.0, d: 28, del: 2.2, o: 0.24 },
  { x: 92.7, y: 87, s: 2.6, d: 24, del: 5.9, o: 0.34 },
  { x: 6.8, y: 55, s: 2.9, d: 16, del: 8.5, o: 0.32 },
  { x: 15.5, y: 30, s: 2.4, d: 22, del: 1.0, o: 0.28 },
  { x: 45.9, y: 97, s: 2.1, d: 20, del: 6.7, o: 0.26 },
];

export default function GoldParticles() {
  return (
    <>
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0px) scale(1);     opacity: var(--op); }
          50%  { transform: translateY(-70px) scale(1.3); opacity: calc(var(--op) * 0.3); }
          100% { transform: translateY(0px) scale(1);     opacity: var(--op); }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              background: "radial-gradient(circle, #F0C060, #C9A96E)",
              boxShadow: `0 0 ${p.s * 3}px rgba(201,169,110,0.6)`,
              ["--op" as string]: p.o,
              opacity: p.o,
              animation: `float-up ${p.d}s ${p.del}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
