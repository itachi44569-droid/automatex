"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, X, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    tagline: "For small businesses getting started with AI",
    price: { monthly: 2500, annual: 2000 },
    type: "one-time" as const,
    description: "One automation project delivered in 2 weeks",
    color: "from-slate-500 to-slate-600",
    features: [
      { text: "1 AI automation project", included: true },
      { text: "AI chatbot OR workflow automation", included: true },
      { text: "Up to 3 integrations", included: true },
      { text: "30-day support", included: true },
      { text: "Basic analytics", included: true },
      { text: "Training & documentation", included: true },
      { text: "Dedicated account manager", included: false },
      { text: "Custom AI model training", included: false },
      { text: "Priority support", included: false },
    ],
    badge: null,
    cta: "Get Started",
  },
  {
    name: "Growth",
    tagline: "For scaling businesses ready to automate everything",
    price: { monthly: 7500, annual: 6000 },
    type: "monthly" as const,
    description: "Ongoing AI automation retainer",
    color: "from-blue-600 to-violet-600",
    features: [
      { text: "Up to 3 concurrent projects", included: true },
      { text: "Full-stack automation (all services)", included: true },
      { text: "Unlimited integrations", included: true },
      { text: "90-day priority support", included: true },
      { text: "Advanced analytics & reporting", included: true },
      { text: "Monthly strategy sessions", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom AI model fine-tuning", included: false },
      { text: "White-label solutions", included: false },
    ],
    badge: "Most Popular",
    cta: "Start Growing",
  },
  {
    name: "Enterprise",
    tagline: "For enterprises demanding world-class AI systems",
    price: { monthly: null, annual: null },
    type: "custom" as const,
    description: "Custom pricing based on scope",
    color: "from-violet-600 to-pink-600",
    features: [
      { text: "Unlimited concurrent projects", included: true },
      { text: "Custom AI model development", included: true },
      { text: "White-label AI products", included: true },
      { text: "24/7 dedicated support team", included: true },
      { text: "Weekly executive reporting", included: true },
      { text: "On-site implementation", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantees", included: true },
      { text: "Custom contract terms", included: true },
    ],
    badge: "Best Value",
    cta: "Contact Sales",
  },
];

const faqs = [
  { q: "What's included in the free audit?", a: "A 30-minute call where we analyze your business operations, identify automation opportunities, and estimate the ROI you can achieve. No sales pressure." },
  { q: "How long does implementation take?", a: "Most automations go live within 2-4 weeks. Complex custom AI systems may take 6-8 weeks. We'll give you a precise timeline during the audit." },
  { q: "Do you offer a guarantee?", a: "Yes — if your automation doesn't achieve the agreed KPIs within 90 days, we'll rebuild it at no extra cost." },
  { q: "What tech stack do you use?", a: "We use the latest AI models (GPT-4, Claude), combined with Make.com, Zapier, n8n, Langchain, and custom development — whatever delivers the best results for your use case." },
  { q: "Can you work with our existing tools?", a: "Absolutely. We integrate with 500+ tools including HubSpot, Salesforce, Slack, Notion, Airtable, Google Workspace, and virtually any API-enabled platform." },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6 max-w-3xl mx-auto">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Transparent Pricing</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">
              Invest in <span className="gradient-text">AI that pays back 10x</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Every package includes a free discovery call and guaranteed ROI within 90 days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative glass-card border rounded-3xl p-8 flex flex-col",
                  plan.badge === "Most Popular" ? "border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105" : "border-border/50"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r ${plan.color} text-white text-xs font-bold shadow-lg`}>
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold font-display mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>
                <div className="mb-6">
                  {plan.type === "custom" ? (
                    <p className="text-3xl font-bold">Custom</p>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold">${plan.price.monthly?.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1 text-sm">{plan.type === "monthly" ? "/month" : " one-time"}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-sm">
                      {f.included ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? "text-foreground" : "text-muted-foreground/40"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    className={cn(
                      "w-full h-11 font-semibold",
                      plan.badge === "Most Popular"
                        ? `bg-gradient-to-r ${plan.color} text-white border-0 shadow-lg`
                        : "border-border/80"
                    )}
                    variant={plan.badge === "Most Popular" ? "default" : "outline"}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold font-display text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card border border-border/50 rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
