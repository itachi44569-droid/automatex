import type { Metadata } from "next";
import { AdminLeads } from "@/components/dashboard/admin/AdminLeads";

export const metadata: Metadata = { title: "CRM — Lead Pipeline" };

export default function AdminLeadsPage() {
  return <AdminLeads />;
}
