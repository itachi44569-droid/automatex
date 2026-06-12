import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = { title: "Account Settings" };

export default function ClientSettingsPage() {
  return (
    <div>
      <DashboardHeader title="Account Settings" subtitle="Manage your profile and preferences." />
      <div className="glass-card border border-border/50 rounded-2xl p-12 text-center text-muted-foreground">
        <p>Settings panel coming soon.</p>
      </div>
    </div>
  );
}
