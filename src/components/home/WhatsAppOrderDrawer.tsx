"use client";

import React, { useState } from "react";
import { CartItem } from "@/types/restaurant";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  MapPin,
  Utensils
} from "lucide-react";

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClearCart: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<"takeaway" | "delivery" | "dinein">("takeaway");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [addressOrTable, setAddressOrTable] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate WhatsApp message
  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    const orderTypeLabel =
      orderType === "takeaway"
        ? "Takeaway / Parcel Pickup (Sion Circle Counter)"
        : orderType === "delivery"
        ? "Direct Home Delivery (Sion / Nearby Area)"
        : "Dine-in Table Pre-Order (Hotel Hanuman)";

    let msg = `*NEW ORDER - HANUMAN VEG RESTAURANT SION*\n`;
    msg += `📍 Sion Circle, Mumbai (Opp. MovieMax Cinema)\n`;
    msg += `------------------------------------\n`;
    msg += `*Order Type:* ${orderTypeLabel}\n`;
    if (customerName.trim()) msg += `*Customer Name:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*Contact Phone:* ${customerPhone.trim()}\n`;
    if (addressOrTable.trim()) {
      msg += `*${orderType === "delivery" ? "Delivery Address" : "Table/Reference"}:* ${addressOrTable.trim()}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `*ITEMS ORDERED:*\n`;

    cart.forEach((c) => {
      msg += `• ${c.quantity}x ${c.item.name} (₹${c.item.price * c.quantity})\n`;
    });

    msg += `------------------------------------\n`;
    msg += `*ESTIMATED TOTAL:* ₹${subtotal}\n`;

    if (specialNotes.trim()) {
      msg += `*Kitchen Instructions:* ${specialNotes.trim()}\n`;
    } else {
      msg += `*Dietary Note:* 100% Pure Veg\n`;
    }
    msg += `------------------------------------\n`;
    msg += `Kindly confirm my order and share preparation time / payment link. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/919820647374?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-canvas text-text-main shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-forest border border-emerald-200 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Your WhatsApp Tray
                </h2>
                <p className="text-[11px] text-stone-500">
                  {totalItemCount} {totalItemCount === 1 ? "dish" : "dishes"} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-brand-terracotta border border-amber-200 flex items-center justify-center mx-auto">
                  <Utensils className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-stone-800">
                    Your tray is currently empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Browse our South Indian tiffins, legendary pav bhaji, or Jain specials and click &ldquo;Add to Tray&rdquo;.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-brand-terracotta text-white font-bold text-xs hover:bg-brand-terracotta-dark shadow-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">
                      Selected Items
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-red-600 hover:underline text-[11px] font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.item.id}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {item.item.dietary === "pure-jain" ? (
                            <div className="jain-box-seal shrink-0">
                              <div className="jain-box-seal-dot" />
                            </div>
                          ) : (
                            <div className="veg-box-seal shrink-0">
                              <div className="veg-box-seal-dot" />
                            </div>
                          )}
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {item.item.name}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-500">
                          ₹{item.item.price} each • <span className="font-bold text-stone-800">₹{item.item.price * item.quantity}</span>
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded bg-white text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors shadow-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded bg-white text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.item.id, 0)}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Dining Preference Selection */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                    Dining / Order Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType("takeaway")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        orderType === "takeaway"
                          ? "bg-amber-100 text-amber-900 border-brand-amber shadow-xs"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      🥡 Takeaway
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("delivery")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        orderType === "delivery"
                          ? "bg-amber-100 text-amber-900 border-brand-amber shadow-xs"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      🛵 Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("dinein")}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        orderType === "dinein"
                          ? "bg-amber-100 text-amber-900 border-brand-amber shadow-xs"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      🍽️ Dine-in
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-200">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Shah"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98200 XXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      {orderType === "delivery"
                        ? "Delivery Address in Sion / Nearby"
                        : "Pickup Time / Landmark"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        orderType === "delivery"
                          ? "Building name, Flat no, Sion West"
                          : "e.g. Ready in 20 minutes"
                      }
                      value={addressOrTable}
                      onChange={(e) => setAddressOrTable(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Cooking Notes / Jain Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Make strictly Jain, less spicy, extra butter"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:border-brand-terracotta"
                    />
                  </div>
                </div>

                {/* Pure Veg Guarantee */}
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Freshly prepared at Sion Circle counter upon WhatsApp confirmation.</span>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Calculation & WhatsApp Dispatch */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal ({totalItemCount} items)</span>
                  <span className="font-semibold text-stone-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Packaging & Parcel Box</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-brand-terracotta">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-warm hover:shadow-warm-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Order via WhatsApp (+91 98206 47374)</span>
              </button>

              <p className="text-[10px] text-center text-stone-400">
                You will be redirected to WhatsApp to review & send your prefilled order directly to our counter.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
