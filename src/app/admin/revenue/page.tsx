import type { Metadata } from "next";
import { AdminRevenue } from "@/components/dashboard/admin/AdminRevenue";

export const metadata: Metadata = { title: "Revenue Tracking — Admin" };

export default function AdminRevenuePage() {
  return <AdminRevenue />;
}
