import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = { title: "Settings — Admin" };

export default function AdminSettingsPage() {
  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Platform and account configuration." />
      <div className="glass-card border border-border/50 rounded-2xl p-12 text-center text-muted-foreground">
        <p>Settings panel coming soon.</p>
      </div>
    </div>
  );
}
