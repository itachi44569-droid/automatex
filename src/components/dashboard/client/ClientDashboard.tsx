"use client";

import { motion } from "framer-motion";
import { FolderKanban, Ticket, Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/lib/hooks/useFirestore";
import { useMeetings } from "@/lib/hooks/useFirestore";
import { useTickets } from "@/lib/hooks/useFirestore";
import type { Timestamp } from "firebase/firestore";

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  review: { label: "In Review", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
  completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const priorityConfig: Record<string, string> = {
  low: "bg-slate-500/20 text-slate-400",
  medium: "bg-amber-500/20 text-amber-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400",
};

function formatDate(ts: Timestamp | null | undefined) {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ClientDashboard() {
  const { user, userProfile } = useAuth();
  const firstName = userProfile?.displayName?.split(" ")[0] || "there";
  const { projects } = useProjects(user?.uid);
  const { meetings } = useMeetings(user?.uid);
  const { tickets } = useTickets(user?.uid);

  const activeProjects = projects.filter((p) => p.status !== "completed" && p.status !== "cancelled");
  const openTickets = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed");
  const upcomingMeetings = meetings.filter((m) => m.status === "scheduled");
  const completedProjects = projects.filter((p) => p.status === "completed");

  const nextMeeting = upcomingMeetings[0];
  const nextMeetingLabel = nextMeeting
    ? formatDate(nextMeeting.date as Timestamp)
    : "None scheduled";

  const stats = [
    { label: "Active Projects", value: String(activeProjects.length), icon: FolderKanban, color: "from-blue-500 to-cyan-500", change: `${completedProjects.length} completed` },
    { label: "Open Tickets", value: String(openTickets.length), icon: Ticket, color: "from-violet-500 to-purple-500", change: openTickets.some((t) => t.priority === "urgent") ? "1 urgent" : "All normal priority" },
    { label: "Next Meeting", value: upcomingMeetings.length > 0 ? `${upcomingMeetings.length}` : "—", icon: Calendar, color: "from-emerald-500 to-teal-500", change: nextMeetingLabel },
    { label: "Tasks Completed", value: String(completedProjects.length), icon: CheckCircle2, color: "from-amber-500 to-orange-500", change: "Total projects done" },
  ];

  return (
    <div>
      <DashboardHeader
        title={`Welcome back, ${firstName} 👋`}
        subtitle="Here's what's happening with your projects today."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card border border-border/50 rounded-2xl p-4 lg:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-xs font-medium text-foreground/80 mt-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base">Active Projects</h2>
            <Link href="/client/projects" className="text-xs text-blue-500 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {activeProjects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <FolderKanban className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No active projects yet.</p>
              <p className="text-xs mt-1">Your project manager will create projects here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeProjects.slice(0, 3).map((project) => {
                const sc = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.pending;
                const pc = priorityConfig[project.priority] || priorityConfig.medium;
                return (
                  <div key={project.id} className="p-4 bg-accent/40 rounded-xl border border-border/40 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-sm font-semibold leading-tight">{project.title}</h3>
                      <div className="flex gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${sc.color}`}>{sc.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${pc}`}>{project.priority}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={project.progress} className="flex-1 h-1.5" />
                      <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Due {formatDate(project.dueDate as Timestamp)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm">Upcoming Meetings</h2>
              <Link href="/client/meetings" className="text-xs text-blue-500 hover:underline">View all</Link>
            </div>
            {upcomingMeetings.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No meetings scheduled.</p>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.slice(0, 2).map((m) => (
                  <div key={m.id} className="p-3 bg-accent/40 rounded-xl border border-border/40">
                    <p className="text-xs font-semibold leading-tight mb-1">{m.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(m.date as Timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm">AI Assistant</h2>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Get personalised automation recommendations for your business.</p>
            <Link href="/client/ai-assistant">
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                Open AI Consultant →
              </button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm">Support Tickets</h2>
              <Link href="/client/tickets" className="text-xs text-blue-500 hover:underline">View all</Link>
            </div>
            {openTickets.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-3">No open tickets.</p>
            ) : (
              <div className="space-y-3">
                {openTickets.slice(0, 2).map((t) => (
                  <div key={t.id} className="p-3 bg-accent/40 rounded-xl border border-border/40">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-semibold leading-tight">{t.title}</p>
                      {(t.priority === "urgent" || t.priority === "high") && <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />}
                    </div>
                    <Badge variant="outline" className="text-xs h-4 px-1.5 capitalize">{t.status.replace("_", " ")}</Badge>
                  </div>
                ))}
              </div>
            )}
            <Link href="/client/tickets">
              <button className="w-full mt-2 py-2 rounded-xl border border-dashed border-border/60 text-xs text-muted-foreground hover:text-foreground hover:border-blue-500/40 transition-colors">
                + Open new ticket
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
