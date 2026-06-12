import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — AI Automation Packages",
  description: "Transparent pricing for world-class AI automation. Choose a package that fits your business goals.",
};

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PricingPage />
      </main>
      <Footer />
    </>
  );
}
