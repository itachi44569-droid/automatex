"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Send, AlertCircle, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide more detail"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.string().min(1, "Category is required"),
});
type FormData = z.infer<typeof schema>;

const mockTickets = [
  { id: "1", title: "Chatbot not responding on mobile", description: "The chatbot widget doesn't load on iOS Safari.", status: "open", priority: "high", category: "Bug Report", createdAt: "Jun 10, 2026", updatedAt: "2 hours ago", messages: 3 },
  { id: "2", title: "CRM integration question", description: "How do I connect my Pipedrive account to the automation?", status: "in_progress", priority: "medium", category: "Question", createdAt: "Jun 8, 2026", updatedAt: "1 day ago", messages: 5 },
  { id: "3", title: "Add new FAQ to chatbot", description: "Please add the following questions to the chatbot knowledge base.", status: "resolved", priority: "low", category: "Feature Request", createdAt: "Jun 2, 2026", updatedAt: "Jun 5, 2026", messages: 7 },
];

const statusIcon = { open: AlertCircle, in_progress: Clock, resolved: CheckCircle2, closed: CheckCircle2 };
const statusColor = { open: "text-orange-500", in_progress: "text-blue-500", resolved: "text-emerald-500", closed: "text-muted-foreground" };
const priorityColor = { low: "bg-slate-500/20 text-slate-400", medium: "bg-amber-500/20 text-amber-400", high: "bg-orange-500/20 text-orange-400", urgent: "bg-red-500/20 text-red-400" };

export function ClientTickets() {
  const [open, setOpen] = useState(false);
  const { user, userProfile } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "tickets"), {
        ...data,
        clientId: user?.uid,
        clientName: userProfile?.displayName,
        status: "open",
        messages: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Ticket submitted! We'll respond within 4 hours.");
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <DashboardHeader title="Support Tickets" subtitle="Get help from our team." />
        <Button onClick={() => setOpen(true)} className="shrink-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> New Ticket
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md glass-card border border-border/50">
            <DialogHeader>
              <DialogTitle className="font-display">Open Support Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <Input placeholder="Brief description of your issue" {...register("title")} className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <select {...register("priority")} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <select {...register("category")} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm">
                    <option value="Bug Report">Bug Report</option>
                    <option value="Question">Question</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={4} placeholder="Describe your issue in detail..." {...register("description")} className={errors.description ? "border-destructive" : ""} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0">
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : <><Send className="w-4 h-4 mr-2" />Submit Ticket</>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {mockTickets.map((ticket, i) => {
          const StatusIcon = statusIcon[ticket.status as keyof typeof statusIcon];
          const sc = statusColor[ticket.status as keyof typeof statusColor];
          const pc = priorityColor[ticket.priority as keyof typeof priorityColor];
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card border border-border/50 rounded-2xl p-5 hover:border-blue-500/30 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <StatusIcon className={`w-4 h-4 mt-0.5 shrink-0 ${sc}`} />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm group-hover:text-blue-400 transition-colors">{ticket.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{ticket.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${pc}`}>{ticket.priority}</span>
                      <Badge variant="outline" className="text-xs h-4 px-1.5">{ticket.category}</Badge>
                      <span className="text-xs text-muted-foreground">{ticket.messages} messages</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">Updated {ticket.updatedAt}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Created {ticket.createdAt}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
