"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Check, ShieldCheck, Flame, Droplets, Calendar, MapPin } from "lucide-react";

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [frequency, setFrequency] = useState("Every 1 Month");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const images = [
    selectedProduct.image,
    selectedProduct.hoverImage,
    "/images/goya-front.jpeg",
    "/images/goya-back.jpg",
  ].filter(Boolean) as string[];

  // Deduplicate images
  const uniqueImages = Array.from(new Set(images));

  const effectivePrice = isSubscription
    ? Math.round(selectedProduct.price * 0.85 * 100) / 100
    : selectedProduct.price;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, isSubscription, frequency);
    setSelectedProduct(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-text/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="relative bg-background text-text border-2 border-text rounded-16 sm:rounded-20 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-highlight border border-text flex items-center justify-center hover:bg-brand transition-colors text-text cursor-pointer"
          aria-label="Close details"
        >
          <X size={17} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left: Gallery Stage */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] w-full rounded-16 overflow-hidden bg-highlight border border-text/20">
              <Image
                src={uniqueImages[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-contain p-4"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
              {selectedProduct.badge && (
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-brand text-text border border-text font-tag text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs max-w-[calc(100%-2rem)] truncate">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
              {uniqueImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-10 border overflow-hidden flex-shrink-0 bg-highlight ${
                    activeImageIndex === idx ? "border-2 border-text ring-2 ring-brand" : "border-text/30"
                  }`}
                >
                  <Image src={img} alt="thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-1 sm:mt-2 grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] xs:text-[11px] sm:text-xs font-tag bg-highlight/60 p-2 sm:p-3 rounded-10 border border-text/10">
              <div className="flex items-center gap-1.5 text-text min-w-0">
                <ShieldCheck size={14} className="text-goya-blue flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">100% Spanish Harvest</span>
              </div>
              <div className="flex items-center gap-1.5 text-text min-w-0">
                <Droplets size={14} className="text-goya-blue flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">Max Acidity &lt; 0.4%</span>
              </div>
              <div className="flex items-center gap-1.5 text-text min-w-0">
                <Flame size={14} className="text-goya-blue flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">Smoke Pt: {selectedProduct.smokePoint.split(" ")[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-text min-w-0">
                <Calendar size={14} className="text-goya-blue flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">First Cold Press</span>
              </div>
            </div>
          </div>

          {/* Right: Product Story & Purchasing Options */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                <span className="font-tag text-[10px] xs:text-[11px] sm:text-xs uppercase text-goya-blue font-bold">
                  {selectedProduct.origin}
                </span>
                <span className="text-text/40">•</span>
                <span className="font-tag text-[10px] xs:text-[11px] sm:text-xs uppercase text-text/70">
                  {selectedProduct.oliveVariety}
                </span>
              </div>

              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text leading-tight">
                {selectedProduct.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-text/80 mt-1">
                {selectedProduct.subtitle}
              </p>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 pb-3 border-b border-dashed border-text/30 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold text-text font-serif">
                ${effectivePrice.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && !isSubscription && (
                <span className="text-base sm:text-lg text-text/50 line-through">
                  ${selectedProduct.originalPrice}
                </span>
              )}
              {isSubscription && (
                <span className="text-[11px] sm:text-xs font-bold text-goya-blue bg-brand px-2 py-0.5 rounded-full border border-text font-tag">
                  Saved 15% with Subscription
                </span>
              )}
            </div>

            {/* Product Narrative */}
            <p className="text-xs sm:text-sm leading-relaxed text-text/90">
              {selectedProduct.description}
            </p>

            {/* Tasting Notes */}
            <div>
              <span className="block font-tag text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                Tasting Notes:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProduct.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] xs:text-[11px] sm:text-xs font-medium bg-highlight px-2.5 py-0.5 sm:py-1 rounded-full border border-text/30"
                  >
                    🌱 {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Mode Toggle (One-time vs Subscription) */}
            <div className="flex flex-col gap-2 p-2.5 sm:p-3 bg-highlight rounded-16 border border-text">
              {/* One-Time Radio */}
              <label
                className={`flex items-center justify-between p-2.5 rounded-10 cursor-pointer border transition-colors ${
                  !isSubscription ? "bg-background border-text font-bold" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="radio"
                    name="purchase_type"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    className="accent-text"
                  />
                  <span>One-time purchase</span>
                </div>
                <span className="font-bold text-xs sm:text-sm">${selectedProduct.price}</span>
              </label>

              {/* Subscribe Radio */}
              <label
                className={`flex flex-col gap-2 p-2.5 rounded-10 cursor-pointer border transition-colors ${
                  isSubscription ? "bg-brand/40 border-text font-bold" : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="purchase_type"
                      checked={isSubscription}
                      onChange={() => setIsSubscription(true)}
                      className="accent-text"
                    />
                    <span>Subscribe &amp; Save 15%</span>
                  </div>
                  <span className="font-bold text-xs sm:text-sm">
                    ${(selectedProduct.price * 0.85).toFixed(2)}
                  </span>
                </div>

                {isSubscription && (
                  <div className="pl-6 pt-1 flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-xs font-normal">Deliver:</span>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="text-xs font-semibold bg-highlight border border-text rounded-lg px-2 py-1 max-w-full"
                    >
                      <option>Every 1 Month (Most Popular)</option>
                      <option>Every 2 Months</option>
                      <option>Every 3 Months</option>
                    </select>
                  </div>
                )}
              </label>
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <div className="flex items-center justify-center border border-text rounded-full bg-highlight overflow-hidden h-10 sm:h-11 self-center sm:self-auto w-36 sm:w-auto">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1 text-base hover:bg-brand transition-colors font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold font-typewriter">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-1 text-base hover:bg-brand transition-colors font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn--std flex-1 !py-3 sm:!py-2.5 text-xs sm:text-sm uppercase tracking-wider font-bold w-full cursor-pointer"
              >
                Add To Cart – ${(effectivePrice * quantity).toFixed(2)}
              </button>
            </div>

            {/* Authentic Nutrition Facts Accordion (from goya back.jpg) */}
            <details className="mt-2 border-t border-dashed border-text/30 pt-3 text-xs">
              <summary className="font-tag font-bold uppercase cursor-pointer hover:text-goya-blue flex items-center justify-between">
                <span>Official Nutrition Facts &amp; Analysis</span>
                <span className="text-sm">+</span>
              </summary>
              <div className="mt-3 bg-highlight/60 p-3 rounded-10 border border-text/20 font-typewriter text-[11px] leading-relaxed">
                <div className="font-bold border-b border-text/30 pb-1 mb-1 flex justify-between">
                  <span>Serving Size: {selectedProduct.nutritionFacts.servingSize}</span>
                  <span>{selectedProduct.nutritionFacts.servingsPerContainer}</span>
                </div>
                <div className="flex justify-between font-bold border-b border-text/30 py-0.5">
                  <span>Calories</span>
                  <span>{selectedProduct.nutritionFacts.calories}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Total Fat</span>
                  <span className="font-bold">{selectedProduct.nutritionFacts.totalFat}</span>
                </div>
                <div className="flex justify-between pl-3 text-text/75 py-0.5">
                  <span>Saturated Fat</span>
                  <span>{selectedProduct.nutritionFacts.saturatedFat}</span>
                </div>
                <div className="flex justify-between pl-3 text-text/75 py-0.5">
                  <span>Monounsaturated Fat</span>
                  <span>{selectedProduct.nutritionFacts.monounsaturatedFat}</span>
                </div>
                <div className="flex justify-between pl-3 text-text/75 py-0.5">
                  <span>Polyunsaturated Fat</span>
                  <span>{selectedProduct.nutritionFacts.polyunsaturatedFat}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Sodium / Cholesterol</span>
                  <span>0mg</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Total Carbohydrate / Protein</span>
                  <span>0g</span>
                </div>
                <div className="text-[10px] text-text/60 mt-2 border-t border-text/20 pt-1">
                  Ingredients: 100% Extra Virgin Olive Oil. Product of Andalusia, Spain. Protect from heat and light.
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};
