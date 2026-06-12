"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Crawford",
    title: "CEO, TechScale Solutions",
    country: "🇺🇸 USA",
    avatar: "JC",
    rating: 5,
    text: "AutomateX built an AI chatbot that now handles 78% of our customer support automatically. We saved $180,000 in the first year alone. Incredible ROI.",
    result: "78% support automated",
    avatarColor: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sarah Williams",
    title: "Head of Operations, GrowthPath",
    country: "🇬🇧 UK",
    avatar: "SW",
    rating: 5,
    text: "AutomateX automated our entire pipeline — lead scoring, follow-ups, proposals. Our close rate went up 40% in just 3 months.",
    result: "+40% close rate",
    avatarColor: "from-violet-500 to-purple-500",
  },
  {
    name: "Marcus Klein",
    title: "Founder, DataSync GmbH",
    country: "🇩🇪 Germany",
    avatar: "MK",
    rating: 5,
    text: "We had 15 tools that didn't talk to each other. AutomateX built a unified automation backbone that saves our team 200+ hours every month.",
    result: "200+ hours saved/month",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    name: "Emma Thompson",
    title: "VP Marketing, Nexus Digital",
    country: "🇬🇧 UK",
    avatar: "ET",
    rating: 5,
    text: "The AI lead generation system books 30+ qualified calls per week on complete autopilot. It's like a full-time SDR team without the overhead.",
    result: "30+ calls/week automated",
    avatarColor: "from-pink-500 to-rose-500",
  },
  {
    name: "Robert Chang",
    title: "CTO, Velocity Commerce",
    country: "🇺🇸 USA",
    avatar: "RC",
    rating: 5,
    text: "AutomateX delivered a custom AI invoice processing system in 3 weeks. It processes 10,000+ documents daily with 99.2% accuracy.",
    result: "10,000 invoices/day",
    avatarColor: "from-amber-500 to-orange-500",
  },
  {
    name: "Sophie Dubois",
    title: "Operations Director, LuxeGroup",
    country: "🇫🇷 France",
    avatar: "SD",
    rating: 5,
    text: "From the first call, the team was exceptional. They delivered a workflow automation system that exceeded every expectation.",
    result: "65% efficiency increase",
    avatarColor: "from-cyan-500 to-blue-500",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="w-[320px] shrink-0 glass-card border border-border/50 rounded-2xl p-5 relative group hover:border-blue-500/30 transition-all duration-300 mx-3">
      <Quote className="absolute top-4 right-4 w-5 h-5 text-blue-500/15" />
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {t.avatar}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-xs text-foreground truncate">{t.name}</p>
          <p className="text-[10px] text-muted-foreground truncate">{t.title}</p>
        </div>
        <span className="text-sm ml-auto shrink-0">{t.country}</span>
      </div>
      <StarRating rating={t.rating} />
      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        {t.result}
      </div>
    </div>
  );
}

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);
const row1x3 = [...row1, ...row1, ...row1];
const row2x3 = [...row2, ...row2, ...row2];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-[0.2em] mb-3">Client Success Stories</p>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Trusted by businesses <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what our clients say after working with us.
          </p>
        </motion.div>
      </div>

      {/* Row 1: scroll left */}
      <div className="relative mb-4 [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {row1x3.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: scroll right */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <motion.div
          className="flex"
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {row2x3.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
