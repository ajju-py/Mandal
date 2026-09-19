import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LeadershipSection from "@/components/LeadershipSection";
import SpecialCooperationSection from "@/components/SpecialCooperationSection";
import MentorsSection from "@/components/MentorsSection";
import MediaSection from "@/components/MediaSection";
import Footer from "@/components/Footer";
import { Sparkles, ArrowRight } from "lucide-react";
import {
  fetchSlideshowPhotos,
  fetchLeadershipMembers,
  fetchMentors,
  fetchSpecialCooperation,
  fetchSiteBranding,
} from "@/lib/content";

// Revalidate on-demand or every 30 seconds to show CMS updates immediately
export const revalidate = 0;

export default async function HomePage() {
  const [slides, members, mentors, cooperation, branding] = await Promise.all([
    fetchSlideshowPhotos(),
    fetchLeadershipMembers(),
    fetchMentors(),
    fetchSpecialCooperation(),
    fetchSiteBranding(),
  ]);

  return (
    <>
      <Navbar logoUrl={branding.logoUrl} />
      <main className="flex-grow">
        <HeroSection initialSlides={slides} />
        <AboutSection />
        <LeadershipSection initialMembers={members} />
        <SpecialCooperationSection initialItems={cooperation} />
        <MentorsSection initialMentors={mentors} />
        <MediaSection />

        {/* Gallery CTA Banner before Footer */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-orange-500 via-bhagwa-600 to-maroon-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-orange-100 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>१३०+ ऐतिहासिक व उत्सव छायाचित्रे</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white">
              गणेशोत्सवाचे संपूर्ण छायाचित्र दालन
            </h2>
            <p className="text-sm sm:text-lg text-orange-100 max-w-2xl mx-auto leading-relaxed">
              २०२३ च्या गणेशोत्सवाचे क्षणचित्रे आणि १९९१ पासूनच्या जुन्या संग्रहित आठवणींचे भव्य दालन पाहा.
            </p>
            <div className="pt-3">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-bhagwa-700 font-bold text-base sm:text-lg shadow-xl hover:bg-orange-50 hover:scale-105 transition-all active:scale-95 min-h-[48px]"
              >
                <span>संपूर्ण गॅलरी उघडा</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer logoUrl={branding.logoUrl} />
    </>
  );
}
