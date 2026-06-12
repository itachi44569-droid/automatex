import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/LoginPage";

export const metadata: Metadata = { title: "Sign In — Client Portal" };

export default function Login() {
  return <LoginPage />;
}
