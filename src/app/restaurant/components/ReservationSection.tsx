"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import TableSelector from "./TableSelector";

const inputClass =
  "w-full bg-transparent border border-[#2A2218] text-[#D4C4A8] placeholder-[#3A3028] px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E]/60 transition-colors duration-300";

const labelClass = "block text-[8px] tracking-[0.35em] uppercase text-[#4A3D2E] mb-2.5 font-medium";

export default function ReservationSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", guests: "2",
    occasion: "", notes: "", tableId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { tableId, ...rest } = form;
      await addDoc(collection(db, "restaurant_reservations"), {
        ...rest,
        guests: Number(form.guests),
        createdAt: serverTimestamp(),
        status: "pending",
        tablePreference: tableId || "No preference",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please call us directly or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-24 lg:py-44 px-6 bg-[#0E0B08] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1549488297-2b79f7f2768e?w=1920&q=20&auto=format&fit=crop" alt="" aria-hidden className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-[#0E0B08]/70" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-[#C9A96E]/40" /> Reservations <span className="w-10 h-px bg-[#C9A96E]/40" />
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#F5F0E8] mb-5 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Reserve Your{" "}
            <span className="text-[#C9A96E] italic">Table</span>
          </h2>
          <p className="text-[#4A3D2E] text-xs tracking-[0.1em] leading-loose max-w-sm mx-auto">
            We recommend booking at least 2 weeks in advance.
            <br />
            For parties of 8+, please call us directly.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center border border-[#2A2218] py-20 px-10"
          >
            <div className="w-16 h-px bg-[#C9A96E] mx-auto mb-10" />
            <p className="text-[#C9A96E] text-[9px] tracking-[0.6em] uppercase mb-5">Reservation Received</p>
            <h3
              className="text-2xl font-bold text-[#F5F0E8] mb-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              We look forward to welcoming you.
            </h3>
            <p className="text-[#4A3D2E] text-sm">
              A confirmation will be sent to your email within 24 hours.
            </p>
            <div className="w-16 h-px bg-[#C9A96E] mx-auto mt-10" />
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="border border-[#1E1812] p-8 md:p-12 space-y-7"
          >
            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input required value={form.name} onChange={set("name")} placeholder="Jean-Pierre Moreau" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="jean@example.com" className={inputClass} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone Number</label>
              <input value={form.phone} onChange={set("phone")} placeholder="+33 1 XX XX XX XX" className={inputClass} />
            </div>

            {/* Date + Time + Guests */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={`${labelClass} flex items-center gap-1.5`}>
                  <Calendar className="w-3 h-3" /> Date *
                </label>
                <input required type="date" value={form.date} onChange={set("date")} className={inputClass} />
              </div>
              <div>
                <label className={`${labelClass} flex items-center gap-1.5`}>
                  <Clock className="w-3 h-3" /> Time *
                </label>
                <select required value={form.time} onChange={set("time")} className={inputClass}>
                  <option value="">Select</option>
                  {["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`${labelClass} flex items-center gap-1.5`}>
                  <Users className="w-3 h-3" /> Guests *
                </label>
                <select value={form.guests} onChange={set("guests")} className={inputClass}>
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Occasion */}
            <div>
              <label className={labelClass}>Special Occasion</label>
              <select value={form.occasion} onChange={set("occasion")} className={inputClass}>
                <option value="">None</option>
                <option value="birthday">Birthday Celebration</option>
                <option value="anniversary">Anniversary</option>
                <option value="proposal">Marriage Proposal</option>
                <option value="business">Business Dinner</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Table selector */}
            <div>
              <TableSelector
                selected={form.tableId}
                onSelect={(id) => setForm((prev) => ({ ...prev, tableId: id }))}
              />
            </div>

            {/* Notes */}
            <div>
              <label className={`${labelClass} flex items-center gap-1.5`}>
                <MessageSquare className="w-3 h-3" /> Special Requests &amp; Dietary Requirements
              </label>
              <textarea
                value={form.notes}
                onChange={set("notes")}
                rows={3}
                placeholder="Allergies, dietary restrictions, special arrangements..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400/80 text-xs text-center tracking-wide">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] text-[#0C0B09] py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4B47A] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A96E]/15 hover:-translate-y-0.5"
            >
              {loading ? "Sending Request..." : "Request Reservation"}
            </button>

            <p className="text-center text-[8px] tracking-[0.25em] text-[#2A2218] uppercase">
              Confirmed by email within 24 hours · Cancellation up to 48h before
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
