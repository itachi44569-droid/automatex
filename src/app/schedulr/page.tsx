"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogoCloud from "./components/LogoCloud";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function SchedulrLanding() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#07070C] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        <Navbar dark={dark} setDark={setDark} />
        <HeroSection />
        <LogoCloud />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
