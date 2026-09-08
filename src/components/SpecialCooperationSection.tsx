import React from "react";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { specialCooperationList } from "@/data/mentors";

export default function SpecialCooperationSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <Handshake className="w-4 h-4 text-bhagwa-600" />
            <span>सहकार्य</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-maroon-900">
            विशेष सहकार्य
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            मंडळाच्या उपक्रमांना आणि उत्सवांना लाभलेले मोलाचे सहकार्य
          </p>
        </div>

        {/* 3 Photos Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto">
          {specialCooperationList.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-4 border border-orange-200/80 shadow-sm hover:shadow-md hover:border-bhagwa-400 transition-all flex flex-col items-center w-48 sm:w-56"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={item.photo}
                  alt={`विशेष सहकार्य ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-bhagwa-800 bg-bhagwa-50 px-3 py-1 rounded-full border border-bhagwa-200">
                {item.roleTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
