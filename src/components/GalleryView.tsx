"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Layers, Eye, RefreshCw } from "lucide-react";
import { gallery2023List, galleryArchiveList, GalleryImage } from "@/data/gallery";
import Lightbox from "./Lightbox";

const BATCH_SIZE = 24;

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState<"all" | "2k23" | "archive">("2k23");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active images list based on tab
  const activeImages = useMemo(() => {
    if (activeTab === "2k23") return gallery2023List;
    if (activeTab === "archive") return galleryArchiveList;
    return [...gallery2023List, ...galleryArchiveList];
  }, [activeTab]);

  // Reset pagination when changing tabs
  const handleTabChange = (tab: "all" | "2k23" | "archive") => {
    setActiveTab(tab);
    setVisibleCount(BATCH_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  const displayedImages = useMemo(() => {
    return activeImages.slice(0, visibleCount);
  }, [activeImages, visibleCount]);

  const hasMore = visibleCount < activeImages.length;

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
        <button
          onClick={() => handleTabChange("2k23")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all min-h-[44px] ${
            activeTab === "2k23"
              ? "bhagwa-gradient text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2K23 PHOTO&apos;S ({gallery2023List.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("archive")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all min-h-[44px] ${
            activeTab === "archive"
              ? "bhagwa-gradient text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-200"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Old Photo&apos;s ({galleryArchiveList.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("all")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all min-h-[44px] ${
            activeTab === "all"
              ? "bhagwa-gradient text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>सर्व छायाचित्रे ({gallery2023List.length + galleryArchiveList.length})</span>
        </button>
      </div>

      {/* Gallery Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayedImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-festive-paper border border-orange-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover overlay with icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-bhagwa-600">
                  {image.year}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-medium line-clamp-1 mt-1 text-gray-100">
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bhagwa-gradient text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95 min-h-[48px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>आणखी छायाचित्रे पाहा (उर्वरित {activeImages.length - visibleCount})</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            दाखवत आहे {displayedImages.length} पैकी {activeImages.length} छायाचित्रे
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        images={activeImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
