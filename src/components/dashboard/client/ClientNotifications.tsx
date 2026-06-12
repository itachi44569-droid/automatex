"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Bell, FolderKanban, MessageSquare, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: "1", type: "project", icon: FolderKanban, title: "Project update: AI Chatbot", message: "Your chatbot has completed integration testing and is ready for your review.", time: "2 hours ago", read: false, color: "bg-blue-500" },
  { id: "2", type: "message", icon: MessageSquare, title: "New message from Emma Clarke", message: "I've added 47 FAQ entries to the knowledge base based on your documentation.", time: "3 hours ago", read: false, color: "bg-violet-500" },
  { id: "3", type: "meeting", icon: Calendar, title: "Meeting reminder", message: "You have a Weekly Progress Review tomorrow at 10:00 AM EST.", time: "5 hours ago", read: false, color: "bg-emerald-500" },
  { id: "4", type: "project", icon: FolderKanban, title: "Milestone completed", message: "The CRM Automation project has reached 95% — entering client review phase.", time: "1 day ago", read: true, color: "bg-blue-500" },
  { id: "5", type: "message", icon: MessageSquare, title: "Message from James Wright", message: "We've completed the chatbot knowledge base setup. Moving into testing phase now!", time: "2 days ago", read: true, color: "bg-violet-500" },
];

export function ClientNotifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader title="Notifications" subtitle={`${unreadCount} unread notifications`} />
        <Button variant="outline" size="sm" className="text-xs border-border/60">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif, i) => {
          const Icon = notif.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`glass-card border rounded-2xl p-4 flex items-start gap-4 transition-all cursor-pointer ${notif.read ? "border-border/40 opacity-70" : "border-blue-500/20 hover:border-blue-500/40"}`}
            >
              <div className={`w-9 h-9 rounded-xl ${notif.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{notif.title}</p>
                  <span className="text-xs text-muted-foreground shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
              </div>
              {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />}
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No notifications yet.</p>
        </div>
      )}
    </div>
  );
}
