"use client";

import React, { useState, useMemo } from "react";
import { MenuItem, MenuCategory } from "@/types/restaurant";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/data/restaurantData";
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Check, 
  Flame, 
  X,
  Coffee,
  Soup,
  Utensils,
  Wine,
  Filter
} from "lucide-react";

interface MenuExplorerProps {
  onAddToCart: (item: MenuItem) => void;
  cartItems: { item: MenuItem; quantity: number }[];
}

export const MenuExplorer: React.FC<MenuExplorerProps> = ({
  onAddToCart,
  cartItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jainOnlyFilter, setJainOnlyFilter] = useState<boolean>(false);
  const [bestsellerOnlyFilter, setBestsellerOnlyFilter] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Map icons for categories
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "south-indian":
        return <Coffee className="w-4 h-4" />;
      case "pav-bhaji":
        return <Flame className="w-4 h-4" />;
      case "north-indian":
        return <Soup className="w-4 h-4" />;
      case "indo-chinese":
        return <Sparkles className="w-4 h-4" />;
      case "jain-specials":
        return <ShieldCheck className="w-4 h-4" />;
      case "beverages":
        return <Wine className="w-4 h-4" />;
      default:
        return <Utensils className="w-4 h-4" />;
    }
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== "all") {
        if (selectedCategory === "jain-specials") {
          if (!item.isJainFriendly && item.category !== "jain-specials") {
            return false;
          }
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Jain Only filter
      if (jainOnlyFilter && !item.isJainFriendly) {
        return false;
      }

      // Bestseller filter
      if (bestsellerOnlyFilter && !item.isBestseller && !item.isSignature) {
        return false;
      }

      // Search query check
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, jainOnlyFilter, bestsellerOnlyFilter]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  const getItemCartQuantity = (itemId: string) => {
    const found = cartItems.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu" className="py-20 bg-stone-50/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-brand-forest">
            <Utensils className="w-3.5 h-3.5" />
            Culinary Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main">
            Explore Our Pure Veg & Jain Menu
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Select items to customize your order and dispatch directly to our kitchen counter via WhatsApp.
          </p>
        </div>

        {/* Search & Quick Filters Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Live Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dosas, pav bhaji, paneer, falooda, filter coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-brand-terracotta focus:ring-2 focus:ring-amber-200 bg-stone-50/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Switches */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              {/* Jain Only Toggle */}
              <button
                onClick={() => setJainOnlyFilter(!jainOnlyFilter)}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  jainOnlyFilter
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Strictly Jain Friendly</span>
              </button>

              {/* Bestseller Toggle */}
              <button
                onClick={() => setBestsellerOnlyFilter(!bestsellerOnlyFilter)}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  bestsellerOnlyFilter
                    ? "bg-brand-forest text-white border-brand-forest shadow-sm"
                    : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Bestsellers Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isSelected
                      ? "bg-brand-terracotta text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900"
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <span>
            Showing <strong className="text-stone-900">{filteredItems.length}</strong> delicious dishes
          </span>
          {(searchQuery || jainOnlyFilter || bestsellerOnlyFilter || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setJainOnlyFilter(false);
                setBestsellerOnlyFilter(false);
              }}
              className="text-brand-terracotta hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-md mx-auto my-12">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No dishes match your filter</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Try adjusting your search keyword or clearing the Jain/Bestseller filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setJainOnlyFilter(false);
                setBestsellerOnlyFilter(false);
              }}
              className="px-4 py-2 rounded-lg bg-brand-terracotta text-white text-xs font-bold"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qtyInCart = getItemCartQuantity(item.id);
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-warm transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header Row: Title & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {item.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              {item.badge}
                            </span>
                          )}
                          {item.dietary === "pure-jain" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                              Pure Jain
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-base font-bold text-text-main leading-snug">
                          {item.name}
                        </h3>
                      </div>

                      {/* Pure Veg / Jain Seal Mark */}
                      <div className="shrink-0 mt-0.5">
                        {item.dietary === "pure-jain" ? (
                          <div className="jain-box-seal" title="Dedicated Pure Jain">
                            <div className="jain-box-seal-dot" />
                          </div>
                        ) : (
                          <div className="veg-box-seal" title="100% Pure Vegetarian">
                            <div className="veg-box-seal-dot" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags row */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                      {item.isJainFriendly && item.dietary !== "pure-jain" && (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Check className="w-3 h-3" /> Jain Prep Available
                        </span>
                      )}

                      {typeof item.spiceLevel === "number" && item.spiceLevel > 0 && (
                        <span className="inline-flex items-center gap-1 text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          <Flame className="w-3 h-3 text-amber-600" />
                          <span>
                            {item.spiceLevel === 1 ? "Mild" : item.spiceLevel === 2 ? "Medium" : "Spicy"}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
                    <div>
                      <span className="text-xs text-stone-400">Price</span>
                      <div className="font-serif text-lg font-bold text-stone-900">
                        ₹{item.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isJustAdded
                          ? "bg-emerald-600 text-white"
                          : qtyInCart > 0
                          ? "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                          : "bg-stone-900 hover:bg-brand-forest text-white"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : qtyInCart > 0 ? (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add More ({qtyInCart})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
