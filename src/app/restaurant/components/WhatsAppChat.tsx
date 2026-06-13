"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "33123456789"; // Replace with real number

const QUICK_MESSAGES = [
  "I'd like to make a reservation",
  "Tell me about the tasting menu",
  "Private dining enquiry",
  "Gift card information",
];

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const sendToWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(`Hi Aurum, ${text}${name ? ` — ${name}` : ""}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  const handleSend = () => {
    if (!msg.trim()) return;
    sendToWhatsApp(msg);
    setMsg("");
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-[9990] flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] bg-[#0C1C10] border border-[#1A3520] shadow-2xl shadow-black/60 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#0A1A0D] border-b border-[#1A3520] px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* WhatsApp icon */}
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#D4C4A8] text-sm font-medium">Aurum Concierge</p>
                    <p className="text-[#25D366] text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                      Online now
                    </p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-[#4A3D2E] hover:text-[#7A6A55] transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-5">
                {/* Greeting bubble */}
                <div className="bg-[#0A1A0D] border border-[#1A3520] rounded-tr-xl rounded-br-xl rounded-bl-xl px-4 py-3 mb-5">
                  <p className="text-[#D4C4A8] text-xs leading-relaxed">
                    Bonjour! I'm the Aurum concierge team. How can we help you today? 🥂
                  </p>
                  <p className="text-[#3A3028] text-[10px] mt-1">Aurum · Just now</p>
                </div>

                {/* Quick replies */}
                <p className="text-[#4A3D2E] text-[10px] uppercase tracking-[0.2em] mb-3">Quick messages</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {QUICK_MESSAGES.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendToWhatsApp(q)}
                      className="text-[10px] border border-[#1A3520] text-[#7A6A55] px-3 py-1.5 hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Name input */}
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A1A0D] border border-[#1A3520] px-3 py-2 text-xs text-[#D4C4A8] placeholder-[#3A3028] focus:outline-none focus:border-[#C9A96E]/40 mb-2"
                />

                {/* Message input + send */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message…"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 bg-[#0A1A0D] border border-[#1A3520] px-3 py-2 text-xs text-[#D4C4A8] placeholder-[#3A3028] focus:outline-none focus:border-[#C9A96E]/40"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#25D366] px-3 py-2 text-white text-[10px] font-bold tracking-wide hover:bg-[#22c55e] transition-colors"
                  >
                    Send
                  </button>
                </div>

                <p className="text-[#2A3028] text-[10px] mt-3 text-center">Opens WhatsApp · Typical reply in 5 min</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen((p) => !p)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-14 h-14 bg-[#25D366] shadow-lg shadow-black/40 flex items-center justify-center relative"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {!open && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C9A96E] rounded-full border-2 border-[#0C1C10]" />
          )}
        </motion.button>
      </div>
    </>
  );
}
