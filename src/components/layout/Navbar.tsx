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
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
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
    { name: "About Heritage", href: "#heritage" },
    { name: "Signatures", href: "#specialties" },
    { name: "Full Menu", href: "#menu" },
    { name: "The Jain Promise", href: "#jain-promise" },
    { name: "Guest Reviews", href: "#reviews" },
    { name: "Hours & Location", href: "#location" },
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
              <Phone className="w-3 h-3 text-brand-amber" />
              <span className="font-semibold text-stone-200">{RESTAURANT_DATA.phoneDisplay}</span>
            </a>
            <span className="hidden md:inline-block text-stone-600">•</span>
            <a
              href={`tel:${RESTAURANT_DATA.landline}`}
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>{RESTAURANT_DATA.landlineDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-warm py-3"
            : "bg-[#FDFBF7]/95 backdrop-blur-md py-4 border-b border-stone-200/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Visual Veg Emblem */}
            <div className="w-10 h-10 rounded-lg bg-amber-50 border-2 border-brand-forest flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 rounded-full bg-brand-forest shadow-inner" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-text-main group-hover:text-brand-terracotta transition-colors">
                  HANUMAN
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-brand-forest border border-emerald-300">
                  Pure Veg
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-text-muted uppercase">
                Veg Restaurant • Sion Circle • Estd Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-main hover:text-brand-terracotta transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-terracotta hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition-all shadow-sm"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Table / Bulk Order</span>
            </button>

            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-brand-forest hover:bg-emerald-800 text-white transition-all shadow-sm relative group"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>WhatsApp Tray</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-amber text-slate-900 font-extrabold text-[11px] flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              aria-label="Order Cart"
              className="p-2 rounded-lg bg-emerald-50 text-brand-forest border border-emerald-200 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-amber text-slate-900 font-bold text-[10px] flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-main hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 border-t border-stone-200 mt-3 bg-canvas/98 backdrop-blur-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-text-main hover:bg-amber-50 hover:text-brand-terracotta"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-lg border border-brand-terracotta text-brand-terracotta bg-white"
              >
                <CalendarDays className="w-4 h-4" />
                Reserve Table / Bulk Catering
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-lg bg-brand-forest text-white"
              >
                <ShoppingBag className="w-4 h-4" />
                Open WhatsApp Order Tray ({cartItemCount})
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
