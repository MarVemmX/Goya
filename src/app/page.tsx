"use client";

import React, { useState, useMemo } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CollectionNav, Category } from "@/components/CollectionNav";
import { FormatFilter, Format } from "@/components/FormatFilter";
import { ProductCard } from "@/components/ProductCard";
import { WaysToGoya } from "@/components/WaysToGoya";
import { GlugGuide } from "@/components/GlugGuide";
import { AboutSection } from "@/components/AboutSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { InstagramMarquee } from "@/components/InstagramMarquee";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { SearchModal } from "@/components/SearchModal";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedFormat, setSelectedFormat] = useState<Format>("all");

  // Filter products by category and format
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesFormat =
        selectedFormat === "all" || p.format === selectedFormat;
      return matchesCategory && matchesFormat;
    });
  }, [activeCategory, selectedFormat]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Promo Banner before hero - Commented out per user request */}
      {/* <AnnouncementBar /> */}

      {/* Main Sticky Header */}
      <Header onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Graza-Style Hero with Video & Scroll-Bound Oil Droplet with Wiggly Effect */}
        <HeroSection />

        {/* Collection Hero & Category Tabs */}
        <section id="collection-section" className="w-full">
          <CollectionNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setSelectedFormat("all");
            }}
          />

          {/* Format Filter Chips */}
          <FormatFilter
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
            productCount={filteredProducts.length}
          />

          {/* Product Feed Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-highlight/40 rounded-20 border border-dashed border-text/30 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text mb-2">
                  No olive oil found in this combination
                </h3>
                <p className="text-xs sm:text-sm text-text/70 mb-6">
                  Try clearing your format filter to see all our Spanish products.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSelectedFormat("all");
                  }}
                  className="btn--std"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* So Many Ways to Goya: Interactive Rotary Wheel & Culinary Showcase */}
        <WaysToGoya />

        {/* Why Squeeze? The Glug Guide */}
        <GlugGuide />

        {/* Spanish Heritage Story & Seville Mill */}
        <AboutSection />

        {/* 14,800+ Verified Reviews Section */}
        <ReviewsSection />

        {/* Community & Instagram Infinite Marquee */}
        <InstagramMarquee />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductModal />
      <SearchModal />
    </div>
  );
}
