"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Video, Calendar, Clock, CheckCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMeetings, createMeeting, updateMeeting } from "@/lib/hooks/useFirestore";
import { useAllUsers } from "@/lib/hooks/useFirestore";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";
import type { Meeting } from "@/types";

const typeColor: Record<string, string> = {
  review: "from-blue-500 to-cyan-500",
  kickoff: "from-emerald-500 to-teal-500",
  discovery: "from-violet-500 to-purple-500",
  consultation: "from-amber-500 to-orange-500",
};

function fmtDate(ts: Timestamp | null | undefined) {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export function AdminMeetings() {
  const { meetings, loading } = useMeetings("admin");
  const { users } = useAllUsers();
  const clients = users.filter((u) => u.role === "client");

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", clientId: "", type: "review", date: "", time: "", duration: "30", meetingUrl: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const upcoming = meetings.filter((m) => m.status === "scheduled");
  const past = meetings.filter((m) => m.status === "completed");

  const handleCreate = async () => {
    if (!form.title || !form.clientId || !form.date || !form.time) { toast.error("Title, client, date and time are required"); return; }
    setSaving(true);
    try {
      const client = clients.find((c) => c.uid === form.clientId);
      const dateTime = new Date(`${form.date}T${form.time}`);
      await createMeeting({
        title: form.title,
        clientId: form.clientId,
        clientName: client?.displayName || client?.company || "",
        clientEmail: client?.email || "",
        type: form.type as Meeting["type"],
        date: Timestamp.fromDate(dateTime),
        duration: Number(form.duration),
        status: "scheduled",
        meetingUrl: form.meetingUrl,
        notes: form.notes,
      });
      toast.success("Meeting scheduled");
      setShowCreate(false);
      setForm({ title: "", clientId: "", type: "review", date: "", time: "", duration: "30", meetingUrl: "", notes: "" });
    } catch { toast.error("Failed to schedule meeting"); }
    finally { setSaving(false); }
  };

  const markComplete = async (id: string) => {
    try {
      await updateMeeting(id, { status: "completed" });
      toast.success("Meeting marked as completed");
    } catch { toast.error("Failed to update meeting"); }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Meetings" subtitle="Schedule and manage client meetings." />
        <Button onClick={() => setShowCreate(true)} className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg gap-1.5">
          <Plus className="w-4 h-4" /> Schedule Meeting
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Upcoming ({upcoming.length})</h2>
            {upcoming.length === 0 ? (
              <div className="glass-card border border-dashed border-border/50 rounded-2xl p-10 text-center">
                <Calendar className="w-10 h-10 text-blue-500/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No upcoming meetings. Schedule one above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {upcoming.map((meeting, i) => (
                  <motion.div key={meeting.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card border border-border/50 rounded-2xl p-5 hover:border-blue-500/30 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${typeColor[meeting.type] || "from-blue-500 to-violet-500"} flex items-center justify-center shrink-0`}>
                        <Video className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-0.5 truncate">{meeting.title}</h3>
                        <p className="text-xs text-muted-foreground">{meeting.clientName}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3 h-3" /><span>{fmtDate(meeting.date as Timestamp)}</span></div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3 h-3" /><span>{meeting.duration} minutes</span></div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => markComplete(meeting.id)} className="w-full h-8 text-xs gap-1.5 border-border/60">
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Complete
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Past Meetings ({past.length})</h2>
              <div className="glass-card border border-border/40 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/50 bg-accent/30"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Meeting</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Client</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th><th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th></tr></thead>
                  <tbody>
                    {past.map((m) => (
                      <tr key={m.id} className="border-b border-border/30 hover:bg-accent/20">
                        <td className="px-4 py-3 font-medium">{m.title}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{m.clientName}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{fmtDate(m.date as Timestamp)}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">Completed</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md glass-card border border-border/50">
          <DialogHeader><DialogTitle className="font-display">Schedule Meeting</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Client *</Label>
              <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-accent/50 focus:outline-none focus:border-blue-500/50">
                <option value="">Select a client...</option>
                {clients.map((c) => <option key={c.uid} value={c.uid}>{c.displayName || c.email} {c.company && `— ${c.company}`}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Meeting Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Weekly Progress Review" className="bg-accent/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-accent/50 focus:outline-none focus:border-blue-500/50">
                  {["discovery", "kickoff", "review", "consultation"].map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Duration (min)</Label>
                <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="30" className="bg-accent/50 border-border/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Date *</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-accent/50 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label>Time *</Label>
                <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="bg-accent/50 border-border/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Meeting URL (Zoom / Google Meet)</Label>
              <Input value={form.meetingUrl} onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })} placeholder="https://zoom.us/j/..." className="bg-accent/50 border-border/50" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleCreate} disabled={saving} className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0">
                {saving ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
