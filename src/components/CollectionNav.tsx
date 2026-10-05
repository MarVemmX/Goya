"use client";

import React from "react";

export type Category = "all" | "olive-oil" | "bundles" | "gifts";

interface CollectionNavProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CollectionNav: React.FC<CollectionNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const tabs: { id: Category; label: string }[] = [
    { id: "all", label: "All Products" },
    { id: "olive-oil", label: "Olive Oil" },
    { id: "bundles", label: "Bundles & Kits" },
    { id: "gifts", label: "Gifts & Tapas" },
  ];

  return (
    <div className="w-full">
      {/* Hero Headline */}
      <div className="flex flex-col items-center justify-center pt-10 pb-8 px-4 text-center">
        <span className="font-tag text-xs font-bold text-goya-blue tracking-widest uppercase mb-2">
          From Seville & Jaén, Spain • 100% First Cold Press
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text tracking-tight max-w-3xl leading-[1.08]">
          Join the Glug Club
        </h1>
        <p className="mt-3 text-base md:text-lg text-text/80 max-w-xl font-normal">
          Real, unadulterated Spanish olive oil in squeeze bottles and tins that make cooking actually fun. Never blended with old refined oil.
        </p>
      </div>

      {/* Category Tabs Bar with Graza's signature dashed grid */}
      <div className="relative w-full overflow-x-auto scrollbar--none border-y border-dashed border-text">
        <nav aria-label="Collections" className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-4 min-w-[560px] w-full text-center">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <li
                  key={tab.id}
                  className="border-r border-dashed border-text last:border-r-0"
                >
                  <button
                    onClick={() => onSelectCategory(tab.id)}
                    className={`w-full py-3.5 px-3 uppercase font-semibold text-xs md:text-sm tracking-wider transition-colors duration-150 flex items-center justify-center gap-2 ${
                      isActive
                        ? "bg-brand text-text font-bold shadow-inner"
                        : "bg-background text-text/80 hover:bg-highlight hover:text-text"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-text inline-block"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
