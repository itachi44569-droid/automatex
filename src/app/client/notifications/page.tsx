import type { Metadata } from "next";
import { ClientNotifications } from "@/components/dashboard/client/ClientNotifications";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return <ClientNotifications />;
}
