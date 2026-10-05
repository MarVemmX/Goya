"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS } from "@/data/products";
import confetti from "canvas-confetti";

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
  frequency?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isSubscription?: boolean, frequency?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMotionPaused: boolean;
  setIsMotionPaused: (paused: boolean) => void;
  subtotal: number;
  totalItems: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  hasFreeShipping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("goya_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedMotion = localStorage.getItem("goya_pause_motion");
      if (savedMotion === "true") {
        setIsMotionPaused(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("goya_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, isSubscription: boolean = false, frequency: string = "Every 1 Month") => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.isSubscription === isSubscription);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isSubscription, frequency }];
    });

    setIsCartOpen(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#E5A93C", "#2C2B22", "#004B97", "#F5B82E"],
      });
    } catch {
      // ignore
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 50;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isSearchOpen,
        setIsSearchOpen,
        isMotionPaused,
        setIsMotionPaused,
        subtotal,
        totalItems,
        freeShippingThreshold,
        amountUntilFreeShipping,
        hasFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
