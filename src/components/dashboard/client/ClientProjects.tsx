"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, FileText, MessageSquare, Paperclip, FolderKanban } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/lib/hooks/useFirestore";
import type { Timestamp } from "firebase/firestore";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  review: { label: "In Review", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
  completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

function fmtDate(ts: Timestamp | undefined | null) {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ClientProjects() {
  const { user } = useAuth();
  const { projects, loading } = useProjects(user?.uid);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (projects.length === 0) return (
    <div>
      <DashboardHeader title="My Projects" subtitle="Track the progress of all your automation projects." />
      <div className="flex flex-col items-center justify-center h-64 glass-card border border-border/50 rounded-2xl">
        <FolderKanban className="w-12 h-12 text-muted-foreground/30 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">No projects yet</p>
        <p className="text-xs text-muted-foreground mt-1">Your project manager will create and assign projects here.</p>
      </div>
    </div>
  );

  return (
    <div>
      <DashboardHeader title="My Projects" subtitle="Track the progress of all your automation projects." />
      <div className="space-y-6">
        {projects.map((project, i) => {
          const sc = statusConfig[project.status] || statusConfig.pending;
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card border border-border/50 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h2 className="font-bold text-lg">{project.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${sc.color}`}>{sc.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                {project.budget > 0 && (
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-bold text-lg">${project.budget.toLocaleString()}</p>
                  </div>
                )}
              </div>

              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="mb-4 h-8">
                  <TabsTrigger value="progress" className="text-xs">Progress</TabsTrigger>
                  <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                  <TabsTrigger value="files" className="text-xs">Files</TabsTrigger>
                </TabsList>

                <TabsContent value="progress" className="mt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Progress value={project.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold w-10 text-right">{project.progress}%</span>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Clock, label: "Start Date", value: fmtDate(project.startDate as Timestamp) },
                      { icon: TrendingUp, label: "Due Date", value: fmtDate(project.dueDate as Timestamp) },
                      { icon: FileText, label: "Team", value: project.teamMembers?.join(", ") || "—" },
                      { icon: MessageSquare, label: "Priority", value: project.priority },
                    ].map((detail) => {
                      const Icon = detail.icon;
                      return (
                        <div key={detail.label} className="p-3 bg-accent/40 rounded-xl">
                          <div className="flex items-center gap-1.5 mb-1 text-muted-foreground"><Icon className="w-3.5 h-3.5" /><span className="text-xs">{detail.label}</span></div>
                          <p className="text-sm font-medium capitalize">{detail.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400">{tag}</span>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="files" className="mt-0">
                  {project.files?.length > 0 ? (
                    <div className="space-y-2">
                      {project.files.map((f) => (
                        <a key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-accent/40 rounded-xl border border-border/40 hover:border-blue-500/30 transition-colors">
                          <Paperclip className="w-4 h-4 text-blue-400 shrink-0" />
                          <span className="text-sm">{f.name}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-border/50 rounded-xl p-8 text-center">
                      <Paperclip className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
