"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const inputClass =
  "w-full bg-transparent border border-[#2A2218] text-[#D4C4A8] placeholder-[#3A3028] px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E]/60 transition-colors duration-300";
const labelClass = "block text-[8px] tracking-[0.35em] uppercase text-[#4A3D2E] mb-2.5 font-medium";

const eventTypes = [
  { id: "corporate", label: "Corporate Dinner", icon: "◈", cap: "Up to 80 guests" },
  { id: "wedding", label: "Wedding Dinner", icon: "◇", cap: "Up to 120 guests" },
  { id: "birthday", label: "Private Celebration", icon: "◆", cap: "Up to 40 guests" },
  { id: "launch", label: "Product Launch", icon: "◉", cap: "Up to 60 guests" },
];

export default function PrivateDiningSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "",
    date: "", guests: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "private_dining_enquiries"), {
        ...form,
        guests: Number(form.guests) || 0,
        createdAt: serverTimestamp(),
        status: "new",
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="private-dining" className="py-24 lg:py-40 px-6 border-t border-[#1A1612] bg-[#0A0908]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Private Dining <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] tracking-tight mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your Event,{" "}
            <span className="text-[#C9A96E] italic">Elevated</span>
          </h2>
          <p className="text-[#4A3D2E] text-xs leading-loose tracking-[0.1em] max-w-lg mx-auto">
            Aurum's private dining rooms offer an exclusive setting for corporate entertaining,
            celebrations, and intimate gatherings — each event curated with the same devotion as our tasting menu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — image + event types */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden mb-8"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop"
                alt="Private dining at Aurum"
                className="w-full h-full object-cover object-center"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-[#0C0B09]/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/60 to-transparent" />
              <div className="absolute bottom-7 left-7">
                <p className="text-[#C9A96E] text-[8px] tracking-[0.4em] uppercase mb-1">The Salon Privé</p>
                <p className="text-[#8B7355] text-xs">Up to 120 guests · Full venue hire available</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-[#1E1812] p-5 hover:border-[#C9A96E]/30 transition-all duration-300 group"
                >
                  <span className="text-[#C9A96E]/60 text-xl group-hover:text-[#C9A96E] transition-colors duration-300 block mb-3">
                    {ev.icon}
                  </span>
                  <p className="text-[#D4C4A8] text-sm font-medium mb-1">{ev.label}</p>
                  <p className="text-[#3A3028] text-[10px] tracking-[0.1em]">{ev.cap}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[#2A2218] py-16 px-10 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-px bg-[#C9A96E] mb-8" />
                  <p className="text-[#C9A96E] text-[8px] tracking-[0.5em] uppercase mb-4">Enquiry Received</p>
                  <h3 className="text-xl font-bold text-[#F5F0E8] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                    Thank you, we'll be in touch.
                  </h3>
                  <p className="text-[#4A3D2E] text-sm">Our events team will reach out within 24 hours.</p>
                  <div className="w-12 h-px bg-[#C9A96E] mt-8" />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="border border-[#1E1812] p-8 space-y-6"
                >
                  <p className="text-[#4A3D2E] text-[8px] tracking-[0.3em] uppercase font-medium mb-2">Enquiry Form</p>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input required value={form.name} onChange={set("name")} placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input required type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Phone</label>
                    <input value={form.phone} onChange={set("phone")} placeholder="+33 1 XX XX XX XX" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Event Type *</label>
                    <select required value={form.eventType} onChange={set("eventType")} className={inputClass}>
                      <option value="">Select an event type</option>
                      {eventTypes.map((ev) => (
                        <option key={ev.id} value={ev.id}>{ev.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={`${labelClass} flex items-center gap-1.5`}>
                        <Calendar className="w-3 h-3" /> Preferred Date *
                      </label>
                      <input required type="date" value={form.date} onChange={set("date")} className={inputClass} />
                    </div>
                    <div>
                      <label className={`${labelClass} flex items-center gap-1.5`}>
                        <Users className="w-3 h-3" /> Number of Guests *
                      </label>
                      <input
                        required type="number" min="10" max="200"
                        value={form.guests} onChange={set("guests")}
                        placeholder="e.g. 45" className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`${labelClass} flex items-center gap-1.5`}>
                      <MessageSquare className="w-3 h-3" /> Event Details & Requirements
                    </label>
                    <textarea
                      value={form.notes} onChange={set("notes")} rows={4}
                      placeholder="Tell us about your event, any special requirements, menu preferences..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error && <p className="text-red-400/70 text-xs text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C9A96E] text-[#0C0B09] py-5 text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4B47A] disabled:opacity-60 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {loading ? "Sending…" : "Submit Enquiry"}
                  </button>
                  <p className="text-[8px] text-center text-[#2A2218] tracking-[0.2em] uppercase">
                    Response within 24 hours · Bespoke menus available
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
