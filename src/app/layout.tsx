import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RESTAURANT_DATA } from "@/data/restaurantData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#D97706",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Hanuman Veg Restaurant | Authentic Pure Veg & Tiffin Heritage | Sion Circle, Mumbai",
  description:
    "Legendary 100% pure vegetarian & Jain restaurant at Sion Circle opposite MovieMax Cinema, Mumbai. Renowned for Butter Mysore Masala Dosa, Special Mumbai Pav Bhaji, South Indian Tiffins, Filter Coffee & Royal Falooda. Open daily 7:30 AM – 11:30 PM.",
  keywords: [
    "Hanuman Veg Restaurant Sion",
    "Hotel Hanuman Sion Mumbai",
    "Pure veg restaurant Sion Circle",
    "Jain food Sion West",
    "Best pav bhaji Sion",
    "South Indian breakfast Sion",
    "MovieMax Sion restaurant",
    "Filter coffee Sion",
  ],
  authors: [{ name: "Hanuman Veg Restaurant" }],
  openGraph: {
    title: "Hanuman Veg Restaurant | Sion Circle, Mumbai (Pure Veg & Jain)",
    description:
      "Authentic Mumbai Pure Veg Heritage & Tiffin Culture Since Decades. Opposite MovieMax Cinema, Sion West. Rated 4.0/5 with 6,000+ reviews.",
    type: "website",
    locale: "en_IN",
    siteName: "Hanuman Veg Restaurant",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT_DATA.name,
    alternateName: RESTAURANT_DATA.legalName,
    description: RESTAURANT_DATA.tagline,
    servesCuisine: [
      "Pure Vegetarian",
      "Jain",
      "South Indian",
      "Mumbai Street Food",
      "North Indian",
      "Indo-Chinese",
    ],
    priceRange: "₹₹ (₹900 - ₹1,000 for two)",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 6 & 7, 94–95, Rupam Building, Near Sion Circle (Opposite MovieMax Cinema)",
      addressLocality: "Sion West, Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400022",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: RESTAURANT_DATA.coordinates.lat,
      longitude: RESTAURANT_DATA.coordinates.lng,
    },
    telephone: RESTAURANT_DATA.phone,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:30",
        closes: "23:30",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.0",
      reviewCount: "6240",
      bestRating: "5",
      worstRating: "1",
    },
    hasMenu: "#menu",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-text-main font-sans selection:bg-brand-amber-light selection:text-brand-terracotta-dark antialiased">
        {children}
      </body>
    </html>
  );
}
