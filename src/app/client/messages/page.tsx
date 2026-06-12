import type { Metadata } from "next";
import { ClientMessages } from "@/components/dashboard/client/ClientMessages";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return <ClientMessages />;
}
