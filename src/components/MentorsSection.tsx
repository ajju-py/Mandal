import React from "react";
import Image from "next/image";
import { Users2 } from "lucide-react";
import { mentorsList } from "@/data/mentors";

export default function MentorsSection() {
  return (
    <section id="mentors" className="py-16 sm:py-24 bg-festive-cream/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <Users2 className="w-4 h-4 text-bhagwa-600" />
            <span>मार्गदर्शन</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            मार्गदर्शक
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            धर्मवीर संभाजी क्रीडा मंडळाच्या सामाजिक व सांस्कृतिक प्रवासात सदैव मार्गदर्शन करणारे ज्येष्ठ व मार्गदर्शक
          </p>
        </div>

        {/* Mentors Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {mentorsList.map((mentor, index) => (
            <div
              key={mentor.id}
              className="group bg-white rounded-xl p-3 border border-orange-100 shadow-xs hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2.5 border-2 border-orange-200 group-hover:border-bhagwa-500 transition-colors shadow-xs">
                <Image
                  src={mentor.photo}
                  alt={`मार्गदर्शक ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 bg-orange-50/80 px-2.5 py-0.5 rounded-full border border-orange-200/60">
                {mentor.roleTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
