"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { GalleryImage } from "@/data/gallery";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      onNavigate((currentIndex + 1) % images.length);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity animate-fadeIn">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-white">
          <span className="text-xs sm:text-sm font-medium text-orange-300">
            {currentImage.category === "2k23" ? "गणेशोत्सव २०२३" : "जुनी आठवण"}
          </span>
          <h4 className="text-sm sm:text-base font-semibold truncate max-w-xs sm:max-w-md">
            {currentImage.title}
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            {currentIndex + 1} / {images.length}
          </span>
          <a
            href={currentImage.src}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-h-[44px] min-w-[44px]"
            title="मूळ छायाचित्र डाउनलोड करा"
            aria-label="छायाचित्र डाउनलोड करा"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600/80 text-white transition-colors min-h-[44px] min-w-[44px]"
            aria-label="गॅलरी बंद करा"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[82vh] p-4 sm:p-8 flex items-center justify-center select-none"
        onClick={(e) => {
          // Close if clicking outside the image
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px]"
        aria-label="मागील छायाचित्र"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px]"
        aria-label="पुढील छायाचित्र"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
}
