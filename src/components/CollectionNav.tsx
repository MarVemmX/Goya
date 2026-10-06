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
      <div className="flex flex-col items-center justify-center pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 text-center">
        <span className="font-tag text-[11px] sm:text-xs font-bold text-goya-blue tracking-widest uppercase mb-2">
          From Seville &amp; Jaén, Spain • 100% First Cold Press
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text tracking-tight max-w-3xl leading-[1.08]">
          Join the Glug Club
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-text/80 max-w-xl font-normal">
          Real, unadulterated Spanish olive oil in squeeze bottles and tins that make cooking actually fun. Never blended with old refined oil.
        </p>
      </div>

      {/* Category Tabs Bar with Graza's signature dashed grid */}
      <div className="relative w-full overflow-x-auto scrollbar--none border-y border-dashed border-text">
        <nav aria-label="Collections" className="max-w-7xl mx-auto">
          <ul className="flex sm:grid sm:grid-cols-4 min-w-[500px] sm:min-w-0 w-full text-center">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <li
                  key={tab.id}
                  className="flex-1 min-w-[125px] sm:min-w-0 border-r border-dashed border-text last:border-r-0"
                >
                  <button
                    onClick={() => onSelectCategory(tab.id)}
                    className={`w-full py-3 sm:py-3.5 px-2.5 sm:px-3 uppercase font-semibold text-[11px] sm:text-xs md:text-sm tracking-wider transition-colors duration-150 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-98 ${
                      isActive
                        ? "bg-brand text-text font-bold shadow-inner"
                        : "bg-background text-text/80 hover:bg-highlight hover:text-text"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-text inline-block flex-shrink-0"></span>
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
