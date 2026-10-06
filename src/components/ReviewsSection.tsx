"use client";

import React, { useState } from "react";
import { REVIEWS } from "@/data/products";
import { Star, CheckCircle, Quote } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState("all");

  const filterKeywords = ["all", "Taste", "Squeeze Bottle", "Cooking", "Salad"];

  const filteredReviews =
    filter === "all"
      ? REVIEWS
      : REVIEWS.filter(
          (r) =>
            r.content.toLowerCase().includes(filter.toLowerCase()) ||
            r.title.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 bg-highlight/30 border-t border-dashed border-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with 4.9 Stars */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-10 border-b border-dashed border-text/30">
          <div>
            <span className="font-tag text-[11px] sm:text-xs font-bold text-goya-blue tracking-widest uppercase mb-1 block">
              14,800+ Verified Cooks
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-text">
              Real cooks. Generous glugs.
            </h2>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4 bg-background p-3 sm:p-4 rounded-16 sm:rounded-20 border border-text w-full sm:w-auto shadow-xs">
            <div className="flex text-text">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" className="text-text" />
              ))}
            </div>
            <div className="text-left font-tag text-xs">
              <span className="font-bold text-xs sm:text-sm block">4.9 / 5.0 Rating</span>
              <span className="text-text/70 text-[10px] sm:text-xs">World Olive Oil Award Winner</span>
            </div>
          </div>
        </div>

        {/* Filter Keywords */}
        <div className="pt-4 sm:pt-6 pb-6 sm:pb-8 flex items-center gap-2 overflow-x-auto scrollbar--none">
          <span className="font-tag text-[11px] sm:text-xs text-text/60 uppercase mr-1 flex-shrink-0">Filter By:</span>
          {filterKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setFilter(kw)}
              className={`text-[11px] sm:text-xs font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border transition-colors whitespace-nowrap cursor-pointer ${
                filter === kw
                  ? "bg-brand text-text border-text font-bold"
                  : "bg-highlight border-text/30 text-text hover:border-text"
              }`}
            >
              {kw === "all" ? "All Reviews" : kw}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {(filteredReviews.length > 0 ? filteredReviews : REVIEWS).map((rev, idx) => (
            <div
              key={idx}
              className="bg-background rounded-16 sm:rounded-20 p-4 sm:p-6 border border-text/30 flex flex-col justify-between shadow-sm hover:border-text transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-text mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="text-text" />
                  ))}
                </div>

                <h3 className="font-bold text-base font-serif mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs text-text/80 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-text/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{rev.author}</span>
                  <span className="font-tag text-[10px] text-text/50">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-goya-blue font-medium mt-0.5">
                  <CheckCircle size={12} />
                  <span>Verified Buyer • {rev.location}</span>
                </div>
                <div className="text-[10px] font-tag text-text/60 mt-1 line-clamp-1">
                  Product: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
