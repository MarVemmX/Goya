"use client";

import React, { useState } from "react";
import { GoyaLogo, GoyaWordmark } from "./GoyaLogo";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const { isMotionPaused, setIsMotionPaused } = useCart();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="w-full bg-background border-t-2 border-text text-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-16 border-b border-dashed border-text">
          {/* Newsletter Box */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold max-w-sm leading-snug">
                Friends let friends know about fresh harvests, tapas recipes, and new squeeze bottles.
              </p>
              <p className="text-xs text-text/75 mt-2 max-w-sm">
                Join 85,000+ home cooks in our Glug Club newsletter. No spam, just olive oil secrets.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 max-w-md">
              {submitted ? (
                <div className="bg-brand border border-text p-3.5 sm:p-4 rounded-16 flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Check size={18} />
                  <span>¡Olé! You're in the Glug Club. Check your inbox!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="newsletter-email" className="font-tag text-[11px] sm:text-xs font-bold uppercase">
                    Your Email Address
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="cook@kitchen.com"
                      className="w-full bg-highlight border border-text rounded-full py-2.5 sm:py-3 pl-4 pr-24 sm:pr-28 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 btn--std !py-1.5 !px-3 sm:!px-4 !text-xs uppercase font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Submit</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links Column 1: Shop */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="font-tag text-xs font-bold uppercase tracking-wider text-goya-blue mb-3 sm:mb-4">
              Shop Olive Oil
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  “El Squeeze” Finishing Oil
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  “El Dúo Andaluz”
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  “El Clásico” Glass (500mL)
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  The “Spanish Starter Kit”
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  “Lata de Oro” Refill Can
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  “Sabor &amp; Fuego” Spray
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:underline hover:decoration-dashed">
                  EVOO Garlic Aioli Squeeze
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: About & Help */}
          <div className="lg:col-span-2">
            <h4 className="font-tag text-xs font-bold uppercase tracking-wider text-goya-blue mb-4">
              About &amp; Info
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <a href="#about-section" className="hover:underline hover:decoration-dashed">
                  About Seville Mill
                </a>
              </li>
              <li>
                <a href="#glug-guide" className="hover:underline hover:decoration-dashed">
                  Glug Guide
                </a>
              </li>
              <li>
                <a href="#social-feed" className="hover:underline hover:decoration-dashed">
                  Recipes &amp; Tapas
                </a>
              </li>
              <li>
                <a href="#about-section" className="hover:underline hover:decoration-dashed">
                  Quality &amp; Awards
                </a>
              </li>
              <li>
                <a href="#about-section" className="hover:underline hover:decoration-dashed">
                  Store Locator
                </a>
              </li>
              <li>
                <button
                  type="button"
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
                  className="hover:underline hover:decoration-dashed text-left font-tag text-xs"
                >
                  {isMotionPaused ? "▶ Play Animations" : "⏸ Pause Animations"}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Social */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="font-tag text-xs font-bold uppercase tracking-wider text-goya-blue mb-3 sm:mb-4">
              Social
            </h4>
            <ul className="flex flex-row md:flex-col flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline hover:decoration-dashed">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline hover:decoration-dashed">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline hover:decoration-dashed">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline hover:decoration-dashed">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Graza-Style Footprint Wordmark with Exact Vector Brand Logo */}
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-4xl text-center overflow-hidden py-4 px-2 select-none flex flex-col items-center">
            <GoyaWordmark
              className="w-full max-w-xl md:max-w-2xl h-auto text-text opacity-95 hover:opacity-100 transition-opacity"
              fillColor="currentColor"
              withUnderline={true}
            />
            <span className="font-serif italic text-base sm:text-lg md:text-2xl text-text/80 mt-3 sm:mt-4 block leading-tight">
              Aceite de Oliva Virgen Extra • Primera Presión en Frío
            </span>
          </div>

          {/* Bottom Copyright & Legal & Accessibility Controls */}
          <div className="w-full mt-6 pt-6 border-t border-dashed border-text/20 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-tag text-text/70 gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Accessibility</a>
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
                className="hover:underline flex items-center gap-1.5 font-bold text-text bg-highlight px-2.5 py-1 rounded-full border border-text/30 cursor-pointer transition-colors hover:bg-brand"
                title="Toggle Animations"
              >
                <span>{isMotionPaused ? "▶ Play Motion" : "⏸ Pause Motion"}</span>
              </button>
            </div>
            <p>© {new Date().getFullYear()} Goya Foods &amp; Goya en España, S.A. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
