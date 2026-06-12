import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Book a Free Discovery Call",
  description: "Get in touch with AutomateX AI. Book a free 30-minute discovery call and learn how we can automate your business.",
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
