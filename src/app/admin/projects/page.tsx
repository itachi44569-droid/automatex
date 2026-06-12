import type { Metadata } from "next";
import { AdminProjects } from "@/components/dashboard/admin/AdminProjects";

export const metadata: Metadata = { title: "Manage Projects — Admin" };

export default function AdminProjectsPage() {
  return <AdminProjects />;
}
