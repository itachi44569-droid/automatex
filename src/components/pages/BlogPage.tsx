"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    slug: "how-to-automate-customer-support-with-ai",
    title: "How to Automate 80% of Your Customer Support with AI in 2025",
    excerpt: "A step-by-step guide to building an AI-powered support system that handles tickets, answers questions, and escalates when needed — without losing the human touch.",
    category: "AI Chatbots",
    readTime: "8 min read",
    date: "June 2, 2026",
    author: "Alex Morgan",
    featured: true,
  },
  {
    slug: "ai-lead-generation-guide",
    title: "The Complete Guide to AI-Powered Lead Generation in 2025",
    excerpt: "Learn how to build an outbound machine that finds ideal prospects, crafts personalized messages, and books meetings 24/7 without a dedicated SDR team.",
    category: "Lead Generation",
    readTime: "12 min read",
    date: "May 28, 2026",
    author: "Priya Sharma",
    featured: true,
  },
  {
    slug: "workflow-automation-roi-guide",
    title: "How to Calculate the ROI of Workflow Automation (With Real Examples)",
    excerpt: "Stop guessing whether automation is worth it. This guide shows you exactly how to measure the return on investment before you spend a single dollar.",
    category: "Workflow Automation",
    readTime: "6 min read",
    date: "May 20, 2026",
    author: "James Wright",
    featured: false,
  },
  {
    slug: "best-ai-tools-for-small-business",
    title: "10 Best AI Automation Tools for Small Businesses in 2025",
    excerpt: "A comprehensive review of the tools we use to build automation systems for our clients — including cost, pros, cons, and best use cases.",
    category: "Tools & Reviews",
    readTime: "10 min read",
    date: "May 15, 2026",
    author: "Emma Clarke",
    featured: false,
  },
  {
    slug: "crm-automation-playbook",
    title: "The CRM Automation Playbook: From Lead to Close Without Manual Work",
    excerpt: "How to set up your CRM to automatically score leads, send personalized sequences, and route deals to the right reps at the right time.",
    category: "CRM Automation",
    readTime: "9 min read",
    date: "May 10, 2026",
    author: "Alex Morgan",
    featured: false,
  },
  {
    slug: "ai-agents-business-use-cases",
    title: "7 Ways Businesses Are Using AI Agents to Save Time and Money",
    excerpt: "Real examples of autonomous AI agents handling email management, research, reporting, and complex multi-step tasks without any human intervention.",
    category: "AI Agents",
    readTime: "7 min read",
    date: "May 5, 2026",
    author: "Priya Sharma",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "AI Chatbots": "bg-blue-500/20 text-blue-400",
  "Lead Generation": "bg-emerald-500/20 text-emerald-400",
  "Workflow Automation": "bg-violet-500/20 text-violet-400",
  "Tools & Reviews": "bg-amber-500/20 text-amber-400",
  "CRM Automation": "bg-orange-500/20 text-orange-400",
  "AI Agents": "bg-cyan-500/20 text-cyan-400",
};

export function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-widest">AI Automation Blog</p>
            <h1 className="text-4xl lg:text-6xl font-bold font-display">Insights to <span className="gradient-text">automate smarter</span></h1>
            <p className="text-lg text-muted-foreground">Expert guides and real-world insights from the AutomateX AI team.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featured.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card border border-border/50 rounded-3xl p-8 group hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-display mb-3 group-hover:text-blue-400 transition-colors leading-snug">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card border border-border/50 rounded-2xl p-6 group hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-muted-foreground" />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold mb-3 group-hover:text-blue-400 transition-colors leading-snug text-sm">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-blue-500 hover:gap-2 transition-all font-medium">
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
