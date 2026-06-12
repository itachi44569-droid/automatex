import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = { title: "Case Studies — Admin" };

export default function AdminCaseStudiesPage() {
  return (
    <div>
      <DashboardHeader title="Case Studies" subtitle="Manage and publish case studies." />
      <div className="glass-card border border-border/50 rounded-2xl p-12 text-center text-muted-foreground">
        <p>Case study management coming soon.</p>
      </div>
    </div>
  );
}
