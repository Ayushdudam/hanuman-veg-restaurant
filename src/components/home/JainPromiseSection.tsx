import React from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  ChefHat, 
  UtensilsCrossed, 
  ArrowRight 
} from "lucide-react";

export const JainPromiseSection: React.FC = () => {
  const promises = [
    {
      title: "Strict Zero Root-Vegetable Mandate",
      desc: "Our Jain preparations strictly exclude onions, garlic, potatoes, carrots, radishes, and all underground root vegetables without compromise.",
    },
    {
      title: "Designated Jain Tawas & Cookware",
      desc: "Dedicated separate tawas and frying pans reserved exclusively for Jain dishes, preventing cross-flavor contamination with alliums.",
    },
    {
      title: "Fresh Raw Banana Pav Bhaji",
      desc: "Our celebrated Jain pav bhaji replaces potato mash with steamed tender green raw bananas, cooked slowly in farm-fresh tomatoes and fresh butter.",
    },
    {
      title: "Custom Red Garlic-Free Chutneys",
      desc: "Authentic South Indian Jain coconut chutney and spiced tomato-coriander dips crafted specifically without garlic or shallots.",
    },
  ];

  return (
    <section id="jain-promise" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 bg-amber-50/50 border-b border-amber-200/60 relative overflow-hidden">
      {/* Decorative Warm Ring Background */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-brand-amber/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-200">
              <ShieldCheck className="w-4 h-4 text-orange-700" />
              Dietary Sanctity & Reverence
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight">
              The Sacred Jain Dining Promise at Sion Circle
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              For decades, Jain families residing across Sion, Matunga, Wadala, and visiting cinema patrons have placed their complete trust in <strong>Hanuman Veg Restaurant</strong>.
            </p>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We understand that Jain cuisine is not merely an omission of onions and garlic — it is a spiritual philosophy rooted in <em>Ahimsa</em> (non-violence) and mindful purity. We honor this discipline with dedicated preparation zones and authentic substitutes that sacrifice zero taste.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {promises.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-xs flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-brand-terracotta flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Filter Dedicated Jain Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-stone-600 italic">
                Inform our counter captain for any custom Jain requirement!
              </span>
            </div>
          </div>

          {/* Right Column: Visual Callout Box */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-brand-amber/60 shadow-warm space-y-6 relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-brand-terracotta border border-amber-300 flex items-center justify-center shadow-inner">
                <ChefHat className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-brand-terracotta">
                  Community Heritage
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Loved by Generations of Matunga & Sion Jain Patrons
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  From evening temple visitors to Sunday family reunions, our raw banana pav bhaji and Jain paneer gravies have earned an unblemished reputation for authenticity and uncompromising care.
                </p>
              </div>

              {/* Stat breakdown */}
              <div className="border-t border-stone-200 pt-4 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-serif text-2xl font-black text-brand-forest">100%</div>
                  <div className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">
                    Pure Vegetarian Integrity
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-serif text-2xl font-black text-brand-terracotta">20+</div>
                  <div className="text-[10px] text-stone-500 font-semibold uppercase mt-0.5">
                    Dedicated Jain Dishes
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-medium flex items-center gap-2 border border-amber-200">
                <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
                <span>Prepared with respect, purity, and mindful hospitality.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
