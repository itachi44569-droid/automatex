import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = { title: "User Management — Admin" };

export default function AdminUsersPage() {
  return (
    <div>
      <DashboardHeader title="User Management" subtitle="Manage all registered users and their roles." />
      <div className="glass-card border border-border/50 rounded-2xl p-12 text-center text-muted-foreground">
        <p>User management coming soon.</p>
      </div>
    </div>
  );
}
