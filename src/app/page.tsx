"use client";

import React, { useState } from "react";
import { MenuItem, CartItem } from "@/types/restaurant";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { HeroSection } from "@/components/home/HeroSection";
import { HeritageSection } from "@/components/home/HeritageSection";
import { SpecialtiesShowcase } from "@/components/home/SpecialtiesShowcase";
import { FoodGallerySection } from "@/components/home/FoodGallerySection";
import { MenuExplorer } from "@/components/home/MenuExplorer";
import { JainPromiseSection } from "@/components/home/JainPromiseSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationHoursSection } from "@/components/home/LocationHoursSection";
import { WhatsAppOrderDrawer } from "@/components/home/WhatsAppOrderDrawer";
import { ReservationModal } from "@/components/home/ReservationModal";

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Cart total items count
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add dish to cart
  const handleAddToCart = (dish: MenuItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { item: dish, quantity: 1 }];
      }
    });
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (dishId: string, newQty: number) => {
    setCart((prevCart) => {
      if (newQty <= 0) {
        return prevCart.filter((c) => c.item.id !== dishId);
      }
      return prevCart.map((c) =>
        c.item.id === dishId ? { ...c, quantity: newQty } : c
      );
    });
  };

  // Clear all items
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-main selection:bg-brand-amber-light selection:text-brand-terracotta-dark">
      {/* Sticky Navigation Header */}
      <Navbar
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Landmark Section */}
        <HeroSection
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* 2. Heritage & Sion Circle Story */}
        <HeritageSection />

        {/* 3. Signature Culinary Highlights */}
        <SpecialtiesShowcase onAddToCart={handleAddToCart} />

        {/* 4. Art-Directed Food Gallery with Interactive Lightbox */}
        <FoodGallerySection />

        {/* 5. Interactive 45+ Menu Explorer with Filters & Search */}
        <MenuExplorer
          onAddToCart={handleAddToCart}
          cartItems={cart}
        />

        {/* 6. The Jain Promise & Culinary Sanctity */}
        <JainPromiseSection />

        {/* 7. Customer Proof & Verified Reviews */}
        <ReviewsSection />

        {/* 8. Sion Circle Map, Coordinates, Timings & Transit Guide */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Drawer for WhatsApp Order Customization */}
      <WhatsAppOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Table Booking & Bulk Catering Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Mobile-Only Bottom Sticky Action Bar */}
      <MobileStickyBar
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
