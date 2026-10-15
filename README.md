# Hanuman Veg Restaurant (Hotel Hanuman), Sion, Mumbai

A modern, production-ready web application for **Hanuman Veg Restaurant**, an iconic pure-vegetarian and Jain culinary landmark located at Sion Circle, Sion West, Mumbai (opposite MovieMax Cinema).

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

---

## 🏛️ Business Identity & Verified Dossier

* **Business Name:** Hanuman Veg Restaurant (Hotel Hanuman)
* **Tagline:** Authentic Mumbai Pure Veg Heritage & Tiffin Culture Since Decades
* **Location:** Shop No. 6 & 7, 94–95, Rupam Building, Near Sion Circle (Opposite MovieMax Cinema), Sion West, Mumbai, Maharashtra 400022
* **GPS Coordinates:** `19.0420074, 72.8641565`
* **Direct Contact / WhatsApp:** `+91 98206 47374`
* **Landline Inquiries:** `+91 22 2407 1999`
* **Operating Hours:** Open Daily from 7:30 AM – 11:30 PM IST (Continuous service across Breakfast, Lunch, High Tea & Dinner)
* **Price for Two:** Approx. ₹900 – ₹1,000 | 100% Pure Vegetarian with complete Jain Food Availability
* **Ratings Proof:** 4.0 / 5.0 Star Rating backed by 6,240+ verified local customer reviews across Google, Justdial & Swiggy.
* **Core Cuisines:** South Indian Tiffin, Mumbai Street Food & Pav Bhaji, North Indian & Tandoor, Indo-Chinese Wok, Fresh Seasonal Juices & Royal Falooda, Dedicated Jain Specials.

---

## ✨ Key Features & Interactive Architecture

1. **Sticky Header with Live Info & Badges:**
   - Announcement banner with Sion Circle address, open status, pure veg certification, and direct telephone links.
   - Glassmorphic navbar with active scroll effect.
   - Real-time WhatsApp tray item badge counter.

2. **Hero Section with Dynamic IST Status Pill:**
   - Real-time client-side calculation of Indian Standard Time (IST) displaying "🟢 Open Now • Serving until 11:30 PM" or opening reminders.
   - High-conversion CTAs for menu exploration, table reservation, and WhatsApp order tray.
   - Trust metric cards (4.0★ rating, 100% Pure Veg seal, Jain kitchen assurance, price for two).

3. **Heritage Story ("The Sion Landmark"):**
   - Narrative highlighting decades of service opposite MovieMax Cinema.
   - Four core culinary pillars: Sion Circle Tradition, Generational Flavor Consistency, Uncompromising Jain Integrity, and Continuous 16-Hour Service.

4. **Signature Specialties Showcase:**
   - Spotlight on top 6 legacy dishes: Butter Mysore Masala Dosa, Hanuman Special Butter Pav Bhaji, Jain Raw Banana Pav Bhaji, Paneer Tikka Masala, Kumbakonam Filter Coffee, and Royal Dry Fruit Kesar Falooda.
   - One-click addition to WhatsApp Order Tray.

5. **Interactive 45+ Dish Menu Explorer:**
   - Category filtering (All, South Indian Tiffin, Mumbai Pav Bhaji & Chaat, North Indian & Tandoor, Indo-Chinese, Dedicated Jain Specials, Fresh Juices & Falooda).
   - Real-time text search filtering names and descriptions.
   - Dedicated toggles: "Strictly Jain Friendly" and "Bestsellers Only".
   - Clear visual indicators: Pure Veg box seal, Jain box seal, spice level badges.

6. **Interactive WhatsApp Order Tray / Drawer:**
   - Slide-over order tray showing dishes, quantities (+/-), item subtotals, and total bill.
   - Dining preference toggle: Takeaway / Delivery / Dine-in Pre-order.
   - Custom notes input (e.g. "Make strictly Jain", "Less spicy", "Extra butter-toasted pav").
   - Instant WhatsApp dispatcher generating a structured, itemized message directly to `+91 98206 47374`.

7. **The Jain Dining Manifesto:**
   - Dedicated breakdown of Ahimsa principles, zero root vegetables (no onion, garlic, potato), separate woks, and raw banana pav bhaji.

8. **Customer Reviews & FAQ Accordion:**
   - Detailed rating breakdown: Food Taste (4.7), Cleanliness (4.6), Value (4.8), Jain Options (4.9).
   - Verified local reviews from cinema patrons, students, and families.
   - Interactive FAQ accordion for common visitor queries.

9. **Location, Transit Guide & Google Maps:**
   - Embedded Google Maps with exact coordinates `19.0420074, 72.8641565`.
   - Transit guide for MovieMax Cinema, Sion Circle, and Sion Railway Station.
   - Detailed breakdown of 4 daily dining slots.

10. **Table Reservation & Bulk Catering Modal:**
    - Interactive dialog for pre-booking tables (especially popular for MovieMax show-goers) and corporate tiffin/party catering.

11. **Mobile Bottom Action Bar:**
    - High-conversion mobile sticky bar with quick Call Now, Menu, Directions, and WhatsApp Tray triggers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### Installation & Run

```bash
# Navigate to project directory
cd hanuman-veg-restaurant

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

### Production Build

```bash
npm run build
npm start
```

---

## 🎨 Design System & Palette

- `canvas`: `#FDFBF7` (Soft tiffin parchment cream)
- `canvas-dark`: `#0C0A09` (Midnight slate for luxury hero & footer)
- `surface`: `#FFFFFF` (Crisp card surface)
- `brand-amber`: `#F59E0B` (Golden dosa crispness)
- `brand-terracotta`: `#D97706` (Spiced pav bhaji warmth)
- `brand-forest`: `#15803D` (Pure vegetarian authenticity seal)
- `text-main`: `#1C1917` (Deep roasted charcoal)
- `text-muted`: `#78716C` (Warm cardamom pod gray)
- Typography: `Playfair Display` (Headings) & `Plus Jakarta Sans` (Body & Controls)
