import type { Metadata } from "next";
import { ClientProjects } from "@/components/dashboard/client/ClientProjects";

export const metadata: Metadata = { title: "My Projects — Client Portal" };

export default function ProjectsPage() {
  return <ClientProjects />;
}
