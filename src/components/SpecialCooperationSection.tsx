"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Handshake, Camera } from "lucide-react";
import { specialCooperationList, MentorItem } from "@/data/mentors";

function SpecialCoopCard({ item, index }: { item: MentorItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = item.image || item.photo || "";
  const expectedFilename = imageSrc.split("/").pop();

  return (
    <div className="group bg-white rounded-2xl p-4 border border-orange-200/80 shadow-sm hover:shadow-md hover:border-bhagwa-400 transition-all flex flex-col items-center w-48 sm:w-56 justify-between">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={`विशेष सहकार्य ${index + 1}`}
            fill
            sizes="(max-width: 640px) 144px, 176px"
            className="object-cover"
            style={{
              objectPosition: item.objectPosition || "center 10%",
              transform: item.scale && item.scale !== 1.0 ? `scale(${item.scale})` : undefined,
              transformOrigin: item.objectPosition || "center 20%",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2 w-full h-full bg-orange-50/80">
            <Camera className="w-6 h-6 text-bhagwa-400 mb-1" />
            <span className="text-[11px] font-bold text-bhagwa-700">छायाचित्र बाकी</span>
            <span className="text-[9px] text-gray-500 font-mono mt-0.5 truncate max-w-[120px]">
              {expectedFilename}
            </span>
          </div>
        )}
      </div>
      <span className="text-xs sm:text-sm font-bold text-bhagwa-800 bg-bhagwa-50 px-3 py-1 rounded-full border border-bhagwa-200">
        {item.roleTitle}
      </span>
    </div>
  );
}

export default function SpecialCooperationSection({
  initialItems = specialCooperationList,
}: {
  initialItems?: MentorItem[];
}) {
  const items = initialItems && initialItems.length > 0 ? initialItems : specialCooperationList;

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-white via-orange-50/30 to-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-2.5">
            <Handshake className="w-4 h-4 text-bhagwa-600" />
            <span>सहकार्य</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-maroon-900">
            विशेष सहकार्य
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-gray-600">
            मंडळाच्या उपक्रमांना आणि उत्सवांना लाभलेले मोलाचे सहकार्य
          </p>
        </div>

        {/* Photos Strip */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 max-w-4xl mx-auto">
          {items.map((item, idx) => (
            <SpecialCoopCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
