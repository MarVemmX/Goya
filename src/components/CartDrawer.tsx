"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { X, Trash2, ArrowRight } from "lucide-react";
import { AndalusianSolGlint } from "./icons/ArtisanalSparkles";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    amountUntilFreeShipping,
    hasFreeShipping,
    freeShippingThreshold,
    addToCart,
  } = useCart();

  // Prevent body scroll when cart is open
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  // Upsell suggestion: pick an item not currently in cart
  const upsell = PRODUCTS.find(
    (p) => !cart.some((item) => item.product.id === p.id)
  ) || PRODUCTS[0];

  const shippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-full sm:max-w-md bg-highlight text-text border-l-2 border-text flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex-shrink-0 h-14 sm:h-16 px-4 sm:px-6 bg-brand border-b border-text flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 font-serif">
              <span>Cart</span>
              <span className="font-typewriter text-xs bg-text text-highlight px-2 py-0.5 rounded-full">
                ({totalItems})
              </span>
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="font-tag text-xs font-bold uppercase tracking-wider hover:underline p-1 cursor-pointer"
              aria-label="Close cart"
            >
              Close [×]
            </button>
          </div>

          {/* Free Shipping Progress Tracker */}
          <div className="p-4 bg-background border-b border-dashed border-text/30">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              {hasFreeShipping ? (
                <span className="text-goya-blue font-bold flex items-center gap-1.5">
                  <AndalusianSolGlint size={15} color="#004B97" secondaryColor="#FBD535" /> Free Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-goya-blue font-mono">${amountUntilFreeShipping.toFixed(2)}</strong> for Free Shipping
                </span>
              )}
              <span className="font-tag text-[10px] text-text/60">
                ${freeShippingThreshold} Goal
              </span>
            </div>
            <div className="w-full h-2.5 bg-highlight rounded-full border border-text/30 overflow-hidden">
              <div
                className="h-full bg-brand transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Main Cart Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              /* Goya Empty Cart Mascot State */
              <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                <div className="relative w-48 h-36 mb-6">
                  <Image
                    src="/images/goya-mascot.svg"
                    alt="Don Sixto olive mascot in cart"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Your cart is feeling a little light
                </h3>
                <p className="text-sm text-text/80 mb-6 max-w-xs">
                  Your kitchen is crying out for authentic Andalusian Extra Virgin Olive Oil. Let's fix that.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn--std w-full max-w-xs"
                >
                  Shop Olive Oil
                </button>
              </div>
            ) : (
              /* Active Cart Items */
              <div className="divide-y divide-dashed divide-text/20">
                {cart.map((item) => {
                  const unitPrice = item.isSubscription
                    ? item.product.price * 0.85
                    : item.product.price;

                  return (
                    <div
                      key={item.product.id + (item.isSubscription ? "-sub" : "")}
                      className="py-4 flex gap-4 items-start"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 rounded-10 border border-text/20 bg-background overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm leading-tight line-clamp-1 font-serif">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-text/50 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-xs text-text/70 mt-0.5 line-clamp-1">
                          {item.product.subtitle}
                        </p>

                        {item.isSubscription && (
                          <span className="inline-block mt-1 font-tag text-[10px] font-bold text-goya-blue bg-brand px-2 py-0.2 rounded-full border border-text/30">
                            Subscribed ({item.frequency || "Every 1 Mo"})
                          </span>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-text rounded-full bg-background overflow-hidden h-7">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="px-2.5 py-0.5 hover:bg-brand transition-colors text-xs font-bold"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold font-typewriter">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="px-2.5 py-0.5 hover:bg-brand transition-colors text-xs font-bold"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-sm">
                              ${(unitPrice * item.quantity).toFixed(2)}
                            </span>
                            {item.isSubscription && (
                              <span className="block text-[10px] text-text/50 line-through">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* In-Cart Upsell recommendation */}
            {cart.length > 0 && upsell && (
              <div className="mt-6 p-3 bg-brand/30 rounded-16 border border-dashed border-text/40">
                <span className="font-tag text-[10px] font-bold uppercase tracking-wider block mb-2 text-text/80">
                  ⚡ Frequently Glugged Together:
                </span>
                <div className="flex items-center justify-between gap-3">
                  <div className="relative w-12 h-12 rounded-8 bg-background border border-text/20 overflow-hidden flex-shrink-0">
                    <Image
                      src={upsell.image}
                      alt={upsell.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs line-clamp-1">{upsell.title}</h5>
                    <span className="text-xs font-extrabold">${upsell.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(upsell, 1)}
                    className="btn--std !py-1 !px-3 !text-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-background border-t-2 border-text flex-shrink-0 space-y-2.5 sm:space-y-3">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-lg font-serif">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-text/60 leading-tight">
                Taxes and shipping calculated at checkout. Free shipping on all orders $50+.
              </p>

              <button
                onClick={() => {
                  alert(
                    `¡Muchas gracias! Demo checkout initiated for ${totalItems} items. Subtotal: $${subtotal.toFixed(
                      2
                    )}`
                  );
                }}
                className="btn--std w-full !py-3.5 text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-graza hover:shadow-graza-hover"
              >
                <span>Checkout Now – ${subtotal.toFixed(2)}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
