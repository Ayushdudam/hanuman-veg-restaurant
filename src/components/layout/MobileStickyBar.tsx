"use client";

import React from "react";
import Link from "next/link";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { Phone, CalendarDays, Utensils, Navigation } from "lucide-react";

interface MobileStickyBarProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onOpenReservation?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenReservation,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-canvas-dark/95 backdrop-blur-lg border-t border-stone-800 py-2.5 px-3 md:hidden shadow-2xl">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Call Now */}
        <a
          href={`tel:${RESTAURANT_DATA.phone}`}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-stone-300 hover:text-white active:bg-stone-800 transition-colors"
        >
          <Phone className="w-5 h-5 text-brand-amber mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* View Menu */}
        <Link
          href="/menu"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-stone-300 hover:text-white active:bg-stone-800 transition-colors"
        >
          <Utensils className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">QR Menu</span>
        </Link>

        {/* Directions */}
        <a
          href={RESTAURANT_DATA.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-stone-300 hover:text-white active:bg-stone-800 transition-colors"
        >
          <Navigation className="w-5 h-5 text-blue-400 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Directions</span>
        </a>

        {/* Book Table */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-brand-forest hover:bg-brand-forest-dark text-white relative active:scale-95 transition-transform"
        >
          <CalendarDays className="w-5 h-5 mb-1 text-emerald-100" />
          <span className="text-[10px] font-bold tracking-tight">Book Table</span>
        </button>
      </div>
    </div>
  );
};
