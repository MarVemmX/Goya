"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoyaLogo } from "./GoyaLogo";
import { MegaMenu } from "./MegaMenu";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  onSelectCategory: (category: "all" | "olive-oil" | "bundles" | "gifts") => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from clear (over full-screen hero video) to frosted solid when leaving the hero stage
      const threshold = Math.max(450, (window.innerHeight || 800) * 0.75);
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 inset-x-0 w-full z-40 -mb-20 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-text shadow-sm text-text"
          : "bg-transparent border-b border-transparent text-highlight"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center" aria-label="Goya Olive Oil Home">
            <GoyaLogo
              fillColor={isScrolled ? "#003296" : "#FFFFFF"}
              className={`h-9 transition-all ${
                !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" : ""
              }`}
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Lessen the navlinks: shop, refill, why squeeze, recipes, about) */}
        <nav
          className={`hidden lg:flex items-center justify-center gap-7 xl:gap-9 text-[13px] font-medium tracking-wide transition-colors ${
            isScrolled
              ? "text-text"
              : "text-highlight drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
          }`}
        >
          {/* Shop with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMegaMenuOpen((prev) => !prev)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className={`flex items-center gap-1 py-1.5 font-medium transition-colors focus:outline-none cursor-pointer ${
                isScrolled ? "hover:text-goya-blue" : "hover:text-brand"
              }`}
              aria-expanded={isMegaMenuOpen}
            >
              <span>Shop</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Refill */}
          <button
            onClick={() => {
              onSelectCategory("bundles");
              const el = document.getElementById("collection-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:underline hover:decoration-dashed transition-colors cursor-pointer"
          >
            Refill
          </button>

          {/* Why Squeeze */}
          <a
            href="#glug-guide"
            className="hover:underline hover:decoration-dashed transition-colors cursor-pointer"
          >
            Why Squeeze
          </a>

          {/* Recipes */}
          <a
            href="#social-feed"
            className="hover:underline hover:decoration-dashed transition-colors cursor-pointer"
          >
            Recipes
          </a>

          {/* About */}
          <a
            href="#about-section"
            className="hover:underline hover:decoration-dashed transition-colors cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* Right: Actions (Search, Account, Cart Icon) */}
        <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 flex-shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className={`p-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
              isScrolled
                ? "border-text bg-highlight hover:bg-brand text-text"
                : "border-highlight/50 bg-black/35 backdrop-blur-sm hover:bg-brand hover:text-text hover:border-text text-highlight drop-shadow-sm"
            }`}
          >
            <Search size={17} />
          </button>

          {/* Account Button */}
          <button
            onClick={() => alert("¡Bienvenido! Goya Olive Oil Club VIP rewards account.")}
            aria-label="Account"
            className={`hidden lg:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all items-center justify-center cursor-pointer ${
              isScrolled
                ? "border-text bg-highlight hover:bg-brand text-text"
                : "border-highlight/50 bg-black/35 backdrop-blur-sm hover:bg-brand hover:text-text hover:border-text text-highlight drop-shadow-sm"
            }`}
          >
            <User size={17} />
          </button>

          {/* Cart Icon Button (Icon only, no full text) */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Cart, ${totalItems} items`}
            className={`relative p-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
              isScrolled
                ? "border-text bg-brand text-text hover:bg-highlight shadow-sm"
                : "border-highlight/50 bg-black/35 backdrop-blur-sm text-highlight hover:bg-brand hover:text-text hover:border-text drop-shadow-sm"
            }`}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-goya-red text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-text shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-text" : "text-highlight drop-shadow-sm"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          const el = document.getElementById("collection-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-brand text-text border-b border-text shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-4 text-lg font-bold">
            <li className="border-b border-text/20 pb-3">
              <button
                onClick={() => {
                  onSelectCategory("all");
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById("collection-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-left"
              >
                Shop
              </button>
            </li>
            <li className="border-b border-text/20 pb-3">
              <button
                onClick={() => {
                  onSelectCategory("bundles");
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById("collection-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-left"
              >
                Refill
              </button>
            </li>
            <li className="border-b border-text/20 pb-3">
              <a
                href="#glug-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                Why Squeeze
              </a>
            </li>
            <li className="border-b border-text/20 pb-3">
              <a
                href="#social-feed"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                Recipes
              </a>
            </li>
            <li className="border-b border-text/20 pb-3">
              <a
                href="#about-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
              >
                About
              </a>
            </li>
          </ul>

          <div className="pt-2 flex flex-col gap-3 font-tag text-xs">
            <div className="bg-highlight/80 p-3 rounded-10 border border-text/20">
              <span className="font-bold block mb-1">🇪🇸 100% Andalusia Harvest</span>
              <span>Direct from Jaén and Seville olive groves. Award-winning first cold press.</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="btn--std w-full"
            >
              View Cart ({totalItems})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
