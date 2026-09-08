import React from "react";
import Image from "next/image";
import { Shield, Award, Heart } from "lucide-react";
import { leadershipTeam } from "@/data/team";

export default function LeadershipSection() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <Shield className="w-4 h-4 text-bhagwa-600" />
            <span>मंडळ पदाधिकारी</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            नेतृत्व आणि पदाधिकारी परिवार
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            धर्मवीर संभाजी क्रीडा मंडळाच्या अखंड वाटचालीचे मार्गदर्शक आणि समर्पित कार्यकर्ते
          </p>
        </div>

        {/* 12 Leadership Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {leadershipTeam.map((member) => {
            const isMemorial = member.isMemorial;

            return (
              <div
                key={member.id}
                className={`group rounded-2xl p-5 text-center transition-all duration-300 relative flex flex-col items-center ${
                  isMemorial
                    ? "bg-gradient-to-b from-amber-50/90 to-orange-50/70 border-2 border-amber-400 shadow-md hover:shadow-lg"
                    : "bg-festive-paper/60 border border-orange-100/90 shadow-sm hover:shadow-md hover:border-bhagwa-300 hover:bg-white"
                }`}
              >
                {/* Memorial Badge Ribbon */}
                {isMemorial && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 border border-amber-400 text-amber-900 text-xs font-semibold">
                    <Heart className="w-3 h-3 text-red-600 fill-red-600" />
                    <span>श्रद्धांजली</span>
                  </div>
                )}

                {/* Member Photo Container */}
                <div
                  className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 shadow-md ${
                    isMemorial
                      ? "border-4 border-amber-400 ring-4 ring-amber-100/80"
                      : "border-4 border-white ring-2 ring-bhagwa-300"
                  }`}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 144px, 160px"
                    className="object-cover"
                  />
                </div>

                {/* Member Name */}
                <h3
                  className={`font-heading text-lg sm:text-xl font-bold leading-snug mt-1 ${
                    isMemorial ? "text-amber-950" : "text-maroon-900"
                  }`}
                >
                  {member.name}
                </h3>

                {/* Member Role */}
                <p className="text-sm font-semibold text-bhagwa-700 mt-1">
                  {member.role}
                </p>

                {/* Memorial Note or Role Badge */}
                {isMemorial ? (
                  <div className="mt-3 text-xs text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300/80">
                    {member.memorialNote}
                  </div>
                ) : member.badge ? (
                  <div className="mt-2 text-xs font-medium text-gray-500 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                    {member.badge}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
