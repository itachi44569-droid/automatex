import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us — Our Story & Team",
  description: "Meet the team behind AutomateX AI — AI engineers, automation specialists, and business strategists obsessed with delivering results.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
