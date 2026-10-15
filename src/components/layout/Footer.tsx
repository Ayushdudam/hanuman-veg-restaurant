import React from "react";
import Link from "next/link";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Navigation, 
  ExternalLink,
  MessageSquare
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-canvas-dark text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Legacy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-900 border-2 border-brand-forest flex items-center justify-center p-1">
                <div className="w-4 h-4 rounded-full bg-brand-forest" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-wider">
                  HANUMAN
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-brand-amber font-semibold">
                  Pure Veg Restaurant • Sion Circle
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Serving authentic Mumbai South Indian tiffins, legendary butter pav bhaji, tandoor gravies, and dedicated Jain delicacies right opposite MovieMax Cinema at Sion Circle since decades.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-stone-900/80 p-2.5 rounded-lg border border-emerald-900/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Pure Vegetarian & Jain Certified</span>
            </div>
          </div>

          {/* Col 2: Timings & Slots */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-amber" />
              Daily Dining Hours
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-800/80">
                <span className="text-stone-400">Breakfast & Tiffin:</span>
                <span className="text-white font-medium">7:30 AM – 11:30 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/80">
                <span className="text-stone-400">Executive Lunch:</span>
                <span className="text-white font-medium">12:00 PM – 3:45 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/80">
                <span className="text-stone-400">Evening Pav Bhaji & Tea:</span>
                <span className="text-white font-medium">4:00 PM – 7:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/80">
                <span className="text-stone-400">Dinner & Cinema Feast:</span>
                <span className="text-white font-medium">7:00 PM – 11:30 PM</span>
              </div>
            </div>
            <p className="text-[11px] text-brand-amber/90 italic">
              Continuous kitchen service 7 days a week.
            </p>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-terracotta" />
              Sion West Landmark
            </h4>

            <p className="text-xs text-stone-400 leading-relaxed">
              {RESTAURANT_DATA.address}
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <a
                href={`tel:${RESTAURANT_DATA.phone}`}
                className="flex items-center gap-2 text-white hover:text-brand-amber transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-amber" />
                <span>Mobile: {RESTAURANT_DATA.phoneDisplay}</span>
              </a>

              <a
                href={`tel:${RESTAURANT_DATA.landline}`}
                className="flex items-center gap-2 text-white hover:text-brand-amber transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-amber" />
                <span>Landline: {RESTAURANT_DATA.landlineDisplay}</span>
              </a>

              <a
                href={RESTAURANT_DATA.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-amber hover:underline pt-1"
              >
                <Navigation className="w-3 h-3" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Col 4: Quick Navigation & WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>

            <ul className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <li>
                <a href="#heritage" className="hover:text-brand-amber transition-colors">About Us</a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-brand-amber transition-colors">Signatures</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-brand-amber transition-colors">Full Menu</a>
              </li>
              <li>
                <a href="#jain-promise" className="hover:text-brand-amber transition-colors">Jain Menu</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-amber transition-colors">Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-brand-amber transition-colors">Location</a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/919820647374?text=${encodeURIComponent("Hello Hanuman Veg Restaurant, I would like to inquire about ordering / dining.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Dietary Integrity Note */}
        <div className="my-8 p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-400 leading-relaxed flex items-start gap-3">
          <div className="veg-box-seal shrink-0 mt-0.5">
            <div className="veg-box-seal-dot" />
          </div>
          <div>
            <strong className="text-white">Strict Pure Vegetarian & Jain Dietary Integrity:</strong> All food prepared at Hanuman Veg Restaurant is strictly 100% vegetarian. We maintain designated preparation utensils, woks, and tawas for our authentic Jain specialties prepared without onions, garlic, potatoes, or underground root vegetables.
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Hanuman Veg Restaurant (Hotel Hanuman Sion). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Mumbai Food Lovers & Sion Heritage
          </p>
        </div>
      </div>
    </footer>
  );
};
