"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  { title: "Senior AI Engineer", team: "Engineering", location: "Remote (Global)", type: "Full-time", salary: "$120K – $180K", description: "Build production-grade AI systems using LLMs, RAG architectures, and autonomous agents for our clients." },
  { title: "Automation Architect", team: "Delivery", location: "Remote (USA/UK)", type: "Full-time", salary: "$100K – $150K", description: "Design and implement complex workflow automations using Make.com, Zapier, n8n, and custom APIs." },
  { title: "AI Product Manager", team: "Product", location: "New York or Remote", type: "Full-time", salary: "$110K – $160K", description: "Own the roadmap for our client automation systems — translating business needs into technical specifications." },
  { title: "Full Stack Developer", team: "Engineering", location: "Remote (Global)", type: "Full-time", salary: "$90K – $140K", description: "Build client portals, admin dashboards, and custom AI interfaces using Next.js, React, and TypeScript." },
  { title: "AI Sales Specialist", team: "Sales", location: "London or Remote", type: "Full-time", salary: "$80K – $120K + Commission", description: "Own the full sales cycle for enterprise AI automation deals with businesses across Europe." },
  { title: "Client Success Manager", team: "Operations", location: "Remote (USA/UK)", type: "Full-time", salary: "$70K – $100K", description: "Ensure our clients hit their automation KPIs and drive expansion revenue through exceptional service." },
];

const perks = [
  "100% remote with flexible hours",
  "Competitive salary + equity",
  "$3,000 annual learning budget",
  "Latest AI tools and tech",
  "Work with cutting-edge AI",
  "High-impact, fast-growth team",
];

export function CareersPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">Careers</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">Build the future of <span className="gradient-text">AI automation</span></h1>
            <p className="text-lg text-muted-foreground">Join a remote-first team of AI engineers, automation specialists, and client success experts transforming how businesses operate.</p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-border/50 text-sm">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold font-display mb-8">Open Positions ({jobs.length})</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card border border-border/50 rounded-2xl p-6 group hover:border-blue-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{job.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">{job.team}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 border-border/80 hover:border-blue-500/50">
                    Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center glass-card border border-border/50 rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-2">Don&apos;t see the right role?</h3>
            <p className="text-muted-foreground mb-6 text-sm">We&apos;re always looking for exceptional talent. Send us your CV and tell us how you&apos;d contribute to AutomateX AI.</p>
            <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
              Send Open Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
