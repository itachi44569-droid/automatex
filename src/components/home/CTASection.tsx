"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const guarantees = [
  { icon: Zap, text: "Results in 30 days" },
  { icon: Shield, text: "No commitment required" },
  { icon: Clock, text: "Free 30-min consultation" },
];

export function CTASection() {
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-background to-violet-950/40" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Central mega-glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Animated ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-blue-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-dashed border-violet-500/10"
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Live badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-sm font-medium text-blue-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Free Discovery Call · Limited Spots Available
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight tracking-tight">
              Ready to put your
              <br />
              <span className="gradient-text">business on autopilot?</span>
            </h2>
          </div>

          {/* Body */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Book a free 30-minute discovery call. We&apos;ll show you exactly which parts of your business can be automated and the ROI you can expect — no strings attached.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="group h-14 px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Discovery Call
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg font-semibold glass-card border-border/50 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
              >
                View Case Studies
              </Button>
            </Link>
          </div>

          {/* Guarantee row */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{g.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
