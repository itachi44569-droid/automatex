"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "I run an e-commerce store selling handmade jewelry. We get 50+ customer emails/day and manage orders manually in spreadsheets.",
  "We're a real estate agency with 12 agents. Our lead follow-up is inconsistent and we lose deals from slow response times.",
  "I own a SaaS company. Our onboarding is manual, churn is high, and our sales team spends hours on data entry.",
  "We run a digital marketing agency with 30 clients. Reporting takes 2 days per month and client communication is scattered.",
];

export function AIAssistant() {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          businessContext: userProfile?.company ? `Client company: ${userProfile.company}` : "",
        }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I'm temporarily unavailable. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setMessages([]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-start justify-between mb-4">
        <DashboardHeader
          title="AI Business Assistant"
          subtitle="Describe your business and get personalised automation recommendations."
        />
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={reset} className="shrink-0 gap-1.5 border-border/60">
            <RefreshCw className="w-3.5 h-3.5" /> New Chat
          </Button>
        )}
      </div>

      <div className="flex-1 flex flex-col glass-card border border-border/50 rounded-2xl overflow-hidden min-h-0">
        <ScrollArea className="flex-1 p-4 lg:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold font-display mb-2">AutomateX AI Consultant</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-8">
                Describe your business challenges and I'll identify exactly which processes to automate, which tools to use, and how much time and money you'll save.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="p-3.5 rounded-xl border border-border/50 bg-accent/30 text-left text-xs text-muted-foreground hover:text-foreground hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 leading-relaxed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-blue-600 to-violet-600"
                        : "bg-gradient-to-br from-slate-600 to-slate-700"
                    )}>
                      {msg.role === "assistant"
                        ? <Bot className="w-4 h-4 text-white" />
                        : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div className={cn("max-w-[80%]", msg.role === "user" && "items-end flex flex-col")}>
                      <div className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        msg.role === "assistant"
                          ? "bg-accent border border-border/50 rounded-tl-sm"
                          : "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-tr-sm"
                      )}>
                        {msg.role === "assistant" ? (
                          <div className="space-y-1 whitespace-pre-wrap">{msg.content}</div>
                        ) : msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-accent border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center h-5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-blue-500"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Describe your business, team size, and biggest time-wasters..."
              className="flex-1 resize-none bg-accent/50 border-border/50 focus:border-blue-500/50 min-h-[44px] max-h-[120px]"
              rows={1}
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 h-11 px-4 shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">Powered by Claude · Your conversations are private</p>
        </div>
      </div>
    </div>
  );
}
