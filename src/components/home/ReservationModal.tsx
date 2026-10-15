"use client";

import React, { useState } from "react";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  X, 
  CalendarDays, 
  Users, 
  Clock, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inquiryType, setInquiryType] = useState<
    "table" | "movie-group" | "bulk-tiffin" | "catering"
  >("table");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("4");
  const [dietary, setDietary] = useState("pure-veg");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const typeLabel =
      inquiryType === "table"
        ? "Table Reservation"
        : inquiryType === "movie-group"
        ? "Pre/Post Movie Table (MovieMax Sion Circle)"
        : inquiryType === "bulk-tiffin"
        ? "Bulk Tiffin / Corporate Lunch Order"
        : "Family Event / Birthday Catering";

    const dietLabel =
      dietary === "strict-jain"
        ? "100% Strict Jain (No Onion/Garlic/Potato)"
        : dietary === "jain-veg-mix"
        ? "Mix of Pure Veg & Strict Jain"
        : "Standard Pure Vegetarian";

    let msg = `*RESERVATION / EVENT INQUIRY - HOTEL HANUMAN SION*\n`;
    msg += `📍 Sion Circle (Opp. MovieMax Cinema), Mumbai\n`;
    msg += `------------------------------------\n`;
    msg += `*Inquiry Type:* ${typeLabel}\n`;
    msg += `*Name:* ${name || "Guest"}\n`;
    msg += `*Phone:* ${phone || "Not specified"}\n`;
    if (date) msg += `*Date:* ${date}\n`;
    if (time) msg += `*Approx. Time:* ${time}\n`;
    msg += `*Number of Guests:* ${guests}\n`;
    msg += `*Dietary Preference:* ${dietLabel}\n`;
    if (notes.trim()) msg += `*Special Requests:* ${notes.trim()}\n`;
    msg += `------------------------------------\n`;
    msg += `Kindly confirm availability. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919820647374?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-canvas rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
            <Sparkles className="w-3 h-3" />
            Quick Booking & Bulk Inquiries
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Table & Event Reservation
          </h3>
          <p className="text-xs text-stone-500">
            Hotel Hanuman Sion • Opposite MovieMax Cinema • Call: +91 98206 47374
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          
          {/* Inquiry Type Tabs */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1.5">
              Select Purpose
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInquiryType("table")}
                className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                  inquiryType === "table"
                    ? "bg-amber-100 text-amber-950 border-brand-amber shadow-xs"
                    : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                }`}
              >
                🍽️ Table Dine-in
              </button>
              <button
                type="button"
                onClick={() => setInquiryType("movie-group")}
                className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                  inquiryType === "movie-group"
                    ? "bg-amber-100 text-amber-950 border-brand-amber shadow-xs"
                    : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                }`}
              >
                🎬 MovieMax Post-Cinema
              </button>
              <button
                type="button"
                onClick={() => setInquiryType("bulk-tiffin")}
                className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                  inquiryType === "bulk-tiffin"
                    ? "bg-amber-100 text-amber-950 border-brand-amber shadow-xs"
                    : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                }`}
              >
                🍱 Bulk Tiffin Box
              </button>
              <button
                type="button"
                onClick={() => setInquiryType("catering")}
                className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                  inquiryType === "catering"
                    ? "bg-amber-100 text-amber-950 border-brand-amber shadow-xs"
                    : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                }`}
              >
                🎉 Party Catering
              </button>
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Parekh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
              />
            </div>
          </div>

          {/* Date, Time & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Approx. Time
              </label>
              <input
                type="text"
                placeholder="e.g. 8:30 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
              >
                <option value="1-2">1 – 2 Guests</option>
                <option value="3-4">3 – 4 Guests</option>
                <option value="5-8">5 – 8 Family</option>
                <option value="10+">10+ Group</option>
                <option value="25+ Catering">25+ Catering</option>
              </select>
            </div>
          </div>

          {/* Dietary Choice */}
          <div>
            <label className="text-[11px] font-semibold text-stone-700 block mb-1">
              Dietary Preference
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDietary("pure-veg")}
                className={`p-2 rounded-xl border text-center transition-all ${
                  dietary === "pure-veg"
                    ? "bg-emerald-100 text-emerald-950 border-emerald-400 font-bold"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                🌱 100% Pure Veg
              </button>
              <button
                type="button"
                onClick={() => setDietary("strict-jain")}
                className={`p-2 rounded-xl border text-center transition-all ${
                  dietary === "strict-jain"
                    ? "bg-orange-100 text-orange-950 border-orange-400 font-bold"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                🙏 Strict Jain Only
              </button>
              <button
                type="button"
                onClick={() => setDietary("jain-veg-mix")}
                className={`p-2 rounded-xl border text-center transition-all ${
                  dietary === "jain-veg-mix"
                    ? "bg-amber-100 text-amber-950 border-amber-400 font-bold"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                🥗 Veg + Jain Mix
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-semibold text-stone-700 block mb-1">
              Special Requests / Seat Preference
            </label>
            <input
              type="text"
              placeholder="e.g. Window table, high chairs for kids, after 9:30 PM MovieMax show"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-terracotta"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-forest hover:bg-emerald-800 text-white font-bold text-xs shadow-warm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm Inquiry via WhatsApp (+91 98206 47374)</span>
            </button>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-[11px] text-stone-500">Or dial landline desk:</span>
              <a
                href={`tel:${RESTAURANT_DATA.landline}`}
                className="text-[11px] font-bold text-brand-terracotta hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{RESTAURANT_DATA.landlineDisplay}</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
