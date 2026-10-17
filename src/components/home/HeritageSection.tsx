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
    <section id="heritage" className="py-20 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
            <Building2 className="w-3.5 h-3.5" />
            Our Heritage & Story
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main">
            A Mumbai Landmark at Sion Circle Opposite MovieMax
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            In the energetic rhythm of Sion West, <strong>Hanuman Veg Restaurant (Hotel Hanuman)</strong> has provided comfort, nostalgia, and wholesome pure vegetarian meals to generations of Mumbaikars.
          </p>
        </div>

        {/* Narrative & Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-5 text-stone-700 leading-relaxed text-sm sm:text-base">
            <p>
              For decades, the story of Sion Circle has been incomplete without the aroma of sputtering mustard seeds, roasting curry leaves, and bubbling butter pav bhaji wafting from the doors of <strong>Hotel Hanuman</strong> in Rupam Building.
            </p>
            <p>
              Whether it&apos;s college students gathering after lectures at SIES and Khalsa, theater patrons catching a late show at MovieMax right across the street, or families celebrating Sunday lunch, our tables reflect the true, welcoming spirit of Mumbai&apos;s vegetarian tiffin culture.
            </p>
            <p>
              Every dish that leaves our counter carries the seal of authenticity: fresh dairy butter from Amul, authentic stone-ground spices, zero synthetic coloring, and a steadfast dedication to <strong>pure vegetarian and Jain dietary sanctity</strong>.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                  Zero Preservatives or Artificial Colors
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                  Pure Amul Butter & Fresh Dairy Paneer
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                  Fresh Cold-Pressed Squeezed Juices
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                  Strictly Separate Jain Utensils & Tawas
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-warm bg-white p-3">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
                  alt="Traditional Indian street tawa preparation"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-block px-2.5 py-1 rounded bg-brand-terracotta text-white font-bold text-xs mb-1">
                    Sion Circle Landmark Since Decades
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    Where Tradition Meets Mumbai&apos;s Vibrant Pulse
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Shop No. 6 & 7, Rupam Building • Opposite MovieMax Cinema
                  </p>
                </div>
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
