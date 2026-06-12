"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Free AI Audit",
    description: "We analyze your current operations to identify the highest-impact automation opportunities — no fluff, just actionable insights.",
    color: "from-blue-500 to-cyan-500",
    label: "Discovery",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Strategy & Design",
    description: "Our AI architects design a custom automation roadmap tailored to your goals, tech stack, and budget.",
    color: "from-violet-500 to-purple-500",
    label: "Planning",
  },
  {
    step: "03",
    icon: Code2,
    title: "Build & Integrate",
    description: "We build, test, and integrate your AI systems with existing tools in 2–4 weeks — delivering results fast.",
    color: "from-emerald-500 to-teal-500",
    label: "Development",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Launch & Scale",
    description: "Go live with confidence — we handle deployment, training, and ensure everything runs flawlessly at scale.",
    color: "from-amber-500 to-orange-500",
    label: "Deployment",
  },
  {
    step: "05",
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "We become your long-term AI partner — monitoring, optimizing, and evolving your systems as your business grows.",
    color: "from-pink-500 to-rose-500",
    label: "Growth",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/8 to-background" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-[0.2em] mb-3">How We Work</p>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            From audit to <span className="gradient-text">automation in weeks</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our proven 5-step process ensures every automation we build delivers measurable ROI.
          </p>
        </motion.div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting track */}
            <div className="absolute top-8 left-[8%] right-[8%] h-px">
              <div className="h-full bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-rose-500/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500 origin-left"
              />
            </div>

            <div className="grid grid-cols-5 gap-6 relative">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Step icon */}
                    <div className="relative mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
                        {step.step}
                      </div>
                    </div>

                    {/* Label chip */}
                    <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-2">
                      {step.label}
                    </div>

                    <h3 className="font-bold text-foreground mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 relative"
              >
                {/* Timeline line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[22px] top-14 bottom-0 w-px bg-gradient-to-b from-border/60 to-transparent" />
                )}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shrink-0 mt-1`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="pb-10">
                  <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-0.5">
                    {step.step} · {step.label}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
