import type { Metadata } from "next";
import { ClientTickets } from "@/components/dashboard/client/ClientTickets";

export const metadata: Metadata = { title: "Support Tickets" };

export default function TicketsPage() {
  return <ClientTickets />;
}
