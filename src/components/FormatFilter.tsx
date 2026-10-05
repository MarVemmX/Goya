"use client";

import React from "react";
import Image from "next/image";

export type Format = "all" | "squeeze" | "glass" | "can" | "spray";

interface FormatFilterProps {
  selectedFormat: Format;
  onSelectFormat: (format: Format) => void;
  productCount: number;
}

export const FormatFilter: React.FC<FormatFilterProps> = ({
  selectedFormat,
  onSelectFormat,
  productCount,
}) => {
  const formats: { id: Format; label: string; icon: string }[] = [
    { id: "squeeze", label: "Squeeze", icon: "/images/format-squeeze.svg" },
    { id: "glass", label: "Glass", icon: "/images/format-glass.svg" },
    { id: "can", label: "Refill Can", icon: "/images/format-can.svg" },
    { id: "spray", label: "Spray", icon: "/images/format-spray.svg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Format Selector Pills */}
      <fieldset className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <legend className="font-tag text-xs font-bold uppercase tracking-wider text-text mb-2 sm:mb-0 sm:mr-3">
          Select Format:
        </legend>

        <div className="flex flex-wrap items-center gap-3">
          {/* All Formats option */}
          <button
            onClick={() => onSelectFormat("all")}
            className={`flex items-center gap-2 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full border transition-all ${
              selectedFormat === "all"
                ? "bg-text text-highlight border-text shadow-sm"
                : "bg-highlight border-text/40 text-text hover:border-text"
            }`}
          >
            <span>All Formats</span>
          </button>

          {formats.map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => onSelectFormat(isSelected ? "all" : fmt.id)}
                className={`flex items-center gap-2 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full border transition-all ${
                  isSelected
                    ? "bg-brand border-text text-text font-bold shadow-sm ring-1 ring-text"
                    : "bg-highlight border-text/40 text-text hover:border-text"
                }`}
              >
                <span className="w-5 h-5 relative flex-shrink-0">
                  <Image
                    src={fmt.icon}
                    alt={fmt.label}
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="underline-offset-4 hover:underline">
                  {fmt.label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Product Count & Filter Clear */}
      <div className="flex items-center gap-3 font-tag text-xs text-text/80 self-end md:self-auto">
        <span>Showing {productCount} items</span>
        {selectedFormat !== "all" && (
          <button
            onClick={() => onSelectFormat("all")}
            className="text-goya-blue hover:underline font-bold"
          >
            Clear Filter (×)
          </button>
        )}
      </div>
    </div>
  );
};
