"use client";

import { LanguageProvider } from "./context/LanguageContext";

// Global UI polish
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import LiveAvailability from "./components/LiveAvailability";
import WhatsAppChat from "./components/WhatsAppChat";

// Page sections
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GoldParticles from "./components/GoldParticles";
import StatsBar from "./components/StatsBar";
import AboutSection from "./components/AboutSection";
import ChefSection from "./components/ChefSection";
import SeasonalSection from "./components/SeasonalSection";
import TastingMenuSection from "./components/TastingMenuSection";
import MenuSection from "./components/MenuSection";
import WineSection from "./components/WineSection";
import AwardsSection from "./components/AwardsSection";
import PressSection from "./components/PressSection";
import GallerySection from "./components/GallerySection";
import VirtualTourSection from "./components/VirtualTourSection";
import PrivateDiningSection from "./components/PrivateDiningSection";
import EveningTimelineSection from "./components/EveningTimelineSection";
import ReservationSection from "./components/ReservationSection";
import GiftCardsSection from "./components/GiftCardsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CountdownSection from "./components/CountdownSection";
import SourcingSection from "./components/SourcingSection";
import LocationSection from "./components/LocationSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";

export default function RestaurantPage() {
  return (
    <LanguageProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <LiveAvailability />
      <WhatsAppChat />

      <div className="aurum-grain aurum-vignette min-h-screen bg-[#0C1C10] text-[#EDE5D8] overflow-x-hidden cursor-none">
        <Navbar />

        {/* Hero with ambient gold particles overlay */}
        <div className="relative">
          <HeroSection />
          <GoldParticles />
        </div>

        <StatsBar />
        <AboutSection />
        <ChefSection />
        <SeasonalSection />
        <TastingMenuSection />
        <MenuSection />
        <WineSection />
        <AwardsSection />
        <PressSection />
        <GallerySection />
        <VirtualTourSection />
        <PrivateDiningSection />
        <EveningTimelineSection />
        <ReservationSection />
        <GiftCardsSection />
        <TestimonialsSection />
        <CountdownSection />
        <SourcingSection />
        <LocationSection />
        <NewsletterSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
