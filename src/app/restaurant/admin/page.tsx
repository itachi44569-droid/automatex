"use client";

import { useEffect, useState, useMemo } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Timestamp | null;
}

const statusColors: Record<Reservation["status"], string> = {
  pending: "text-[#C9A96E] border-[#C9A96E]/40 bg-[#C9A96E]/5",
  confirmed: "text-green-400 border-green-400/40 bg-green-400/5",
  cancelled: "text-red-400/70 border-red-400/30 bg-red-400/5",
};

function exportCSV(rows: Reservation[]) {
  const headers = ["Name", "Email", "Phone", "Date", "Time", "Guests", "Occasion", "Notes", "Status"];
  const lines = rows.map((r) =>
    [r.name, r.email, r.phone, r.date, r.time, r.guests, r.occasion, r.notes, r.status]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `aurum-reservations-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Reservation["status"]>("all");
  const [tab, setTab] = useState<"list" | "dashboard">("dashboard");

  useEffect(() => {
    const q = query(collection(db, "restaurant_reservations"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setReservations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation)));
      setLoading(false);
    });
  }, []);

  const setStatus = (id: string, status: Reservation["status"]) =>
    updateDoc(doc(db, "restaurant_reservations", id), { status });

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  // Upcoming reservations (confirmed, future dates)
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = reservations
    .filter((r) => r.status === "confirmed" && r.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  // Average party size
  const avgGuests = reservations.length
    ? (reservations.reduce((s, r) => s + (r.guests || 0), 0) / reservations.length).toFixed(1)
    : "—";

  // Reservations by time slot
  const slotCounts = useMemo(() => {
    const map: Record<string, number> = {};
    reservations.forEach((r) => { if (r.time) map[r.time] = (map[r.time] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [reservations]);

  const maxSlot = slotCounts[0]?.[1] || 1;

  // Reservations by guest count
  const guestBuckets = useMemo(() => {
    const b = { "1–2": 0, "3–4": 0, "5–6": 0, "7+": 0 };
    reservations.forEach((r) => {
      const g = r.guests;
      if (g <= 2) b["1–2"]++;
      else if (g <= 4) b["3–4"]++;
      else if (g <= 6) b["5–6"]++;
      else b["7+"]++;
    });
    return Object.entries(b);
  }, [reservations]);

  const maxBucket = Math.max(...guestBuckets.map(([, v]) => v), 1);

  return (
    <div className="min-h-screen bg-[#0C0B09] text-[#E8E0D0] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[#C9A96E] text-[8px] tracking-[0.6em] uppercase mb-2">Aurum Fine Dining</p>
            <h1 className="text-3xl font-bold text-[#F5F0E8]" style={{ fontFamily: "Georgia, serif" }}>
              Admin Panel
            </h1>
          </div>
          <div className="flex gap-3">
            {/* Tab switcher */}
            {(["dashboard", "list"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[8px] tracking-[0.3em] uppercase border px-5 py-2.5 transition-all duration-200 capitalize ${
                  tab === t
                    ? "border-[#C9A96E]/60 text-[#C9A96E] bg-[#C9A96E]/5"
                    : "border-[#1E1812] text-[#3A3028] hover:border-[#2A2218]"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              onClick={() => exportCSV(filtered)}
              className="text-[8px] tracking-[0.3em] uppercase border border-[#1E1812] text-[#3A3028] hover:border-[#C9A96E]/40 hover:text-[#C9A96E] px-5 py-2.5 transition-all duration-200"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setTab("list"); }}
              className={`border p-5 text-left transition-all duration-300 ${
                filter === s && tab === "list"
                  ? "border-[#C9A96E]/50 bg-[#C9A96E]/5"
                  : "border-[#1E1812] hover:border-[#2A2218]"
              }`}
            >
              <p className="text-2xl font-bold text-[#F5F0E8] mb-1">{counts[s]}</p>
              <p className="text-[8px] tracking-[0.3em] uppercase text-[#4A3D2E] capitalize">{s}</p>
            </button>
          ))}
          <div className="border border-[#1E1812] p-5">
            <p className="text-2xl font-bold text-[#F5F0E8] mb-1">{avgGuests}</p>
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#4A3D2E]">Avg. party size</p>
          </div>
          <div className="border border-[#1E1812] p-5">
            <p className="text-2xl font-bold text-[#F5F0E8] mb-1">
              {counts.confirmed > 0 ? Math.round((counts.confirmed / counts.all) * 100) : 0}%
            </p>
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#4A3D2E]">Confirmation rate</p>
          </div>
        </div>

        {loading ? (
          <p className="text-[#3A3028] text-sm text-center py-20">Loading…</p>
        ) : tab === "dashboard" ? (
          <div className="grid md:grid-cols-2 gap-5">
            {/* Upcoming reservations */}
            <div className="border border-[#1E1812] p-7">
              <h3 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7">Upcoming Confirmed</h3>
              {upcoming.length === 0 ? (
                <p className="text-[#2A2218] text-sm">No upcoming confirmed reservations.</p>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-3 border-b border-[#131110] last:border-0">
                      <div>
                        <p className="text-[#D4C4A8] text-sm font-medium">{r.name}</p>
                        <p className="text-[#3A3028] text-[10px] mt-0.5">{r.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#C9A96E] text-xs">{r.date} · {r.time}</p>
                        <p className="text-[#3A3028] text-[10px] mt-0.5">{r.guests} guests</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular time slots chart */}
            <div className="border border-[#1E1812] p-7">
              <h3 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7">Popular Time Slots</h3>
              {slotCounts.length === 0 ? (
                <p className="text-[#2A2218] text-sm">No data yet.</p>
              ) : (
                <div className="space-y-4">
                  {slotCounts.map(([time, count]) => (
                    <div key={time} className="flex items-center gap-4">
                      <span className="text-[#6B5A45] text-xs w-12 text-right">{time}</span>
                      <div className="flex-1 h-6 bg-[#131110] relative overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C9A96E]/60 to-[#C9A96E]/30 transition-all duration-500"
                          style={{ width: `${(count / maxSlot) * 100}%` }}
                        />
                      </div>
                      <span className="text-[#4A3D2E] text-xs w-6">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Party size distribution */}
            <div className="border border-[#1E1812] p-7">
              <h3 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-7">Party Size Distribution</h3>
              <div className="flex items-end gap-4 h-32">
                {guestBuckets.map(([label, count]) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[#4A3D2E] text-[10px]">{count}</span>
                    <div
                      className="w-full bg-gradient-to-t from-[#C9A96E]/50 to-[#C9A96E]/20 transition-all duration-500"
                      style={{ height: `${maxBucket > 0 ? (count / maxBucket) * 80 : 0}px`, minHeight: count > 0 ? 4 : 0 }}
                    />
                    <span className="text-[#3A3028] text-[9px] tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Private dining */}
            <div className="border border-[#1E1812] p-7">
              <h3 className="text-[8px] tracking-[0.4em] uppercase text-[#4A3D2E] mb-5">Private Dining Enquiries</h3>
              <a
                href="/restaurant/admin/private-dining"
                className="inline-block text-[8px] tracking-[0.3em] uppercase border border-[#2A2218] text-[#4A3D2E] px-5 py-2.5 hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all"
              >
                View Private Dining →
              </a>
              <p className="text-[#2A2218] text-xs mt-5">Enquiries are stored in Firestore under <code className="text-[#3A3028]">private_dining_enquiries</code>.</p>
            </div>
          </div>
        ) : (
          /* Reservations list */
          <>
            {/* Filter bar */}
            <div className="flex gap-2 mb-5">
              {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`text-[8px] tracking-[0.2em] uppercase border px-4 py-2 transition-all duration-200 capitalize ${
                    filter === s
                      ? "border-[#C9A96E]/50 text-[#C9A96E] bg-[#C9A96E]/5"
                      : "border-[#1E1812] text-[#3A3028] hover:border-[#2A2218]"
                  }`}
                >
                  {s} ({counts[s]})
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="border border-[#1E1812] py-20 text-center">
                <p className="text-[#3A3028] text-sm">No reservations.</p>
              </div>
            ) : (
              <div className="border border-[#1E1812] overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_0.6fr_1fr_1.2fr] gap-4 px-5 py-4 border-b border-[#1E1812] bg-[#0A0908]">
                  {["Guest", "Contact", "Date", "Time", "Pax", "Occasion", "Status"].map((h) => (
                    <span key={h} className="text-[8px] tracking-[0.35em] uppercase text-[#3A3028] font-medium">{h}</span>
                  ))}
                </div>
                {filtered.map((r, i) => (
                  <div
                    key={r.id}
                    className={`grid grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_0.6fr_1fr_1.2fr] gap-4 px-5 py-4 items-center hover:bg-[#0F0E0B] transition-colors ${
                      i < filtered.length - 1 ? "border-b border-[#131110]" : ""
                    }`}
                  >
                    <div>
                      <p className="text-[#D4C4A8] text-sm font-medium truncate">{r.name}</p>
                      {r.notes && <p className="text-[#3A3028] text-[10px] mt-0.5 truncate">{r.notes}</p>}
                    </div>
                    <div>
                      <p className="text-[#6B5A45] text-xs truncate">{r.email}</p>
                      {r.phone && <p className="text-[#3A3028] text-[10px] mt-0.5">{r.phone}</p>}
                    </div>
                    <p className="text-[#6B5A45] text-xs">{r.date}</p>
                    <p className="text-[#6B5A45] text-xs">{r.time}</p>
                    <p className="text-[#6B5A45] text-xs">{r.guests}</p>
                    <p className="text-[#4A3D2E] text-[10px] capitalize truncate">{r.occasion || "—"}</p>
                    <div className="flex gap-1">
                      {(["confirmed", "pending", "cancelled"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(r.id, s)}
                          title={s}
                          className={`text-[8px] tracking-[0.1em] border px-2 py-1 transition-all duration-200 ${
                            r.status === s ? statusColors[s] : "text-[#2A2218] border-[#1A1612] hover:border-[#2A2218]"
                          }`}
                        >
                          {s === "confirmed" ? "✓" : s === "cancelled" ? "✗" : "~"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <p className="text-[8px] tracking-[0.25em] text-[#1E1A16] uppercase text-center mt-10">
          Aurum Fine Dining · Admin · Live via Firestore
        </p>
      </div>
    </div>
  );
}
