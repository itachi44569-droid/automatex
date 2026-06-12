"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Sparkles, CheckCircle2, Bot, Zap, TrendingUp,
  Mail, FileText, MessageSquare, CheckCircle, Target, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const trustBadges = [
  "200+ Businesses Automated",
  "$50M+ Revenue Generated",
  "98% Client Satisfaction",
];

const pipelineRows = [
  {
    input: { icon: Mail, label: "Email received", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/25" },
    output: { icon: CheckCircle, label: "Auto-replied", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25" },
  },
  {
    input: { icon: FileText, label: "Lead form filled", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/25" },
    output: { icon: Target, label: "Lead scored", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" },
  },
  {
    input: { icon: MessageSquare, label: "Support ticket", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25" },
    output: { icon: Bell, label: "Ticket routed", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/25" },
  },
];

const bottomStats = [
  { value: "2,847", label: "Tasks today" },
  { value: "$124k", label: "Automated" },
  { value: "1,240", label: "Workflows" },
];

function FlowDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400"
      animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ top: "calc(50% - 3px)", left: 0 }}
    />
  );
}

function AIWorkflowVisual() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveRow((i) => (i + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Ambient glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/25 via-violet-600/20 to-cyan-500/15 rounded-3xl blur-3xl" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[11px] text-white/35 font-mono tracking-wide">AutomateX AI · Operations Center</span>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Pipeline label */}
          <p className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-medium">Automation Pipeline</p>

          {/* Workflow rows */}
          <div className="space-y-2">
            {pipelineRows.map((row, i) => {
              const InIcon = row.input.icon;
              const OutIcon = row.output.icon;
              const isActive = activeRow === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className={`flex-1 flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs transition-all duration-500 ${isActive ? row.input.bg : "bg-white/3 border-white/5"}`}>
                    <InIcon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-500 ${isActive ? row.input.color : "text-white/20"}`} />
                    <span className={`transition-colors duration-500 ${isActive ? "text-white/80" : "text-white/25"}`}>{row.input.label}</span>
                  </div>
                  <div className="relative w-10 h-4 shrink-0 overflow-hidden">
                    {isActive && (
                      <>
                        <FlowDot delay={0} />
                        <FlowDot delay={0.4} />
                        <FlowDot delay={0.8} />
                      </>
                    )}
                    <div className={`absolute inset-y-0 m-auto h-px w-full transition-colors duration-500 ${isActive ? "bg-blue-500/40" : "bg-white/8"}`} />
                  </div>
                  <div className={`flex-1 flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs transition-all duration-500 ${isActive ? row.output.bg : "bg-white/3 border-white/5"}`}>
                    <OutIcon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-500 ${isActive ? row.output.color : "text-white/20"}`} />
                    <span className={`transition-colors duration-500 ${isActive ? "text-white/80" : "text-white/25"}`}>{row.output.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AI Core bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/15 to-violet-600/10 border border-blue-500/20"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 0 0 rgba(67,97,255,0.4)", "0 0 0 8px rgba(67,97,255,0)", "0 0 0 0 rgba(67,97,255,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0"
            >
              <Bot className="w-4 h-4 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white/80">AI Core Processing</p>
              <p className="text-[10px] text-white/35">GPT-4o · Claude 3 · Custom Models</p>
            </div>
            <div className="flex items-end gap-0.5 h-5">
              {[3, 6, 9, 7, 11, 8, 10, 6, 4, 8].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h}px`, `${h + 6}px`, `${h}px`] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                  className="w-0.5 bg-blue-400/70 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Sparkline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/25 uppercase tracking-wide">Task throughput</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +34% today
              </span>
            </div>
            <div className="relative h-10 rounded-lg overflow-hidden bg-white/3">
              <svg viewBox="0 0 280 40" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroSparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4361ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#4361ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,36 C30,33 50,28 80,22 C110,16 130,19 160,12 C190,5 220,8 250,4 C265,2 273,2 280,1"
                  fill="none"
                  stroke="#4361ff"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, delay: 1.1, ease: "easeOut" }}
                />
                <motion.path
                  d="M0,36 C30,33 50,28 80,22 C110,16 130,19 160,12 C190,5 220,8 250,4 C265,2 273,2 280,1 L280,40 L0,40 Z"
                  fill="url(#heroSparkGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-2">
            {bottomStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.08 }}
                className="text-center py-2.5 rounded-xl bg-white/5 border border-white/6"
              >
                <p className="text-sm font-bold text-white">{s.value}</p>
                <p className="text-[9px] text-white/35 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating pill: AI Agent */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute -left-16 top-[28%] glass-card border border-blue-500/20 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-md">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white/90 leading-tight">AI Agent</p>
          <p className="text-[10px] text-white/40">247 tasks running</p>
        </div>
      </motion.div>

      {/* Floating pill: Workflows */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute -right-6 top-6 glass-card border border-violet-500/20 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white/90 leading-tight">1,240 Workflows</p>
          <p className="text-[10px] text-white/40">Running live now</p>
        </div>
      </motion.div>

      {/* Floating pill: Revenue */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute -right-10 bottom-20 glass-card border border-emerald-500/20 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{ animation: "float 7s ease-in-out infinite", animationDelay: "2s" }}
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-md">
          <TrendingUp className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white/90 leading-tight">+$124k</p>
          <p className="text-[10px] text-white/40">Automated revenue</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Layered background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="space-y-8 max-w-xl">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-sm font-medium text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Automation Agency · Fiverr Top Rated</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold font-display leading-[1.07] tracking-tight">
                <span className="text-foreground">Automate Your</span>
                <br />
                <span className="text-foreground">Business.</span>
                <br />
                <span className="gradient-text">Scale Infinitely.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We build world-class AI automation systems that eliminate repetitive work, scale your operations, and generate revenue on autopilot — trusted by 200+ businesses across the USA, UK, and Europe.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                >
                  Get Your Free AI Audit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base font-semibold glass-card border-border/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                >
                  View Case Studies
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustBadges.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Visual ── */}
          <div className="hidden lg:block relative pl-8">
            <AIWorkflowVisual />
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
