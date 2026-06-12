"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, CheckCircle, MoreHorizontal } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProjects, createProject, updateProject } from "@/lib/hooks/useFirestore";
import { useAllUsers } from "@/lib/hooks/useFirestore";
import { toast } from "sonner";
import type { Project, ProjectStatus } from "@/types";
import { Timestamp } from "firebase/firestore";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  review: { label: "In Review", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
  completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const STATUS_OPTIONS: ProjectStatus[] = ["pending", "in_progress", "review", "completed", "cancelled"];

export function AdminProjects() {
  const { projects, loading } = useProjects("admin");
  const { users } = useAllUsers();
  const clients = users.filter((u) => u.role === "client");

  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", clientId: "", budget: "", priority: "medium", tags: "", dueDate: "" });
  const [saving, setSaving] = useState(false);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!form.title || !form.clientId) { toast.error("Title and client are required"); return; }
    setSaving(true);
    try {
      const client = clients.find((c) => c.uid === form.clientId);
      await createProject({
        title: form.title,
        description: form.description,
        clientId: form.clientId,
        clientName: client?.displayName || client?.company || "",
        status: "pending",
        priority: form.priority as Project["priority"],
        progress: 0,
        budget: Number(form.budget) || 0,
        startDate: Timestamp.now(),
        dueDate: form.dueDate ? Timestamp.fromDate(new Date(form.dueDate)) : Timestamp.now(),
        teamMembers: [],
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast.success("Project created");
      setShowCreate(false);
      setForm({ title: "", description: "", clientId: "", budget: "", priority: "medium", tags: "", dueDate: "" });
    } catch { toast.error("Failed to create project"); }
    finally { setSaving(false); }
  };

  const handleStatusChange = async (projectId: string, status: ProjectStatus) => {
    try {
      await updateProject(projectId, { status });
      toast.success("Status updated");
    } catch { toast.error("Failed to update status"); }
  };

  const handleProgressUpdate = async (projectId: string, progress: number) => {
    try {
      await updateProject(projectId, { progress });
      toast.success("Progress updated");
    } catch { toast.error("Failed to update progress"); }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Projects" subtitle="Manage all client automation projects." />
        <Button onClick={() => setShowCreate(true)} className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg gap-1.5">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects or clients..." className="pl-9 bg-accent/50 border-border/50" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="glass-card border border-dashed border-border/50 rounded-2xl p-12 text-center">
              <p className="text-muted-foreground text-sm">No projects yet. Create your first project above.</p>
            </div>
          ) : filtered.map((project, i) => {
            const sc = statusConfig[project.status] || statusConfig.pending;
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card border border-border/50 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${sc.color}`}>{sc.label}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-muted-foreground">{project.priority}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{project.clientName} {project.budget > 0 && `· $${project.budget.toLocaleString()}`}</p>
                    <div className="flex items-center gap-3">
                      <Progress value={project.progress} className="flex-1 h-1.5" />
                      <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card border border-border/50 w-48">
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5">Change Status</p>
                        {STATUS_OPTIONS.map((s) => (
                          <button key={s} onClick={() => handleStatusChange(project.id, s)} className={`w-full text-left px-2 py-1 rounded text-xs hover:bg-accent flex items-center gap-2 ${project.status === s ? "text-blue-400" : ""}`}>
                            {project.status === s && <CheckCircle className="w-3 h-3" />}
                            <span className="capitalize">{s.replace("_", " ")}</span>
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-border/50 px-2 py-1.5">
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5">Update Progress</p>
                        {[0, 25, 50, 75, 100].map((p) => (
                          <button key={p} onClick={() => handleProgressUpdate(project.id, p)} className={`w-full text-left px-2 py-1 rounded text-xs hover:bg-accent ${project.progress === p ? "text-blue-400" : ""}`}>{p}%</button>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Project Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg glass-card border border-border/50">
          <DialogHeader><DialogTitle className="font-display">Create New Project</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Client *</Label>
              <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-accent/50 focus:outline-none focus:border-blue-500/50">
                <option value="">Select a client...</option>
                {clients.map((c) => <option key={c.uid} value={c.uid}>{c.displayName || c.email} {c.company && `— ${c.company}`}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Project Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. AI Customer Support Chatbot" className="bg-accent/50 border-border/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief project description" className="bg-accent/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Budget ($)</Label>
                <Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="5000" className="bg-accent/50 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label>Due Date</Label>
                <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="bg-accent/50 border-border/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-border/60 bg-accent/50 focus:outline-none focus:border-blue-500/50">
                  {["low", "medium", "high", "critical"].map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Tags (comma-separated)</Label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="AI, Chatbot, GPT" className="bg-accent/50 border-border/50" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleCreate} disabled={saving} className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0">
                {saving ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
