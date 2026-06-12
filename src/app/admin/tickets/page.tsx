import type { Metadata } from "next";
import { AdminTickets } from "@/components/dashboard/admin/AdminTickets";

export const metadata: Metadata = { title: "Support Tickets — Admin" };

export default function AdminTicketsPage() {
  return <AdminTickets />;
}
