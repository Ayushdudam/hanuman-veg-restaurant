"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_DATA } from "@/data/restaurantData";
import { MenuItem } from "@/types/restaurant";
import { 
  Search, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Star, 
  Utensils, 
  Coffee, 
  Soup, 
  Sparkles, 
  Wine, 
  Navigation, 
  Lock,
  Check,
  Film
} from "lucide-react";

interface DigitalMenuProps {
  initialTable?: string;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({ initialTable }) => {
  const searchParams = useSearchParams();
  const tableParam = searchParams ? searchParams.get("table") || initialTable || "" : initialTable || "";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jainOnly, setJainOnly] = useState<boolean>(false);
  const [bestsellersOnly, setBestsellersOnly] = useState<boolean>(false);

  // Category Icon helper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "south-indian": return <Coffee className="w-3.5 h-3.5" />;
      case "pav-bhaji": return <Flame className="w-3.5 h-3.5" />;
      case "north-indian": return <Soup className="w-3.5 h-3.5" />;
      case "indo-chinese": return <Sparkles className="w-3.5 h-3.5" />;
      case "jain-specials": return <ShieldCheck className="w-3.5 h-3.5" />;
      case "beverages": return <Wine className="w-3.5 h-3.5" />;
      default: return <Utensils className="w-3.5 h-3.5" />;
    }
  };

  // Filter items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      if (activeCategory !== "all") {
        if (activeCategory === "jain-specials") {
          if (!dish.isJainFriendly && dish.category !== "jain-specials") return false;
        } else if (dish.category !== activeCategory) {
          return false;
        }
      }

      // Jain filter
      if (jainOnly && !dish.isJainFriendly) return false;

      // Bestseller filter
      if (bestsellersOnly && !dish.isBestseller && !dish.isSignature) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesCat = dish.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [activeCategory, jainOnly, bestsellersOnly, searchQuery]);

  // Group dishes by category if "all" category is selected and no search
  const isGrouping = activeCategory === "all" && !searchQuery.trim() && !jainOnly && !bestsellersOnly;

  const groupedCategories = useMemo(() => {
    if (!isGrouping) return [];
    return MENU_CATEGORIES.filter((c) => c.id !== "all").map((cat) => ({
      category: cat,
      items: MENU_ITEMS.filter((item) => {
        if (cat.id === "jain-specials") {
          return item.category === "jain-specials";
        }
        return item.category === cat.id;
      }),
    })).filter((group) => group.items.length > 0);
  }, [isGrouping]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. COMPACT HEADER */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          
          {/* Brand Name & Pure Veg Mark */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="veg-box-seal shrink-0 shadow-2xs" title="100% Pure Vegetarian">
              <div className="veg-box-seal-dot" />
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-stone-900 tracking-tight block leading-tight group-hover:text-amber-700 transition-colors">
                Hanuman Veg Restaurant
              </span>
              <span className="text-[10px] text-stone-500 font-medium block leading-none">
                Sion Circle, Mumbai
              </span>
            </div>
          </Link>

          {/* Direct Contact Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="tel:+919820647374"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors border border-stone-200/80"
              title="Call Restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">+91 98206 47374</span>
              <span className="sm:hidden text-[11px] font-bold">Call</span>
            </a>

            <a
              href={RESTAURANT_DATA.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-600 transition-colors shadow-2xs"
              title="Get Directions on Google Maps"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Directions</span>
              <span className="sm:hidden text-[11px] font-bold">Map</span>
            </a>
          </div>
        </div>

        {/* Table Notification Banner if URL contains ?table=... */}
        {tableParam && (
          <div className="bg-amber-50 border-t border-b border-amber-200/80 px-4 py-2">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-amber-600 text-white uppercase tracking-wider">
                  Table {tableParam.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-amber-950">
                  Please place your order verbally with your server.
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. RICH RESTAURANT STORY & INTRODUCTION WITH 4 PILLARS */}
      <section className="bg-white border-b border-stone-200/80 pt-6 pb-6 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Status & Landmark Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Daily 7:30 AM – 11:30 PM IST
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80">
              <Sparkles className="w-3 h-3 text-amber-700" />
              Sion Circle Heritage Landmark
            </span>
          </div>

          {/* Main Headline (Clean typography, zero unwanted underlines) */}
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Authentic Mumbai <br />
              <span className="text-brand-terracotta">Pure Veg Tiffin</span> &amp; Sizzling Pav Bhaji
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">
              Hotel Hanuman Sion • Opposite MovieMax Cinema, Mumbai 400022
            </p>
          </div>

          {/* Rich Description Narrative */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center max-w-2xl mx-auto">
            Welcome to <strong>Hanuman Veg Restaurant (Hotel Hanuman)</strong>, the iconic pure vegetarian landmark at Sion Circle. For decades, we have served generations of Mumbai diners, cinema goers, and college students with crisp golden dosas, Amul butter pav bhaji, slow-cooked North Indian gravies, authentic Kumbakonam filter kaapi, and dedicated pure Jain preparations.
          </p>

          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-2xl mx-auto">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-sm sm:text-base">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.0 / 5.0</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium">6,000+ Reviews</p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-xs sm:text-sm">
                <div className="veg-box-seal scale-75 origin-center" />
                <span>100% Pure Veg</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium">Zero Meat Kitchen</p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-800 font-bold text-xs sm:text-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Jain Kitchen</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium">Zero Root Veg Prep</p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
              <div className="font-bold text-stone-900 text-xs sm:text-sm">₹900 – ₹1,000</div>
              <p className="text-[10px] text-stone-500 font-medium">Approx. for two</p>
            </div>
          </div>

          {/* 4 Pillars Cards Grid (Exact content from Heritage Section) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Film className="w-4 h-4 text-amber-700 shrink-0" />
                <h4 className="text-xs font-bold text-stone-900">The Sion Circle Landmark</h4>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Directly opposite MovieMax Cinema in Rupam Building, an iconic culinary anchor for cinema goers, commuters, and families across decades.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <h4 className="text-xs font-bold text-stone-900">Generational Consistency</h4>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Time-honored recipes with authentic Amul dairy butter, stone-ground spices, zero synthetic colors, and freshly simmered tiffin sambar.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-left">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs font-bold text-stone-900">Uncompromising Jain Sanctity</h4>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Dedicated tawas and cookware for 100% root-veg-free preparations using green raw bananas, revered by Sion and Matunga Jain communities.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <h4 className="text-xs font-bold text-stone-900">Continuous 16-Hour Service</h4>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                From 7:30 AM morning tiffin and filter coffee to late-night 11:30 PM post-movie dinners, operating without intermission 365 days a year.
              </p>
            </div>
          </div>

          {/* Verbal Order Highlight Notice */}
          <div className="mt-3 p-3 rounded-xl bg-stone-900 text-stone-200 text-center">
            <p className="text-xs font-bold text-white">
              Dine-In Digital Menu • Verbal Table Ordering
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Explore our complete menu below and place your order verbally with your server.
            </p>
          </div>

        </div>
      </section>

      {/* 3. STICKY SEARCH & CATEGORY BAR */}
      <div className="sticky top-[49px] sm:top-[53px] z-20 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-2 space-y-2.5">
          
          {/* Menu Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes…"
              aria-label="Search dishes"
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filters & Counter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setJainOnly(!jainOnly)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                jainOnly
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strict Jain Only</span>
              {jainOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            <button
              onClick={() => setBestsellersOnly(!bestsellersOnly)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                bestsellersOnly
                  ? "bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-2xs"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Star className="w-3 h-3 fill-amber-500" />
              <span>Bestsellers</span>
              {bestsellersOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            <span className="text-[11px] text-stone-400 ml-auto shrink-0 pl-2">
              {filteredDishes.length} {filteredDishes.length === 1 ? "dish" : "dishes"}
            </span>
          </div>

          {/* Horizontal Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-0.5 -mx-1 px-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                activeCategory === "all"
                  ? "bg-stone-900 text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <Utensils className="w-3 h-3" />
              <span>All Dishes</span>
            </button>

            {MENU_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 4. TEXT-BASED MENU DISPLAY */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 space-y-3">
            <Utensils className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-serif text-base font-bold text-stone-800">No dishes match your search</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              We couldn&apos;t find any dishes matching &ldquo;{searchQuery}&rdquo;. Try another term or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setJainOnly(false);
                setBestsellersOnly(false);
                setActiveCategory("all");
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : isGrouping ? (
          /* GROUPED BY CATEGORY */
          <div className="space-y-8">
            {groupedCategories.map(({ category, items }) => (
              <section key={category.id} className="space-y-3">
                
                {/* Category Heading Banner */}
                <div className="flex items-center justify-between pb-2 border-b-2 border-amber-600/30">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700">
                      {getCategoryIcon(category.id)}
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      {category.name}
                    </h2>
                  </div>
                  <span className="text-[11px] font-medium text-stone-400">
                    {items.length} items
                  </span>
                </div>

                {category.description && (
                  <p className="text-xs text-stone-500 italic pb-1">
                    {category.description}
                  </p>
                )}

                {/* Dish Rows */}
                <div className="bg-white rounded-2xl border border-stone-200/90 divide-y divide-stone-100 shadow-2xs overflow-hidden">
                  {items.map((dish) => (
                    <MenuDishRow key={dish.id} dish={dish} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* SINGLE FILTERED LIST */
          <div className="bg-white rounded-2xl border border-stone-200/90 divide-y divide-stone-100 shadow-2xs overflow-hidden">
            {filteredDishes.map((dish) => (
              <MenuDishRow key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        {/* Verbal Order Reminder Box */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center space-y-1">
          <p className="text-xs font-bold text-amber-950">
            Have you made your choice?
          </p>
          <p className="text-[11px] text-stone-600">
            Please place your order verbally with your server. All food is freshly prepared to order.
          </p>
        </div>

      </main>

      {/* 5. COMPACT FOOTER */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-8 pb-12 px-4 mt-8">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Restaurant identity & address */}
          <div className="space-y-2 text-center sm:text-left sm:flex sm:items-start sm:justify-between sm:space-y-0">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <div className="veg-box-seal">
                  <div className="veg-box-seal-dot" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Hanuman Veg Restaurant
                </h3>
              </div>
              <p className="text-xs text-stone-400">
                Hotel Hanuman Sion • Pure Vegetarian &amp; Jain Cuisine
              </p>
              <p className="text-xs text-stone-400 pt-1">
                Sion Circle, opposite MovieMax Cinema, Mumbai 400022
              </p>
            </div>

            {/* Timings */}
            <div className="sm:text-right pt-2 sm:pt-0">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                Operating Hours
              </span>
              <p className="text-xs text-white font-medium">
                Open Daily: 7:30 AM – 11:30 PM
              </p>
              <p className="text-[11px] text-stone-400">
                Continuous Kitchen Service
              </p>
            </div>
          </div>

          {/* Contact Numbers & Directions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-800 text-xs">
            <a
              href="tel:+919820647374"
              className="flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile: +91 98206 47374</span>
            </a>

            <a
              href="tel:02224071999"
              className="flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Landline: 022 2407 1999</span>
            </a>

            <a
              href={RESTAURANT_DATA.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Bottom Copyright & Admin link */}
          <div className="pt-4 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <p>
              © {new Date().getFullYear()} Hanuman Veg Restaurant. All rights reserved.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-stone-500 hover:text-amber-400 transition-colors"
              title="Staff / Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
};

// TEXT-ONLY DISH ROW COMPONENT
const MenuDishRow: React.FC<{ dish: MenuItem }> = ({ dish }) => {
  return (
    <div className="p-3.5 sm:p-4 hover:bg-stone-50/70 transition-colors flex items-start justify-between gap-3">
      
      {/* Left: Dish Information */}
      <div className="flex-1 min-w-0 pr-2 space-y-1">
        
        {/* Badges / Dietary Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {dish.dietary === "pure-jain" ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              Pure Jain
            </span>
          ) : dish.isJainFriendly ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Jain Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Pure Veg
            </span>
          )}

          {dish.badge && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-stone-900 border border-amber-300">
              {dish.badge}
            </span>
          )}

          {dish.spiceLevel !== undefined && dish.spiceLevel > 1 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-red-600 font-bold">
              <Flame className="w-2.5 h-2.5 fill-red-500" />
              {dish.spiceLevel === 3 ? "Extra Spicy" : "Spicy"}
            </span>
          )}
        </div>

        {/* Dish Name */}
        <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-snug break-words">
          {dish.name}
        </h3>

        {/* Short Description */}
        {dish.description && (
          <p className="text-xs text-stone-500 leading-relaxed break-words">
            {dish.description}
          </p>
        )}
      </div>

      {/* Right: Price */}
      <div className="shrink-0 text-right pt-0.5">
        <span className="font-sans text-base sm:text-lg font-extrabold text-stone-900 whitespace-nowrap">
          ₹{dish.price}
        </span>
        {dish.isAvailable === false && (
          <span className="block text-[10px] font-bold text-red-600 uppercase bg-red-50 px-1.5 py-0.5 rounded mt-0.5">
            Sold Out
          </span>
        )}
      </div>

    </div>
  );
};
