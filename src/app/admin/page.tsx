import type { Metadata } from "next";
import { AdminOverview } from "@/components/dashboard/admin/AdminOverview";

export const metadata: Metadata = { title: "Admin Dashboard — AutomateX AI" };

export default function AdminPage() {
  return <AdminOverview />;
}
