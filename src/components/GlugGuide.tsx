"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, ShieldAlert, Droplets, Sun, Award } from "lucide-react";

export const GlugGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"drizzle" | "cooking">("drizzle");

  return (
    <section id="glug-guide" className="w-full py-16 lg:py-24 bg-highlight/50 border-t border-dashed border-text">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-tag text-xs font-bold text-goya-blue tracking-widest uppercase mb-2 block">
            The Science of the Glug
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-text tracking-tight">
            Why Put Goya in a Squeeze Bottle?
          </h2>
          <p className="mt-3 text-base md:text-lg text-text/80">
            For generations, olive oil came in slippery, heavy glass bottles that dripped down the sides and ruined countertops. We kept the legendary Andalusian gold, and gave it the modern culinary armor it deserves.
          </p>
        </div>

        {/* 3-Column Visual Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-background rounded-20 p-6 border-2 border-text shadow-graza flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand border border-text flex items-center justify-center font-bold text-lg mb-4 text-text">
                1
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Zero Drips. Ever.</h3>
              <p className="text-sm text-text/80 leading-relaxed">
                The food-grade silicone valve cuts off the flow immediately when you release pressure. No greasy rings on your quartz counters, no sticky bottles slipping out of your hands while cooking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-text/20 font-tag text-xs text-goya-blue font-bold flex items-center gap-1.5">
              <Check size={16} /> 100% Kitchen Safe
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-background rounded-20 p-6 border-2 border-text shadow-graza flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary border border-text flex items-center justify-center font-bold text-lg mb-4 text-text">
                2
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Light-Proof Armor</h3>
              <p className="text-sm text-text/80 leading-relaxed">
                Clear glass lets UV rays destroy polyphenols and turn fresh olive oil rancid in weeks. Our opaque forest green bottles block 100% of photo-oxidation so your last glug tastes as vibrant as your first.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-text/20 font-tag text-xs text-goya-blue font-bold flex items-center gap-1.5">
              <Check size={16} /> Peak Polyphenol Shield
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-background rounded-20 p-6 border-2 border-text shadow-graza flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-accent border border-text flex items-center justify-center font-bold text-lg mb-4 text-text">
                3
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Single-Origin Andalusia</h3>
              <p className="text-sm text-text/80 leading-relaxed">
                Grown, harvested, and cold pressed in the historic groves of Seville and Jaén, Spain. Winner of the Mario Solinas Quality Award. Never mixed with industrial bulk oil from unspecified countries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-text/20 font-tag text-xs text-goya-blue font-bold flex items-center gap-1.5">
              <Check size={16} /> Certified D.O.P. Spain
            </div>
          </div>
        </div>

        {/* Interactive Comparison: Finishing vs Cooking */}
        <div className="bg-background rounded-20 border-2 border-text overflow-hidden shadow-graza-lg">
          <div className="p-6 md:p-8 bg-brand border-b border-text flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-tag text-xs font-bold uppercase tracking-wider block">
                The Goya Rulebook
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-text">
                When to Drizzle vs. When to Sauté &amp; Fry
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row bg-highlight p-1 rounded-20 sm:rounded-full border border-text gap-1 sm:gap-0">
              <button
                onClick={() => setActiveTab("drizzle")}
                className={`w-full sm:w-auto px-4 py-1.5 rounded-full text-xs font-bold transition-colors text-center ${
                  activeTab === "drizzle"
                    ? "bg-text text-highlight shadow-sm"
                    : "text-text hover:bg-brand/50"
                }`}
              >
                “El Drizzle” (Raw &amp; Finishing)
              </button>
              <button
                onClick={() => setActiveTab("cooking")}
                className={`w-full sm:w-auto px-4 py-1.5 rounded-full text-xs font-bold transition-colors text-center ${
                  activeTab === "cooking"
                    ? "bg-text text-highlight shadow-sm"
                    : "text-text hover:bg-brand/50"
                }`}
              >
                “El Sizzle” (High-Heat Cooking)
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {activeTab === "drizzle" ? (
              <>
                <div className="space-y-4">
                  <span className="font-tag text-xs font-bold text-goya-blue uppercase">
                    Picual &amp; Hojiblanca Early Harvest
                  </span>
                  <h4 className="text-3xl font-serif font-bold leading-tight">
                    For dishes you don't heat, or food that just came off the heat.
                  </h4>
                  <p className="text-sm text-text/80 leading-relaxed">
                    Made from young, green olives picked early in December. Highly concentrated in oleocanthal (that wonderful peppery tickle in the back of your throat that proves it’s packed with antioxidants).
                  </p>
                  <ul className="space-y-2 text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Drizzled over warm crusty sourdough &amp; crushed tomatoes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Pools inside soft burrata, hummus, and heirloom salads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Swirled into hot gazpacho, paella, or lentil stew before serving</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-16 overflow-hidden border border-text/20 bg-highlight p-4 flex items-center justify-center">
                  <Image
                    src="/images/goya-squeeze-drizzle.jpg"
                    alt="Goya Drizzle"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <span className="font-tag text-xs font-bold text-goya-blue uppercase">
                    Late Harvest Andalusian Olives (Smoke Pt: 420°F)
                  </span>
                  <h4 className="text-3xl font-serif font-bold leading-tight">
                    For hot skillets, roasting pans, sheet pans, and frying.
                  </h4>
                  <p className="text-sm text-text/80 leading-relaxed">
                    Made from mature, golden Andalusian olives with a mellow, round buttery finish. High smoke point that handles searing steaks, frying crispy potatoes (patatas bravas), and caramelizing garlic without smoking or burning.
                  </p>
                  <ul className="space-y-2 text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Crisping sunny-side-up eggs with crunchy Spanish lace edges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Searing gambas al ajillo (shrimp in sizzling garlic oil)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">✓</span>
                      <span>Roasting vegetables at 425°F for golden caramelized edges</span>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-16 overflow-hidden border border-text/20 bg-highlight p-4 flex items-center justify-center">
                  <Image
                    src="/images/goya-front.jpeg"
                    alt="Goya Cooking"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
