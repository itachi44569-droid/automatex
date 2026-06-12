import type { Metadata } from "next";
import { AdminTeam } from "@/components/dashboard/admin/AdminTeam";

export const metadata: Metadata = { title: "Team Management — Admin" };

export default function AdminTeamPage() {
  return <AdminTeam />;
}
