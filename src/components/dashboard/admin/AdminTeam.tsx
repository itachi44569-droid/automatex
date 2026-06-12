"use client";

import { motion } from "framer-motion";
import { Plus, Mail, FolderKanban } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const team = [
  { id: "1", name: "Alex Morgan", title: "CEO & Co-Founder", email: "alex@automatex.ai", role: "admin", activeProjects: 2, completedProjects: 18, avatar: "AM", gradient: "from-blue-500 to-violet-500", status: "online" },
  { id: "2", name: "Priya Sharma", title: "CTO & Co-Founder", email: "priya@automatex.ai", role: "admin", activeProjects: 3, completedProjects: 24, avatar: "PS", gradient: "from-violet-500 to-pink-500", status: "online" },
  { id: "3", name: "James Wright", title: "Head of Delivery", email: "james@automatex.ai", role: "team", activeProjects: 4, completedProjects: 31, avatar: "JW", gradient: "from-emerald-500 to-teal-500", status: "online" },
  { id: "4", name: "Emma Clarke", title: "Lead AI Engineer", email: "emma@automatex.ai", role: "team", activeProjects: 3, completedProjects: 22, avatar: "EC", gradient: "from-amber-500 to-orange-500", status: "busy" },
  { id: "5", name: "Luca Ferrari", title: "Automation Architect", email: "luca@automatex.ai", role: "team", activeProjects: 2, completedProjects: 19, avatar: "LF", gradient: "from-cyan-500 to-blue-500", status: "offline" },
  { id: "6", name: "Sarah Kim", title: "Client Success Manager", email: "sarah@automatex.ai", role: "team", activeProjects: 1, completedProjects: 14, avatar: "SK", gradient: "from-pink-500 to-rose-500", status: "online" },
];

const statusDot = { online: "bg-emerald-500", busy: "bg-amber-500", offline: "bg-slate-400" };

export function AdminTeam() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Team Management" subtitle={`${team.length} team members`} />
        <Button className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card border border-border/50 rounded-2xl p-5 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold`}>
                  {member.avatar}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusDot[member.status as keyof typeof statusDot]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">{member.role}</Badge>
                  <span className={`text-[10px] capitalize ${statusDot[member.status as keyof typeof statusDot].replace("bg-", "text-")}`}>{member.status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2.5 bg-accent/50 rounded-xl text-center">
                <p className="text-lg font-bold text-blue-400">{member.activeProjects}</p>
                <p className="text-[10px] text-muted-foreground">Active</p>
              </div>
              <div className="p-2.5 bg-accent/50 rounded-xl text-center">
                <p className="text-lg font-bold text-emerald-400">{member.completedProjects}</p>
                <p className="text-[10px] text-muted-foreground">Completed</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Capacity</span>
                <span>{Math.round((member.activeProjects / 5) * 100)}%</span>
              </div>
              <Progress value={(member.activeProjects / 5) * 100} className="h-1.5" />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{member.email}</span>
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 h-7 text-xs border-border/60 gap-1">
                <Mail className="w-3 h-3" /> Email
              </Button>
              <Button size="sm" variant="outline" className="flex-1 h-7 text-xs border-border/60 gap-1">
                <FolderKanban className="w-3 h-3" /> Projects
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
