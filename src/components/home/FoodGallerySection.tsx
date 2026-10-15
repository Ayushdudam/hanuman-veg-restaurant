"use client";

import React, { useState } from "react";
import { Camera, X, ArrowRight, Sparkles, Utensils, Maximize2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    title: "Golden Butter Mysore Masala Dosa",
    category: "South Indian Tiffin",
    description: "Crispy fermented rice-lentil crepe smeared with proprietary red chilli-garlic paste and spiced potato mash, served with piping hot drumstick sambar.",
    src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "g2",
    title: "Sion Special Amul Butter Pav Bhaji",
    category: "Mumbai Street Food",
    description: "Slow-mashed spiced vegetable medley cooked on a giant flat tawa with generous dollops of Amul butter, chopped onions, and lime.",
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "g3",
    title: "Traditional Madras Filter Kaapi",
    category: "Beverages & Coffee",
    description: "Chicory-infused South Indian plantation coffee brewed in brass filters and frothed to perfection in a dabarah and tumbler.",
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "g4",
    title: "Royal Kulfi Falooda",
    category: "Desserts & Shakes",
    description: "Rich malai kulfi slice nestled on sweet rose syrup, chilled vermicelli, soaked sabja (basil seeds), and thick rabdi.",
    src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "g5",
    title: "Tandoori Paneer Tikka Masala",
    category: "North Indian Curries",
    description: "Char-grilled fresh cottage cheese cubes cooked in a slow-simmered tomato, cashew, and butter gravy seasoned with kasuri methi.",
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "g6",
    title: "Dedicated Pure Jain Raw Banana Pav Bhaji",
    category: "Jain Specialties",
    description: "100% root-vegetable free, prepared on separate designated tawas using tender green raw bananas and sweet farm tomatoes.",
    src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1000&auto=format&fit=crop&q=80",
  },
];

export const FoodGallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
              <Camera className="w-3.5 h-3.5" />
              Visual Storytelling
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900">
              The Artistry of Mumbai Vegetarian Dining
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every dish served at Hanuman is a celebration of golden crispness, aromatic tempering, and rich buttery comfort prepared fresh from dawn to midnight.
            </p>
          </div>

          <a
            href="/menu"
            className="self-start md:self-end inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm"
          >
            <span>Open Digital QR Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative h-72 rounded-3xl overflow-hidden bg-stone-900 cursor-pointer shadow-sm hover:shadow-warm transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* View Overlay Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                  {img.category}
                </span>
                <h3 className="font-serif text-base font-bold leading-snug">
                  {img.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="fixed inset-0"
            onClick={() => setActiveImage(null)}
          />

          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-10">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full bg-stone-950">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3 bg-[#FDFBF7]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700">
                  {activeImage.category}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  100% Pure Veg
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {activeImage.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeImage.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Available daily at Hotel Hanuman, Sion Circle.
                </span>

                <a
                  href="/menu"
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Order on Digital Menu</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
