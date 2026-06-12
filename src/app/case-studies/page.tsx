import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudiesPage } from "@/components/pages/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies — Real Results for Real Businesses",
  description: "See how AutomateX AI has transformed businesses with AI automation. Real metrics, real results.",
};

export default function CaseStudies() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CaseStudiesPage />
      </main>
      <Footer />
    </>
  );
}
