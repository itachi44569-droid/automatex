"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertCircle, Clock, CheckCircle2, MoreHorizontal } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const tickets = [
  { id: "T-001", title: "Chatbot not responding on mobile", client: "TechScale Solutions", status: "open", priority: "high", category: "Bug Report", assignedTo: "Emma C.", createdAt: "Jun 10", updatedAt: "2h ago", messages: 3 },
  { id: "T-002", title: "CRM integration sync issue", client: "GrowthPath Agency", status: "in_progress", priority: "urgent", category: "Bug Report", assignedTo: "Luca F.", createdAt: "Jun 11", updatedAt: "1h ago", messages: 7 },
  { id: "T-003", title: "How to export analytics data?", client: "Nexus Digital", status: "open", priority: "medium", category: "Question", assignedTo: "James W.", createdAt: "Jun 11", updatedAt: "4h ago", messages: 2 },
  { id: "T-004", title: "Add FAQ category to chatbot", client: "TechScale Solutions", status: "in_progress", priority: "low", category: "Feature Request", assignedTo: "Emma C.", createdAt: "Jun 8", updatedAt: "1d ago", messages: 5 },
  { id: "T-005", title: "Lead scoring formula adjustment", client: "DataSync GmbH", status: "waiting", priority: "medium", category: "Change Request", assignedTo: "Priya S.", createdAt: "Jun 9", updatedAt: "2d ago", messages: 4 },
  { id: "T-006", title: "WhatsApp integration setup", client: "LuxeGroup", status: "resolved", priority: "high", category: "Question", assignedTo: "Luca F.", createdAt: "Jun 5", updatedAt: "Jun 7", messages: 11 },
  { id: "T-007", title: "Performance degradation report", client: "Velocity Commerce", status: "resolved", priority: "urgent", category: "Bug Report", assignedTo: "Emma C.", createdAt: "Jun 3", updatedAt: "Jun 6", messages: 15 },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  open: { icon: AlertCircle, color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/30" },
  in_progress: { icon: Clock, color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/30" },
  waiting: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/30" },
  resolved: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/30" },
  closed: { icon: CheckCircle2, color: "text-muted-foreground", bg: "bg-muted/20 border-border" },
};

const priorityColor: Record<string, string> = {
  low: "bg-slate-500/20 text-slate-400",
  medium: "bg-amber-500/20 text-amber-400",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400",
};

export function AdminTickets() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = tickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.client.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const urgentCount = tickets.filter((t) => t.priority === "urgent" && t.status !== "resolved").length;

  return (
    <div>
      <DashboardHeader title="Support Tickets" subtitle={`${openCount} open · ${urgentCount} urgent`} />

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {["all", "open", "in_progress", "waiting", "resolved"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === s ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "glass-card border border-border/50 text-muted-foreground hover:text-foreground"}`}>
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card border border-border/50 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {["Ticket", "Client", "Priority", "Assigned", "Messages", "Updated", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket, i) => {
              const sc = statusConfig[ticket.status];
              const StatusIcon = sc.icon;
              const pc = priorityColor[ticket.priority];
              return (
                <motion.tr
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/30 hover:bg-accent/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2.5">
                      <StatusIcon className={`w-4 h-4 mt-0.5 shrink-0 ${sc.color}`} />
                      <div>
                        <p className="text-sm font-medium">{ticket.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                          <Badge variant="outline" className="text-[10px] h-4 px-1.5">{ticket.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{ticket.client}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${pc}`}>{ticket.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{ticket.assignedTo}</td>
                  <td className="px-4 py-3 text-xs text-center text-muted-foreground">{ticket.messages}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{ticket.updatedAt}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border border-border/50 w-40">
                        <DropdownMenuItem className="text-xs">Open Ticket</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Reassign</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Mark Resolved</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
