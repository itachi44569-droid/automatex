"use client";

import { motion } from "framer-motion";
import { Target, Globe, Award, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Alex Morgan", title: "CEO & Co-Founder", bio: "Former ML Engineer at Google. Built and sold 2 AI startups.", avatar: "AM", gradient: "from-blue-500 to-violet-500" },
  { name: "Priya Sharma", title: "CTO & Co-Founder", bio: "Ex-Amazon AI researcher. 10+ years in enterprise automation.", avatar: "PS", gradient: "from-violet-500 to-pink-500" },
  { name: "James Wright", title: "Head of Delivery", bio: "Delivered 100+ automation projects across Fortune 500 companies.", avatar: "JW", gradient: "from-emerald-500 to-teal-500" },
  { name: "Emma Clarke", title: "Lead AI Engineer", bio: "Specialist in LLM fine-tuning and production AI deployments.", avatar: "EC", gradient: "from-amber-500 to-orange-500" },
  { name: "Luca Ferrari", title: "Automation Architect", bio: "Expert in complex workflow design and API integrations.", avatar: "LF", gradient: "from-cyan-500 to-blue-500" },
  { name: "Sarah Kim", title: "Client Success Manager", bio: "Ensures every client achieves their automation ROI goals.", avatar: "SK", gradient: "from-pink-500 to-rose-500" },
];

const values = [
  { icon: Target, title: "Results Over Promises", description: "We measure success by your ROI, not our deliverables. Every project has agreed KPIs." },
  { icon: Globe, title: "Global Perspective", description: "With clients across 3 continents, we understand diverse business contexts and requirements." },
  { icon: Award, title: "Premium Quality", description: "We refuse to ship anything we wouldn't be proud to show in a case study. Quality is non-negotiable." },
  { icon: Users, title: "Partnership Mindset", description: "We're not vendors — we're long-term AI partners invested in your business growth." },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">About AutomateX AI</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">
              We&apos;re on a mission to make AI<br />
              <span className="gradient-text">accessible to every business</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2022, AutomateX AI was born from a simple belief: AI shouldn&apos;t be reserved for Fortune 500 companies. Every ambitious business deserves access to the same automation systems that give enterprises their competitive edge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "2022", label: "Year Founded" },
              { value: "200+", label: "Clients Served" },
              { value: "3", label: "Continents" },
              { value: "$50M+", label: "Revenue Enabled" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold font-display gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display">What we stand for</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card border border-border/50 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Meet the team</h2>
            <p className="text-muted-foreground">AI engineers and strategists obsessed with delivering results.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card border border-border/50 rounded-2xl p-6 text-center group hover:border-blue-500/30 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-blue-500 mb-2">{member.title}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-950/10">
        <div className="container mx-auto px-4 text-center">
          <Zap className="w-10 h-10 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-display mb-4">Ready to work with us?</h2>
          <p className="text-muted-foreground mb-8">Join 200+ businesses that trust AutomateX AI to power their growth.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-xl h-12 px-8">
              Start Your AI Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
