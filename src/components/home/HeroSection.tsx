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

          {/* Right Column: Interactive Visual Showcase Collage */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Feature Card */}
              <div className="rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-warm-lg p-3">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
                    alt="Authentic Crispy Butter Mysore Masala Dosa"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/20" />
                  
                  {/* Floating Badges on Image */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-forest flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pure Vegetarian Legacy</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-brand-amber uppercase tracking-wider block">
                      Chef Signature Since Decades
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                      Butter Mysore Masala Dosa
                    </h3>
                    <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">
                      Golden crisp crepe layered with spicy chutney & melting Amul butter
                    </p>
                  </div>
                </div>

                {/* Secondary Ticker Grid */}
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-brand-terracotta shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Special Pav Bhaji</h4>
                      <p className="text-[10px] text-stone-600">Slow tawa roasted in butter</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-brand-forest shrink-0">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Madras Kaapi</h4>
                      <p className="text-[10px] text-stone-600">Brass dabarah filter brew</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Customer Quote Tag */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 max-w-xs bg-canvas-dark text-white p-3 rounded-2xl border border-stone-800 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-1 text-brand-amber mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-amber" />
                  ))}
                  <span className="text-[10px] text-stone-300 ml-1 font-bold">5.0</span>
                </div>
                <p className="text-xs italic text-stone-300 leading-snug">
                  &ldquo;A must-visit spot whenever we catch an evening show at MovieMax Sion Circle!&rdquo;
                </p>
                <p className="text-[10px] text-brand-amber font-semibold mt-1">
                  — Pooja V., Sion Resident
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
