import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioPage } from "@/components/pages/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio — Our AI Automation Work",
  description: "Browse our portfolio of AI automation projects built for clients across the USA, UK, and Europe.",
};

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
}
