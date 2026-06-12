"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Mail, Phone, Globe, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAllUsers } from "@/lib/hooks/useFirestore";

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  prospect: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function AdminClients() {
  const [search, setSearch] = useState("");
  const { users, loading } = useAllUsers();
  const clients = users.filter((u) => u.role === "client");

  const filtered = clients.filter((c) =>
    (c.displayName || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.company || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Clients" subtitle={`${clients.length} total clients`} />
        <Button className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Add Client
        </Button>
      </div>

      <div className="glass-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Client", "Company", "Status", "Phone", "Joined", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      {clients.length === 0 ? "No clients registered yet." : "No clients match your search."}
                    </td>
                  </tr>
                ) : filtered.map((client, i) => (
                  <motion.tr
                    key={client.uid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/30 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {(client.displayName || client.email || "?").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{client.displayName || "—"}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{client.company || "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColor["active"]}`}>active</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-muted-foreground">{client.phone || "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-muted-foreground">
                        {client.createdAt?.toDate?.()?.toLocaleDateString("en-US", { month: "short", year: "numeric" }) || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card border border-border/50 w-44">
                          <DropdownMenuItem className="gap-2 text-xs"><Mail className="w-3.5 h-3.5" />Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs"><Phone className="w-3.5 h-3.5" />Call Client</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs"><Globe className="w-3.5 h-3.5" />View Portal</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {clients.length} clients</span>
          <div className="flex items-center gap-1 text-emerald-500 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{clients.length} registered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
