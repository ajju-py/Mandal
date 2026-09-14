import React from "react";
import Image from "next/image";
import { Flame, Eye, Music, HeartHandshake, Users, Sparkles, MessageCircle } from "lucide-react";
import { aboutData } from "@/data/about";

export default function AboutSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "flag":
        return <Sparkles className="w-5 h-5 text-bhagwa-600" />;
      case "diya":
        return <Eye className="w-5 h-5 text-amber-600" />;
      case "dhol":
        return <Music className="w-5 h-5 text-bhagwa-700" />;
      case "hands":
        return <HeartHandshake className="w-5 h-5 text-maroon-600" />;
      case "people":
        return <Users className="w-5 h-5 text-orange-600" />;
      default:
        return <Flame className="w-5 h-5 text-bhagwa-600" />;
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 bg-festive-cream relative scroll-mt-24">
      {/* Decorative divider top */}
      <div className="festival-divider max-w-5xl mx-auto mb-10 sm:mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <span>🚩</span>
            <span>{aboutData.badge}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            {aboutData.mainHeading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ) — परंपरा, निष्ठा आणि सामाजिक ऐक्याचा ३०+ वर्षांचा प्रवास
          </p>
        </div>

        {/* Main Grid: Anchor Image + Thematic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Anchor Image Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full">
                <Image
                  src={aboutData.anchorImage}
                  alt="धर्मवीर संभाजी क्रीडा मंडळ गणेशोत्सव"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-3 py-1 rounded-md bg-bhagwa-600 text-xs font-semibold uppercase tracking-wider mb-1">
                    श्री गणेशाय नमः
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl text-orange-200">
                    धर्मवीर संभाजी क्रीडा मंडळ
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200">
                    भगवं वादळ · एन – ६ सिडको, छत्रपती संभाजीनगर
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Prompt Box */}
            <div className="bg-orange-50/80 border border-bhagwa-200 rounded-2xl p-5 sm:p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-bhagwa-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                  आमच्याशी संपर्क साधा
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {aboutData.contactNotice}
                </p>
              </div>
            </div>
          </div>

          {/* Right Structured Content Cards */}
          <div className="lg:col-span-7 space-y-5">
            {aboutData.sections.map((sec) => {
              const isDholTasha = sec.id === "dhol-tasha";
              return (
                <article
                  key={sec.id}
                  id={isDholTasha ? "about-dhol" : undefined}
                  className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 scroll-mt-28 ${
                    isDholTasha
                      ? "bg-gradient-to-br from-orange-50 via-white to-bhagwa-50/60 border-2 border-bhagwa-400 shadow-md relative overflow-hidden"
                      : "bg-white border border-orange-100/90 shadow-sm hover:shadow-md hover:border-bhagwa-300"
                  }`}
                >
                  {isDholTasha && (
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-bhagwa-500/10 rounded-full blur-xl pointer-events-none" />
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isDholTasha
                          ? "bg-bhagwa-500 text-white shadow-sm"
                          : "bg-orange-50 border border-orange-200"
                      }`}
                    >
                      {getIcon(sec.iconName)}
                    </div>
                    <h3
                      className={`font-heading text-xl sm:text-2xl ${
                        isDholTasha ? "text-bhagwa-700" : "text-maroon-800"
                      }`}
                    >
                      {sec.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-1 sm:pl-2">
                    {sec.content}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing Blessing Banner */}
        <div className="mt-12 sm:mt-16 bhagwa-gradient rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-2">
            <span className="text-2xl sm:text-3xl">🪔</span>
            <h3 className="font-heading text-xl sm:text-3xl text-orange-100">
              {aboutData.blessing}
            </h3>
            <p className="text-xs sm:text-sm text-orange-200/90 font-medium">
              धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ), एन – ६ सिडको, छत्रपती संभाजीनगर
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
