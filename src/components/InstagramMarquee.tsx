"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const InstagramMarquee: React.FC = () => {
  const images = [
    "/images/social/tavolettihires11_200x.jpg",
    "/images/social/ce20c6df-564d-48cb-b9d0-cc9e5566d282_200x.jpg",
    "/images/social/Screen_Shot_2024-05-06_at_11.44.17_PM_200x.png",
    "/images/social/IMG_8501_200x.jpg",
    "/images/social/275968465_1208194362921591_8651807219107918255_n_200x.jpg",
    "/images/social/IMG_1676_200x.png",
    "/images/social/Screen_Shot_2024-05-06_at_11.46.14_PM_200x.png",
    "/images/social/IMG_0345_200x.jpg",
    "/images/social/332723317_570363518375153_8177201896556234020_n_200x.jpg",
    "/images/social/Round_2_7_1_200x.jpg",
    "/images/social/284618073_555491236097187_7124143949317527678_n_200x.jpg",
  ];

  return (
    <section id="social-feed" className="w-full py-16 overflow-hidden bg-background border-t border-dashed border-text">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-tag text-xs font-bold text-goya-blue uppercase tracking-wider block">
            Community Kitchen
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-text">
            See what else we’re cooking up in Spain &amp; beyond:
          </h2>
        </div>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 group font-semibold uppercase font-tag text-xs tracking-wider"
        >
          <span className="border-b border-dashed border-text group-hover:text-goya-blue">
            Follow @GoyaOliveOil
          </span>
          <span className="w-7 h-7 rounded-full bg-brand border border-text flex items-center justify-center group-hover:bg-text group-hover:text-highlight transition-colors">
            <ArrowUpRight size={15} />
          </span>
        </a>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="relative w-full overflow-hidden select-none">
        <div className="animate-marquee flex gap-4">
          {/* First loop of images */}
          {images.map((src, index) => (
            <div
              key={`marquee-1-${index}`}
              className="relative w-48 h-64 md:w-56 md:h-72 rounded-20 overflow-hidden border border-text/30 flex-shrink-0 shadow-sm group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src={src}
                alt="Spanish Food Moment"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 224px, 192px"
              />
              <div className="absolute inset-0 bg-text/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-highlight font-tag text-[10px] font-bold px-3 py-1 rounded-full border border-text">
                  Glug It!
                </span>
              </div>
            </div>
          ))}

          {/* Second loop of images for seamless infinite scroll */}
          {images.map((src, index) => (
            <div
              key={`marquee-2-${index}`}
              className="relative w-48 h-64 md:w-56 md:h-72 rounded-20 overflow-hidden border border-text/30 flex-shrink-0 shadow-sm group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src={src}
                alt="Spanish Food Moment"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 224px, 192px"
              />
              <div className="absolute inset-0 bg-text/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-highlight font-tag text-[10px] font-bold px-3 py-1 rounded-full border border-text">
                  Glug It!
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
