"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "fr";

export const translations = {
  en: {
    nav: {
      about: "About",
      menu: "Menu",
      gallery: "Gallery",
      privateDining: "Private Dining",
      giftCards: "Gift Cards",
      reserve: "Reserve a Table",
    },
    hero: {
      eyebrow: "Est. 1987 · Paris, France",
      line1: "Where Food",
      line2: "Becomes",
      line3: "Art.",
      tagline: "A Michelin-starred journey through contemporary French cuisine",
      cta1: "Reserve Your Table",
      cta2: "Explore the Menu",
    },
    reservation: {
      heading: "Reserve Your",
      headingGold: "Table",
      sub: "We recommend booking at least 2 weeks in advance.\nFor parties of 8+, please call us directly.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      date: "Date",
      time: "Time",
      guests: "Guests",
      occasion: "Special Occasion",
      notes: "Special Requests & Dietary Requirements",
      submit: "Request Reservation",
      disclaimer: "Confirmed by email within 24 hours · Cancellation up to 48h before",
      successTitle: "We look forward to welcoming you.",
      successSub: "A confirmation will be sent to your email within 24 hours.",
      successBadge: "Reservation Received",
    },
  },
  fr: {
    nav: {
      about: "À Propos",
      menu: "Menu",
      gallery: "Galerie",
      privateDining: "Salle Privée",
      giftCards: "Cartes Cadeaux",
      reserve: "Réserver une Table",
    },
    hero: {
      eyebrow: "Fondé en 1987 · Paris, France",
      line1: "Là où la Cuisine",
      line2: "Devient",
      line3: "Art.",
      tagline: "Un voyage étoilé au cœur de la gastronomie française contemporaine",
      cta1: "Réserver votre Table",
      cta2: "Explorer le Menu",
    },
    reservation: {
      heading: "Réserver votre",
      headingGold: "Table",
      sub: "Nous vous recommandons de réserver au moins 2 semaines à l'avance.\nPour les groupes de 8+, veuillez nous appeler directement.",
      name: "Nom Complet",
      email: "Adresse E-mail",
      phone: "Numéro de Téléphone",
      date: "Date",
      time: "Heure",
      guests: "Convives",
      occasion: "Occasion Spéciale",
      notes: "Demandes Spéciales & Régimes Alimentaires",
      submit: "Demande de Réservation",
      disclaimer: "Confirmé par e-mail sous 24h · Annulation jusqu'à 48h avant",
      successTitle: "Nous nous réjouissons de vous accueillir.",
      successSub: "Une confirmation vous sera envoyée par e-mail sous 24 heures.",
      successBadge: "Réservation Reçue",
    },
  },
} as const;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
