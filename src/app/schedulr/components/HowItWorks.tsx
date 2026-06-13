"use client";

import { motion } from "framer-motion";
import { UserPlus, Share2, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Set up your profile",
    description: "Add your services, hours, and team members in minutes. No technical skills or developer required.",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/30",
    number: "01",
  },
  {
    icon: Share2,
    title: "Share your booking link",
    description: "Drop your unique Schedulr link anywhere — your website, Instagram bio, email signature, or WhatsApp.",
    gradient: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/30",
    number: "02",
  },
  {
    icon: CalendarCheck,
    title: "Get booked & paid",
    description: "Appointments roll in automatically. Reminders go out, payments are collected, and you just show up.",
    gradient: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-400/30",
    number: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/40 dark:to-[#07070C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-pink-500 dark:text-pink-400 uppercase tracking-[0.22em] mb-4">
            How it works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Up and running
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              in minutes
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            No complicated setup. No developer required. Sign up and start taking bookings today.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none">
            <div className="h-full bg-gradient-to-r from-violet-200 via-pink-200 to-orange-200 dark:from-violet-800/40 dark:via-pink-800/40 dark:to-orange-800/40" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 origin-left"
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-7">
                  <div className={`w-20 h-20 rounded-[22px] bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.shadow} group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-400 shadow-sm">
                    {i + 1}
                  </div>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300 dark:text-gray-600 mb-2">
                  {step.number}
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
          >
            Try it free — takes 2 minutes
          </a>
        </motion.div>
      </div>
    </section>
  );
}
