"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for getting started.",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 5 bookings / month",
      "1 service type",
      "Basic booking page",
      "Email reminders",
      "Schedulr branding",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "For businesses ready to scale.",
    monthly: 29,
    yearly: 23,
    features: [
      "Unlimited bookings",
      "Unlimited service types",
      "Custom booking page",
      "SMS + email reminders",
      "Up to 5 team members",
      "Google & Apple calendar sync",
      "Payment collection (Stripe)",
      "Analytics dashboard",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Scale",
    tagline: "For agencies and enterprises.",
    monthly: 79,
    yearly: 63,
    features: [
      "Everything in Growth",
      "Unlimited team members",
      "Custom domain",
      "White-label branding",
      "Priority support (< 2h)",
      "API access",
      "Advanced analytics & exports",
    ],
    cta: "Start 14-day trial",
    highlighted: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-200/20 dark:bg-pink-900/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-orange-500 uppercase tracking-[0.22em] mb-4">
            Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Start free. Upgrade when you&apos;re ready. No hidden fees, ever.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 gap-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                !yearly
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                yearly
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Yearly
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative ${plan.highlighted ? "md:-mt-5" : ""}`}
            >
              {/* Gradient border ring for highlighted card */}
              {plan.highlighted && (
                <div className="absolute -inset-[1.5px] rounded-[25px] bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 opacity-75" />
              )}

              <div
                className={`relative h-full flex flex-col bg-white dark:bg-gray-900 rounded-3xl p-7 ${
                  plan.highlighted ? "border-0" : "border border-gray-100 dark:border-gray-800"
                }`}
              >
                {plan.highlighted && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <Zap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 fill-current" />
                    <span className="text-xs font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.tagline}</p>
                </div>

                <div className="mb-7">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white leading-none">
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    {(yearly ? plan.yearly : plan.monthly) > 0 && (
                      <span className="text-gray-400 text-sm mb-1.5">/mo</span>
                    )}
                  </div>
                  {yearly && plan.yearly > 0 && (
                    <p className="text-xs text-gray-400 mt-1.5">Billed as ${plan.yearly * 12}/year</p>
                  )}
                  {(yearly ? plan.yearly : plan.monthly) === 0 && (
                    <p className="text-xs text-gray-400 mt-1.5">Free forever</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.highlighted ? "text-violet-500 dark:text-violet-400" : "text-gray-400"
                        }`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          All paid plans include a 14-day free trial. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
}
