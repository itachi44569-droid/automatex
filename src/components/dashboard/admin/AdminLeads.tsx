"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";

const leads: Array<{
  id: string; name: string; company: string; email: string; country: string;
  status: LeadStatus; source: string; value: number; service: string; followUp: string;
}> = [
  { id: "1", name: "David Park", company: "InnovateTech", email: "david@innovatetech.com", country: "🇺🇸 USA", status: "proposal", source: "Website", value: 15000, service: "AI Chatbots", followUp: "Jun 14" },
  { id: "2", name: "Charlotte Webb", company: "ScaleUp Ltd", email: "charlotte@scaleup.co.uk", country: "🇬🇧 UK", status: "qualified", source: "Referral", value: 8500, service: "CRM Automation", followUp: "Jun 13" },
  { id: "3", name: "Hans Müller", company: "AutoFlow AG", email: "hans@autoflow.de", country: "🇩🇪 Germany", status: "contacted", source: "LinkedIn", value: 22000, service: "Custom AI", followUp: "Jun 15" },
  { id: "4", name: "Maria Santos", company: "GrowEasy", email: "maria@groweasy.pt", country: "🇵🇹 Portugal", status: "new", source: "Cold Email", value: 6500, service: "Lead Generation", followUp: "Jun 12" },
  { id: "5", name: "Tom Bradley", company: "NexGen Corp", email: "tom@nexgen.com", country: "🇺🇸 USA", status: "negotiation", source: "Website", value: 35000, service: "Custom AI", followUp: "Jun 13" },
  { id: "6", name: "Isabelle Martin", company: "CloudOps", email: "isabelle@cloudops.fr", country: "🇫🇷 France", status: "won", source: "Referral", value: 12000, service: "Workflow Automation", followUp: "—" },
  { id: "7", name: "Ryan O'Brien", company: "DigitalBoost", email: "ryan@digitalboost.ie", country: "🇮🇪 Ireland", status: "lost", source: "Event", value: 9000, service: "AI Agents", followUp: "—" },
];

const columns: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"];

const colConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20" },
  contacted: { label: "Contacted", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  qualified: { label: "Qualified", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  proposal: { label: "Proposal", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  negotiation: { label: "Negotiation", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  won: { label: "Won ✓", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  lost: { label: "Lost", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

export function AdminLeads() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  const totalPipelineValue = leads.filter((l) => !["won", "lost"].includes(l.status)).reduce((s, l) => s + l.value, 0);
  const wonValue = leads.filter((l) => l.status === "won").reduce((s, l) => s + l.value, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="CRM — Lead Pipeline" subtitle={`${leads.length} leads · $${totalPipelineValue.toLocaleString()} pipeline`} />
        <Button className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Add Lead
        </Button>
      </div>

      {/* Summary strip */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-1">
        {[
          { label: "Total Pipeline", value: `$${totalPipelineValue.toLocaleString()}`, color: "text-blue-400" },
          { label: "Won (MTD)", value: `$${wonValue.toLocaleString()}`, color: "text-emerald-400" },
          { label: "Active Leads", value: leads.filter((l) => !["won", "lost"].includes(l.status)).length, color: "text-violet-400" },
          { label: "Avg Deal Size", value: `$${Math.round(leads.reduce((s, l) => s + l.value, 0) / leads.length).toLocaleString()}`, color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="glass-card border border-border/50 rounded-xl px-4 py-3 shrink-0">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-lg font-bold font-display ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex rounded-lg border border-border/50 overflow-hidden">
          {(["kanban", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${view === v ? "bg-blue-500/20 text-blue-400" : "text-muted-foreground hover:text-foreground"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "kanban" ? (
        /* Kanban board */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((status) => {
            const col = colConfig[status];
            const colLeads = filtered.filter((l) => l.status === status);
            return (
              <div key={status} className="shrink-0 w-64">
                <div className={`flex items-center justify-between px-3 py-2 rounded-xl border mb-3 ${col.bg}`}>
                  <span className={`text-xs font-semibold ${col.color}`}>{col.label}</span>
                  <span className={`text-xs font-bold ${col.color}`}>{colLeads.length}</span>
                </div>
                <div className="space-y-2.5">
                  {colLeads.map((lead, i) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card border border-border/50 rounded-xl p-3 hover:border-blue-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <div>
                          <p className="text-xs font-semibold">{lead.name}</p>
                          <p className="text-[10px] text-muted-foreground">{lead.company}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-0.5 rounded hover:bg-accent text-muted-foreground">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card border border-border/50 w-36">
                            <DropdownMenuItem className="text-xs gap-2"><Mail className="w-3 h-3" />Email</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs gap-2"><Phone className="w-3 h-3" />Call</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs gap-2"><Calendar className="w-3 h-3" />Schedule</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-1.5">{lead.service} · {lead.country}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                          <DollarSign className="w-3 h-3" />{lead.value.toLocaleString()}
                        </span>
                        {lead.followUp !== "—" && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5" />{lead.followUp}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <div className="glass-card border border-border/50 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Lead", "Service", "Value", "Status", "Source", "Follow-up", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const col = colConfig[lead.status];
                return (
                  <tr key={lead.id} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.company} · {lead.country}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{lead.service}</td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-500">${lead.value.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${col.bg} ${col.color}`}>{col.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{lead.source}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{lead.followUp}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border border-border/50 w-40">
                          <DropdownMenuItem className="text-xs gap-2"><Mail className="w-3.5 h-3.5" />Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2"><Phone className="w-3.5 h-3.5" />Call Lead</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2"><Calendar className="w-3.5 h-3.5" />Schedule</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
