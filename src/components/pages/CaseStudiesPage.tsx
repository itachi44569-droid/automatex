"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: "techscale-chatbot",
    client: "TechScale Solutions",
    industry: "SaaS / B2B",
    service: "AI Chatbots",
    title: "How TechScale Cut Support Costs by 78% with an AI Chatbot",
    description: "TechScale was spending $240K/year on customer support. We built a GPT-4 chatbot trained on their entire knowledge base that now handles 78% of tickets automatically.",
    results: [
      { icon: TrendingUp, metric: "Ticket Deflection", before: "22%", after: "78%", color: "text-emerald-500" },
      { icon: DollarSign, metric: "Annual Savings", before: "$0", after: "$180K", color: "text-blue-500" },
      { icon: Clock, metric: "Response Time", before: "4 hours", after: "2 seconds", color: "text-violet-500" },
    ],
    tags: ["AI Chatbot", "Customer Support", "SaaS"],
    featured: true,
    timeframe: "4 weeks",
    country: "🇺🇸 USA",
  },
  {
    id: "growthpath-crm",
    client: "GrowthPath Agency",
    industry: "Marketing Agency",
    service: "CRM Automation",
    title: "40% Higher Close Rate: GrowthPath's AI Sales Pipeline",
    description: "Manual CRM data entry was costing GrowthPath's sales team 15 hours/week. Our AI-powered CRM automation handled scoring, sequences, and follow-ups — driving a 40% close rate increase.",
    results: [
      { icon: TrendingUp, metric: "Close Rate", before: "18%", after: "40%", color: "text-emerald-500" },
      { icon: Clock, metric: "Admin Time Saved", before: "15h/week", after: "0h/week", color: "text-blue-500" },
      { icon: DollarSign, metric: "Additional Revenue", before: "$0", after: "+$420K/yr", color: "text-violet-500" },
    ],
    tags: ["CRM Automation", "Sales Pipeline", "Agency"],
    featured: true,
    timeframe: "3 weeks",
    country: "🇬🇧 UK",
  },
  {
    id: "datasync-workflow",
    client: "DataSync GmbH",
    industry: "Data Services",
    service: "Workflow Automation",
    title: "DataSync Saves 200 Hours/Month with Workflow Automation",
    description: "DataSync had 15 tools that never talked to each other. We built a unified automation backbone connecting their entire stack — saving 200+ hours every month.",
    results: [
      { icon: Clock, metric: "Hours Saved/Month", before: "0", after: "200+", color: "text-emerald-500" },
      { icon: TrendingUp, metric: "Process Efficiency", before: "42%", after: "94%", color: "text-blue-500" },
      { icon: DollarSign, metric: "Cost Reduction", before: "$0", after: "$96K/yr", color: "text-violet-500" },
    ],
    tags: ["Workflow Automation", "Integration", "Data Services"],
    featured: false,
    timeframe: "5 weeks",
    country: "🇩🇪 Germany",
  },
  {
    id: "nexus-leads",
    client: "Nexus Digital",
    industry: "Digital Marketing",
    service: "Lead Generation",
    title: "Nexus Digital Books 30 Qualified Calls/Week on Autopilot",
    description: "Nexus's sales team was struggling with outreach. Our AI lead generation system identifies ideal prospects, writes personalized outreach, and books meetings directly into their calendar.",
    results: [
      { icon: TrendingUp, metric: "Calls Booked/Week", before: "4", after: "30+", color: "text-emerald-500" },
      { icon: DollarSign, metric: "Cost Per Lead", before: "$180", after: "$42", color: "text-blue-500" },
      { icon: Clock, metric: "Outreach Time", before: "20h/week", after: "2h/week", color: "text-violet-500" },
    ],
    tags: ["Lead Generation", "AI Outreach", "Marketing"],
    featured: false,
    timeframe: "2 weeks",
    country: "🇬🇧 UK",
  },
  {
    id: "velocity-documents",
    client: "Velocity Commerce",
    industry: "E-commerce",
    service: "Custom AI Solutions",
    title: "Processing 10,000 Invoices Daily with 99.2% AI Accuracy",
    description: "Velocity's finance team manually processed thousands of invoices weekly. Our custom AI document processor now handles 10,000+ invoices daily with near-perfect accuracy.",
    results: [
      { icon: TrendingUp, metric: "Processing Speed", before: "2,000/week", after: "10,000/day", color: "text-emerald-500" },
      { icon: Clock, metric: "Finance Team Hours", before: "40h/week", after: "4h/week", color: "text-blue-500" },
      { icon: DollarSign, metric: "Accuracy Rate", before: "94%", after: "99.2%", color: "text-violet-500" },
    ],
    tags: ["Custom AI", "Document Processing", "E-commerce"],
    featured: false,
    timeframe: "6 weeks",
    country: "🇺🇸 USA",
  },
  {
    id: "luxe-support",
    client: "LuxeGroup",
    industry: "Luxury Retail",
    service: "AI Agents",
    title: "LuxeGroup's AI Agent Handles Customer Journeys End-to-End",
    description: "LuxeGroup needed to provide white-glove customer service at scale. We built an AI agent that personalizes every interaction, handles returns, and coordinates across 8 departments automatically.",
    results: [
      { icon: TrendingUp, metric: "Customer Satisfaction", before: "72 NPS", after: "91 NPS", color: "text-emerald-500" },
      { icon: Clock, metric: "Resolution Time", before: "48 hours", after: "4 minutes", color: "text-blue-500" },
      { icon: DollarSign, metric: "Staff Efficiency", before: "65%", after: "94%", color: "text-violet-500" },
    ],
    tags: ["AI Agents", "Customer Experience", "Retail"],
    featured: false,
    timeframe: "8 weeks",
    country: "🇫🇷 France",
  },
];

export function CaseStudiesPage() {
  const featured = caseStudies.filter((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Case Studies</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">Real AI. <span className="gradient-text">Real Results.</span></h1>
            <p className="text-lg text-muted-foreground">Every metric below is verified by our clients. We don&apos;t exaggerate — we deliver.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featured.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card border border-blue-500/30 rounded-3xl p-8 group hover:border-blue-500/60 transition-all relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-medium text-blue-400">Featured</div>
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">{cs.industry} · {cs.country} · {cs.timeframe}</p>
                  <h2 className="text-xl font-bold font-display mb-3 group-hover:text-blue-400 transition-colors">{cs.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {cs.results.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.metric} className="bg-background/50 rounded-xl p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">{r.metric}</p>
                        <p className="text-xs text-muted-foreground line-through">{r.before}</p>
                        <p className={`text-sm font-bold ${r.color}`}>{r.after}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-accent text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/case-studies/${cs.id}`} className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card border border-border/50 rounded-2xl p-6 group hover:border-blue-500/30 transition-all"
              >
                <p className="text-xs text-muted-foreground mb-2">{cs.industry} · {cs.country}</p>
                <h3 className="font-bold mb-3 group-hover:text-blue-400 transition-colors leading-snug">{cs.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-3">{cs.description}</p>
                <div className="space-y-2 mb-5">
                  {cs.results.slice(0, 2).map((r) => (
                    <div key={r.metric} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{r.metric}</span>
                      <span className={`font-semibold ${r.color}`}>{r.after}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/case-studies/${cs.id}`} className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:gap-2 transition-all">
                  Read case study <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-blue-950/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Want results like these?</h2>
          <p className="text-muted-foreground mb-8">Book a free discovery call and we&apos;ll show you your automation potential.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-xl h-12 px-8">
              Get Your Free AI Audit <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
