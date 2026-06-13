"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Starter plan is completely free, forever. We only ask for payment details when you choose to upgrade to a paid plan.",
  },
  {
    q: "Can my clients book without creating an account?",
    a: "Yes. Clients book directly from your booking page with just their name, email, and phone — no account, no password, no friction.",
  },
  {
    q: "Does Schedulr sync with my existing calendar?",
    a: "Yes. Schedulr syncs two-way with Google Calendar, Apple Calendar, and Microsoft Outlook. Bookings appear in your calendar instantly, and personal events block your availability automatically.",
  },
  {
    q: "Can I collect payments at the time of booking?",
    a: "Yes — on Growth and Scale plans, clients can pay a deposit or the full amount at booking via Stripe. Funds go directly to your bank account.",
  },
  {
    q: "How do the automated reminders work?",
    a: "Schedulr sends customizable email and SMS reminders before appointments — you choose the timing (24h, 2h, or both). Our customers see up to 80% fewer no-shows on average.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts or lock-ins. Cancel anytime from your account settings — you'll keep access until the end of your billing period.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group gap-4"
      >
        <span className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-sm sm:text-base">
          {q}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
            open
              ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rotate-0"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400"
          }`}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-[0.22em] mb-4">
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Questions &amp; answers
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl px-7 py-2 shadow-sm"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          Still have questions?{" "}
          <a href="#" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
            Chat with us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
