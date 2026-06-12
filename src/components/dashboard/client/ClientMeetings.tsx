"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Video, ExternalLink } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useMeetings } from "@/lib/hooks/useFirestore";
import type { Timestamp } from "firebase/firestore";

const typeColor: Record<string, string> = {
  review: "from-blue-500 to-cyan-500",
  kickoff: "from-emerald-500 to-teal-500",
  discovery: "from-violet-500 to-purple-500",
  consultation: "from-amber-500 to-orange-500",
};

function fmtDate(ts: Timestamp | null | undefined) {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function fmtTime(ts: Timestamp | null | undefined) {
  if (!ts) return "—";
  return ts.toDate().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
}

export function ClientMeetings() {
  const { user } = useAuth();
  const { meetings, loading } = useMeetings(user?.uid);

  const upcoming = meetings.filter((m) => m.status === "scheduled");
  const past = meetings.filter((m) => m.status === "completed");

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Meetings & Calls" subtitle="Your scheduled and past meetings." />
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Upcoming ({upcoming.length})</h2>
          {upcoming.length === 0 ? (
            <div className="glass-card border border-dashed border-border/50 rounded-2xl p-8 text-center">
              <Calendar className="w-10 h-10 text-blue-500/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming meetings scheduled.</p>
              <p className="text-xs text-muted-foreground mt-1">Your project manager will schedule meetings here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming.map((meeting, i) => (
                <motion.div key={meeting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card border border-border/50 rounded-2xl p-5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColor[meeting.type] || "from-blue-500 to-violet-500"} flex items-center justify-center shrink-0`}>
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{meeting.title}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" /><span>{fmtDate(meeting.date as Timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /><span>{fmtTime(meeting.date as Timestamp)} · {meeting.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {meeting.meetingUrl && (
                    <div className="mt-4 flex gap-2">
                      <a href={meeting.meetingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 h-8 text-xs">
                          <Video className="w-3.5 h-3.5 mr-1.5" /> Join Meeting
                        </Button>
                      </a>
                      <a href={meeting.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="h-8 text-xs border-border/60"><ExternalLink className="w-3.5 h-3.5" /></Button>
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Past Meetings ({past.length})</h2>
            <div className="space-y-3">
              {past.map((meeting, i) => (
                <motion.div key={meeting.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card border border-border/40 rounded-xl p-4 opacity-70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Video className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{meeting.title}</p>
                        <p className="text-xs text-muted-foreground">{fmtDate(meeting.date as Timestamp)}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">Completed</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
