"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, GitBranch, Workflow, Users, BarChart3, Cpu, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that handles customer support, lead qualification, and sales 24/7 — trained on your business data.",
    features: ["Multi-channel deployment", "GPT-4o powered", "CRM integration", "Analytics dashboard"],
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(67,97,255,0.15)",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    href: "/services#ai-chatbots",
  },
  {
    icon: Cpu,
    title: "AI Agents",
    description: "Autonomous AI agents that research, plan, and execute complex multi-step business tasks without human intervention.",
    features: ["Web browsing", "Email management", "Data extraction", "Task automation"],
    color: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.15)",
    border: "hover:border-violet-500/40",
    iconColor: "text-violet-400",
    href: "/services#ai-agents",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "End-to-end workflow automation connecting your tools and eliminating manual handoffs across your entire business stack.",
    features: ["Zapier / Make.com", "API integrations", "500+ connectors", "Real-time triggers"],
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
    border: "hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
    href: "/services#workflow-automation",
  },
  {
    icon: Users,
    title: "CRM Automation",
    description: "Automate your entire sales pipeline from lead capture to close — with personalized sequences and smart follow-ups.",
    features: ["HubSpot / Salesforce", "Email sequences", "Lead scoring", "Deal tracking"],
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    border: "hover:border-amber-500/40",
    iconColor: "text-amber-400",
    href: "/services#crm-automation",
  },
  {
    icon: BarChart3,
    title: "Lead Generation",
    description: "AI-powered outbound systems that find, qualify, and book meetings with your ideal customers on complete autopilot.",
    features: ["LinkedIn outreach", "Cold email AI", "Intent data", "Booking automation"],
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
    border: "hover:border-pink-500/40",
    iconColor: "text-pink-400",
    href: "/services#lead-generation",
  },
  {
    icon: GitBranch,
    title: "Custom AI Solutions",
    description: "Bespoke AI systems built around your unique business challenges — from document processing to predictive analytics.",
    features: ["Fine-tuned models", "Custom RAG systems", "API development", "White-label"],
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.15)",
    border: "hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
    href: "/services#custom-ai",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-[0.2em] mb-3">What We Build</p>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            AI solutions that <span className="gradient-text">actually work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don&apos;t just build demos — we deploy production-grade AI systems that transform how your business operates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={service.href} className="group block h-full">
                  <div
                    className={`h-full relative glass-card border border-border/50 rounded-2xl p-6 transition-all duration-300 ${service.border} hover:-translate-y-1 hover:shadow-2xl`}
                    style={{
                      "--glow": service.glow,
                    } as React.CSSProperties}
                  >
                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${service.glow}, transparent 70%)` }}
                    />

                    <div className="relative">
                      {/* Icon */}
                      <div className="mb-5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg font-bold mb-3 transition-colors duration-200 group-hover:${service.iconColor}`}>
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${service.iconColor} opacity-70`} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className={`flex items-center gap-1 text-sm font-semibold ${service.iconColor} group-hover:gap-2 transition-all`}>
                        Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
