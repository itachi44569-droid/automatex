import type { Metadata } from "next";
import { AdminClients } from "@/components/dashboard/admin/AdminClients";

export const metadata: Metadata = { title: "Manage Clients — Admin" };

export default function AdminClientsPage() {
  return <AdminClients />;
}
