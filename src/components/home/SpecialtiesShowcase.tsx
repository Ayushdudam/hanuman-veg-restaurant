"use client";

import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/restaurant";
import { MENU_ITEMS } from "@/data/restaurantData";
import { Sparkles, Check, Flame, Phone } from "lucide-react";

interface SpecialtiesShowcaseProps {
  onAddToCart?: (item: MenuItem) => void;
}

export const SpecialtiesShowcase: React.FC<SpecialtiesShowcaseProps> = () => {
  // Grab the top 6 signature items
  const signatureItems = MENU_ITEMS.filter((item) => item.isSignature);

  return (
    <section id="specialties" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 bg-canvas border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
              <Sparkles className="w-3.5 h-3.5" />
              Sion Hall of Fame
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-text-main">
              Signature Culinary Masterpieces
            </h2>
            <p className="text-text-muted text-xs sm:text-sm">
              The dishes that define the legacy of Hanuman Veg Restaurant — handcrafted with authentic ingredients, Amul dairy butter, and decades of culinary finesse.
            </p>
          </div>

          <Link
            href="/menu"
            className="self-start md:self-end text-xs sm:text-sm font-bold text-brand-terracotta hover:text-brand-terracotta-dark inline-flex items-center gap-1.5 underline decoration-2 underline-offset-4"
          >
            <span>View All 40+ Menu Items</span>
            <span>→</span>
          </Link>
        </div>

        {/* 6 Grid Cards (Clean, Text & Price only - 0 photos, 0 overlaps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {signatureItems.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-warm transition-all duration-300 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Badge, Seal & Price */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.dietary === "pure-jain" ? (
                        <div className="jain-box-seal" title="100% Pure Jain Preparation">
                          <div className="jain-box-seal-dot" />
                        </div>
                      ) : (
                        <div className="veg-box-seal" title="100% Pure Vegetarian">
                          <div className="veg-box-seal-dot" />
                        </div>
                      )}

                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-stone-900 font-extrabold text-[11px] border border-amber-300">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="font-sans text-lg sm:text-xl font-extrabold text-stone-900">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Dish Name */}
                  <h3 className="font-serif text-lg font-bold text-text-main leading-snug">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dietary & Spice features */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-600 flex-wrap">
                    {item.dietary === "pure-jain" && (
                      <span className="inline-flex items-center gap-1 font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        100% Pure Jain
                      </span>
                    )}
                    {item.isJainFriendly && item.dietary !== "pure-jain" && (
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-forest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3 h-3" /> Jain Available
                      </span>
                    )}

                    {typeof item.spiceLevel === "number" && item.spiceLevel > 0 && (
                      <span className="inline-flex items-center gap-1 text-brand-terracotta bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Flame className="w-3 h-3 fill-brand-terracotta" />
                        <span>
                          {item.spiceLevel === 1 ? "Mild Spiced" : item.spiceLevel === 2 ? "Medium Spicy" : "Fiery Hot"}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="pt-3 border-t border-stone-100 flex gap-2">
                  <Link
                    href="/menu"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all border border-stone-200"
                  >
                    <span>View in Menu</span>
                  </Link>
                  <a
                    href="tel:+919820647374"
                    className="flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-stone-900 hover:bg-brand-forest text-white text-xs font-bold transition-all shadow-sm"
                    title="Call to Order"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Order by Phone</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
