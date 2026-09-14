"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, Heart, Camera } from "lucide-react";
import { leadershipTeam, TeamMember } from "@/data/team";

function LeadershipCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  const isMemorial = member.isMemorial;
  const imageSrc = member.image || member.photo || "";
  const isDual = Array.isArray(member.names) && member.names.length > 1;
  const displayName = isDual ? member.names!.join(" || ") : member.name;
  const expectedFilename = imageSrc.split("/").pop();

  return (
    <div
      className={`group rounded-2xl p-5 text-center transition-all duration-300 relative flex flex-col items-center justify-between h-full ${
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

      {/* Member Photo / Missing Image Container */}
      <div
        className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 shadow-md flex items-center justify-center shrink-0 ${
          isMemorial
            ? "border-4 border-amber-400 ring-4 ring-amber-100/80 bg-amber-50"
            : "border-4 border-white ring-2 ring-bhagwa-300 bg-orange-50"
        }`}
      >
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={displayName || "पदाधिकारी"}
            fill
            sizes="(max-width: 640px) 144px, 160px"
            className="object-cover"
            style={{
              objectPosition: member.objectPosition || "center 10%",
              transform: member.scale ? `scale(${member.scale})` : undefined,
              transformOrigin: member.objectPosition || "center 20%",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2 w-full h-full bg-orange-50/90">
            <Camera className="w-7 h-7 text-bhagwa-400 mb-1" />
            <span className="text-[11px] font-bold text-bhagwa-700 leading-tight">
              छायाचित्र बाकी
            </span>
            <span className="text-[9px] text-gray-500 font-mono mt-0.5 truncate max-w-[120px]" title={expectedFilename}>
              {expectedFilename}
            </span>
          </div>
        )}
      </div>

      {/* Member Name & Role */}
      <div className="flex-1 flex flex-col justify-center my-1 w-full">
        {isDual ? (
          <div className="space-y-0.5">
            <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug text-maroon-900">
              {member.names![0]} <span className="text-bhagwa-600">||</span>
            </h3>
            <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug text-maroon-900">
              {member.names![1]}
            </h3>
          </div>
        ) : (
          <h3
            className={`font-heading text-lg sm:text-xl font-bold leading-snug ${
              isMemorial ? "text-amber-950" : "text-maroon-900"
            }`}
          >
            {member.name}
          </h3>
        )}

        <div className="text-sm font-semibold text-bhagwa-700 mt-1 leading-snug">
          {isDual ? (
            <div className="space-y-0.5 text-xs sm:text-sm">
              <div>मंडळ ढोल</div>
              <div>ताशा गट</div>
              <div>पथक प्रमुख</div>
            </div>
          ) : (
            member.role
          )}
        </div>
      </div>

      {/* Memorial Note or Role Badge */}
      <div className="mt-3 w-full flex justify-center">
        {isMemorial ? (
          <div className="text-xs text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/80 font-medium">
            {member.memorialNote}
          </div>
        ) : member.badge ? (
          <div className="text-xs font-semibold text-bhagwa-800 bg-bhagwa-50 px-2.5 py-0.5 rounded-md border border-bhagwa-200">
            {member.badge}
          </div>
        ) : (
          <div className="h-5" />
        )}
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  return (
    <section id="team" className="py-12 sm:py-16 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <Shield className="w-4 h-4 text-bhagwa-600" />
            <span>मंडळ पदाधिकारी</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            नेतृत्व आणि पदाधिकारी परिवार
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            धर्मवीर संभाजी क्रीडा मंडळाच्या अखंड वाटचालीचे मार्गदर्शक आणि समर्पित कार्यकर्ते
          </p>
        </div>

        {/* 12 Leadership Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {leadershipTeam.map((member) => (
            <LeadershipCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
