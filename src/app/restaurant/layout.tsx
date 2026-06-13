import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurum | Three Michelin Star Restaurant · Paris",
  description:
    "Aurum is a three Michelin star restaurant in the heart of Paris, led by Chef Laurent Moreau. Reserve a table and experience a tasting menu that redefines French fine dining.",
  keywords: [
    "Michelin star restaurant Paris",
    "fine dining Paris",
    "tasting menu Paris",
    "Aurum restaurant",
    "Laurent Moreau chef",
    "best restaurant Paris",
    "luxury dining Paris",
  ],
  authors: [{ name: "Chef Laurent Moreau" }],
  openGraph: {
    title: "Aurum | Three Michelin Star Restaurant · Paris",
    description:
      "A sanctuary of fine dining in Paris. Three Michelin stars, seasonal tasting menus, and an unrivalled 4,000-bottle wine cellar.",
    type: "website",
    locale: "en_FR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Aurum Restaurant — Fine Dining Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurum | Three Michelin Star Restaurant · Paris",
    description: "Reserve your table at Aurum — Paris's most celebrated fine dining destination.",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90&auto=format&fit=crop"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/restaurant",
    languages: { "fr-FR": "/restaurant?lang=fr" },
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Aurum",
  description:
    "Three Michelin star fine dining restaurant in Paris, led by Chef Laurent Moreau. Seasonal tasting menus, exceptional wine cellar, private dining.",
  url: "https://aurum-paris.com",
  telephone: "+33142860000",
  email: "reservations@aurum-paris.com",
  servesCuisine: ["French", "Contemporary", "Haute Cuisine"],
  priceRange: "€€€€",
  starRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Rue de la Paix",
    addressLocality: "Paris",
    postalCode: "75002",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8691,
    longitude: 2.3308,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "12:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "19:00",
      closes: "22:00",
    },
  ],
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90&auto=format&fit=crop",
  award: ["3 Michelin Stars", "World's 50 Best Restaurants"],
  hasMap: "https://www.openstreetmap.org/?mlat=48.8691&mlon=2.3308",
  reservationUrl: "https://aurum-paris.com/restaurant#reservation",
  acceptsReservations: true,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Private Dining Room", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wine Cellar", value: true },
    { "@type": "LocationFeatureSpecification", name: "Valet Parking", value: false },
  ],
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      {children}
    </>
  );
}
