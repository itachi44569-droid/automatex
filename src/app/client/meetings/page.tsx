import type { Metadata } from "next";
import { ClientMeetings } from "@/components/dashboard/client/ClientMeetings";

export const metadata: Metadata = { title: "Meetings & Calls" };

export default function MeetingsPage() {
  return <ClientMeetings />;
}
