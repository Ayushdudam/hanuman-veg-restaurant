"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  CalendarDays,
  Sparkles,
  ChevronRight,
  QrCode,
  ShieldCheck,
  Lock
} from "lucide-react";

interface NavbarProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Heritage", href: "#heritage" },
    { name: "Signatures", href: "#specialties" },
    { name: "Menu", href: "#menu" },
    { name: "Jain Promise", href: "#jain-promise" },
    { name: "Reviews", href: "#reviews" },
    { name: "Location", href: "#location" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Quick-Contact Utility Bar */}
      <div className="bg-canvas-dark text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-brand-amber font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-terracotta" />
              Sion Circle (Opposite MovieMax Cinema), Mumbai 400022
            </span>
            <span className="hidden md:inline-block text-stone-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Daily 7:30 AM – 11:30 PM IST
            </span>
            <span className="hidden lg:inline-block text-stone-600">•</span>
            <span className="hidden lg:inline-block text-stone-300">
              100% Pure Veg • Dedicated Jain Kitchen
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${RESTAURANT_DATA.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-amber" />
              <span className="font-semibold text-stone-200">{RESTAURANT_DATA.phoneDisplay}</span>
            </a>
            <span className="hidden md:inline-block text-stone-600">•</span>
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-400 transition-colors"
              title="Restaurant Owner Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-warm py-2.5 sm:py-3"
            : "bg-[#FDFBF7]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-stone-200/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo Badge (shrink-0, clean, no overlapping badge) */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            {/* Visual Veg Emblem */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-50 border-2 border-brand-forest flex items-center justify-center p-0.5 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-forest shadow-inner" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-wide text-text-main group-hover:text-brand-terracotta transition-colors leading-tight">
                HANUMAN
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-text-muted uppercase">
                Veg Restaurant • Sion Circle
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Streamlined, shrink-0, whitespace-nowrap) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-text-main hover:text-brand-terracotta transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-terracotta hover:after:w-full after:transition-all whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}

            {/* Prominent QR Menu Link Pill */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Digital QR Menu</span>
            </Link>
          </div>

          {/* Header Action Buttons (shrink-0, whitespace-nowrap) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition-all shadow-sm whitespace-nowrap"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Table Booking</span>
            </button>

            <a
              href={`tel:${RESTAURANT_DATA.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-stone-900 hover:bg-brand-forest text-white transition-all shadow-sm whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Desk</span>
            </a>
          </div>

          {/* Mobile Right Controls (Compact, shrink-0, zero overlap) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <Link
              href="/menu"
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-1 shrink-0 shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Menu</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-text-main hover:bg-stone-100 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-terracotta" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-md px-4 pt-4 pb-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-2">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  <span>Open Standalone QR Menu</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg text-sm font-semibold text-text-main hover:bg-amber-50/80 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </a>
              ))}

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Owner Admin Dashboard</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </Link>
            </div>

            <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl border border-brand-terracotta text-brand-terracotta text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Book Table</span>
              </button>

              <a
                href={`tel:${RESTAURANT_DATA.phone}`}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-brand-forest text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
