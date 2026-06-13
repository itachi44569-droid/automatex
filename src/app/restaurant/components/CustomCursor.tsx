"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hidden = useRef(true);

  useEffect(() => {
    setMounted(true);

    const setVis = (v: boolean) => {
      hidden.current = v;
      const op = v ? "0" : "1";
      if (dotRef.current) dotRef.current.style.opacity = op;
      if (ringRef.current) ringRef.current.style.opacity = op;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (hidden.current) setVis(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => setVis(true));
    document.addEventListener("mouseenter", () => setVis(false));

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 6, height: 6,
          marginLeft: -3, marginTop: -3,
          borderRadius: "50%",
          background: "#C9A96E",
          opacity: 0,
          willChange: "transform",
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: 32, height: 32,
          marginLeft: -16, marginTop: -16,
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.45)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
