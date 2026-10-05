"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Flame,
  Sun,
  Droplets,
  Wheat,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  RotateCw,
  ChevronRight,
  CookingPot,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { LiquidGoldGlint, AndalusianSolGlint } from "./icons/ArtisanalSparkles";

export type CookingMethodId = "sear" | "fry" | "roast" | "garnish" | "bake";

interface CookingMethod {
  id: CookingMethodId;
  label: string;
  tagline: string;
  shortDesc: string;
  dishName: string;
  image: string;
  smokePoint: string;
  glugAmount: string;
  cookTime: string;
  flavorProfile: string;
  pairingProductId: string;
  pairingTitle: string;
  pairingType: string;
  proTip: string;
  whyGoya: string;
  icon: React.ReactNode;
}

const COOKING_METHODS: CookingMethod[] = [
  {
    id: "sear",
    label: "Sear",
    tagline: "High-Heat Sizzle & Crust",
    shortDesc: "Lock in deep juices with high-temp golden basting.",
    dishName: "Cast-Iron Ribeye Basted in Rosemary & Garlic",
    image: "/images/meals/sear-steak.jpg",
    smokePoint: "420°F Smoke Point",
    glugAmount: "3 Generous Squeezes",
    cookTime: "8 Minutes",
    flavorProfile: "Rich, deeply savory, crispy caramelized crust",
    pairingProductId: "goya-squeeze-drizzle",
    pairingTitle: "“El Squeeze” Finishing & Cooking",
    pairingType: "High-Tolerance Andalusian Oil",
    proTip: "Tilt the skillet 30° toward you and spoon the shimmering oil continuously over the meat for an even mahogany crust.",
    whyGoya: "Unlike fragile supermarket oils that burn and smoke out your kitchen, Goya's single-origin Andalusian olives withstand 420°F without breaking down or turning bitter.",
    icon: <Flame className="w-5 h-5" />,
  },
  {
    id: "fry",
    label: "Fry",
    tagline: "Crisp Lace Edges & Molten Centers",
    shortDesc: "The legendary Spanish crunchy lace egg technique.",
    dishName: "Crispy Spanish Lace Fried Eggs with Jamón",
    image: "/images/meals/fry-eggs.jpg",
    smokePoint: "390°F - 410°F",
    glugAmount: "4 Squeezes (Submerged Whites)",
    cookTime: "2 Minutes",
    flavorProfile: "Crispy golden lace skirt, warm runny yolk",
    pairingProductId: "goya-squeeze-drizzle",
    pairingTitle: "“El Squeeze” Kitchen Bottle",
    pairingType: "Kitchen Workhorse",
    proTip: "Pool enough oil so the egg whites float. Tilt the pan and spoon boiling oil over the whites until they puff into crispy lace. Never touch the yolk!",
    whyGoya: "In Madrid and Seville, eggs are never cooked in butter—always in hot, fragrant olive oil that puffs into bubbly lace with zero greasy aftertaste.",
    icon: <LiquidGoldGlint size={20} color="#E5A93C" secondaryColor="#F5B82E" />,
  },
  {
    id: "roast",
    label: "Roast",
    tagline: "Deep Caramelization & Char",
    shortDesc: "High-oven blistered vegetables & crispy tubers.",
    dishName: "Caramelized Harissa Carrots & Crushed Pistachios",
    image: "/images/meals/roast-veggies.jpg",
    smokePoint: "425°F High Oven",
    glugAmount: "3 Big Glugs on Sheet Pan",
    cookTime: "28 Minutes",
    flavorProfile: "Sweet concentrated sugars, smoky cumin, golden char",
    pairingProductId: "goya-duo-pack",
    pairingTitle: "“El Dúo Andaluz” Pair",
    pairingType: "Squeeze + Table Glass",
    proTip: "Never crowd your sheet pan! Give vegetables 1 inch of breathing room so they roast and caramelize rather than steam.",
    whyGoya: "Goya's monounsaturated fats coat the exterior with an airtight barrier, sealing in moisture while turning the skin crackling and golden.",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    id: "garnish",
    label: "Garnish",
    tagline: "Raw, Peppery & Cold-Pressed Gold",
    shortDesc: "Unheated, antioxidant-rich finishing swirl.",
    dishName: "Creamy Burrata, Heirloom Tomatoes & El Drizzle",
    image: "/images/meals/garnish-burrata.jpg",
    smokePoint: "Unheated (Peak Polyphenols)",
    glugAmount: "Continuous Spiral Swirl",
    cookTime: "Instant (Cold Finish)",
    flavorProfile: "Peppery oleocanthal punch, fresh cut grass, artichoke",
    pairingProductId: "goya-squeeze-drizzle",
    pairingTitle: "“El Squeeze” Finishing Oil",
    pairingType: "Cold Pressed Early Harvest",
    proTip: "Don't be shy. The peppery bite in your throat is oleocanthal—a potent anti-inflammatory compound that proves the oil was pressed within hours of harvest.",
    whyGoya: "Made from green Picual and Hojiblanca olives harvested in early winter. Maximum aromatics, zero heat treatment.",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    id: "bake",
    label: "Bake",
    tagline: "Airy Crumb & Glassy Crust",
    shortDesc: "Dimpled focaccias & moist citrus cakes.",
    dishName: "Rosemary & Flaky Sea Salt Dimpled Focaccia",
    image: "/images/meals/bake-focaccia.jpg",
    smokePoint: "425°F Baking Heat",
    glugAmount: "5 Squeezes (Pan & Puddles)",
    cookTime: "22 Minutes",
    flavorProfile: "Crunchy bottom crust, pillowy herb-infused interior",
    pairingProductId: "goya-classic-glass",
    pairingTitle: "“El Clásico” Andalusian Gold",
    pairingType: "First Cold Press Glass",
    proTip: "Press your fingers all the way down to touch the bottom of the pan to create deep dimples. Let the olive oil pool directly in the craters before baking.",
    whyGoya: "Olive oil dough retains moisture days longer than butter-based doughs, yielding a shatteringly crisp crust with an ultra-soft cloud inside.",
    icon: <Wheat className="w-5 h-5" />,
  },
];

export const WaysToGoya: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [isSqueezingOil, setIsSqueezingOil] = useState<boolean>(false);
  const [splatCount, setSplatCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const { addToCart } = useCart();

  const activeMethod = COOKING_METHODS[activeIndex];
  const stepAngle = 360 / COOKING_METHODS.length; // 72 degrees for 5 items

  // Audio synthesis for tactile feedback
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(380, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const playGlugSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext unavailable
    }
  };

  // Rotate wheel so the selected item rotates into the active focal point (right side, pointing to the meal)
  const selectMethod = (index: number) => {
    if (index === activeIndex) return;

    playClickSound();

    // Calculate rotation delta to bring selected item to 0 degrees (pointing right to the meal)
    const currentAngleOffset = activeIndex * stepAngle;
    const targetAngleOffset = index * stepAngle;
    let diff = targetAngleOffset - currentAngleOffset;

    // Normalize diff to shortest path
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setRotationDegree((prev) => prev - diff);
    setActiveIndex(index);
  };

  const nextMethod = () => {
    selectMethod((activeIndex + 1) % COOKING_METHODS.length);
  };

  const prevMethod = () => {
    selectMethod((activeIndex - 1 + COOKING_METHODS.length) % COOKING_METHODS.length);
  };

  // Find paired product from PRODUCTS
  const pairedProduct =
    PRODUCTS.find((p) => p.id === activeMethod.pairingProductId) || PRODUCTS[0];

  // Playful oil squeeze animation on dish
  const handleSqueezeOil = () => {
    playGlugSound();
    setIsSqueezingOil(true);
    setSplatCount((prev) => prev + 1);
    setTimeout(() => {
      setIsSqueezingOil(false);
    }, 700);
  };

  return (
    <section
      id="so-many-ways"
      className="w-full py-12 lg:py-20 bg-background border-t-2 border-dashed border-text overflow-hidden relative"
    >
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2C2B22_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 mb-6 lg:mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-text tracking-tight">
            So Many Ways to Goya.
          </h2>

          <p className="mt-3 text-base md:text-lg text-text/80 max-w-2xl mx-auto">
            From screaming-hot cast-iron skillets to cold burrata spirals.
            <span className="font-semibold text-text"> Spin the dial </span>
            to see how real Spanish olive oil transforms every dish.
          </p>
        </div>

        {/* FULL STAGE: Immersive Full Culinary Canvas Edge-to-Edge with Full Width */}
        <div className="relative w-full border-y-2 border-text bg-text min-h-[680px] lg:min-h-[760px] flex flex-col justify-between p-4 sm:p-8 lg:p-12 xl:p-14 overflow-hidden">
          {/* Full-Bleed Cooked Dish Photo Canvas */}
          <div className="absolute inset-0 z-0">
            <Image
              src={activeMethod.image}
              alt={activeMethod.dishName}
              fill
              className="object-cover transition-all duration-700 scale-100 filter brightness-[0.92]"
              sizes="100vw"
              priority
            />
            {/* Film gradient scrims: ensures every card, badge, and text line is crystal-clear */}
            <div className="absolute inset-0 bg-gradient-to-t from-text/95 via-text/40 to-text/75 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-text/90 via-text/25 to-text/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(44,43,34,0.5)_100%)] pointer-events-none" />
          </div>

          {/* TOP ZONE: Left Rotary Dial (Made smaller to the side) + Right Dish Information */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT / SIDE: The Compact Rotator Dial in Liquid Glass (4 cols on lg) */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center lg:items-start">
              <div className="bg-black/25 backdrop-blur-2xl rounded-[32px] sm:rounded-[36px] border border-white/25 p-4 sm:p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center select-none w-full max-w-[310px]">
                {/* Rotator Header */}
                <div className="flex items-center justify-between w-full pb-2 mb-2 border-b border-white/15 text-xs font-tag">
                  <span className="font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5 drop-shadow-sm">
                    <RotateCw size={12} className="animate-spin text-brand" style={{ animationDuration: "10s" }} />
                    Dial a Technique
                  </span>
                  <span className="bg-white/15 backdrop-blur-md text-white font-bold px-2 py-0.5 rounded-full border border-white/25 text-[10px] shadow-sm">
                    0{activeIndex + 1}/05
                  </span>
                </div>

                {/* Compact Rotator Orbit Wheel (Liquid Glass) */}
                <div className="relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] flex items-center justify-center my-2">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                    style={{ transform: `rotate(${rotationDegree}deg)` }}
                  >
                    {COOKING_METHODS.map((method, idx) => {
                      const nodeAngle = idx * stepAngle;
                      const isCurrent = idx === activeIndex;

                      return (
                        <div
                          key={`compact-node-${method.id}`}
                          className="absolute top-1/2 left-1/2 w-0 h-0"
                          style={{
                            transform: `rotate(${nodeAngle}deg) translate(clamp(82px, 22vw, 92px))`,
                          }}
                        >
                          <button
                            onClick={() => selectMethod(idx)}
                            aria-label={`Select ${method.label} method`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] cursor-pointer focus:outline-none"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${-rotationDegree - nodeAngle}deg) scale(${
                                isCurrent ? 1.15 : 1
                              })`,
                            }}
                          >
                            {/* Liquid Glass Circular Selector Node */}
                            <div
                              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center text-center transition-all ${
                                isCurrent
                                  ? "bg-white/30 backdrop-blur-2xl text-white border-2 border-white shadow-[0_0_18px_rgba(255,255,255,0.5)] ring-2 ring-white/40 font-bold"
                                  : "bg-black/35 backdrop-blur-md text-white/90 border border-white/30 hover:border-white hover:bg-white/20 shadow-sm"
                              }`}
                            >
                              <span className={`text-xs ${isCurrent ? "text-brand" : "text-white/80"}`}>
                                {method.icon}
                              </span>
                              <span className="font-tag text-[9px] font-extrabold uppercase leading-none mt-0.5 tracking-tight drop-shadow-sm">
                                {method.label}
                              </span>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Center Compass Hub (Liquid Glass) */}
                  <button
                    onClick={nextMethod}
                    title="Click to spin next"
                    className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-black/40 backdrop-blur-2xl border border-white/35 text-white hover:bg-white/20 shadow-lg flex flex-col items-center justify-center p-2 text-center cursor-pointer active:scale-95 transition-all group"
                  >
                    <div className="relative w-8 h-9 group-hover:scale-105 transition-transform filter drop-shadow-sm">
                      <Image
                        src="/images/goya-bottle-thumb.png"
                        alt="Goya Squeeze Bottle"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-tag text-[8px] font-extrabold text-brand uppercase leading-none mt-0.5 tracking-wider drop-shadow-xs">
                      Glug Dial
                    </span>
                    <span className="font-sans text-[9px] font-bold text-white leading-tight flex items-center gap-0.5 drop-shadow-xs">
                      Next <ArrowRight size={9} />
                    </span>
                  </button>
                </div>

                {/* Quick Step Buttons (Liquid Glass) */}
                <div className="flex items-center justify-between w-full pt-2 border-t border-white/15 text-xs">
                  <button
                    onClick={prevMethod}
                    className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Previous method"
                  >
                    <ArrowLeft size={13} />
                  </button>
                  <span className="font-tag text-[11px] font-bold text-white/90 uppercase drop-shadow-sm">
                    {activeMethod.label} ({activeMethod.smokePoint.split(" ")[0]})
                  </span>
                  <button
                    onClick={nextMethod}
                    className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Next method"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Primary Dish Information & Story */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-4">
              {/* Method & Heat Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand text-text font-tag text-xs font-black uppercase px-3 py-1 rounded-full border border-text shadow-sm">
                  Technique 0{activeIndex + 1}: {activeMethod.label}
                </span>
                <span className="bg-highlight/90 backdrop-blur-sm text-text font-tag text-xs font-bold px-3 py-1 rounded-full border border-text shadow-sm">
                  {activeMethod.tagline}
                </span>
                <span className="bg-black/50 backdrop-blur-sm text-highlight font-tag text-xs font-bold px-3 py-1 rounded-full border border-highlight/40 flex items-center gap-1.5">
                  <Flame size={13} className="text-secondary" />
                  {activeMethod.smokePoint}
                </span>
              </div>

              {/* Dish Name */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-highlight leading-[1.1] drop-shadow-md">
                {activeMethod.dishName}
              </h3>

              {/* Story & Spanish Technique Context */}
              <div className="max-w-2xl bg-text/65 backdrop-blur-md rounded-16 p-4 sm:p-5 border border-highlight/25 text-highlight text-sm sm:text-base leading-relaxed drop-shadow-sm space-y-2">
                <p className="font-medium text-brand">
                  {activeMethod.shortDesc}
                </p>
                <p className="text-highlight/90 text-xs sm:text-sm">
                  {activeMethod.whyGoya}
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE: Interactive "Glug Oil!" Button floating right above the dish with burst feedback */}
          <div className="relative z-10 py-6 sm:py-8 flex flex-col items-center justify-center">
            {/* Interactive "Glug Oil!" Button */}
            <button
              onClick={handleSqueezeOil}
              className="btn--std !py-3 !px-7 text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-brand hover:bg-highlight text-text border-2 border-text shadow-graza-lg flex items-center gap-2.5 active:scale-95 hover:scale-105 transition-all cursor-pointer"
              title="Simulate glug of olive oil onto plate"
            >
              <Droplets size={17} className="text-goya-blue animate-bounce" />
              <span>Glug Oil Onto Dish! ({splatCount} Poured)</span>
            </button>

            {/* Animated Golden Oil Droplet Burst */}
            {isSqueezingOil && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="w-40 h-40 rounded-full bg-secondary/90 border-4 border-brand animate-splash-ripple flex items-center justify-center shadow-2xl">
                  <span className="font-tag text-xs font-black text-text bg-brand px-3 py-1 rounded-full border-2 border-text shadow-md">
                    +1 FRESH GLUG! 🫒
                  </span>
                </div>
              </div>
            )}

            <span className="text-[11px] font-tag font-bold uppercase tracking-wider text-highlight/80 mt-2 bg-text/50 px-3 py-0.5 rounded-full border border-highlight/20 backdrop-blur-sm">
              🥘 Prepared with 100% Andalusia First Cold Press
            </span>
          </div>

          {/* BOTTOM ZONE: Cooking Metric Badges + Chef's Secret & Bottle Pairing Card */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* BOTTOM-LEFT: Metrics Grid (7 cols on lg) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-highlight/90 backdrop-blur-md rounded-14 p-3.5 border-2 border-text shadow-sm">
                <span className="font-tag text-[10px] text-text/70 uppercase font-bold block">
                  Glug Volume
                </span>
                <span className="font-sans text-xs sm:text-sm font-black text-text block mt-0.5">
                  {activeMethod.glugAmount}
                </span>
              </div>

              <div className="bg-highlight/90 backdrop-blur-md rounded-14 p-3.5 border-2 border-text shadow-sm">
                <span className="font-tag text-[10px] text-text/70 uppercase font-bold block">
                  Cooking Duration
                </span>
                <span className="font-sans text-xs sm:text-sm font-black text-text block mt-0.5">
                  {activeMethod.cookTime}
                </span>
              </div>

              <div className="bg-highlight/90 backdrop-blur-md rounded-14 p-3.5 border-2 border-text shadow-sm col-span-2 sm:col-span-1">
                <span className="font-tag text-[10px] text-text/70 uppercase font-bold block">
                  Flavor Profile
                </span>
                <span className="font-sans text-xs sm:text-sm font-bold text-goya-blue block mt-0.5 truncate">
                  {activeMethod.flavorProfile.split(",")[0]}
                </span>
              </div>

              {/* Chef's Pro-Tip Strip */}
              <div className="col-span-2 sm:col-span-3 bg-brand/95 backdrop-blur-md rounded-14 p-3.5 border-2 border-text shadow-sm flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">💡</span>
                <div>
                  <span className="font-tag text-[10px] font-extrabold uppercase tracking-wider text-text block">
                    Andalusian Kitchen Secret:
                  </span>
                  <p className="text-xs sm:text-sm text-text/90 font-medium leading-snug mt-0.5">
                    {activeMethod.proTip}
                  </p>
                </div>
              </div>
            </div>

            {/* BOTTOM-RIGHT: Bottle Pairing & Quick-Add Card (5 cols on lg) */}
            {/* BOTTOM-RIGHT: Bottle Pairing & Quick-Add Card (5 cols on lg, Mobile Stacked) */}
            <div className="lg:col-span-5">
              <div className="bg-highlight/95 backdrop-blur-md rounded-20 border-2 border-text shadow-graza p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-16 rounded-10 bg-background border border-text/30 p-1 flex-shrink-0">
                    <Image
                      src={pairedProduct.image}
                      alt={pairedProduct.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-tag text-[9px] font-extrabold text-goya-blue uppercase block truncate">
                      Paired for {activeMethod.label}
                    </span>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-text leading-tight truncate">
                      {pairedProduct.title}
                    </h4>
                    <span className="font-tag text-xs font-extrabold text-text block">
                      ${pairedProduct.price}.00 • {pairedProduct.format.toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(pairedProduct, 1)}
                  className="btn--std !py-2.5 !px-4 text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm hover:scale-102 active:scale-95 w-full sm:w-auto"
                >
                  <ShoppingBag size={14} />
                  <span>Add (${pairedProduct.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
