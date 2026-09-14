"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Flame, Music, ArrowRight } from "lucide-react";
import { mandalData } from "@/data/mandal";
import { allGalleryPhotos } from "@/data/gallery";

const VISIBLE_DOTS = 5;

// Helper to determine if a slide index is near the active slide (within 2 steps, circular)
function isNearCurrentSlide(idx: number, current: number, total: number): boolean {
  if (total <= 5) return true;
  const diff = Math.min(Math.abs(idx - current), total - Math.abs(idx - current));
  return diff <= 2;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = allGalleryPhotos.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-orange-50/40 pt-4 pb-8 sm:py-12">
      {/* Subtle traditional background motifs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-bhagwa-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-maroon-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & Identity */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-5">
            {/* Established Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold shadow-sm">
              <span className="text-base">🚩</span>
              <span>स्थापना: {mandalData.establishedMarathi} · ३०+ वर्षांची अखंड परंपरा</span>
            </div>

            {/* Main Mandal Name */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-maroon-900 leading-tight">
              {mandalData.name}
            </h1>

            {/* Tagline / Sub-brand */}
            <div className="flex items-center gap-3">
              <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-bhagwa-600 drop-shadow-sm">
                {mandalData.tagline}
              </span>
              <span className="inline-block px-3 py-1 rounded-md bg-maroon-700 text-white text-xs sm:text-sm font-semibold tracking-wider">
                ढोल ताशा पथक
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              छत्रपती संभाजीनगरमधील मानाचा गणेशोत्सव आणि प्रख्यात ढोल ताशा पथक. अखंड भक्ती, परंपरा, सामाजिक ऐक्य आणि तालबद्ध संस्कृतीचे ३०+ वर्षांचे दीपस्तंभ.
            </p>

            {/* Address snippet */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700 bg-white/80 border border-bhagwa-200/80 rounded-xl p-3 shadow-xs">
              <MapPin className="w-5 h-5 text-bhagwa-600 shrink-0" />
              <span className="font-medium">{mandalData.address}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bhagwa-gradient text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <span>आमच्याबद्दल</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-bhagwa-500 text-bhagwa-700 font-semibold text-sm sm:text-base hover:bg-bhagwa-50 transition-all hover:scale-105 active:scale-95 shadow-sm min-h-[44px]"
              >
                <span>गॅलरी पाहा</span>
              </Link>

              <a
                href={mandalData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-medium text-sm hover:bg-pink-100 transition-colors min-h-[44px]"
              >
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Event Photo Carousel */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-festive-paper group aspect-[4/3] sm:aspect-[16/10] w-full">
              {/* Carousel Slides (Windowed rendering to maintain high performance with 150+ photos) */}
              {allGalleryPhotos.map((slide, idx) => {
                if (!isNearCurrentSlide(idx, currentSlide, totalSlides)) {
                  return null;
                }
                const isCurrent = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      style={{ objectPosition: "center 25%" }}
                      priority={idx === 0 || isCurrent}
                    />
                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Slide Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white z-20">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-bhagwa-600 text-white text-xs font-semibold mb-1">
                        {idx + 1} / {totalSlides}
                      </span>
                      <h3 className="font-heading text-lg sm:text-2xl text-orange-200 drop-shadow">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 mt-0.5">
                        {slide.category === "2k23"
                          ? "गणेशोत्सव सोहळा २०२३ · भगवं वादळ ढोल ताशा पथक"
                          : "ऐतिहासिक आठवणी व जुना छायाचित्र संग्रह"}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Carousel Navigation Buttons */}
              <button
                onClick={prevSlide}
                aria-label="मागील छायाचित्र"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="पुढील छायाचित्र"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel Indicators (Sliding 5-dot window matching the original UI size and position) */}
              <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5">
                {Array.from({ length: Math.min(VISIBLE_DOTS, totalSlides) }, (_, i) => {
                  const offset = i - Math.floor(VISIBLE_DOTS / 2);
                  const dotIdx = (currentSlide + offset + totalSlides) % totalSlides;
                  const isCurrent = dotIdx === currentSlide;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(dotIdx)}
                      aria-label={`छायाचित्र ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all min-w-[12px] ${
                        isCurrent
                          ? "w-6 bg-bhagwa-500"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {/* Highlights Bar below Hero */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/90 border border-orange-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bhagwa-100 flex items-center justify-center text-bhagwa-600 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-gray-900">१९९१ पासून</div>
              <div className="text-xs text-gray-500">३०+ वर्षांची परंपरा</div>
            </div>
          </div>

          <div className="bg-white/90 border border-orange-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-gray-900">ढोल ताशा पथक</div>
              <div className="text-xs text-gray-500">विद्युत् चैतन्यपूर्ण वादन</div>
            </div>
          </div>

          <div className="bg-white/90 border border-orange-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-maroon-700 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-gray-900">अखंड भक्ती</div>
              <div className="text-xs text-gray-500">भव्य गणेशोत्सव सोहळा</div>
            </div>
          </div>

          <div className="bg-white/90 border border-orange-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-gray-900">सिडको एन – ६</div>
              <div className="text-xs text-gray-500">छत्रपती संभाजीनगर</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
