"use client";

import React, { Suspense } from "react";
import { DigitalMenu } from "@/components/menu/DigitalMenu";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-stone-600">Loading Hanuman Digital Menu...</p>
          </div>
        </div>
      }
    >
      <DigitalMenu />
    </Suspense>
  );
}
