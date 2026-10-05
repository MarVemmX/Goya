"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: "all" | "olive-oil" | "bundles" | "gifts") => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onSelectCategory }) => {
  const { addToCart, setSelectedProduct } = useCart();

  if (!isOpen) return null;

  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div
      className="absolute top-full left-0 w-full bg-brand text-text border-b border-text shadow-xl transition-all duration-300 z-40 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Shop Olive Oil */}
          <div className="flex flex-col gap-4">
            <h2 className="font-tag text-xs text-text/80 font-bold uppercase tracking-wider pb-2 border-b border-text/20">
              Shop Olive Oil
            </h2>
            <ul className="flex flex-col gap-3 font-medium text-15">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("olive-oil");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  “El Squeeze” Finishing Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("bundles");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  “El Dúo Andaluz” Set
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("olive-oil");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  “El Clásico” Glass (500mL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("bundles");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full text-goya-blue font-bold"
                >
                  The “Spanish Starter Kit”
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("olive-oil");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  “Lata de Oro” Refill Can
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div className="flex flex-col gap-4">
            <h2 className="font-tag text-xs text-text/80 font-bold uppercase tracking-wider pb-2 border-b border-text/20">
              Shop By Collection
            </h2>
            <ul className="flex flex-col gap-3 font-medium text-15">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("all");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("olive-oil");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  Pure Extra Virgin (EVOO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("bundles");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  Bundles & Kits (Save 15%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory("gifts");
                    onClose();
                  }}
                  className="hover:underline hover:decoration-dashed text-left w-full"
                >
                  Spanish Tapas & Aioli
                </button>
              </li>
              <li>
                <span className="font-tag text-xs text-text/70 mt-2 block">
                  100% Spanish Harvest Guarantee
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3 & 4: Featured Cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="font-tag text-xs text-text/80 font-bold uppercase tracking-wider pb-2 border-b border-text/20">
              Featured Andalusian Gold
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-highlight/60 rounded-16 p-3 border border-text/30 hover:border-text transition-colors flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] rounded-10 overflow-hidden mb-2 bg-background">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 bg-brand border border-text text-[10px] font-bold px-2 py-0.5 rounded-full font-tag">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text leading-tight group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text/80 line-clamp-1 mt-0.5">{item.subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-sm">${item.price}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                          onClose();
                        }}
                        className="btn--std !py-1 !px-3 !text-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
