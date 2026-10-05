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
      className="group relative flex flex-col justify-between h-full bg-highlight/30 hover:bg-highlight/80 rounded-20 p-3 sm:p-4 border border-text/20 hover:border-text transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[3/4] rounded-16 overflow-hidden bg-background border border-text/10 mb-4">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-20 bg-brand text-text border border-text font-tag text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick View Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          aria-label="Quick View"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-highlight/90 border border-text flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand text-text"
        >
          <Eye size={15} />
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

        {/* Acidity Tag Pill on bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex justify-between items-center text-[10px] font-tag bg-highlight/90 backdrop-blur-xs py-1 px-2 rounded-lg border border-text/20">
          <span className="text-goya-blue font-bold">100% SPAIN</span>
          <span className="text-text/80">{product.acidity}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 items-center text-center justify-between gap-2">
        <div className="w-full">
          <h2 className="font-bold text-lg md:text-xl text-text leading-tight group-hover:text-goya-blue transition-colors font-serif">
            {product.title}
          </h2>
          <div className="text-xs text-text/75 font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </div>
          <div className="text-[11px] text-text/60 mt-1 italic line-clamp-1">
            {product.tagline}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full mt-3 pt-2 border-t border-dashed border-text/20">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-tag text-text/70 uppercase">Price</span>
            <div className="flex items-center gap-1.5">
              {product.originalPrice && (
                <span className="text-xs text-text/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="font-extrabold text-base text-text">
                ${product.price}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`btn--std w-full !py-2 !text-xs md:!text-sm uppercase tracking-wide flex items-center justify-center gap-2 ${
              product.inStock ? "" : "opacity-60 cursor-not-allowed"
            }`}
          >
            {product.inStock ? (
              <>
                <Plus size={14} />
                <span>{isAdding ? "Added! ✓" : `Add – $${product.price}`}</span>
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
