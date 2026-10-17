"use client";

import React, { useState } from "react";
import { RESTAURANT_DATA, CUSTOMER_REVIEWS, RESTAURANT_FAQS } from "@/data/restaurantData";
import { 
  Star, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Users, 
  ThumbsUp,
  HelpCircle,
  Quote
} from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="reviews" className="py-20 bg-canvas border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-brand-terracotta-dark">
            <Users className="w-3.5 h-3.5" />
            Verified Customer Proof
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main">
            Loved by 6,000+ Mumbai Diners & Cinema Goers
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Read authentic feedback from patrons across Google, Justdial, and Swiggy who make Hotel Hanuman their go-to destination in Sion Circle.
          </p>
        </div>

        {/* Aggregate Ratings Scorecard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-warm mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big Score Box */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-stone-200 md:pr-8 space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-serif text-5xl font-extrabold text-stone-900">
                  {RESTAURANT_DATA.ratingScore.toFixed(1)}
                </span>
                <span className="text-stone-400 text-lg">/ 5.0</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1 text-brand-amber">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "fill-brand-amber text-brand-amber" : "text-stone-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-stone-500 font-medium">
                Consolidated across <strong className="text-stone-800">6,240+ verified local reviews</strong> on Google, Justdial & Swiggy.
              </p>
            </div>

            {/* Score Breakdown Bars */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Food Taste & Freshness</span>
                  <span className="text-brand-terracotta">4.7 / 5.0</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-brand-terracotta h-2 rounded-full w-[94%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Pure Vegetarian Cleanliness</span>
                  <span className="text-brand-forest">4.6 / 5.0</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-brand-forest h-2 rounded-full w-[92%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Value for Money & Portions</span>
                  <span className="text-amber-600">4.8 / 5.0</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full w-[96%]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Jain Integrity & Options</span>
                  <span className="text-emerald-700">4.9 / 5.0</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full w-[98%]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between hover:shadow-warm transition-all duration-300"
            >
              <div className="space-y-3.5">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-brand-amber">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-amber" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {rev.source}
                  </span>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-amber-200/60 absolute -top-2 -left-1 -z-0" />
                  <p className="text-xs text-stone-700 leading-relaxed relative z-10 italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-brand-terracotta font-serif font-bold text-xs flex items-center justify-center">
                    {rev.avatarInitial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-none">
                      {rev.author}
                    </h4>
                    <span className="text-[10px] text-stone-400">{rev.date}</span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-brand-terracotta bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Got Questions? We Have Answers
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {RESTAURANT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-stone-900 hover:text-brand-terracotta transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-stone-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
