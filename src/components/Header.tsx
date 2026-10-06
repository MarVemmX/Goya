"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoyaLogo } from "./GoyaLogo";
import { MegaMenu } from "./MegaMenu";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Volume2, VolumeX } from "lucide-react";

interface HeaderProps {
  onSelectCategory: (category: "all" | "olive-oil" | "bundles" | "gifts") => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
  const { totalItems, setIsCartOpen, setIsSearchOpen, isHeroVideoMuted, toggleHeroVideoMute } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from clear/scrim (over full-screen hero video) to solid when leaving the hero stage
      const threshold = Math.max(450, (window.innerHeight || 800) * 0.75);
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isHeaderSolid = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`sticky top-0 inset-x-0 w-full z-40 -mb-14 xs:-mb-16 sm:-mb-20 transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-brand text-text border-b border-text/30 shadow-sm"
          : isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-text shadow-sm text-text"
          : "bg-gradient-to-b from-black/85 via-black/45 to-transparent text-highlight border-b border-white/10 backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 h-14 xs:h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Logo (Responsive scaling across all breakpoints) */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand rounded-md py-1"
            aria-label="Goya Olive Oil Home"
          >
            <GoyaLogo
              fillColor={isHeaderSolid ? "#003296" : "#FFFFFF"}
              className={`h-6 xs:h-7 sm:h-8 md:h-9 w-auto transition-all ${
                !isHeaderSolid ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" : ""
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

        {/* Right: Actions (Sound Toggle, Search, Account, Cart, Mobile Menu) */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 lg:gap-3 flex-shrink-0">
          {/* Sound Toggle Icon Button (Right end, immediately before search icon!) */}
          <button
            onClick={toggleHeroVideoMute}
            aria-label={isHeroVideoMuted ? "Unmute video sound" : "Mute video sound"}
            title={isHeroVideoMuted ? "Sound Off (Click to unmute)" : "Sound On (Click to mute)"}
            className={`p-1.5 xs:p-2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer select-none active:scale-95 ${
              isHeaderSolid
                ? "border-text bg-highlight hover:bg-brand text-text shadow-xs"
                : "border-white/40 bg-black/45 backdrop-blur-md hover:bg-brand hover:text-text hover:border-text text-highlight drop-shadow-sm"
            }`}
          >
            {isHeroVideoMuted ? (
              <VolumeX size={16} className="text-current sm:w-[17px] sm:h-[17px]" />
            ) : (
              <Volume2 size={16} className="text-brand animate-pulse sm:w-[17px] sm:h-[17px]" />
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className={`p-1.5 xs:p-2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer select-none active:scale-95 ${
              isHeaderSolid
                ? "border-text bg-highlight hover:bg-brand text-text shadow-xs"
                : "border-white/40 bg-black/45 backdrop-blur-md hover:bg-brand hover:text-text hover:border-text text-highlight drop-shadow-sm"
            }`}
          >
            <Search size={16} className="text-current sm:w-[17px] sm:h-[17px]" />
          </button>

          {/* Account Button (Desktop only) */}
          <button
            onClick={() => alert("¡Bienvenido! Goya Olive Oil Club VIP rewards account.")}
            aria-label="Account"
            className={`hidden lg:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all items-center justify-center cursor-pointer select-none active:scale-95 ${
              isHeaderSolid
                ? "border-text bg-highlight hover:bg-brand text-text shadow-xs"
                : "border-white/40 bg-black/45 backdrop-blur-md hover:bg-brand hover:text-text hover:border-text text-highlight drop-shadow-sm"
            }`}
          >
            <User size={17} />
          </button>

          {/* Cart Icon Button (Icon only with badge) */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Cart, ${totalItems} items`}
            className={`relative p-1.5 xs:p-2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer select-none active:scale-95 ${
              isHeaderSolid
                ? "border-text bg-brand text-text hover:bg-highlight shadow-xs"
                : "border-white/40 bg-black/45 backdrop-blur-md text-highlight hover:bg-brand hover:text-text hover:border-text drop-shadow-sm"
            }`}
          >
            <ShoppingBag size={16} className="text-current sm:w-[18px] sm:h-[18px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-goya-red text-white text-[9.5px] font-bold rounded-full flex items-center justify-center border border-text shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className={`lg:hidden p-1.5 xs:p-2 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px] flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none active:scale-95 ${
              isHeaderSolid
                ? "text-text hover:bg-highlight/50"
                : "text-highlight drop-shadow-sm hover:bg-black/25"
            }`}
          >
            {isMobileMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
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

      {/* Mobile Drawer Menu & Backdrop */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 top-14 xs:top-16 sm:top-20 bg-text/50 backdrop-blur-xs z-30 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="lg:hidden fixed inset-x-0 top-14 xs:top-16 sm:top-20 z-40 bg-brand text-text border-b-2 border-text shadow-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-3.5rem)] xs:max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {/* Quick Search in Mobile Menu */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center justify-between w-full py-2.5 px-4 bg-highlight/90 border border-text rounded-full text-xs font-tag font-bold text-text shadow-sm hover:bg-highlight active:scale-98 transition-all"
            >
              <span className="flex items-center gap-2">
                <Search size={14} className="text-text/70" />
                <span>Search olive oils, tins, gifts...</span>
              </span>
              <span className="text-[10px] bg-brand px-2 py-0.5 rounded-full border border-text/40">Find</span>
            </button>

            <ul className="flex flex-col gap-1 text-base sm:text-lg font-bold">
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <button
                  onClick={() => {
                    onSelectCategory("all");
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById("collection-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>Shop All Olive Oil</span>
                  <ChevronDown size={16} className="-rotate-90 text-text/50" />
                </button>
              </li>
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <button
                  onClick={() => {
                    onSelectCategory("bundles");
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById("collection-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>Refill Cans &amp; Sets</span>
                  <span className="text-[10px] font-tag bg-goya-blue text-highlight px-2 py-0.5 rounded-full">Save 15%</span>
                </button>
              </li>
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <a
                  href="#glug-guide"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>Why Squeeze? (Glug Guide)</span>
                  <ChevronDown size={16} className="-rotate-90 text-text/50" />
                </a>
              </li>
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <a
                  href="#so-many-ways"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>Ways to Goya (Interactive)</span>
                  <ChevronDown size={16} className="-rotate-90 text-text/50" />
                </a>
              </li>
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <a
                  href="#social-feed"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>Recipes &amp; Spanish Kitchen</span>
                  <ChevronDown size={16} className="-rotate-90 text-text/50" />
                </a>
              </li>
              <li className="border-b border-text/20 pb-2.5 pt-1">
                <a
                  href="#about-section"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 flex items-center justify-between hover:text-goya-blue transition-colors"
                >
                  <span>About Seville Mill</span>
                  <ChevronDown size={16} className="-rotate-90 text-text/50" />
                </a>
              </li>
            </ul>

            <div className="pt-1 flex flex-col gap-3 font-tag text-xs">
              <div className="bg-highlight/90 p-3 rounded-12 border border-text/30 shadow-xs">
                <span className="font-bold block mb-1 text-goya-blue">🇪🇸 100% Andalusia Harvest</span>
                <span className="text-text/80 text-[11px] leading-relaxed block">
                  Direct from Jaén and Seville olive groves. Award-winning first cold press, never blended.
                </span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="btn--std w-full !py-3 text-xs font-bold uppercase tracking-wider"
              >
                View Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
