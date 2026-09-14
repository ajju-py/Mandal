"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users2, Camera } from "lucide-react";
import { mentorsList, MentorItem } from "@/data/mentors";

function MentorCard({ mentor, index }: { mentor: MentorItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = mentor.image || mentor.photo || "";
  const expectedFilename = imageSrc.split("/").pop();

  return (
    <div className="group bg-white rounded-xl p-3 border border-orange-100 shadow-xs hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col items-center text-center justify-between h-full">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 border-2 border-orange-200 group-hover:border-bhagwa-500 transition-colors shadow-xs flex items-center justify-center shrink-0">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={`मार्गदर्शक ${index + 1}`}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-1 w-full h-full bg-orange-50/90">
            <Camera className="w-5 h-5 text-bhagwa-400" />
            <span className="text-[9px] font-mono text-gray-500 truncate max-w-[70px]">
              {expectedFilename}
            </span>
          </div>
        )}
      </div>
      <span className="text-xs font-semibold text-gray-700 bg-orange-50/80 px-2.5 py-0.5 rounded-full border border-orange-200/60 mt-1">
        {mentor.roleTitle}
      </span>
    </div>
  );
}

export default function MentorsSection() {
  return (
    <section id="mentors" className="py-12 sm:py-16 bg-festive-cream/80 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-2.5">
            <Users2 className="w-4 h-4 text-bhagwa-600" />
            <span>मार्गदर्शन</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            मार्गदर्शक
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            धर्मवीर संभाजी क्रीडा मंडळाच्या सामाजिक व सांस्कृतिक प्रवासात सदैव मार्गदर्शन करणारे ज्येष्ठ व मार्गदर्शक
          </p>
        </div>

        {/* Mentors Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
          {mentorsList.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
