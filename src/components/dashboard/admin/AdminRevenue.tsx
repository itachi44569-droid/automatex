"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const monthlyData = [
  { month: "Jan", revenue: 18500, expenses: 6200, profit: 12300 },
  { month: "Feb", revenue: 22000, expenses: 7100, profit: 14900 },
  { month: "Mar", revenue: 19800, expenses: 6800, profit: 13000 },
  { month: "Apr", revenue: 31000, expenses: 9500, profit: 21500 },
  { month: "May", revenue: 28500, expenses: 8900, profit: 19600 },
  { month: "Jun", revenue: 38200, expenses: 11400, profit: 26800 },
];

const recentTransactions = [
  { id: "1", description: "AI Chatbot Project — TechScale", amount: 8500, type: "income", date: "Jun 10, 2026", status: "paid" },
  { id: "2", description: "CRM Automation — GrowthPath", amount: 6000, type: "income", date: "Jun 8, 2026", status: "paid" },
  { id: "3", description: "Monthly Retainer — DataSync", amount: 4500, type: "income", date: "Jun 1, 2026", status: "paid" },
  { id: "4", description: "OpenAI API — Monthly", amount: -1200, type: "expense", date: "Jun 1, 2026", status: "paid" },
  { id: "5", description: "Lead Gen System — Nexus Digital", amount: 5500, type: "income", date: "May 28, 2026", status: "paid" },
  { id: "6", description: "Invoice Processing — Velocity", amount: 14000, type: "income", date: "May 25, 2026", status: "paid" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-border/50 rounded-xl p-3 text-xs shadow-xl">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: ${p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function AdminRevenue() {
  const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
  const totalProfit = monthlyData.reduce((s, m) => s + m.profit, 0);
  const avgMonthly = Math.round(totalRevenue / monthlyData.length);
  const currentMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const growth = Math.round(((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100);

  return (
    <div>
      <DashboardHeader title="Revenue Tracking" subtitle="Financial overview and performance metrics." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "YTD Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "from-blue-500 to-cyan-500", change: "+34%", up: true },
          { label: "YTD Profit", value: `$${totalProfit.toLocaleString()}`, icon: TrendingUp, color: "from-emerald-500 to-teal-500", change: "+41%", up: true },
          { label: "Avg Monthly", value: `$${avgMonthly.toLocaleString()}`, icon: Calendar, color: "from-violet-500 to-purple-500", change: `+${growth}%`, up: growth > 0 },
          { label: "Jun Revenue", value: `$${currentMonth.revenue.toLocaleString()}`, icon: DollarSign, color: "from-amber-500 to-orange-500", change: `+${growth}% MoM`, up: true },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card border border-border/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? "text-emerald-500" : "text-red-500"}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold font-display">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card border border-border/50 rounded-2xl p-6">
          <h2 className="font-bold mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="revenue" fill="#4361ff" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Expenses" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card border border-border/50 rounded-2xl p-6">
          <h2 className="font-bold mb-4">Profit Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h2 className="font-bold">Recent Transactions</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {["Description", "Date", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx, i) => (
              <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                <td className="px-4 py-3 text-sm">{tx.description}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-bold ${tx.amount > 0 ? "text-emerald-500" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium capitalize">{tx.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
