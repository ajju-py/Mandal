import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryView from "@/components/GalleryView";
import { ChevronLeft, Sparkles, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "छायाचित्र गॅलरी | धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ)",
  description:
    "धर्मवीर संभाजी क्रीडा मंडळाच्या २०२३ गणेशोत्सव आणि जुन्या संग्रहित छायाचित्रांचे भव्य दालन. १३०+ ऐतिहासिक छायाचित्रे आणि ढोल ताशा पथकाचे क्षण.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-festive-cream/60 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back to Home & Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-bhagwa-700 hover:text-bhagwa-800 transition-colors p-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>मुख्यपृष्ठावर परत जा</span>
            </Link>
          </div>

          {/* Page Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-bhagwa-100 border border-bhagwa-300 text-bhagwa-800 text-xs sm:text-sm font-bold mb-3">
              <ImageIcon className="w-4 h-4 text-bhagwa-600" />
              <span>छायाचित्र दालन</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-maroon-900 leading-tight">
              गणेशोत्सव व ऐतिहासिक छायाचित्र गॅलरी
            </h1>

            <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
              <strong>2K23 PHOTO&apos;S</strong> मधील गणेशोत्सवाची भव्य छायाचित्रे आणि मंडळाच्या <strong>Old Photo&apos;s</strong> मधील ऐतिहासिक आठवणींचे संकलन.
            </p>
          </div>

          {/* Main Gallery Component with Tabs, Pagination, and Lightbox */}
          <GalleryView />
        </div>
      </main>
      <Footer />
    </>
  );
}
