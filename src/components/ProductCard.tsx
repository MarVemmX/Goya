"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Eye, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <article
      className="group relative flex flex-col justify-between h-full bg-highlight/30 hover:bg-highlight/80 rounded-16 sm:rounded-20 p-2.5 sm:p-4 border border-text/20 hover:border-text transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[3/4] rounded-12 sm:rounded-16 overflow-hidden bg-background border border-text/10 mb-3 sm:mb-4">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-brand text-text border border-text font-tag text-[8px] xs:text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs max-w-[calc(100%-2.5rem)] truncate">
            {product.badge}
          </span>
        )}

        {/* Quick View Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          aria-label={`Quick View ${product.title}`}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-highlight/90 border border-text flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand text-text cursor-pointer"
        >
          <Eye size={13} className="sm:w-3.5 sm:h-3.5" />
        </button>

        {/* Primary Image */}
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`object-cover transition-all duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          priority={product.id === "goya-squeeze-drizzle"}
        />

        {/* Acidity & Origin Tag Pill on bottom of image */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 z-10 flex justify-between items-center text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-tag bg-highlight/95 backdrop-blur-xs py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-lg border border-text/20 overflow-hidden">
          <span className="text-goya-blue font-bold truncate flex-shrink-0">100% SPAIN</span>
          <span className="text-text/80 truncate ml-1 text-right">{product.acidity}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 items-center text-center justify-between gap-1.5 sm:gap-2">
        <div className="w-full">
          <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-text leading-tight group-hover:text-goya-blue transition-colors font-serif line-clamp-2">
            {product.title}
          </h3>
          <div className="text-[11px] sm:text-xs text-text/75 font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </div>
          <div className="text-[10px] sm:text-[11px] text-text/60 mt-0.5 italic line-clamp-1">
            {product.tagline}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full mt-2 sm:mt-3 pt-2 border-t border-dashed border-text/20">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2 px-1">
            <span className="text-[10px] sm:text-xs font-tag text-text/70 uppercase">Price</span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {product.originalPrice && (
                <span className="text-[11px] sm:text-xs text-text/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="font-extrabold text-sm sm:text-base text-text">
                ${product.price}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`btn--std w-full !py-2 !px-1.5 sm:!px-3 !text-[11px] sm:!text-xs md:!text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-98 ${
              product.inStock ? "" : "opacity-60 cursor-not-allowed"
            }`}
          >
            {product.inStock ? (
              <>
                <Plus size={13} className="flex-shrink-0" />
                <span className="truncate">{isAdding ? "Added! ✓" : `Add • $${product.price}`}</span>
              </>
            ) : (
              <span>Sold Out</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
