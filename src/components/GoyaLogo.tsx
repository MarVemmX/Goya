import React from "react";

interface GoyaLogoProps {
  className?: string;
  variant?: "full" | "wordmark" | "bottle-label" | "crest-only";
  fillColor?: string;
  withUnderline?: boolean;
}

/**
 * Exact official vector path data for the GOYA® brand wordmark
 * Sourced directly from Goya's official brand vector identity
 */
export const GOYA_LETTER_PATHS = {
  G: "M30.74,57.61l.42-18.47c0-.98-.13-.71-.42-.19-2.46,3.85-7.29,12.08-7.29,12.08C10.32,49.96,0,38.97,0,25.56,0,11.44,11.44,0,25.56,0c6.2,0,11.89,2.21,16.32,5.89l-7.12,11.52c-2.25-2.54-5.54-4.14-9.19-4.14-6.79,0-12.29,5.5-12.29,12.29s5.5,12.29,12.29,12.29c2.04,0,3.96-.5,5.65-1.37l.03-.44.11-9.27,13.58-2.61-.53,30.93-13.66,2.52Z",
  O: "M74.37,0c-14.12,0-25.56,11.44-25.56,25.56s11.44,25.56,25.56,25.56,25.56-11.44,25.56-25.56S88.49,0,74.37,0ZM74.41,38.22c-6.99,0-12.66-5.67-12.66-12.66s5.67-12.66,12.66-12.66,12.66,5.67,12.66,12.66-5.67,12.66-12.66,12.66Z",
  Y: "M132.38,50.4v-11.56c.03-.12,10.68-2.62,13.75-15.57.66-3,.82-6.63.87-10.09l-.02-12.24h-14.02v16.68c0,8.47-7.6,8.43-7.6,8.43,0,0-7.69-.16-7.68-8.43V.93h-14.03l-.02,12.24c.05,3.45.22,7.08.87,10.09,3.07,12.96,13.73,15.46,13.75,15.57v11.56h14.09Z",
  A: "M195.41,19.92c-.56-8.03-6.18-15.71-14.27-18.51C178.5.4,176.03,0,173.29,0h-.03c-2.74,0-5.21.39-7.85,1.4-8.09,2.79-13.71,10.48-14.27,18.51-.45,2.59-.48,7.69-.48,7.69v22.79h13.39v-13.41h18.47v13.41h13.39v-22.79s-.03-5.1-.48-7.69ZM182.51,26.62h-18.47c0-5.32-.32-11,5.5-13.57,1.19-.6,2.46-.77,3.73-.8h0,0c1.27.03,2.54.2,3.73.8,5.82,2.56,5.5,8.24,5.5,13.57Z",
  R: "M198.47,46.01c0-1.94,1.58-3.37,3.44-3.37s3.42,1.43,3.42,3.37-1.58,3.39-3.42,3.39-3.44-1.43-3.44-3.39ZM201.91,48.84c1.53,0,2.74-1.2,2.74-2.83s-1.21-2.81-2.74-2.81-2.76,1.21-2.76,2.81,1.21,2.83,2.76,2.83ZM201.19,47.97h-.59v-3.9h1.49c.92,0,1.38.34,1.38,1.11,0,.7-.44,1-1.01,1.07l1.11,1.72h-.66l-1.03-1.69h-.68v1.69ZM201.9,45.78c.5,0,.95-.04.95-.64,0-.48-.44-.57-.85-.57h-.81v1.21h.71Z",
};

/**
 * Exact Don Sixto bottle emblem:
 * Founder portrait in top hat & bowtie, flanked by Spanish olive branches with green olives
 */
export const GoyaBottleCrest: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} flex-shrink-0 drop-shadow-sm`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer gold bottle medal ring */}
    <circle cx="50" cy="50" r="47" fill="#FFFDF9" stroke="#C49B24" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="43" fill="#FFFDF9" stroke="#2C2B22" strokeWidth="1" strokeDasharray="2 2" />

    {/* Olive branch left */}
    <path
      d="M24 72C20 60 22 45 32 34"
      stroke="#5A6836"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Olive leaves left */}
    <ellipse cx="23" cy="58" rx="5" ry="2.5" transform="rotate(-35 23 58)" fill="#7E9248" stroke="#2C2B22" strokeWidth="0.8" />
    <ellipse cx="21" cy="46" rx="5" ry="2.5" transform="rotate(-15 21 46)" fill="#8FA450" stroke="#2C2B22" strokeWidth="0.8" />
    <ellipse cx="27" cy="38" rx="5" ry="2.5" transform="rotate(15 27 38)" fill="#7E9248" stroke="#2C2B22" strokeWidth="0.8" />
    {/* Spanish Green Olives left */}
    <ellipse cx="26" cy="51" rx="4" ry="5.5" transform="rotate(-10 26 51)" fill="#A0B738" stroke="#2C2B22" strokeWidth="1" />
    <circle cx="25" cy="50" r="1.2" fill="#E5A93C" />

    {/* Olive branch right */}
    <path
      d="M76 72C80 60 78 45 68 34"
      stroke="#5A6836"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Olive leaves right */}
    <ellipse cx="77" cy="58" rx="5" ry="2.5" transform="rotate(35 77 58)" fill="#7E9248" stroke="#2C2B22" strokeWidth="0.8" />
    <ellipse cx="79" cy="46" rx="5" ry="2.5" transform="rotate(15 79 46)" fill="#8FA450" stroke="#2C2B22" strokeWidth="0.8" />
    <ellipse cx="73" cy="38" rx="5" ry="2.5" transform="rotate(-15 73 38)" fill="#7E9248" stroke="#2C2B22" strokeWidth="0.8" />
    {/* Spanish Green Olives right */}
    <ellipse cx="74" cy="51" rx="4" ry="5.5" transform="rotate(10 74 51)" fill="#A0B738" stroke="#2C2B22" strokeWidth="1" />
    <circle cx="75" cy="50" r="1.2" fill="#E5A93C" />

    {/* Center portrait oval frame */}
    <ellipse cx="50" cy="48" rx="20" ry="24" fill="#FFFFFF" stroke="#003296" strokeWidth="1.8" />

    {/* Don Sixto Portrait: Top Hat & Silhouette */}
    <g id="don-sixto" fill="#2C2B22">
      {/* Top Hat Brim */}
      <ellipse cx="50" cy="37" rx="14" ry="2.5" />
      {/* Top Hat Crown */}
      <path d="M40 36L41.5 22H58.5L60 36H40Z" />
      {/* Hat ribbon in Goya Blue */}
      <rect x="41" y="32" width="18" height="3" fill="#003296" />

      {/* Head / Profile silhouette */}
      <ellipse cx="50" cy="45" rx="7.5" ry="8" fill="#FFFDF9" stroke="#2C2B22" strokeWidth="1" />
      {/* Hair & moustache */}
      <path d="M46 47C47 48.5 50 49 54 48" stroke="#2C2B22" strokeWidth="1.2" strokeLinecap="round" />

      {/* Gentleman Suit Collar & Bowtie */}
      <path d="M41 57L46 51L50 54L54 51L59 57H41Z" fill="#003296" />
      {/* White shirt triangle */}
      <polygon points="48,51 52,51 50,55" fill="#FFFFFF" />
      {/* Bowtie */}
      <polygon points="47,52 50,53.5 47,55" fill="#C49B24" />
      <polygon points="53,52 50,53.5 53,55" fill="#C49B24" />
      <circle cx="50" cy="53.5" r="1" fill="#C49B24" />
    </g>

    {/* Little gold stars at top */}
    <circle cx="50" cy="14" r="2" fill="#C49B24" />
    <circle cx="43" cy="16" r="1.5" fill="#C49B24" />
    <circle cx="57" cy="16" r="1.5" fill="#C49B24" />
  </svg>
);

/**
 * Exact vector GOYA® wordmark using authentic brand geometry
 */
export const GoyaWordmark: React.FC<{
  className?: string;
  fillColor?: string;
  withUnderline?: boolean;
}> = ({ className = "h-8 w-auto", fillColor = "#003296", withUnderline = false }) => (
  <svg
    viewBox={withUnderline ? "0 0 206 72" : "0 0 206 58"}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="goya-official-wordmark">
      {/* Letter G */}
      <path fill={fillColor} d={GOYA_LETTER_PATHS.G} />
      {/* Letter O */}
      <path fill={fillColor} d={GOYA_LETTER_PATHS.O} />
      {/* Letter Y */}
      <path fill={fillColor} d={GOYA_LETTER_PATHS.Y} />
      {/* Letter A */}
      <path fill={fillColor} d={GOYA_LETTER_PATHS.A} />
      {/* Registered trademark symbol ® */}
      <path fill={fillColor} d={GOYA_LETTER_PATHS.R} />
      {/* Optional official gold underbar as seen on corporate bottle packaging */}
      {withUnderline && (
        <rect y="63.7" width="195.89" height="7.89" rx="1.5" fill="#C49B24" />
      )}
    </g>
  </svg>
);

export const GoyaLogo: React.FC<GoyaLogoProps> = ({
  className = "h-9",
  variant = "full",
  fillColor = "#003296",
  withUnderline = false,
}) => {
  if (variant === "wordmark") {
    return (
      <div className={`flex items-center ${className}`}>
        <GoyaWordmark className="h-full w-auto" fillColor={fillColor} withUnderline={withUnderline} />
      </div>
    );
  }

  if (variant === "crest-only") {
    return <GoyaBottleCrest className={className} />;
  }

  if (variant === "bottle-label") {
    return (
      <div className={`flex flex-col items-center select-none text-center ${className}`}>
        {/* Chefs Best gold award medal ribbon */}
        <div className="flex items-center gap-1.5 text-[10px] font-tag font-bold uppercase tracking-wider text-amber-700 bg-highlight px-2.5 py-0.5 rounded-full border border-amber-300 mb-2">
          <span>🏆</span>
          <span>Mario Solinas &amp; ChefsBest Gold</span>
        </div>

        {/* Exact GOYA wordmark */}
        <GoyaWordmark className="h-14 sm:h-18 md:h-22 w-auto drop-shadow-sm" fillColor={fillColor} withUnderline={withUnderline} />

        {/* Don Sixto bottle crest */}
        <div className="mt-3 flex items-center justify-center">
          <GoyaBottleCrest className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        {/* Bottle label subtitle */}
        <div className="mt-2 text-center">
          <span className="font-serif italic font-bold text-lg sm:text-2xl text-text block">
            Extra Virgin Olive Oil
          </span>
          <span className="font-tag text-xs tracking-widest uppercase text-text/80 block mt-0.5">
            FIRST COLD PRESS • MAXIMUM ACIDITY &lt; 0.4%
          </span>
          <span className="font-tag text-[11px] font-bold text-goya-blue uppercase block mt-1">
            Product of Andalusia, Spain
          </span>
        </div>
      </div>
    );
  }

  // Default "full" header variant: Don Sixto bottle crest + exact vector GOYA wordmark + Spain pill
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Don Sixto Bottle Emblem */}
      <GoyaBottleCrest className="h-full w-auto aspect-square" />

      {/* Authentic Vector GOYA Wordmark */}
      <div className="flex items-center h-full">
        <GoyaWordmark className="h-[75%] w-auto" fillColor={fillColor} withUnderline={withUnderline} />
        <span className="text-[10px] font-tag font-extrabold uppercase ml-2 px-1.5 py-0.5 rounded-full border border-text text-text bg-brand tracking-wider hidden sm:inline-block">
          España
        </span>
      </div>
    </div>
  );
};
