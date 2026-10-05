"use client";

import React from "react";

interface GlintProps {
  className?: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
}

/**
 * 1. Andalusian Sunburst Glint:
 * Inspired by vintage Seville tilework & Southern Spain's blazing sun.
 * 8-pointed star with alternating long tapered spear rays and short diamond facets.
 */
export const AndalusianSolGlint: React.FC<GlintProps> = ({
  className = "",
  size = 24,
  color = "#DDA31A",
  secondaryColor = "#F5B82E",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
  >
    {/* Central warm glow disk */}
    <circle cx="12" cy="12" r="3.2" fill={secondaryColor} />
    {/* 4 Cardinal primary tapered rays */}
    <path
      d="M12 1L13.4 9.2L12 11.2L10.6 9.2L12 1Z"
      fill={color}
    />
    <path
      d="M12 23L10.6 14.8L12 12.8L13.4 14.8L12 23Z"
      fill={color}
    />
    <path
      d="M1 12L9.2 10.6L11.2 12L9.2 13.4L1 12Z"
      fill={color}
    />
    <path
      d="M23 12L14.8 13.4L12.8 12L14.8 10.6L23 12Z"
      fill={color}
    />
    {/* 4 Diagonal secondary diamond rays */}
    <path
      d="M4.2 4.2L8.8 8.8L7.8 10.2L6.8 9.2L4.2 4.2Z"
      fill={secondaryColor}
    />
    <path
      d="M19.8 19.8L15.2 15.2L16.2 13.8L17.2 14.8L19.8 19.8Z"
      fill={secondaryColor}
    />
    <path
      d="M19.8 4.2L14.8 6.8L13.8 7.8L15.2 8.8L19.8 4.2Z"
      fill={secondaryColor}
    />
    <path
      d="M4.2 19.8L9.2 17.2L10.2 16.2L8.8 15.2L4.2 19.8Z"
      fill={secondaryColor}
    />
    {/* Center highlight core */}
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

/**
 * 2. Liquid Gold Specular Droplet Glint:
 * Reflects sunlight bouncing off a glistening pool of cold-pressed Andalusian olive oil.
 * Sculpted with concave parabolic arcs and a radiant specular bead.
 */
export const LiquidGoldGlint: React.FC<GlintProps> = ({
  className = "",
  size = 24,
  color = "#E5A93C",
  secondaryColor = "#F5B82E",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
  >
    {/* Organic curved droplet star */}
    <path
      d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z"
      fill={color}
      stroke="#2C2B22"
      strokeWidth="0.8"
    />
    {/* Inner fluid refraction layer */}
    <path
      d="M12 5.5C12 9.09 14.91 12 18.5 12C14.91 12 12 14.91 12 18.5C12 14.91 9.09 12 5.5 12C9.09 12 12 9.09 12 5.5Z"
      fill={secondaryColor}
    />
    {/* White specular reflection glint */}
    <ellipse cx="10.5" cy="10.5" rx="2" ry="1.2" transform="rotate(-30 10.5 10.5)" fill="#FFFFFF" />
  </svg>
);

/**
 * 3. Olive Blossom Flora Glint:
 * Modeled after the delicate 4-petaled white/gold blossoms of Spain's Picual olive tree.
 */
export const OliveBlossomGlint: React.FC<GlintProps> = ({
  className = "",
  size = 24,
  color = "#DDA31A",
  secondaryColor = "#F5B82E",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
  >
    {/* 4 Petals with rounded organic tips */}
    <path
      d="M12 12C10.5 7 10 3 12 2C14 3 13.5 7 12 12Z"
      fill={secondaryColor}
      stroke="#2C2B22"
      strokeWidth="0.6"
    />
    <path
      d="M12 12C10.5 17 10 21 12 22C14 21 13.5 17 12 12Z"
      fill={secondaryColor}
      stroke="#2C2B22"
      strokeWidth="0.6"
    />
    <path
      d="M12 12C7 10.5 3 10 2 12C3 14 7 13.5 12 12Z"
      fill={secondaryColor}
      stroke="#2C2B22"
      strokeWidth="0.6"
    />
    <path
      d="M12 12C17 10.5 21 10 22 12C21 14 17 13.5 12 12Z"
      fill={secondaryColor}
      stroke="#2C2B22"
      strokeWidth="0.6"
    />
    {/* Golden pollen center */}
    <circle cx="12" cy="12" r="3.2" fill={color} stroke="#2C2B22" strokeWidth="0.7" />
    <circle cx="12" cy="12" r="1.4" fill="#FFFFFF" />
  </svg>
);

/**
 * 4. Artisanal Hand-Drawn Inked Star:
 * Authentic to Graza's playful, hand-drawn brutalist sketch aesthetic.
 * Expressive slightly asymmetrical hand-inked cross with organic ink drops.
 */
export const HandDrawnGlint: React.FC<GlintProps> = ({
  className = "",
  size = 24,
  color = "#2C2B22",
  secondaryColor = "#E5A93C",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
  >
    {/* Hand-drawn vertical brushstroke */}
    <path
      d="M11.8 1.5C11.5 6 11.2 9.5 11.8 12C12.4 14.5 12.1 18 11.7 22.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Hand-drawn horizontal brushstroke */}
    <path
      d="M1.5 11.6C6.2 12.1 9.8 11.8 12 12.2C14.2 12.6 17.8 12.1 22.5 11.8"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Subtle hand-drawn diagonal accents */}
    <path
      d="M5.5 5.5L8.5 8.5"
      stroke={secondaryColor}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18.5 18.5L15.5 15.5"
      stroke={secondaryColor}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18.5 5.5L15.5 8.5"
      stroke={secondaryColor}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M5.5 18.5L8.5 15.5"
      stroke={secondaryColor}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 5. Spanish Gold Medal Heraldic Star:
 * Inspired by the gold medals stamped on vintage Spanish olive oil tins (Mario Solinas & Jaén Gold).
 */
export const HeraldicStarGlint: React.FC<GlintProps> = ({
  className = "",
  size = 24,
  color = "#C49B24",
  secondaryColor = "#FFFDF9",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
  >
    {/* Faceted 8-point geometric star */}
    <polygon
      points="12,2 14.4,7.8 20.2,5.6 18,11.4 23.8,13.8 18,16.2 20.2,22 14.4,19.8 12,25.6 9.6,19.8 3.8,22 6,16.2 0.2,13.8 6,11.4 3.8,5.6 9.6,7.8"
      fill={color}
      stroke="#2C2B22"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="13.8" r="4.2" fill={secondaryColor} stroke="#2C2B22" strokeWidth="0.8" />
    <circle cx="12" cy="13.8" r="1.8" fill={color} />
  </svg>
);

/**
 * Cluster of 4 diverse artisanal Spanish sparkles for floating around logos, banners, or meal cards
 */
export const SpanishGlintCluster: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none ${className}`}>
    {/* Top left: Andalusian Sol */}
    <span className="absolute -top-5 -left-7 animate-pulse">
      <AndalusianSolGlint size={26} color="#DDA31A" secondaryColor="#F5B82E" />
    </span>
    {/* Top right: Liquid gold specular gleam */}
    <span className="absolute -top-6 -right-7 animate-pulse" style={{ animationDelay: "0.25s" }}>
      <LiquidGoldGlint size={24} color="#E5A93C" secondaryColor="#F5B82E" />
    </span>
    {/* Bottom left: Hand-drawn botanical blossom */}
    <span className="absolute -bottom-3 -left-8 animate-pulse" style={{ animationDelay: "0.5s" }}>
      <OliveBlossomGlint size={22} color="#DDA31A" secondaryColor="#F5B82E" />
    </span>
    {/* Bottom right: Artisanal sunburst */}
    <span className="absolute -bottom-4 -right-9 animate-pulse" style={{ animationDelay: "0.75s" }}>
      <AndalusianSolGlint size={24} color="#F5B82E" secondaryColor="#FFFFFF" />
    </span>
  </div>
);
