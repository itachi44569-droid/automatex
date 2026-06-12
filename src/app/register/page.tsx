import type { Metadata } from "next";
import { RegisterPage } from "@/components/auth/RegisterPage";

export const metadata: Metadata = { title: "Create Account — Client Portal" };

export default function Register() {
  return <RegisterPage />;
}
