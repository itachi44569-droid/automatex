"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useAllUsers } from "@/lib/hooks/useFirestore";
import { useMessages, sendMessage } from "@/lib/hooks/useFirestore";
import { cn } from "@/lib/utils";
import type { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

function fmtTime(ts: Timestamp | null | undefined) {
  if (!ts) return "";
  return ts.toDate().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function AdminMessages() {
  const { user, userProfile } = useAuth();
  const { users } = useAllUsers();
  const clients = users.filter((u) => u.role === "client");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const { messages } = useMessages(user?.uid);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const threadMessages = messages.filter(
    (m) => m.senderId === selectedClient?.uid || m.receiverId === selectedClient?.uid
  );

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [threadMessages]);

  const handleSend = async () => {
    if (!input.trim() || !user || !selectedClient || sending) return;
    setSending(true);
    try {
      await sendMessage({
        senderId: user.uid,
        senderName: userProfile?.displayName || "AutomateX Team",
        senderRole: "admin",
        receiverId: selectedClient.uid,
        receiverName: selectedClient.displayName || selectedClient.email,
        content: input.trim(),
      });
      setInput("");
    } finally { setSending(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <DashboardHeader title="Messages" subtitle="Communicate with clients." />
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Client list */}
        <div className="w-64 shrink-0 glass-card border border-border/50 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clients</p>
          </div>
          <ScrollArea className="flex-1">
            {clients.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center p-4">No clients yet.</p>
            ) : clients.map((client) => (
              <button key={client.uid} onClick={() => setSelectedClient(client)} className={cn("w-full p-3 border-b border-border/30 text-left hover:bg-accent/50 transition-colors", selectedClient?.uid === client.uid && "bg-blue-500/10 border-blue-500/20")}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(client.displayName || client.email || "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{client.displayName || client.email}</p>
                    {client.company && <p className="text-[10px] text-muted-foreground truncate">{client.company}</p>}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col glass-card border border-border/50 rounded-2xl overflow-hidden min-w-0">
          {!selectedClient ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Select a client to view messages</p>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  {(selectedClient.displayName || selectedClient.email || "?")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{selectedClient.displayName || selectedClient.email}</p>
                  {selectedClient.company && <p className="text-xs text-muted-foreground">{selectedClient.company}</p>}
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                {threadMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {threadMessages.map((msg, i) => {
                      const isMe = msg.senderId === user?.uid;
                      return (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className={cn("flex items-end gap-2.5", isMe && "flex-row-reverse")}>
                          {!isMe && (
                            <Avatar className="w-7 h-7 shrink-0">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[10px] font-bold">
                                {(msg.senderName || "?")[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={cn("max-w-[70%]", isMe && "items-end flex flex-col")}>
                            <div className={cn("rounded-2xl px-4 py-2.5 text-sm", isMe ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-br-sm" : "bg-accent border border-border/50 rounded-bl-sm")}>
                              {msg.content}
                            </div>
                            <p className={cn("text-[10px] text-muted-foreground px-1 mt-0.5", isMe && "text-right")}>{fmtTime(msg.createdAt as Timestamp)}</p>
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
                  <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()} placeholder={`Message ${selectedClient.displayName || "client"}...`} className="flex-1 bg-accent/50 border-border/50" />
                  <Button onClick={handleSend} disabled={sending || !input.trim()} className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 px-4">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
