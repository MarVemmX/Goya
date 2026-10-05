"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Search, X } from "lucide-react";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, addToCart } = useCart();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.oliveVariety.toLowerCase().includes(query.toLowerCase()) ||
          p.format.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-text/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="relative bg-background text-text border-2 border-text rounded-20 max-w-2xl w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-dashed border-text/30">
          <span className="font-tag text-xs font-bold uppercase tracking-wider text-goya-blue">
            Pantry Search
          </span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-text hover:text-red-600 transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative mt-4">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50"
          />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Watcha lookin' for?? (e.g. Squeeze, Picual, Glass, Refill, Aioli)"
            className="w-full bg-highlight border-2 border-text rounded-full py-3.5 pl-12 pr-12 text-sm sm:text-base font-medium placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40 hover:text-text"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="mt-4 pt-2">
            <span className="text-xs font-tag text-text/60 uppercase block mb-2">
              Popular Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Squeeze", "First Cold Press", "Refill Can", "Andalusia", "Starter Kit", "Spray"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium bg-highlight border border-text/30 rounded-full px-3 py-1 hover:bg-brand transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="mt-6 max-h-80 overflow-y-auto divide-y divide-dashed divide-text/20">
            {results.length === 0 ? (
              <div className="py-8 text-center text-text/60 text-sm">
                No olive oil matches found for &quot;{query}&quot;. Try searching for &quot;Squeeze&quot; or &quot;Glass&quot;!
              </div>
            ) : (
              results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsSearchOpen(false);
                  }}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-highlight/50 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-8 bg-highlight border border-text/20 overflow-hidden flex-shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text font-serif">{p.title}</h4>
                      <p className="text-xs text-text/70">{p.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">${p.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                        setIsSearchOpen(false);
                      }}
                      className="btn--std !py-1 !px-3 !text-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
