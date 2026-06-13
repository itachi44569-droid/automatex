"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amara Osei",
    role: "Owner, Bloom Beauty Studio",
    avatar: "AO",
    color: "from-violet-400 to-pink-400",
    rating: 5,
    text: "Schedulr completely transformed how we handle bookings. Our no-show rate dropped by 70% in the first month. I genuinely can't imagine running my salon without it.",
    result: "70% fewer no-shows",
  },
  {
    name: "Dr. James Whitfield",
    role: "Founder, Oakwood Dental",
    avatar: "JW",
    color: "from-teal-400 to-cyan-500",
    rating: 5,
    text: "The automated reminders alone paid for the subscription. Our staff used to spend hours per week on the phone — now they focus entirely on patients. Outstanding product.",
    result: "12h saved per week",
  },
  {
    name: "Priya Sharma",
    role: "Lead Coach, Nova Coaching Co.",
    avatar: "PS",
    color: "from-orange-400 to-amber-400",
    rating: 5,
    text: "I was skeptical — I've tried 4 booking tools before Schedulr. It's the only one that actually feels good to use. My clients love the experience and tell me all the time.",
    result: "4.9★ client rating",
  },
  {
    name: "Marcus Delacroix",
    role: "Director, Forge Performance",
    avatar: "MD",
    color: "from-blue-400 to-indigo-500",
    rating: 5,
    text: "We have 8 trainers and 200+ weekly sessions. Schedulr handles all of it without breaking a sweat. The team management feature is genuinely best-in-class.",
    result: "200+ sessions/week",
  },
  {
    name: "Yuki Tanaka",
    role: "Founder, Saffron Day Spa",
    avatar: "YT",
    color: "from-pink-400 to-rose-400",
    rating: 5,
    text: "Setup took 20 minutes. Within a week we had more bookings than ever before. The custom booking page looks so professional — clients think we hired a web designer.",
    result: "+35% bookings",
  },
  {
    name: "Sofia Renner",
    role: "Partner, Mesa Legal Group",
    avatar: "SR",
    color: "from-emerald-400 to-teal-500",
    rating: 5,
    text: "Consultation bookings increased 40% after switching to Schedulr. The calendar sync with our existing tools was completely seamless. Highly recommend for any service business.",
    result: "+40% consultations",
  },
];

function Card({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-7 relative hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 group">
      <Quote className="absolute top-5 right-5 w-6 h-6 text-gray-100 dark:text-gray-800 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array(t.rating)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
          >
            {t.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
            {t.result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/40 dark:to-[#07070C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.22em] mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Businesses that{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              love
            </span>{" "}
            Schedulr
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Don&apos;t take our word for it — hear from real customers.
          </p>
        </motion.div>

        {/* Masonry-ish grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid mb-5"
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
