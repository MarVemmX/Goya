"use client";

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, Sun, Heart } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="w-full py-12 sm:py-16 lg:py-24 bg-background border-t border-dashed border-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="font-tag text-[11px] sm:text-xs font-bold text-goya-blue tracking-widest uppercase block">
              Direct from Andalusia, Spain • Since 1936
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-text leading-tight">
              &ldquo;Si es Goya, tiene que ser bueno.&rdquo;
              <span className="block text-xl sm:text-2xl md:text-3xl font-serif font-normal italic text-text/80 mt-1.5 sm:mt-2">
                (If it&apos;s Goya, it has to be good.)
              </span>
            </h2>

            <p className="text-sm sm:text-base text-text/90 leading-relaxed">
              Long before olive oil became a trendy aesthetic on social media, Goya was pressing olives under the scorching Andalusian sun. In Alcalá de Guadaíra, Seville, our master blenders harvest Picual and Hojiblanca olives at dawn and press them before dusk.
            </p>

            <p className="text-sm sm:text-base text-text/90 leading-relaxed">
              No industrial blending. No mystery bulk oil shipped in rusty tankers across oceans. Just cold-extracted, antioxidant-rich, emerald-gold Spanish oil with acidity levels well below international standards.
            </p>

            {/* Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-4 border-t border-dashed border-text/30">
              <div className="bg-highlight p-2.5 sm:p-3 rounded-12 border border-text/20 text-center">
                <span className="font-bold text-xl sm:text-2xl font-serif text-goya-blue block">#1</span>
                <span className="text-[10px] sm:text-[11px] font-tag text-text/75 uppercase">Spanish Olive Oil</span>
              </div>
              <div className="bg-highlight p-2.5 sm:p-3 rounded-12 border border-text/20 text-center">
                <span className="font-bold text-xl sm:text-2xl font-serif text-goya-blue block">&lt;0.4%</span>
                <span className="text-[10px] sm:text-[11px] font-tag text-text/75 uppercase">Max Acidity</span>
              </div>
              <div className="bg-highlight p-2.5 sm:p-3 rounded-12 border border-text/20 text-center">
                <span className="font-bold text-xl sm:text-2xl font-serif text-goya-blue block">100+</span>
                <span className="text-[10px] sm:text-[11px] font-tag text-text/75 uppercase">World Medals</span>
              </div>
              <div className="bg-highlight p-2.5 sm:p-3 rounded-12 border border-text/20 text-center">
                <span className="font-bold text-xl sm:text-2xl font-serif text-goya-blue block">0%</span>
                <span className="text-[10px] sm:text-[11px] font-tag text-text/75 uppercase">Seed Oils</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-16 sm:rounded-20 overflow-hidden border-2 border-text shadow-graza-lg bg-highlight p-4 sm:p-6 flex flex-col justify-between">
              <div className="relative w-full h-3/4 rounded-16 overflow-hidden bg-background border border-text/20">
                <Image
                  src="/images/goya-double.jpeg"
                  alt="Goya Olive Oil Bottles"
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-dashed border-text/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm block">Goya en España, S.A.</span>
                  <span className="font-tag text-xs text-text/70">Seville, Andalusia, Spain</span>
                </div>
                <span className="px-3 py-1 bg-brand rounded-full border border-text font-tag text-[10px] font-bold">
                  Mario Solinas Winner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
