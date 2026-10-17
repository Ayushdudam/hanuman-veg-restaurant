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
    <section id="specialties" className="py-20 bg-canvas border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
              <Sparkles className="w-3.5 h-3.5" />
              Sion Hall of Fame
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-text-main">
              Signature Culinary Masterpieces
            </h2>
            <p className="text-text-muted text-sm sm:text-base">
              The dishes that define the legacy of Hanuman Veg Restaurant — handcrafted with authentic ingredients, Amul dairy butter, and decades of culinary finesse.
            </p>
          </div>

          <Link
            href="/menu"
            className="self-start md:self-end text-sm font-bold text-brand-terracotta hover:text-brand-terracotta-dark inline-flex items-center gap-1.5 underline decoration-2 underline-offset-4"
          >
            <span>View All 40+ Menu Items</span>
            <span>→</span>
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map((item) => {
            const imgSrc = item.imageUrl || "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80";

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-900">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-brand-amber text-slate-900 font-extrabold text-[11px] shadow">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Veg / Jain mark */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-1 rounded shadow">
                      {item.dietary === "pure-jain" ? (
                        <div className="jain-box-seal" title="100% Pure Jain Preparation">
                          <div className="jain-box-seal-dot" />
                        </div>
                      ) : (
                        <div className="veg-box-seal" title="100% Pure Vegetarian">
                          <div className="veg-box-seal-dot" />
                        </div>
                      )}
                    </div>

                    {/* Price Tag in Bottom Right */}
                    <div className="absolute bottom-3 right-3 bg-stone-950/90 text-white font-bold text-base px-3 py-1 rounded-lg backdrop-blur-md border border-stone-700/60 shadow">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-brand-terracotta transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Features row */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-600">
                      {item.isJainFriendly && (
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
                </div>

                {/* Card CTA Footer */}
                <div className="p-5 pt-0 flex gap-2">
                  <Link
                    href="/menu"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all border border-stone-200"
                  >
                    <span>View in Menu</span>
                  </Link>
                  <a
                    href="tel:+919820647374"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-stone-900 hover:bg-brand-forest text-white text-xs font-bold transition-all shadow-sm"
                    title="Call to Order"
                  >
                    <Phone className="w-3.5 h-3.5" />
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
