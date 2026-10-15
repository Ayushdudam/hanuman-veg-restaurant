import React from "react";
import { RESTAURANT_DATA, TIME_SLOTS } from "@/data/restaurantData";
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Phone, 
  Train, 
  Film, 
  Car, 
  Compass,
  CheckCircle2
} from "lucide-react";

export const LocationHoursSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-stone-50/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
            <Compass className="w-3.5 h-3.5" />
            Visit & Contact
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main">
            Find Us at Sion Circle, Mumbai
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Located right across from MovieMax Cinema in Rupam Building, Sion West. Easy access by local train, bus, or cab.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-warm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-terracotta">
                  Verified Address & Coordinates
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                  Hotel Hanuman (Hanuman Veg Restaurant)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {RESTAURANT_DATA.address}
                </p>
                <div className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md inline-block">
                  GPS: {RESTAURANT_DATA.coordinates.lat}, {RESTAURANT_DATA.coordinates.lng}
                </div>
              </div>

              {/* Direct Telephones */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Direct Mobile / Orders:</span>
                  <a
                    href={`tel:${RESTAURANT_DATA.phone}`}
                    className="font-bold text-stone-900 hover:text-brand-terracotta transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>{RESTAURANT_DATA.phoneDisplay}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Landline Inquiries:</span>
                  <a
                    href={`tel:${RESTAURANT_DATA.landline}`}
                    className="font-bold text-stone-900 hover:text-brand-terracotta transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-amber" />
                    <span>{RESTAURANT_DATA.landlineDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Landmark Transit Tips */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Getting Here
                </h4>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <Film className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                    <span>
                      <strong>Opposite MovieMax Cinema:</strong> Directly across the street — the traditional pre- and post-movie dinner stop.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sion Circle:</strong> 2 minutes walking distance from the main Sion Circle junction & BEST bus depot.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Train className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sion Railway Station:</strong> 5 minutes on foot from Central Railway Sion station platform exit.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <a
                href={RESTAURANT_DATA.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold text-xs shadow-warm transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>

              <a
                href={`tel:${RESTAURANT_DATA.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-brand-forest text-white font-bold text-xs shadow-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Restaurant ({RESTAURANT_DATA.phoneDisplay})</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Map Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-warm flex flex-col">
            <div className="relative w-full h-80 sm:h-full min-h-[350px] bg-stone-100">
              <iframe
                title="Hanuman Veg Restaurant Sion Map"
                src={RESTAURANT_DATA.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Map sub-bar */}
            <div className="p-4 bg-canvas flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2 border-t border-stone-200">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-forest" />
                GPS Coordinates: 19.0420074, 72.8641565
              </span>
              <a
                href={RESTAURANT_DATA.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-terracotta hover:underline font-bold"
              >
                Launch in Google Maps App →
              </a>
            </div>
          </div>

        </div>

        {/* Operating Hours Cards Breakdown */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Continuous 16-Hour Daily Dining Slots
            </h3>
            <p className="text-xs text-stone-500">
              Open every single day from 7:30 AM to 11:30 PM without kitchen break
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIME_SLOTS.map((slot, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-warm transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {slot.service}
                  </div>
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    {slot.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-terracotta">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.timing}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 pt-3 mt-3 border-t border-stone-100 leading-relaxed">
                  {slot.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
