"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, DollarSign, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    value: 200, suffix: "+", label: "Businesses Automated",
    description: "Across USA, UK & Europe",
    icon: Users, color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20 hover:shadow-blue-500/40",
    border: "hover:border-blue-500/40",
    bg: "group-hover:from-blue-500/5 group-hover:to-cyan-500/5",
  },
  {
    value: 50, suffix: "M+", prefix: "$", label: "Revenue Generated",
    description: "Directly for our clients",
    icon: DollarSign, color: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/20 hover:shadow-violet-500/40",
    border: "hover:border-violet-500/40",
    bg: "group-hover:from-violet-500/5 group-hover:to-purple-500/5",
  },
  {
    value: 98, suffix: "%", label: "Client Satisfaction",
    description: "From verified reviews",
    icon: Star, color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20 hover:shadow-amber-500/40",
    border: "hover:border-amber-500/40",
    bg: "group-hover:from-amber-500/5 group-hover:to-orange-500/5",
  },
  {
    value: 10, suffix: "x", label: "Average ROI",
    description: "Delivered in 90 days",
    icon: TrendingUp, color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20 hover:shadow-emerald-500/40",
    border: "hover:border-emerald-500/40",
    bg: "group-hover:from-emerald-500/5 group-hover:to-teal-500/5",
  },
];

function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/8 to-background" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-[0.2em] mb-3">By the Numbers</p>
          <h2 className="text-3xl lg:text-4xl font-bold font-display">
            Results that speak <span className="gradient-text">for themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative glass-card border border-border/50 rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 shadow-xl ${stat.glow} ${stat.border}`}
              >
                {/* Hover gradient bg */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent transition-all duration-300 ${stat.bg}`} />

                {/* Icon */}
                <div className="relative flex justify-center mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="relative">
                  <p className="text-4xl lg:text-5xl font-bold font-display gradient-text mb-2">
                    <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="font-semibold text-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
