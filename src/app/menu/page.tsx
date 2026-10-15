"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  MenuItem, 
  MenuCategory, 
  CartItem, 
  RestaurantSettings 
} from "@/types/restaurant";
import { 
  Search, 
  ShoppingBag, 
  ArrowLeft, 
  Flame, 
  Coffee, 
  Soup, 
  Sparkles, 
  ShieldCheck, 
  Wine, 
  Utensils, 
  Plus, 
  Minus, 
  X, 
  Check, 
  Star, 
  Clock, 
  Phone, 
  MapPin, 
  AlertCircle,
  ChevronRight,
  Send,
  MessageSquare
} from "lucide-react";

// Fallback image map
const DISH_IMAGE_FALLBACKS: Record<string, string> = {
  "south-indian": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
  "pav-bhaji": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
  "north-indian": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
  "indo-chinese": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
  "jain-specials": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
  "beverages": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
};

function MenuContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table") || "";

  const [tableNumber, setTableNumber] = useState<string>(tableParam);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jainOnly, setJainOnly] = useState<boolean>(false);
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(false);

  // Cart & Ordering
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [dishModalQty, setDishModalQty] = useState<number>(1);
  const [dishModalNotes, setDishModalNotes] = useState<string>("");

  // Order submission state
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [placedOrderReference, setPlacedOrderReference] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [orderNotes, setOrderNotes] = useState<string>("");

  useEffect(() => {
    if (tableParam) {
      setTableNumber(tableParam);
    }
  }, [tableParam]);

  // Fetch menu and categories from persistent API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [menuRes, catRes] = await Promise.all([
          fetch("/api/menu"),
          fetch("/api/categories")
        ]);

        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setItems(menuData.items || []);
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.categories || []);
        }
      } catch (err) {
        console.error("Failed to load live menu:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter items
  const filteredDishes = useMemo(() => {
    return items.filter((dish) => {
      // Category filter
      if (activeCategory !== "all") {
        if (activeCategory === "jain-specials") {
          if (!dish.isJainFriendly && dish.category !== "jain-specials") return false;
        } else if (dish.category !== activeCategory) {
          return false;
        }
      }

      // Jain Only filter
      if (jainOnly && !dish.isJainFriendly) return false;

      // Bestseller filter
      if (bestsellerOnly && !dish.isBestseller && !dish.isSignature) return false;

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
  }, [items, activeCategory, jainOnly, bestsellerOnly, searchQuery]);

  // Cart operations
  const handleAddToCart = (dish: MenuItem, quantity = 1, notes?: string) => {
    if (dish.isAvailable === false) return;

    setCart((prev) => {
      const idx = prev.findIndex((c) => c.item.id === dish.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        if (notes) updated[idx].instructions = notes;
        return updated;
      }
      return [...prev, { item: dish, quantity, instructions: notes }];
    });
  };

  const handleUpdateCartQty = (dishId: string, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) return prev.filter((c) => c.item.id !== dishId);
      return prev.map((c) => (c.item.id === dishId ? { ...c, quantity: newQty } : c));
    });
  };

  const cartTotalAmount = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Direct Server Order Submission
  const handleDirectOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      setIsSubmittingOrder(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: tableNumber.trim() || undefined,
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined,
          notes: orderNotes.trim() || undefined,
          items: cart.map((c) => ({
            dishId: c.item.id,
            name: c.item.name,
            price: c.item.price,
            quantity: c.quantity,
            notes: c.instructions,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit order. Please try again.");
        return;
      }

      setPlacedOrderReference(data.orderReference);
      setCart([]);
    } catch (err) {
      alert("Error submitting order. Please check network connection.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // WhatsApp Checkout Generator
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let msg = `*NEW ORDER - HANUMAN VEG RESTAURANT SION*\n`;
    msg += `📍 Sion Circle, Mumbai (Opp. MovieMax Cinema)\n`;
    msg += `------------------------------------\n`;
    msg += `*Order Mode:* ${tableNumber ? `Dine-in (Table ${tableNumber})` : "Direct Parcel / Dine-in"}\n`;
    if (customerName.trim()) msg += `*Customer:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*Phone:* ${customerPhone.trim()}\n`;
    msg += `------------------------------------\n`;
    msg += `*ITEMS:*\n`;
    cart.forEach((c) => {
      msg += `• ${c.quantity}x ${c.item.name} (₹${c.item.price * c.quantity})\n`;
      if (c.instructions) msg += `   ↳ Note: ${c.instructions}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*TOTAL AMOUNT:* ₹${cartTotalAmount}\n`;
    if (orderNotes.trim()) msg += `*Kitchen Instructions:* ${orderNotes.trim()}\n`;
    msg += `------------------------------------\n`;
    msg += `Please confirm my order. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919820647374?text=${encoded}`, "_blank");
  };

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

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] pb-28">
      {/* Top Mobile-First Header */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Restaurant Title & Table Info */}
          <div className="text-center">
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-none">
              Hanuman Veg Restaurant
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-[11px] text-stone-500 font-medium">Sion Circle, Mumbai</span>
              {tableNumber ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  <MapPin className="w-2.5 h-2.5 text-amber-700" />
                  Table {tableNumber.toUpperCase()}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Live Digital Menu
                </span>
              )}
            </div>
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm flex items-center justify-center"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-4xl mx-auto px-4 pb-3 pt-1 space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Dosa, Pav Bhaji, Paneer Tikka)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Toggle Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setJainOnly(!jainOnly)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                jainOnly
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strict Jain Only</span>
              {jainOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            <button
              onClick={() => setBestsellerOnly(!bestsellerOnly)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                bestsellerOnly
                  ? "bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-sm"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Star className="w-3 h-3 fill-amber-500" />
              <span>Bestsellers</span>
              {bestsellerOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            <span className="text-[11px] text-stone-400 ml-auto shrink-0 hidden sm:inline">
              {filteredDishes.length} {filteredDishes.length === 1 ? "dish" : "dishes"}
            </span>
          </div>
        </div>

        {/* Sticky Horizontal Category Bar */}
        <div className="border-t border-stone-200/80 bg-white/70 overflow-x-auto no-scrollbar">
          <div className="max-w-4xl mx-auto px-4 flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                activeCategory === "all"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>All Dishes</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Dishes Grid */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        {loading ? (
          <div className="space-y-4 py-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-stone-200/60 animate-pulse" />
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-stone-200 p-8 my-6">
            <Utensils className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No dishes match your criteria</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Try adjusting your search query or clearing the dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setJainOnly(false);
                setBestsellerOnly(false);
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredDishes.map((dish) => {
              const inCartItem = cart.find((c) => c.item.id === dish.id);
              const imgSrc = dish.imageUrl || DISH_IMAGE_FALLBACKS[dish.category] || DISH_IMAGE_FALLBACKS["south-indian"];
              const isAvailable = dish.isAvailable !== false;

              return (
                <div
                  key={dish.id}
                  onClick={() => {
                    setSelectedDish(dish);
                    setDishModalQty(1);
                    setDishModalNotes("");
                  }}
                  className={`group relative bg-white rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 cursor-pointer flex gap-3.5 sm:gap-4 items-center justify-between ${
                    isAvailable
                      ? "border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-300"
                      : "border-stone-200/60 opacity-60 bg-stone-50 cursor-not-allowed"
                  }`}
                >
                  {/* Left Column: Details */}
                  <div className="flex-1 min-w-0 pr-2 space-y-1">
                    {/* Dietary Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {dish.dietary === "pure-jain" ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                          <span className="w-2 h-2 rounded-full bg-amber-600" />
                          Pure Jain
                        </span>
                      ) : dish.isJainFriendly ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          Jain Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          Pure Veg
                        </span>
                      )}

                      {dish.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-stone-900">
                          {dish.badge}
                        </span>
                      )}

                      {dish.spiceLevel !== undefined && dish.spiceLevel > 1 && (
                        <span className="flex items-center text-[10px] text-red-600 font-bold">
                          <Flame className="w-3 h-3 fill-red-500" />
                          {dish.spiceLevel === 3 ? "Extra Spicy" : "Spicy"}
                        </span>
                      )}
                    </div>

                    {/* Dish Name */}
                    <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {dish.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Price in INR */}
                    <div className="pt-1 flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-stone-900 font-sans">
                        ₹{dish.price}
                      </span>
                      {!isAvailable && (
                        <span className="text-[11px] font-bold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">
                          Sold Out Today
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Thumbnail Image + Add Button */}
                  <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={imgSrc}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Quick Add Overlay Button */}
                    <div
                      className="absolute bottom-1.5 right-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAvailable) {
                          handleAddToCart(dish, 1);
                        }
                      }}
                    >
                      {inCartItem ? (
                        <div className="flex items-center gap-1.5 bg-stone-900 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateCartQty(dish.id, inCartItem.quantity - 1);
                            }}
                            className="hover:text-amber-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span>{inCartItem.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateCartQty(dish.id, inCartItem.quantity + 1);
                            }}
                            className="hover:text-amber-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled={!isAvailable}
                          className={`px-3 py-1 rounded-lg text-xs font-extrabold shadow-md flex items-center gap-1 transition-all ${
                            isAvailable
                              ? "bg-white/95 backdrop-blur-md text-amber-700 border border-amber-300 hover:bg-amber-500 hover:text-white"
                              : "bg-stone-300 text-stone-500 cursor-not-allowed border-stone-400"
                          }`}
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Sticky Bottom Cart Pill */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-40 max-w-md mx-auto px-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-stone-950 text-white p-3.5 rounded-2xl shadow-2xl border border-stone-800 flex items-center justify-between hover:bg-stone-900 transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                {cartItemCount}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-stone-200">View Selected Tray</span>
                {tableNumber && (
                  <span className="text-[10px] text-amber-400 block font-semibold">
                    Table {tableNumber.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">₹{cartTotalAmount}</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </div>
          </button>
        </div>
      )}

      {/* Dish Detail Sheet / Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedDish(null)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-stone-200 shadow-2xl p-5 sm:p-6 z-10 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-48 sm:h-56 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 rounded-t-3xl overflow-hidden bg-stone-900 mb-4">
              <img
                src={
                  selectedDish.imageUrl ||
                  DISH_IMAGE_FALLBACKS[selectedDish.category] ||
                  DISH_IMAGE_FALLBACKS["south-indian"]
                }
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  {selectedDish.category.replace("-", " ")}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold">{selectedDish.name}</h2>
              </div>
            </div>

            {/* Dish Description & Dietary Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    ₹{selectedDish.price}
                  </span>
                  {selectedDish.isAvailable === false && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      Temporarily Unavailable
                    </span>
                  )}
                </div>

                {selectedDish.isJainFriendly && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Jain Compliant Available</span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedDish.description}
              </p>

              {/* Special Instructions Input */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Kitchen Notes / Customization (Optional)
                </label>
                <input
                  type="text"
                  value={dishModalNotes}
                  onChange={(e) => setDishModalNotes(e.target.value)}
                  placeholder="e.g. Less spicy, Jain preparation, butter on side..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Quantity Selector & Action */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setDishModalQty(Math.max(1, dishModalQty - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold hover:bg-stone-200 shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm w-5 text-center">{dishModalQty}</span>
                  <button
                    onClick={() => setDishModalQty(dishModalQty + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold hover:bg-stone-200 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  disabled={selectedDish.isAvailable === false}
                  onClick={() => {
                    handleAddToCart(selectedDish, dishModalQty, dishModalNotes);
                    setSelectedDish(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-warm transition-all ${
                    selectedDish.isAvailable !== false
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Order • ₹{selectedDish.price * dishModalQty}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Ordering Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div
            className="fixed inset-0"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FDFBF7]">
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">Your Dining Tray</h2>
                <span className="text-[11px] text-stone-500 font-medium">
                  {cartItemCount} {cartItemCount === 1 ? "dish" : "dishes"} selected
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Placed Order Confirmation View */}
            {placedOrderReference ? (
              <div className="p-6 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Order Submitted to Kitchen!
                  </h3>
                  <p className="text-xs text-stone-600">
                    Your kitchen ticket reference is:
                  </p>
                  <div className="text-2xl font-mono font-extrabold text-amber-700 py-1">
                    {placedOrderReference}
                  </div>
                  {tableNumber && (
                    <p className="text-xs font-semibold text-stone-700">
                      Service to Table: <strong className="text-stone-950 font-bold">{tableNumber.toUpperCase()}</strong>
                    </p>
                  )}
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 text-left text-xs text-stone-700 border border-amber-200/80 space-y-1.5">
                  <p className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Estimated Preparation: 10–15 mins
                  </p>
                  <p className="text-stone-600">
                    Our waitstaff and kitchen team at Hotel Hanuman Sion Circle are now preparing your order piping hot.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPlacedOrderReference(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
                >
                  Return to Menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="p-8 text-center space-y-3 my-auto">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-base font-bold text-stone-800">Your Tray is Empty</h3>
                <p className="text-xs text-stone-500">
                  Select your favorite dosas, pav bhaji, and refreshments to start your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900">
                            {cartItem.item.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-700">
                          ₹{cartItem.item.price * cartItem.quantity}
                        </span>
                        {cartItem.instructions && (
                          <span className="text-[10px] text-stone-500 block italic">
                            &ldquo;{cartItem.instructions}&rdquo;
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-stone-100 px-2 py-1 rounded-lg">
                        <button
                          onClick={() => handleUpdateCartQty(cartItem.item.id, cartItem.quantity - 1)}
                          className="text-stone-600 hover:text-stone-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => handleUpdateCartQty(cartItem.item.id, cartItem.quantity + 1)}
                          className="text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Identification & Customer Details */}
                <div className="p-4 border-t border-stone-200 bg-stone-50/70 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-0.5">
                        Table Number
                      </label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. T01, T05"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 font-bold uppercase text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-0.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Optional"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-0.5">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Serve coffee at the end, extra chutney..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 text-stone-900"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-stone-600">Total Order Amount</span>
                    <span className="font-serif text-xl font-bold text-stone-900">₹{cartTotalAmount}</span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleDirectOrderSubmit}
                      disabled={isSubmittingOrder}
                      className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-warm transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmittingOrder ? "Submitting..." : "Submit Order to Kitchen"}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-stone-600">Loading Hanuman Digital Menu...</p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
