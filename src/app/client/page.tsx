import type { Metadata } from "next";
import { ClientDashboard } from "@/components/dashboard/client/ClientDashboard";

export const metadata: Metadata = { title: "Client Dashboard" };

export default function ClientDashboardPage() {
  return <ClientDashboard />;
}
