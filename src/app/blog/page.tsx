import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogPage } from "@/components/pages/BlogPage";

export const metadata: Metadata = {
  title: "Blog — AI Automation Insights",
  description: "Expert guides, tutorials, and insights on AI automation for business.",
};

export default function Blog() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BlogPage />
      </main>
      <Footer />
    </>
  );
}
