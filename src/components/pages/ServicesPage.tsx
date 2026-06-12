"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Workflow, Users, BarChart3, GitBranch, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "ai-chatbots",
    icon: Bot,
    title: "AI Chatbots",
    tagline: "24/7 intelligent customer engagement",
    description: "Deploy GPT-4 powered chatbots that handle customer support, qualify leads, book appointments, and drive sales — trained on your specific business knowledge.",
    features: [
      "Custom-trained on your business data",
      "Deployed on website, WhatsApp, Slack, and more",
      "Seamless CRM and helpdesk integration",
      "Human handoff when needed",
      "Multi-language support",
      "Real-time analytics dashboard",
    ],
    results: ["78% ticket deflection", "3x faster response", "40% more conversions"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "ai-agents",
    icon: Cpu,
    title: "AI Agents",
    tagline: "Autonomous AI that works while you sleep",
    description: "Build autonomous AI agents that browse the web, manage emails, research prospects, execute tasks, and coordinate complex multi-step workflows with minimal human oversight.",
    features: [
      "Web browsing and data extraction",
      "Autonomous email management",
      "Multi-agent orchestration",
      "Tool use and API integrations",
      "Decision-making with guardrails",
      "Full activity logging",
    ],
    results: ["200+ hours saved/month", "90% task automation", "Zero errors on repetitive work"],
    color: "from-violet-500 to-purple-500",
    bgColor: "from-violet-500/10 to-purple-500/10",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    title: "Workflow Automation",
    tagline: "Connect every tool in your stack",
    description: "Eliminate manual handoffs between your business tools. We build intelligent automation workflows that trigger, process, and route data across your entire tech stack.",
    features: [
      "500+ app integrations via Zapier/Make",
      "Custom webhook and API workflows",
      "Error handling and retry logic",
      "Real-time monitoring",
      "Multi-step conditional logic",
      "Document processing and routing",
    ],
    results: ["15+ hours saved per employee/week", "99.9% workflow uptime", "Zero data entry errors"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "crm-automation",
    icon: Users,
    title: "CRM Automation",
    tagline: "Your sales machine on autopilot",
    description: "Automate your entire sales pipeline — from lead capture to deal close. AI-powered scoring, personalized sequences, and smart follow-ups that never miss an opportunity.",
    features: [
      "HubSpot, Salesforce, Pipedrive integration",
      "AI lead scoring and routing",
      "Personalized email sequences",
      "Follow-up reminders and tasks",
      "Deal probability tracking",
      "Revenue forecasting",
    ],
    results: ["+40% close rate", "3x pipeline velocity", "100% follow-up compliance"],
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/10 to-orange-500/10",
  },
  {
    id: "lead-generation",
    icon: BarChart3,
    title: "Lead Generation Systems",
    tagline: "Qualified meetings booked on autopilot",
    description: "AI-powered outbound systems that identify ideal prospects, craft personalized messages, execute multi-channel outreach, and book meetings directly into your calendar.",
    features: [
      "LinkedIn and email outreach AI",
      "Prospect research automation",
      "Personalized messaging at scale",
      "Multi-channel sequencing",
      "Intent data enrichment",
      "Calendar integration",
    ],
    results: ["30+ qualified calls/week", "5x reply rate", "60% lower cost per lead"],
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-500/10 to-rose-500/10",
  },
  {
    id: "custom-ai",
    icon: GitBranch,
    title: "Custom AI Solutions",
    tagline: "Bespoke AI built for your unique challenges",
    description: "When off-the-shelf doesn't cut it — we build custom AI systems including fine-tuned models, RAG knowledge bases, document processors, and predictive analytics.",
    features: [
      "Custom model fine-tuning",
      "RAG knowledge base systems",
      "Document processing at scale",
      "Predictive analytics models",
      "White-label AI products",
      "API development and hosting",
    ],
    results: ["99%+ accuracy rates", "10x processing speed", "Full IP ownership"],
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-500/10 to-blue-500/10",
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6 max-w-3xl mx-auto">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Our Services</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">
              AI Solutions That <span className="gradient-text">Drive Revenue</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Every service we offer is designed to deliver measurable ROI within 90 days. No fluff — just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{service.tagline}</p>
                  <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className={isEven ? "" : "lg:order-1"}>
                  <div className={`rounded-3xl bg-gradient-to-br ${service.bgColor} border border-border/50 p-8 space-y-4`}>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Typical Results</p>
                    {service.results.map((r) => (
                      <div key={r} className="flex items-center gap-3 glass-card border border-border/50 rounded-xl px-4 py-3">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.color}`} />
                        <span className="font-semibold text-foreground">{r}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">Based on average client results within first 90 days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-950/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Not sure which service you need?</h2>
          <p className="text-muted-foreground mb-8">Book a free discovery call — we&apos;ll map the exact automation opportunities in your business.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-xl h-12 px-8">
              Book Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
