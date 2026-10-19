"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag,
  Flame,
  Coffee,
  CheckCircle2,
  QrCode,
  Utensils
} from "lucide-react";

interface HeroSectionProps {
  onOpenCart?: () => void;
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
}) => {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [currentStatusText, setCurrentStatusText] = useState("Open Now until 11:30 PM");

  useEffect(() => {
    const checkOpenStatus = () => {
      try {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istDate = new Date(utc + 3600000 * 5.5);
        const hours = istDate.getHours();
        const minutes = istDate.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Open 7:30 AM (450 mins) to 11:30 PM (1410 mins)
        const openMin = 7 * 60 + 30;
        const closeMin = 23 * 60 + 30;

        if (totalMinutes >= openMin && totalMinutes <= closeMin) {
          setIsOpenNow(true);
          setCurrentStatusText("Open Now • Serving until 11:30 PM");
        } else {
          setIsOpenNow(false);
          setCurrentStatusText("Opens at 7:30 AM for Morning Tiffin");
        }
      } catch {
        setIsOpenNow(true);
        setCurrentStatusText("Open Today 7:30 AM – 11:30 PM");
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-canvas pt-6 pb-14 lg:pt-14 lg:pb-24 border-b border-stone-200 texture-spice-grid">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-amber-light/40 via-amber-100/10 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-brand-terracotta/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Live Status & Heritage Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white border border-stone-200 text-stone-800 shadow-sm">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {currentStatusText}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-brand-terracotta-dark border border-amber-200/80">
                <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                Sion Circle Heritage Landmark
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-[1.12]">
                Authentic Mumbai <br />
                <span className="text-brand-terracotta">
                  Pure Veg Tiffin
                </span>{" "}
                & Sizzling Pav Bhaji
              </h1>
              <p className="text-sm sm:text-base text-text-muted font-normal max-w-2xl pt-1 leading-relaxed">
                Welcome to <strong>Hanuman Veg Restaurant (Hotel Hanuman)</strong>, the iconic pure vegetarian landmark at Sion Circle opposite MovieMax Cinema. Serving generations of Mumbai diners with crisp golden dosas, Amul butter pav bhaji, pure Jain preparations, and authentic South Indian filter kaapi.
              </p>
            </div>

            {/* Prominent Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-xs sm:text-sm shadow-warm transition-all transform hover:-translate-y-0.5"
              >
                <QrCode className="w-4 h-4 text-stone-950" />
                <span>Open Digital QR Menu</span>
              </Link>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <span>Reserve Table / Bulk Tiffin</span>
              </button>

              <a
                href="tel:+919820647374"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-brand-forest hover:bg-brand-forest-dark text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 98206 47374</span>
              </a>
            </div>

            {/* Trust Metrics Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-white border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-1 text-brand-amber font-bold text-base sm:text-lg">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-amber" />
                  <span>4.0 / 5.0</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-text-muted font-medium mt-0.5">6,000+ Verified Reviews</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-1.5 text-brand-forest font-bold text-xs sm:text-sm">
                  <div className="veg-box-seal shrink-0">
                    <div className="veg-box-seal-dot" />
                  </div>
                  <span>100% Pure Veg</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-text-muted font-medium mt-0.5">Zero Meat Kitchen</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200/80 shadow-sm">
                <div className="flex items-center gap-1.5 text-brand-terracotta font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                  <span>Jain Kitchen</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-text-muted font-medium mt-0.5">Zero Root Veg Prep</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200/80 shadow-sm">
                <div className="font-bold text-stone-900 text-xs sm:text-sm">₹900 – ₹1,000</div>
                <p className="text-[10px] sm:text-[11px] text-text-muted font-medium mt-0.5">Approx. for two</p>
              </div>
            </div>

            {/* Quick Landmark Anchor */}
            <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
              <MapPin className="w-4 h-4 text-brand-terracotta shrink-0" />
              <span>
                Opposite MovieMax Cinema, 2 mins from Sion Circle & 5 mins from Sion Station.
              </span>
            </div>

          </div>

          {/* Right Column: Text & Price Quick Highlights Card (0 photos, 0 overlaps) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-warm p-5 sm:p-6 space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="veg-box-seal shrink-0">
                    <div className="veg-box-seal-dot" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-tight">
                      Popular Favourites
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      Hotel Hanuman • Sion Circle
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-stone-900 border border-amber-200">
                  Daily Fresh
                </span>
              </div>

              {/* Dish Names and Verified Prices List */}
              <div className="space-y-3 divide-y divide-stone-100">
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Butter Mysore Masala Dosa
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        Bestseller
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Crisp golden crepe layered with fiery chutney &amp; melting Amul butter
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm sm:text-base shrink-0">
                    ₹150
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Special Mumbai Pav Bhaji
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        Iconic
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Slow tawa-roasted spiced bhaji topped with Amul butter &amp; soft pavs
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm sm:text-base shrink-0">
                    ₹160
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Idli Sambar (2 Pcs)
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Jain Available
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Steamed rice-lentil cakes with drumstick sambar &amp; coconut chutney
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm sm:text-base shrink-0">
                    ₹90
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Jain Paneer Butter Masala
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-50 text-orange-800 border border-orange-200">
                        Pure Jain
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Fresh dairy paneer in rich tomato-cashew gravy with zero root veg
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm sm:text-base shrink-0">
                    ₹240
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Authentic Filter Kaapi
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-stone-100 text-stone-700">
                        Hot Brew
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      Freshly brewed South Indian chicory blend in traditional dabarah
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm sm:text-base shrink-0">
                    ₹45
                  </span>
                </div>
              </div>

              {/* Dine-In Ordering Note & CTA */}
              <div className="pt-2">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-center space-y-1">
                  <p className="text-xs font-bold text-stone-800">
                    Dine-In Digital Menu • Verbal Order Placement
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Browse all dishes with prices and place your order verbally with your server.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3">
                  <Link
                    href="/menu"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs text-center transition-all shadow-sm"
                  >
                    View Complete 40+ Menu
                  </Link>
                  <a
                    href="tel:+919820647374"
                    className="py-2.5 px-3.5 rounded-xl bg-stone-900 hover:bg-brand-forest text-white font-bold text-xs text-center transition-all shadow-sm"
                  >
                    Call Desk
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
