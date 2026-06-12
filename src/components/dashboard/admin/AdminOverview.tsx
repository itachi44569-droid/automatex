"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, FolderKanban, Calendar, Ticket, ArrowRight, Video,
  Clock, TrendingUp, Zap, MessageSquare, BarChart3, Shield,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAllUsers, useProjects, useMeetings, useTickets } from "@/lib/hooks/useFirestore";
import type { Timestamp } from "firebase/firestore";

const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 31000 },
  { month: "May", revenue: 28500 },
  { month: "Jun", revenue: 38200 },
];

const quickActions = [
  { href: "/admin/projects", label: "New Project", icon: FolderKanban, color: "from-blue-500 to-cyan-500", desc: "Create & assign" },
  { href: "/admin/meetings", label: "Schedule Meeting", icon: Calendar, color: "from-violet-500 to-purple-500", desc: "Book client call" },
  { href: "/admin/messages", label: "Send Message", icon: MessageSquare, color: "from-emerald-500 to-teal-500", desc: "Chat with clients" },
  { href: "/admin/clients", label: "View Clients", icon: Users, color: "from-amber-500 to-orange-500", desc: "Manage accounts" },
  { href: "/admin/revenue", label: "Revenue", icon: BarChart3, color: "from-pink-500 to-rose-500", desc: "Track earnings" },
  { href: "/admin/tickets", label: "Support Tickets", icon: Ticket, color: "from-indigo-500 to-blue-500", desc: "Resolve issues" },
];

function fmtDate(ts: Timestamp | null | undefined) {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function fmtTime(ts: Timestamp | null | undefined) {
  if (!ts) return "";
  return ts.toDate().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-border/50 rounded-xl p-3 text-xs shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-blue-400">Revenue: ${payload[0]?.value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function AdminOverview() {
  const { userProfile } = useAuth();
  const { users } = useAllUsers();
  const { projects } = useProjects("admin");
  const { meetings } = useMeetings("admin");
  const { tickets } = useTickets("admin");

  const clients = users.filter((u) => u.role === "client");
  const activeProjects = projects.filter((p) => p.status === "in_progress" || p.status === "pending" || p.status === "review");
  const upcomingMeetings = meetings.filter((m) => m.status === "scheduled");
  const openTickets = tickets.filter((t) => t.status === "open" || t.status === "in_progress");

  const recentClients = [...clients].slice(0, 5);
  const nextMeetings = [...upcomingMeetings].slice(0, 4);

  const firstName = userProfile?.displayName?.split(" ")[0] || "Admin";

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const kpis = [
    { label: "Total Clients", value: clients.length, icon: Users, color: "from-blue-500 to-cyan-500", href: "/admin/clients", sub: "registered accounts" },
    { label: "Active Projects", value: activeProjects.length, icon: FolderKanban, color: "from-violet-500 to-purple-500", href: "/admin/projects", sub: "in progress" },
    { label: "Upcoming Meetings", value: upcomingMeetings.length, icon: Calendar, color: "from-emerald-500 to-teal-500", href: "/admin/meetings", sub: "scheduled" },
    { label: "Open Tickets", value: openTickets.length, icon: Ticket, color: "from-amber-500 to-orange-500", href: "/admin/tickets", sub: "awaiting response" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card border border-border/50 rounded-2xl p-6 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-transparent">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Admin Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold font-display">Good day, {firstName} 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{today} · Everything looks great today</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/projects">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg gap-1.5">
                <Zap className="w-3.5 h-3.5" /> New Project
              </Button>
            </Link>
            <Link href="/admin/meetings">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Schedule
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={kpi.href} className="block glass-card border border-border/50 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl font-bold font-display">{kpi.value}</p>
                <p className="text-xs font-semibold text-foreground/80 mt-0.5">{kpi.label}</p>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card border border-border/50 rounded-2xl p-5">
        <h2 className="font-bold text-sm mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.href} href={a.href} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent transition-colors group text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight">{a.label}</p>
                  <p className="text-[10px] text-muted-foreground">{a.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Charts + lists row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart — demo data */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 glass-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground">Demo projection data · 6 months</p>
            </div>
            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +34% YoY
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4361ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#4361ff" strokeWidth={2} fill="url(#revGrad)" dot={{ fill: "#4361ff", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
            <p className="text-muted-foreground">Total (6mo)</p>
            <p className="font-bold text-base">${revenueData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</p>
          </div>
        </motion.div>

        {/* Upcoming meetings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card border border-border/50 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">Upcoming Meetings</h2>
            <Link href="/admin/meetings" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {nextMeetings.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <Calendar className="w-10 h-10 text-muted-foreground/20 mb-2" />
              <p className="text-xs text-muted-foreground">No meetings scheduled.</p>
              <Link href="/admin/meetings" className="mt-2">
                <Button size="sm" variant="outline" className="text-xs h-7 gap-1"><Calendar className="w-3 h-3" />Schedule one</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {nextMeetings.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-3 rounded-xl bg-accent/40 hover:bg-accent/70 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
                    <Video className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{m.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{m.clientName || "Client"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-blue-400 flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{fmtDate(m.date as Timestamp)}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{fmtTime(m.date as Timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent clients + project summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent clients */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card border border-border/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">Recent Clients</h2>
            <Link href="/admin/clients" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Users className="w-10 h-10 text-muted-foreground/20 mb-2" />
              <p className="text-xs text-muted-foreground">No clients registered yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentClients.map((client, i) => (
                <motion.div key={client.uid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(client.displayName || client.email || "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{client.displayName || "—"}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{client.company ? client.company : client.email}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {client.createdAt?.toDate?.()?.toLocaleDateString("en-US", { month: "short", day: "numeric" }) || "—"}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Project status breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card border border-border/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">Project Pipeline</h2>
            <Link href="/admin/projects" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FolderKanban className="w-10 h-10 text-muted-foreground/20 mb-2" />
              <p className="text-xs text-muted-foreground mb-2">No projects yet.</p>
              <Link href="/admin/projects">
                <Button size="sm" variant="outline" className="text-xs h-7 gap-1"><FolderKanban className="w-3 h-3" />Create project</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {(["pending", "in_progress", "review", "completed", "cancelled"] as const).map((status) => {
                const count = projects.filter((p) => p.status === status).length;
                const pct = projects.length > 0 ? Math.round((count / projects.length) * 100) : 0;
                const cfg: Record<string, { label: string; color: string; bar: string }> = {
                  pending: { label: "Pending", color: "text-amber-400", bar: "bg-amber-500" },
                  in_progress: { label: "In Progress", color: "text-blue-400", bar: "bg-blue-500" },
                  review: { label: "In Review", color: "text-violet-400", bar: "bg-violet-500" },
                  completed: { label: "Completed", color: "text-emerald-400", bar: "bg-emerald-500" },
                  cancelled: { label: "Cancelled", color: "text-red-400", bar: "bg-red-500" },
                };
                const c = cfg[status];
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${c.color}`}>{c.label}</span>
                      <span className="text-muted-foreground">{count} project{count !== 1 ? "s" : ""} · {pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${c.bar}`}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total projects</span>
                <span className="font-bold">{projects.length}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
