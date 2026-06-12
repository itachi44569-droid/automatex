import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CareersPage } from "@/components/pages/CareersPage";

export const metadata: Metadata = {
  title: "Careers — Join the AutomateX AI Team",
  description: "Build the future of AI automation. Join our world-class team of engineers, designers, and strategists.",
};

export default function Careers() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CareersPage />
      </main>
      <Footer />
    </>
  );
}
