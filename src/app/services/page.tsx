import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "AI Automation Services",
  description: "From AI chatbots to full workflow automation — we build custom AI systems that transform how your business operates and generates revenue.",
};

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}
