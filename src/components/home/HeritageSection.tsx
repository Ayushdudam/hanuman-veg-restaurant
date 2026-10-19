import React from "react";
import { RESTAURANT_DATA } from "@/data/restaurantData";
import { 
  Building2, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Check, 
  MapPin, 
  Clock, 
  Users,
  Film
} from "lucide-react";

export const HeritageSection: React.FC = () => {
  const pillars = [
    {
      title: "The Sion Circle Landmark",
      description: "Situated directly opposite MovieMax Cinema, Hanuman has stood as an iconic culinary anchor for cinema goers, commuters, and families across decades.",
      icon: Film,
      tag: "Mumbai Heritage",
    },
    {
      title: "Generational Flavor Consistency",
      description: "Our recipes for South Indian tiffin sambar, butter-roasted pav bhaji, and slow-cooked tomato gravies have remained unchanged, cooked with genuine passion.",
      icon: Sparkles,
      tag: "Secret Spices",
    },
    {
      title: "Uncompromising Jain Principles",
      description: "We are deeply revered by the Jain communities of Sion, Matunga & Wadala for our strict zero root-veg preparation using raw bananas and dedicated utensils.",
      icon: ShieldCheck,
      tag: "Dedicated Prep",
    },
    {
      title: "Continuous 16-Hour Service",
      description: "From 7:30 AM morning filter coffee to late-night 11:30 PM post-movie dinners, our kitchen operates without intermission 365 days a year.",
      icon: Clock,
      tag: "7:30 AM – 11:30 PM",
    },
  ];

  return (
    <section id="heritage" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
            <Building2 className="w-3.5 h-3.5" />
            Our Heritage & Story
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main">
            A Mumbai Landmark at Sion Circle Opposite MovieMax
          </h2>
          <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
            In the energetic rhythm of Sion West, <strong>Hanuman Veg Restaurant (Hotel Hanuman)</strong> has provided comfort, nostalgia, and wholesome pure vegetarian meals to generations of Mumbaikars.
          </p>
        </div>

        {/* Narrative & Landmark Card (0 photos, 0 overlaps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-4 text-stone-700 leading-relaxed text-xs sm:text-sm">
            <p>
              For decades, the story of Sion Circle has been incomplete without the aroma of sputtering mustard seeds, roasting curry leaves, and bubbling butter pav bhaji wafting from the doors of <strong>Hotel Hanuman</strong> in Rupam Building.
            </p>
            <p>
              Whether it&apos;s college students gathering after lectures at SIES and Khalsa, theater patrons catching a late show at MovieMax right across the street, or families celebrating Sunday lunch, our tables reflect the true, welcoming spirit of Mumbai&apos;s vegetarian tiffin culture.
            </p>
            <p>
              Every dish that leaves our counter carries the seal of authenticity: fresh dairy butter from Amul, authentic stone-ground spices, zero synthetic coloring, and a steadfast dedication to <strong>pure vegetarian and Jain dietary sanctity</strong>.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  Zero Preservatives or Artificial Colors
                </span>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  Pure Amul Butter & Fresh Dairy Paneer
                </span>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  Fresh Cold-Pressed Squeezed Juices
                </span>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  Strictly Separate Jain Utensils & Tawas
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Landmark & Hospitality Badge Card (0 photos, 0 overlaps) */}
          <div className="lg:col-span-6">
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-warm flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Film className="w-3.5 h-3.5" />
                  Sion Circle Landmark Since Decades
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white">
                  Hotel Hanuman (Hanuman Veg Restaurant)
                </h3>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Shop No. 6 &amp; 7, Rupam Building • Directly Opposite MovieMax Cinema, Sion West, Mumbai 400022
                </p>
              </div>

              {/* Landmark Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-800">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    Opposite Cinema
                  </span>
                  <p className="text-xs font-semibold text-stone-100">
                    MovieMax Sion Circle
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Traditional pre- and post-show meal stop
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    Daily Timings
                  </span>
                  <p className="text-xs font-semibold text-stone-100">
                    7:30 AM – 11:30 PM
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Continuous kitchen service all 7 days
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center gap-3">
                <a
                  href={RESTAURANT_DATA.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs transition-all shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Map</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_DATA.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-bold text-xs transition-all border border-stone-700"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Desk</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-terracotta flex items-center justify-center border border-amber-200/60">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta bg-amber-50 px-2 py-0.5 rounded">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text-main mt-2">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
