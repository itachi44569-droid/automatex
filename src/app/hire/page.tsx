"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "Aurum Restaurant",
    type: "Luxury Restaurant Website",
    desc: "Full Michelin-star experience — reservations, tasting menus, wine cellar, gallery lightbox, WhatsApp concierge.",
    tags: ["Next.js", "Framer Motion", "Firebase"],
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop",
    live: "/restaurant",
    highlight: true,
  },
  {
    title: "SaaS Dashboard",
    type: "Business Web App",
    desc: "Admin panel, client portal, revenue tracking, AI assistant integration — full stack production app.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&auto=format&fit=crop",
    live: "/admin",
  },
  {
    title: "Schedulr Landing Page",
    type: "SaaS Landing Page",
    desc: "Appointment booking SaaS — hero, pricing, testimonials, FAQ. Built to convert visitors to sign-ups.",
    tags: ["Next.js", "Framer Motion", "Stripe-ready"],
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=85&auto=format&fit=crop",
    live: "/schedulr",
  },
];

const SERVICES = [
  { icon: "🍽️", title: "Restaurant & Hospitality", desc: "Reservation systems, menus, gallery, private dining bookings. Michelin-level presentation.", price: "From £399" },
  { icon: "🏢", title: "Business Website", desc: "Services, about, contact, blog — everything a local business needs to look credible online.", price: "From £249" },
  { icon: "🚀", title: "SaaS / Landing Page", desc: "High-converting landing page with pricing, testimonials, CTA. Built to get sign-ups.", price: "From £299" },
  { icon: "⚡", title: "Full Web App", desc: "Admin panels, client portals, dashboards, Firebase backend. Production-ready.", price: "From £799" },
];

const FAQS = [
  { q: "How long does a website take?", a: "A standard business site takes 3–5 days. A full restaurant or SaaS site takes 7–10 days." },
  { q: "Do you provide hosting?", a: "Yes — I deploy everything to Vercel (free for most sites). You get a live link immediately." },
  { q: "Can I update it myself after?", a: "Yes. I'll hand over the code and show you how to change text, images, and prices yourself." },
  { q: "What do you need from me to start?", a: "Just your business name, logo (or I'll suggest one), colours, and what your business does. That's it." },
];

export default function HirePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", business: "", msg: "" });
  const [sent, setSent] = useState(false);

  const sendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi! I found your portfolio and I'm interested in a website.\n\nName: ${form.name}\nBusiness: ${form.business}\nDetails: ${form.msg}`
    );
    window.open(`https://wa.me/447000000000?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#065F46] text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-[#0F0F0F] leading-[1.05] tracking-tight mb-6">
            I build websites<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #F97316" }}>that get you</span><br />
            <span className="text-[#F97316]">clients.</span>
          </h1>

          <p className="text-[#6B7280] text-lg lg:text-xl max-w-lg leading-relaxed mb-10">
            Freelance web developer based in the UK. I build fast, beautiful websites for restaurants, local businesses, and startups — delivered in days, not months.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA6C0A] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-200"
            >
              Get a free quote →
            </a>
            <a
              href="#work"
              className="px-8 py-4 bg-white border border-[#E5E7EB] text-[#374151] font-medium rounded-xl hover:border-[#D1D5DB] transition-all duration-200"
            >
              See my work
            </a>
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-[#F3F4F6]">
            {[["10+", "Sites delivered"], ["5 days", "Average turnaround"], ["100%", "Client satisfaction"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-[#0F0F0F]">{n}</p>
                <p className="text-sm text-[#9CA3AF]">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#F97316] text-sm font-semibold tracking-wide uppercase mb-3">Recent work</p>
            <h2 className="text-4xl font-bold text-[#0F0F0F] tracking-tight">What I've built</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`group rounded-2xl overflow-hidden border ${p.highlight ? "border-[#F97316]/30 shadow-xl shadow-orange-50" : "border-[#E5E7EB]"} bg-white`}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={p.img} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  {p.highlight && (
                    <div className="absolute top-3 left-3 bg-[#F97316] text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-[#0F0F0F] text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg"
                    >
                      View live →
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-[#9CA3AF] text-xs font-medium uppercase tracking-wide mb-1">{p.type}</p>
                  <h3 className="font-bold text-[#0F0F0F] text-lg mb-2">{p.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] px-2.5 py-1 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="px-6 py-24 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#F97316] text-sm font-semibold tracking-wide uppercase mb-3">What I offer</p>
            <h2 className="text-4xl font-bold text-[#0F0F0F] tracking-tight">Services & pricing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#F97316]/30 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-[#0F0F0F] text-lg mb-2">{s.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{s.desc}</p>
                <p className="text-[#F97316] font-bold text-lg">{s.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#92400E] mb-1">Not sure what you need?</p>
              <p className="text-[#B45309] text-sm">Message me and I'll tell you exactly what I'd build for your business — no obligation.</p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA6C0A] transition-colors text-sm"
            >
              Ask for free
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#F97316] text-sm font-semibold tracking-wide uppercase mb-3">Simple process</p>
            <h2 className="text-4xl font-bold text-[#0F0F0F] tracking-tight">From idea to live in 5 days</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-0">
            {[
              { n: "01", title: "You message me", desc: "Tell me your business and what you need. WhatsApp or email, your choice." },
              { n: "02", title: "Free proposal", desc: "I send back exactly what I'll build, what it costs, and when it's ready." },
              { n: "03", title: "I build it", desc: "You sit back. I'll share progress daily and ask for feedback as I go." },
              { n: "04", title: "Live & yours", desc: "I deploy it, hand over the code, and you own it forever. Done." },
            ].map((step, i) => (
              <div key={step.n} className="relative p-6 border-l border-[#F3F4F6] first:border-l-0">
                <p className="text-5xl font-black text-[#F3F4F6] leading-none mb-4">{step.n}</p>
                <h3 className="font-bold text-[#0F0F0F] mb-2">{step.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-24 bg-[#FAFAF8]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-[#0F0F0F] tracking-tight">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-[#0F0F0F]">{faq.q}</span>
                  <span className={`text-[#9CA3AF] text-xl transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-24 bg-[#0F0F0F]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#F97316] text-sm font-semibold tracking-wide uppercase mb-4">Let's work together</p>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Ready to get started?</h2>
          <p className="text-[#9CA3AF] mb-10">Fill in your details and I'll reply within 2 hours with a free proposal.</p>

          <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-left space-y-4">
            <div>
              <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide mb-1.5">Your name</label>
              <input
                type="text" placeholder="e.g. Sarah Jones"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide mb-1.5">Your business</label>
              <input
                type="text" placeholder="e.g. The Golden Fork restaurant"
                value={form.business} onChange={e => setForm({ ...form, business: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide mb-1.5">What do you need?</label>
              <textarea
                placeholder="e.g. I need a website for my restaurant with online reservations..."
                rows={4} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#F97316]/50 resize-none"
              />
            </div>

            {sent ? (
              <div className="text-center py-4">
                <p className="text-[#10B981] font-semibold">WhatsApp opened! I'll reply within 2 hours ✓</p>
              </div>
            ) : (
              <button
                onClick={sendWhatsApp}
                className="w-full py-4 bg-[#F97316] text-white font-bold rounded-xl hover:bg-[#EA6C0A] transition-colors flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp — get a reply in 2 hours
              </button>
            )}
          </div>

          <p className="text-[#4B5563] text-xs mt-6">Or email directly: <a href="mailto:itachi44569@gmail.com" className="text-[#F97316] hover:underline">itachi44569@gmail.com</a></p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div className="bg-[#0F0F0F] border-t border-[#1A1A1A] px-6 py-6 text-center">
        <p className="text-[#4B5563] text-xs">© 2025 · Built with Next.js · Deployed on Vercel</p>
      </div>

    </div>
  );
}
