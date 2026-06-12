"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages, sendMessage } from "@/lib/hooks/useFirestore";
import { cn } from "@/lib/utils";
import type { Timestamp } from "firebase/firestore";

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID || "admin";

function fmtTime(ts: Timestamp | null | undefined) {
  if (!ts) return "";
  return ts.toDate().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function ClientMessages() {
  const { user, userProfile } = useAuth();
  const { messages, loading } = useMessages(user?.uid);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user || sending) return;
    setSending(true);
    try {
      await sendMessage({
        senderId: user.uid,
        senderName: userProfile?.displayName || user.email || "Client",
        senderRole: "client",
        receiverId: ADMIN_UID,
        receiverName: "AutomateX Team",
        content: input.trim(),
      });
      setInput("");
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <DashboardHeader title="Messages" subtitle="Direct communication with your project team." />
      <div className="flex-1 flex flex-col glass-card border border-border/50 rounded-2xl overflow-hidden min-h-0">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">AT</div>
          <div>
            <p className="text-sm font-semibold">AutomateX Team</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Available</p>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No messages yet</p>
              <p className="text-xs text-muted-foreground mt-1">Send a message to start the conversation with your team.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => {
                const isMe = msg.senderId === user?.uid;
                const initials = msg.senderName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className={cn("flex items-end gap-2.5", isMe && "flex-row-reverse")}>
                    {!isMe && (
                      <Avatar className="w-7 h-7 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[10px] font-bold">{initials}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[70%] space-y-0.5", isMe && "items-end flex flex-col")}>
                      {!isMe && <p className="text-[10px] text-muted-foreground ml-1">{msg.senderName}</p>}
                      <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", isMe ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-br-sm" : "bg-accent border border-border/50 rounded-bl-sm")}>
                        {msg.content}
                      </div>
                      <p className={cn("text-[10px] text-muted-foreground px-1", isMe && "text-right")}>{fmtTime(msg.createdAt as Timestamp)}</p>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()} placeholder="Type a message..." className="flex-1 bg-accent/50 border-border/50 focus:border-blue-500/50" />
            <Button onClick={handleSend} disabled={sending || !input.trim()} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 px-4">
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
