"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HeritageSection } from "@/components/home/HeritageSection";
import { SpecialtiesShowcase } from "@/components/home/SpecialtiesShowcase";
import { MenuExplorer } from "@/components/home/MenuExplorer";
import { JainPromiseSection } from "@/components/home/JainPromiseSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationHoursSection } from "@/components/home/LocationHoursSection";
import { ReservationModal } from "@/components/home/ReservationModal";

export default function HomePage() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-main selection:bg-brand-amber-light selection:text-brand-terracotta-dark">
      {/* Sticky Navigation Header */}
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Landmark Section */}
        <HeroSection onOpenReservation={() => setIsReservationOpen(true)} />

        {/* 2. Heritage & Sion Circle Story (4 Pillar Cards & Narrative) */}
        <HeritageSection />

        {/* 3. Signature Culinary Highlights */}
        <SpecialtiesShowcase />

        {/* 4. Interactive 40+ Menu Explorer with Filters & Search */}
        <MenuExplorer />

        {/* 5. The Jain Promise & Culinary Sanctity */}
        <JainPromiseSection />

        {/* 6. Customer Proof & Verified Reviews */}
        <ReviewsSection />

        {/* 7. Sion Circle Map, Coordinates, Timings & Transit Guide */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Table Booking & Bulk Catering Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* MobileStickyBar is deliberately omitted to prevent the bottom overlapping CTA defect on mobile screens */}
    </div>
  );
}
