"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "AI Chatbots", "Workflow Automation", "CRM Systems", "AI Agents", "Lead Generation", "Custom AI"];

const projects = [
  { id: 1, title: "SupportBot Pro", client: "TechScale Solutions", category: "AI Chatbots", description: "Multi-channel AI support bot handling 78% of tickets automatically across website, Slack, and WhatsApp.", tech: ["GPT-4", "Next.js", "Firebase", "Twilio"], result: "78% ticket deflection", color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "SalesFlow CRM", client: "GrowthPath Agency", category: "CRM Systems", description: "End-to-end CRM automation with AI scoring, personalized sequences, and deal tracking.", tech: ["HubSpot API", "Make.com", "OpenAI", "Zapier"], result: "+40% close rate", color: "from-violet-500 to-purple-500" },
  { id: 3, title: "AutoOutreach AI", client: "Nexus Digital", category: "Lead Generation", description: "Fully automated LinkedIn and email outreach system booking 30+ qualified calls per week.", tech: ["Clay", "Apollo", "OpenAI", "Calendly"], result: "30 calls/week", color: "from-emerald-500 to-teal-500" },
  { id: 4, title: "DocProcessor AI", client: "Velocity Commerce", category: "Custom AI", description: "Custom AI document processing pipeline handling 10,000+ invoices daily with 99.2% accuracy.", tech: ["GPT-4o", "Python", "Firebase", "FastAPI"], result: "10K docs/day", color: "from-amber-500 to-orange-500" },
  { id: 5, title: "WorkflowEngine", client: "DataSync GmbH", category: "Workflow Automation", description: "Unified automation backbone connecting 15 business tools and eliminating all manual data entry.", tech: ["Make.com", "n8n", "Zapier", "APIs"], result: "200h saved/month", color: "from-cyan-500 to-blue-500" },
  { id: 6, title: "ConciergeAI", client: "LuxeGroup", category: "AI Agents", description: "Autonomous AI agent handling complete customer journeys across 8 departments end-to-end.", tech: ["Claude", "LangGraph", "Firebase", "Next.js"], result: "91 NPS score", color: "from-pink-500 to-rose-500" },
  { id: 7, title: "LeadScorer Pro", client: "FinEdge Capital", category: "CRM Systems", description: "AI-powered lead scoring system analyzing 50+ data points to prioritize high-value prospects.", tech: ["Python", "OpenAI", "Salesforce", "Firebase"], result: "2x pipeline value", color: "from-indigo-500 to-blue-500" },
  { id: 8, title: "ContentEngine AI", client: "MediaFlow", category: "Workflow Automation", description: "Fully automated content creation and publishing pipeline from research to social media distribution.", tech: ["GPT-4", "Make.com", "Webflow", "Buffer"], result: "10x content output", color: "from-rose-500 to-orange-500" },
  { id: 9, title: "ReportBot AI", client: "Apex Analytics", category: "Custom AI", description: "Automated analytics reporting bot generating executive-level insights from raw data every morning.", tech: ["Python", "OpenAI", "BigQuery", "Slack"], result: "3h report → 5min", color: "from-teal-500 to-cyan-500" },
];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Our Portfolio</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">AI systems we&apos;ve <span className="gradient-text">built & shipped</span></h1>
            <p className="text-lg text-muted-foreground">Production-grade AI automation projects delivering real business results.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25"
                    : "glass-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-blue-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card border border-border/50 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all"
                >
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.client}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-accent text-xs text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.color} bg-opacity-20 text-xs font-semibold text-white`} style={{ background: "rgba(67,97,255,0.15)" }}>
                        ✓ {project.result}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Want us to build something like this for you?</h2>
          <p className="text-muted-foreground mb-8">Book a free discovery call and let&apos;s discuss your automation needs.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-xl h-12 px-8">
              Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
