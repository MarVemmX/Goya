"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Droplets } from "lucide-react";
import { GoyaBottleCrest, GOYA_LETTER_PATHS } from "./GoyaLogo";
import { AndalusianSolGlint, SpanishGlintCluster } from "./icons/ArtisanalSparkles";

export const HeroSection: React.FC = () => {
  const { addToCart, isHeroVideoMuted } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [splashCount, setSplashCount] = useState(0);
  const [isBottleSqueezed, setIsBottleSqueezed] = useState(false);
  const [isLogoGolden, setIsLogoGolden] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const dropStageRef = useRef<HTMLDivElement>(null);
  const brandTargetRef = useRef<HTMLDivElement>(null);

  // Smooth lerp physics refs for buttery in-and-out easing
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const squeezeProduct = PRODUCTS[0]; // "El Squeeze" Finishing Oil
  const DROP_DISTANCE = 220; // Distance in pixels from spout mouth to logo surface
  const TOUCH_THRESHOLD = 0.72; // Progress threshold where droplet touches logo

  // Track scroll position with requestAnimationFrame damping for silky smooth fluid easing
  useEffect(() => {
    const handleScroll = () => {
      if (!brandTargetRef.current) return;
      const rect = brandTargetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When brand text enters lower viewport (88% of screen height)
      const startY = windowHeight * 0.88;
      // When brand text reaches prime center view (52% of screen height)
      const endY = windowHeight * 0.52;
      const currentY = rect.top;

      const raw = Math.min(Math.max((startY - currentY) / (startY - endY), 0), 1);
      targetProgressRef.current = raw;
    };

    // Smooth fluid motion loop with viscous damping
    const updateMotion = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0006) {
        currentProgressRef.current += diff * 0.18; // Smooth fluid damping factor
        setScrollProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
      }
      animFrameRef.current = requestAnimationFrame(updateMotion);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animFrameRef.current = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Split calculations:
  // - Before TOUCH_THRESHOLD: single whole droplet descends smoothly
  // - Touching & beyond (0.72 -> 1.0): splits into 5 smaller droplets that arc outward while main drop dissolves
  // - Scrolling backwards (1.0 -> 0.72): reverses continuous math, smoothly joining the 5 droplets back together!
  const isTouching = scrollProgress >= TOUCH_THRESHOLD;

  const dropTravelY = isTouching
    ? DROP_DISTANCE
    : Math.pow(scrollProgress / TOUCH_THRESHOLD, 1.15) * DROP_DISTANCE;

  const rawSplitT = isTouching
    ? Math.min(1, Math.max(0, (scrollProgress - TOUCH_THRESHOLD) / (1 - TOUCH_THRESHOLD)))
    : 0;

  // Smooth cubic ease-in-out for realistic liquid surface tension and splash momentum
  const splitT = rawSplitT < 0.5
    ? 4 * rawSplitT * rawSplitT * rawSplitT
    : 1 - Math.pow(-2 * rawSplitT + 2, 3) / 2;

  // Main droplet squashes on impact and fades out as smaller droplets burst forth
  const mainDropOpacity = isTouching
    ? Math.max(0, 1 - rawSplitT * 2.2)
    : 1;

  const mainDropScaleX = isTouching
    ? 1 + splitT * 1.1
    : scrollProgress === 0
    ? 0.7
    : 1 - scrollProgress * 0.08;

  const mainDropScaleY = isTouching
    ? Math.max(0.08, 1 - splitT * 0.92)
    : scrollProgress === 0
    ? 0.6
    : 1 + scrollProgress * 0.28;

  // 5 distinct organic mini droplets with parabolic bounce arcs
  const MINI_DROPLETS = [
    { id: "mini-1", targetX: -36, targetY: -26, arcHeight: -22, size: 14, rot: -28 },
    { id: "mini-2", targetX: 38, targetY: -28, arcHeight: -24, size: 15, rot: 28 },
    { id: "mini-3", targetX: -54, targetY: -10, arcHeight: -12, size: 11, rot: -45 },
    { id: "mini-4", targetX: 56, targetY: -8, arcHeight: -14, size: 12, rot: 45 },
    { id: "mini-5", targetX: 2, targetY: -42, arcHeight: -28, size: 13, rot: 0 },
  ];

  const isInitialMount = useRef(true);
  const hasLandedRef = useRef(false);
  const wiggleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger tactile wiggle effect on landing
  const triggerWiggle = useCallback(() => {
    if (wiggleTimeoutRef.current) clearTimeout(wiggleTimeoutRef.current);
    setIsWiggling(false);
    requestAnimationFrame(() => {
      setIsWiggling(true);
      setSplashCount((prev) => prev + 1);
      wiggleTimeoutRef.current = setTimeout(() => {
        setIsWiggling(false);
      }, 950);
    });
  }, []);

  // Dynamically update golden logo state and trigger logo bounce on scroll impact
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (rawSplitT >= 0.15) {
        hasLandedRef.current = true;
        setIsLogoGolden(true);
      }
      return;
    }

    if (rawSplitT >= 0.15) {
      setIsLogoGolden(true);
      if (!hasLandedRef.current) {
        hasLandedRef.current = true;
        triggerWiggle();
      }
    } else {
      setIsLogoGolden(false);
      if (rawSplitT < 0.08) {
        hasLandedRef.current = false;
      }
    }
  }, [rawSplitT, triggerWiggle]);

  // Manual interactive squeeze trigger (smoothly animates drop descent, split, and logo transformation)
  const handleManualSqueeze = () => {
    setIsBottleSqueezed(true);
    setTimeout(() => setIsBottleSqueezed(false), 500);

    if (brandTargetRef.current) {
      brandTargetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const startProg = currentProgressRef.current > 0.85 ? 0 : currentProgressRef.current;
    const startTime = performance.now();
    const duration = 1200; // ms

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth easeInOutCubic
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const nextVal = startProg + (1 - startProg) * easedT;

      targetProgressRef.current = nextVal;
      currentProgressRef.current = nextVal;
      setScrollProgress(nextVal);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        triggerWiggle();
      }
    };

    requestAnimationFrame(animate);
  };

  // Sync video audio with global mute state from navbar sound toggle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isHeroVideoMuted;
    }
  }, [isHeroVideoMuted]);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-background">
      {/* Full-Bleed Cinematic Hero Video Stage (Covers Entire Screen) */}
      <div className="relative w-full h-screen h-[100dvh] min-h-[640px] overflow-hidden border-b-2 border-text shadow-graza-lg bg-text">
        {/* Autoplaying Looping High-Energy Cooking Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-video-poster.jpg"
        >
          <source src="/images/hero-video-compressed.mp4" type="video/mp4" />
        </video>

        {/* Film Gradient Scrim: Deep warm shadow at bottom for high text contrast + subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-text/95 via-text/30 to-text/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(44,43,34,0.45)_100%)] pointer-events-none" />
        {/* Top Scrim for crisp navbar contrast over bright video frames */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-text/90 via-text/40 to-transparent pointer-events-none z-10" />

        {/* BOTTOM-LEFT: Persistent Text Headline & Story (Mobile Responsive Stacking) */}
        <div className="absolute bottom-20 xs:bottom-24 left-3.5 right-3.5 xs:left-4 xs:right-4 sm:bottom-8 sm:left-8 sm:right-auto md:bottom-10 md:left-10 lg:bottom-12 lg:left-12 z-20 sm:max-w-xl text-left space-y-1.5 xs:space-y-2 sm:space-y-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-highlight leading-[1.08] tracking-tight drop-shadow-md">
            Olive oil made for cooking,{" "}
            <span className="italic font-normal underline decoration-brand decoration-wavy decoration-3 text-brand">
              not looking.
            </span>
          </h1>

          <p className="text-[11px] xs:text-xs sm:text-base text-highlight/90 leading-relaxed font-normal max-w-lg drop-shadow-sm line-clamp-2 sm:line-clamp-none">
            Never blended with old refined oil. Fresh, single-estate Spanish Extra Virgin in a non-drip squeeze bottle built for generous countertop glugs.
          </p>

          <div className="pt-0.5 sm:pt-1 flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => addToCart(squeezeProduct, 1)}
              className="btn--std !py-2 !px-3.5 xs:!py-2.5 xs:!px-4 sm:!py-3 sm:!px-7 text-xs sm:text-sm uppercase tracking-wider font-extrabold shadow-graza hover:scale-102"
            >
              <span>Get “El Squeeze” – $18</span>
            </button>
          </div>
        </div>

        {/* BOTTOM-RIGHT: Click Me Bottle Card in Liquid Glass (Mobile Compact) */}
        <div
          onClick={handleManualSqueeze}
          title="Click to Pour!"
          className={`absolute bottom-3 right-3 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 z-20 bg-black/40 backdrop-blur-2xl p-1.5 xs:p-2 sm:p-4 rounded-14 xs:rounded-16 sm:rounded-28 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] cursor-pointer group hover:bg-white/15 hover:border-white/50 hover:scale-105 active:scale-95 transition-all max-w-[130px] xs:max-w-[145px] sm:max-w-none select-none ${
            isBottleSqueezed ? "animate-bottle-squeeze" : ""
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3.5">
            <div className="relative w-8 h-10 sm:w-12 sm:h-14 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/goya-bottle-thumb.png"
                alt="Goya Olive Oil Bottle"
                fill
                className="object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <span className="font-tag text-[8px] sm:text-[9.5px] font-extrabold text-brand uppercase tracking-wider block drop-shadow-xs">
                Interactive
              </span>
              <span className="font-serif font-bold text-xs sm:text-base text-white block leading-tight drop-shadow-sm mt-0.5">
                Pour Me!
              </span>
              <span className="font-tag text-[8px] sm:text-[10px] text-white/80 block tracking-wide mt-0.5 drop-shadow-xs">
                Tap or Scroll ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DROP TRACK & WIGGLY BRAND SECTION (CLEAN, IN-VIEWPORT DESIGN) */}
      {/* ============================================================ */}
      <div
        ref={dropStageRef}
        className="relative w-full border-t border-dashed border-text bg-background pt-8 pb-16"
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center relative">
          {/* Actual Goya Bottle Source */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Guide Badge Placed Above Bottle so nothing sits between spout and droplet */}
            <div
              onClick={handleManualSqueeze}
              title="Click to pour olive oil and watch droplet land on logo!"
              className="flex flex-col items-center gap-1.5 mb-2 cursor-pointer group active:scale-95 transition-transform"
            >
              {/* Removed pill per user request: GOYA® EXTRA VIRGIN OLIVE OIL • SEVILLE, SPAIN */}
              <span className="font-tag text-[10px] text-text/75 uppercase tracking-widest group-hover:text-text transition-colors">
                Click bottle or scroll to pour oil ↓
              </span>
            </div>

            {/* The Actual Goya Olive Oil Glass Bottle (Spout centered at 50% and anchored at bottom) */}
            <div
              onClick={handleManualSqueeze}
              title="Click Goya bottle to pour olive oil!"
              className={`cursor-pointer transition-transform duration-500 select-none ${
                isBottleSqueezed ? "-rotate-6 scale-105 translate-y-1" : "hover:-rotate-2 hover:scale-102"
              }`}
            >
              <div className="relative w-64 h-[143px] xs:w-72 xs:h-[161px] sm:w-80 sm:h-[179px] md:w-96 md:h-[215px] max-w-[calc(100vw-2rem)] filter drop-shadow-xl hover:drop-shadow-2xl transition-all">
                <Image
                  src="/images/goya-bottle-clean-spout.png"
                  alt="Authentic Goya Extra Virgin Olive Oil Bottle Pouring"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Traveling Droplet Track (220px) - Starts DIRECTLY at the mouth of the bottle spout */}
          <div className="relative w-24 h-[220px] flex items-start justify-center pointer-events-none -mt-1.5 z-20">
            {/* The Main Dynamic Oil Droplet - Emerges directly out of the bottle spout, squashes & fades on split */}
            <div
              className="absolute top-0 left-1/2 z-20 pointer-events-none"
              style={{
                transform: `translate(-50%, ${dropTravelY}px) scale(${mainDropScaleX}, ${mainDropScaleY})`,
                transformOrigin: "center top",
                opacity: mainDropOpacity,
                willChange: "transform, opacity",
              }}
            >
              {/* Organic Liquid Droplet SVG with glossy specular reflection */}
              <svg
                width="36"
                height="48"
                viewBox="0 0 34 44"
                fill="none"
                className="filter drop-shadow-md"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Golden-amber olive oil gradient */}
                  <linearGradient id="oilGradient" x1="17" y1="0" x2="17" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="35%" stopColor="#F5B82E" />
                    <stop offset="75%" stopColor="#E5A93C" />
                    <stop offset="100%" stopColor="#B37812" />
                  </linearGradient>
                  {/* Glossy highlight reflection */}
                  <linearGradient id="oilGloss" x1="10" y1="8" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Droplet Body: Tear shape */}
                <path
                  d="M17 0.5C17 0.5 2 19 2 28.5C2 36.5 8.7 43 17 43C25.3 43 32 36.5 32 28.5C32 19 17 0.5 17 0.5Z"
                  fill="url(#oilGradient)"
                  stroke="#2C2B22"
                  strokeWidth="1.8"
                />

                {/* Specular White Highlight Curve */}
                <path
                  d="M10 14C8 19 7 24 8 28C9 32 11 34 11 34"
                  stroke="url(#oilGloss)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="21" cy="30" r="1.5" fill="#FFFFFF" fillOpacity="0.7" />
              </svg>
            </div>

            {/* The 5 Smaller Golden Droplets: Scatter outward along parabolic arcs on touch, join back when scrolling back */}
            {MINI_DROPLETS.map((drop) => {
              const currentX = drop.targetX * splitT;
              const parabolicArc = 4 * drop.arcHeight * splitT * (1 - splitT);
              const currentY = DROP_DISTANCE + drop.targetY * splitT + parabolicArc;

              const dropScale = rawSplitT < 0.25
                ? (rawSplitT / 0.25)
                : Math.max(0.2, 1 - (rawSplitT - 0.25) * 0.4);

              const dropOpacity = rawSplitT < 0.1
                ? (rawSplitT / 0.1)
                : rawSplitT > 0.78
                ? Math.max(0, 1 - (rawSplitT - 0.78) / 0.22)
                : 1;

              const currentRotation = drop.rot * splitT;

              return (
                <div
                  key={drop.id}
                  className="absolute top-0 left-1/2 pointer-events-none z-30"
                  style={{
                    transform: `translate(calc(-50% + ${currentX}px), ${currentY}px) rotate(${currentRotation}deg) scale(${dropScale})`,
                    transformOrigin: "center center",
                    opacity: isTouching ? dropOpacity : 0,
                    willChange: "transform, opacity",
                  }}
                >
                  <svg
                    width={drop.size}
                    height={Math.round(drop.size * 1.25)}
                    viewBox="0 0 20 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter drop-shadow-sm"
                  >
                    <defs>
                      <linearGradient id={`miniDropGrad-${drop.id}`} x1="10" y1="0" x2="10" y2="25" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFE082" />
                        <stop offset="35%" stopColor="#F5B82E" />
                        <stop offset="75%" stopColor="#E5A93C" />
                        <stop offset="100%" stopColor="#B37812" />
                      </linearGradient>
                    </defs>

                    {/* Mini organic droplet body */}
                    <path
                      d="M10 0.5C10 0.5 1.5 11 1.5 16.5C1.5 21.2 5.3 25 10 25C14.7 25 18.5 21.2 18.5 16.5C18.5 11 10 0.5 10 0.5Z"
                      fill={`url(#miniDropGrad-${drop.id})`}
                      stroke="#2C2B22"
                      strokeWidth="1.2"
                    />

                    {/* Specular White Gloss highlight curve */}
                    <path
                      d="M6 9C5 12 4.5 15 5.5 18"
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeOpacity="0.85"
                    />
                    <circle cx="12" cy="19" r="1.2" fill="#FFFFFF" fillOpacity="0.75" />
                  </svg>
                </div>
              );
            })}

            {/* Ripple Waves on Impact */}
            {rawSplitT > 0.15 && (
              <div
                className="absolute bottom-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                style={{ opacity: Math.max(0, 1 - (rawSplitT - 0.75) / 0.25) }}
              >
                {/* Ripple ring 1 */}
                <div
                  className="w-24 h-12 rounded-full border-2 border-[#E5A93C] bg-[#E5A93C]/25 transition-transform"
                  style={{ transform: `scale(${1 + splitT * 0.8})` }}
                />
                {/* Ripple ring 2 */}
                <div
                  className="absolute w-32 h-16 rounded-full border border-[#DDA31A] transition-transform"
                  style={{ transform: `scale(${0.8 + splitT * 1.1})` }}
                />
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* THE BRAND TARGET: GOYA WITH LIQUID WIGGLY EFFECT */}
          {/* ============================================================ */}
          <div
            id="brand-drop-target"
            ref={brandTargetRef}
            onClick={() => {
              triggerWiggle();
              setIsLogoGolden((prev) => !prev);
            }}
            title="Click to toggle Liquid Gold on the logo!"
            className="relative cursor-pointer select-none group mt-1 pt-1 scroll-mt-28"
          >
            {/* Impact Ripple pool under letters */}
            <div
              className={`absolute -inset-8 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
                isLogoGolden
                  ? "bg-secondary/60 scale-110 opacity-100"
                  : "bg-brand/30 opacity-60 group-hover:opacity-100"
              }`}
            />

            {/* Impact Notification Pill - Commented out per user request */}
            {/*
            {isLogoGolden && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-secondary text-text text-[11px] font-tag font-bold px-4 py-1.5 rounded-full shadow-graza border-2 border-text animate-bounce flex items-center gap-2 z-30">
                <AndalusianSolGlint size={15} color="#2C2B22" secondaryColor="#E5A93C" />
                <span>LIQUID GOLD ACTIVATED • 100% ANDALUSIAN OIL</span>
              </div>
            )}
            */}

            {/* The Brand Letters that do the WIGGLY deformation - Exact Brand Logo as seen on the Goya Bottle */}
            <div
              className={`relative inline-block transition-transform ${
                isWiggling ? "animate-oil-wiggle" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center relative">
                {/* Floating Artisanal Spanish Glints (Custom Icon Pack) */}
                {isLogoGolden && <SpanishGlintCluster />}

                {/* Vector GOYA® Brand Logo with Liquid Gold Gradient & Sheen */}
                <svg
                  viewBox="0 0 206 58"
                  className={`w-64 sm:w-96 md:w-[460px] lg:w-[540px] max-w-[calc(100vw-2.5rem)] h-auto transition-all duration-700 ${
                    isLogoGolden
                      ? "filter drop-shadow-[0_10px_25px_rgba(221,163,26,0.65)] scale-[1.02]"
                      : "drop-shadow-md text-[#003296]"
                  }`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Rich Andalusian Liquid Gold Gradient matching the oil droplet */}
                    <linearGradient id="goyaLiquidGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="25%" stopColor="#F5B82E" />
                      <stop offset="55%" stopColor="#E5A93C" />
                      <stop offset="85%" stopColor="#DDA31A" />
                      <stop offset="100%" stopColor="#8A6B0A" />
                    </linearGradient>

                    {/* Specular Liquid Gloss Sheen */}
                    <linearGradient id="goyaLiquidGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                      <stop offset="30%" stopColor="#FFF9D2" stopOpacity="0.3" />
                      <stop offset="70%" stopColor="#DDA31A" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#5E4306" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Base Logo Paths (Blue by default, transforms to Liquid Gold on droplet impact) */}
                  <g className="transition-all duration-700 ease-out">
                    <path
                      d={GOYA_LETTER_PATHS.G}
                      fill={isLogoGolden ? "url(#goyaLiquidGold)" : "#003296"}
                      stroke={isLogoGolden ? "#8A6B0A" : "none"}
                      strokeWidth={isLogoGolden ? "0.6" : "0"}
                      style={{ fill: isLogoGolden ? "url(#goyaLiquidGold)" : "#003296" }}
                      className="transition-all duration-700 ease-out"
                    />
                    <path
                      d={GOYA_LETTER_PATHS.O}
                      fill={isLogoGolden ? "url(#goyaLiquidGold)" : "#003296"}
                      stroke={isLogoGolden ? "#8A6B0A" : "none"}
                      strokeWidth={isLogoGolden ? "0.6" : "0"}
                      style={{ fill: isLogoGolden ? "url(#goyaLiquidGold)" : "#003296" }}
                      className="transition-all duration-700 ease-out"
                    />
                    <path
                      d={GOYA_LETTER_PATHS.Y}
                      fill={isLogoGolden ? "url(#goyaLiquidGold)" : "#003296"}
                      stroke={isLogoGolden ? "#8A6B0A" : "none"}
                      strokeWidth={isLogoGolden ? "0.6" : "0"}
                      style={{ fill: isLogoGolden ? "url(#goyaLiquidGold)" : "#003296" }}
                      className="transition-all duration-700 ease-out"
                    />
                    <path
                      d={GOYA_LETTER_PATHS.A}
                      fill={isLogoGolden ? "url(#goyaLiquidGold)" : "#003296"}
                      stroke={isLogoGolden ? "#8A6B0A" : "none"}
                      strokeWidth={isLogoGolden ? "0.6" : "0"}
                      style={{ fill: isLogoGolden ? "url(#goyaLiquidGold)" : "#003296" }}
                      className="transition-all duration-700 ease-out"
                    />
                    <path
                      d={GOYA_LETTER_PATHS.R}
                      fill={isLogoGolden ? "url(#goyaLiquidGold)" : "#003296"}
                      stroke={isLogoGolden ? "#8A6B0A" : "none"}
                      strokeWidth={isLogoGolden ? "0.3" : "0"}
                      style={{ fill: isLogoGolden ? "url(#goyaLiquidGold)" : "#003296" }}
                      className="transition-all duration-700 ease-out"
                    />
                  </g>

                  {/* Specular Liquid Gloss Reflection Overlay */}
                  <g
                    className={`transition-opacity duration-700 pointer-events-none ${
                      isLogoGolden ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <path d={GOYA_LETTER_PATHS.G} fill="url(#goyaLiquidGloss)" />
                    <path d={GOYA_LETTER_PATHS.O} fill="url(#goyaLiquidGloss)" />
                    <path d={GOYA_LETTER_PATHS.Y} fill="url(#goyaLiquidGloss)" />
                    <path d={GOYA_LETTER_PATHS.A} fill="url(#goyaLiquidGloss)" />
                    <path d={GOYA_LETTER_PATHS.R} fill="url(#goyaLiquidGloss)" />
                  </g>
                </svg>

                {/* Don Sixto bottle emblem flanked by olive branches - exact bottle label crest */}
                <div className="mt-3 flex items-center justify-center gap-3">
                  <div
                    className={`h-0.5 transition-all duration-700 ${
                      isLogoGolden
                        ? "w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#FBD535] to-[#DDA31A]"
                        : "w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C49B24]"
                    }`}
                  />
                  <GoyaBottleCrest
                    className={`w-12 h-12 sm:w-14 sm:h-14 transition-all duration-700 ${
                      isLogoGolden
                        ? "scale-110 filter drop-shadow-[0_0_12px_rgba(251,213,53,0.85)]"
                        : ""
                    }`}
                  />
                  <div
                    className={`h-0.5 transition-all duration-700 ${
                      isLogoGolden
                        ? "w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#FBD535] to-[#DDA31A]"
                        : "w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C49B24]"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Under-title with vintage Spanish seal (Mobile responsive text & wrap) */}
            <div className="mt-3 flex flex-col items-center text-center px-2">
              <span className="font-serif italic text-base sm:text-xl md:text-2xl text-text/80 leading-tight">
                Aceite de Oliva Virgen Extra • Primera Presión en Frío
              </span>
              <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-tag bg-highlight px-3 py-1 rounded-full border border-text/30">
                <span>Direct From Andalusia</span>
                <span>•</span>
                <span className="text-goya-blue font-bold">100% Spanish Harvest</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Zero Seed Oils</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
