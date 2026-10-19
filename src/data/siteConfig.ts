/**
 * Hanuman Veg Restaurant (Hotel Hanuman) - Site Configuration
 * Central source of truth for verified business information vs. unverified claims.
 * All unverified claims are hidden by default behind the `verified` boolean flag.
 */

export interface ClaimItem {
  claim: string;
  verified: boolean;
  notes?: string;
}

export const SITE_CONFIG = {
  // VERIFIED BUSINESS FACTS (Verified from source code & restaurant operations)
  restaurant: {
    name: "Hanuman Veg Restaurant",
    legalName: "Hotel Hanuman",
    shortLocation: "Sion Circle, Mumbai",
    address: {
      line1: "Shop No. 6 & 7, 94–95, Rupam Building",
      line2: "Near Sion Circle (Opposite MovieMax Cinema)",
      area: "Sion West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400022",
      full: "Hotel Hanuman Sion, Shop No. 6 & 7, Rupam Building, Near Sion Circle (Opposite MovieMax Cinema), Sion West, Mumbai 400022",
      short: "Opposite MovieMax Cinema, Rupam Building, Sion Circle, Mumbai 400022",
    },
    contact: {
      phone: "+91 98206 47374",
      phoneRaw: "+919820647374",
      landline: "+91 22 2407 1999",
      landlineRaw: "02224071999",
    },
    hours: {
      display: "Open Daily: 7:30 AM – 11:30 PM IST",
      short: "7:30 AM – 11:30 PM",
      opens: "07:30",
      closes: "23:30",
    },
    maps: {
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=19.0420074,72.8641565",
      placeUrl: "https://maps.app.goo.gl/2i2hgUeGVymMuoEK8",
      coordinates: {
        lat: 19.0420074,
        lng: 72.8641565,
      },
    },
    urls: {
      productionBase: "https://hanuman-veg-restaurant.vercel.app",
      menuUrl: "https://hanuman-veg-restaurant.vercel.app/menu",
    },
    cuisine: {
      categorySummary: "Pure Vegetarian South Indian Tiffin, Pav Bhaji & Chaat, North Indian, Indo-Chinese & Jain Options",
      dietarySummary: "100% Pure Vegetarian with Jain options available on select dishes",
    },
  },

  // UNVERIFIED CLAIMS (Kept hidden unless verified: true)
  claims: {
    ratingsAndReviews: {
      claim: "4.0 / 5.0 rating across 6,000+ reviews",
      verified: false,
      notes: "Pending owner verification of platform review counts (Google/Justdial/Swiggy).",
    },
    heritageAndIconic: {
      claim: "Sion Circle Heritage Landmark serving since decades across generations",
      verified: false,
      notes: "Pending owner confirmation of founding year and exact operational decade.",
    },
    kitchenSourcingAndCookware: {
      claim: "Dedicated separate tawas & cookware, 100% root-vegetable-free Jain prep, zero synthetic colors, stone-ground spices, Amul butter",
      verified: false,
      notes: "Pending owner confirmation of kitchen processes and ingredient sourcing.",
    },
    continuousHours: {
      claim: "Continuous 16-hour service 365 days a year without intermission",
      verified: false,
      notes: "Pending owner confirmation of continuous non-stop kitchen operation.",
    },
    priceForTwo: {
      claim: "₹900 – ₹1,000 approx. for two diners",
      verified: false,
      notes: "Pending owner confirmation of typical dining bill averages.",
    },
    communityReverence: {
      claim: "Revered by Sion, Matunga, and Wadala Jain communities",
      verified: false,
      notes: "Pending owner verification.",
    },
  },
} as const;
