"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Pause, Play } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const { hasFreeShipping, amountUntilFreeShipping, isMotionPaused, setIsMotionPaused } = useCart();
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="relative bg-brand text-text border-b border-text text-xs lg:text-sm font-medium py-1.5 px-4 overflow-hidden z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden lg:flex items-center gap-2 font-tag text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-text animate-pulse"></span>
          <span>EST. ANDALUSIA 1936</span>
        </div>

        {/* Central scrolling or dynamic message */}
        <div className="flex-1 text-center font-semibold tracking-tight">
          {hasFreeShipping ? (
            <span className="text-text font-bold">
              🎉 ¡Olé! You unlocked FREE Spanish Express Shipping!
            </span>
          ) : (
            <span>
              🚚 FREE SHIPPING ON ORDERS $50+ • <span className="underline decoration-dashed">
                {amountUntilFreeShipping > 0 ? `Add $${amountUntilFreeShipping.toFixed(2)} more to qualify!` : "First Cold Press Guaranteed"}
              </span> • 100% SINGLE-ORIGIN SPANISH OLIVES
            </span>
          )}
        </div>

        {/* Accessibility & controls */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-tag">
          <button
            onClick={() => {
              const next = !isMotionPaused;
              setIsMotionPaused(next);
              localStorage.setItem("goya_pause_motion", next.toString());
              if (next) {
                document.documentElement.classList.add("motion-paused");
              } else {
                document.documentElement.classList.remove("motion-paused");
              }
            }}
            className="hover:underline flex items-center gap-1.5 text-[11px] cursor-pointer"
            title="Toggle Animations"
          >
            {isMotionPaused ? (
              <>
                <Play size={11} className="fill-current flex-shrink-0" />
                <span>Play Motion</span>
              </>
            ) : (
              <>
                <Pause size={11} className="fill-current flex-shrink-0" />
                <span>Pause Motion</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
