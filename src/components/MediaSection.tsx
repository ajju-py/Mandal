import React from "react";
import Image from "next/image";
import { Video, Film, Instagram, Sparkles, ExternalLink, Calendar, AlertCircle } from "lucide-react";
import { foundingArtifact, historicalPhotos, mandalVideos, instagramInfo } from "@/data/media";

export default function MediaSection() {
  return (
    <section id="media" className="py-12 sm:py-16 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
            <Film className="w-4 h-4 text-bhagwa-600" />
            <span>व्हिडिओ व विशेष आठवणी</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
            ऐतिहासिक क्षण व व्हिडिओ सोहळा
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            मंडळाची ३०+ वर्षांची ऐतिहासिक छायाचित्रे, वाद्यपूजन आणि ढोल ताशा पथकाचे थेट व्हिडिओ
          </p>
        </div>

        {/* 1. Dedicated Prominent Founding Artifact Card (1991 चा पहिला फोटो) */}
        <div className="mb-14 sm:mb-20">
          <div className="bg-gradient-to-br from-orange-50 via-amber-50/60 to-orange-100/40 border-2 border-bhagwa-300 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-festive-paper">
                  <Image
                    src={foundingArtifact.photo}
                    alt={foundingArtifact.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain sm:object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-maroon-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>ऐतिहासिक दस्ताऐवज · १९९१</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bhagwa-200/80 text-bhagwa-900 text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5 text-bhagwa-700" />
                  <span>स्थापना वर्ष १९९१</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl text-maroon-900 leading-snug">
                  {foundingArtifact.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {foundingArtifact.description}
                </p>
                <div className="pt-2">
                  <div className="inline-block bg-white/90 border border-orange-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-700 shadow-2xs">
                    🚩 <strong>भगवं वादळ:</strong> सिडको एन – ६, ई सेक्टर मधील तरुण भक्तांनी सुरू केलेली ही परंपरा आज ३० हून अधिक वर्षांचा ऐतिहासिक वारसा बनली आहे.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Historical Event Photo: वद्यपूजन २०२२ */}
        <div className="mb-14 sm:mb-20">
          <div className="max-w-3xl mx-auto bg-festive-paper/70 border border-orange-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading text-xl sm:text-2xl text-maroon-900">
                  {historicalPhotos[0].title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {historicalPhotos[0].subtitle}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-orange-100 text-bhagwa-800 text-xs font-bold">
                {historicalPhotos[0].year}
              </span>
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-white shadow-md">
              <Image
                src={historicalPhotos[0].photo}
                alt={historicalPhotos[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3. Videos Grid (WordPress वद्यपूजन २०२३, २०२४ & YouTube Videos) */}
        <div className="mb-14 sm:mb-20">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl sm:text-3xl text-maroon-900">
              वाद्यपूजन व ढोल ताशा वादन व्हिडिओ
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              पथकाचे नादमय वादन आणि वार्षिक वाद्यपूजन सोहळ्याचे व्हिडिओ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mandalVideos.map((video) => (
              <div
                key={video.id}
                className="bg-festive-paper/50 rounded-2xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="video-responsive-wrapper shadow-xs mb-3 bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="font-heading text-lg text-maroon-900 leading-snug">
                    {video.title}
                  </h4>
                  {video.year && (
                    <span className="inline-block text-xs font-semibold text-bhagwa-700 bg-bhagwa-50 px-2.5 py-0.5 rounded-md mt-1 border border-bhagwa-200">
                      वर्ष {video.year}
                    </span>
                  )}
                </div>

                {video.type === "wordpress" && (
                  <div className="mt-3 pt-2 border-t border-orange-100/80 flex items-center gap-1.5 text-xs text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>वाद्यपूजन विशेष व्हिडिओ</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Instagram Follow Invitation Card */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50 border border-pink-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Instagram className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-xl sm:text-2xl text-gray-900">
                  {instagramInfo.title}
                </h4>
                <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
                  {instagramInfo.description}
                </p>
                <div className="font-bold text-pink-600 text-sm">
                  {instagramInfo.handle}
                </div>
              </div>
            </div>

            <a
              href={instagramInfo.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-105 shrink-0 min-h-[44px]"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram वर फॉलो करा</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
