import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Youtube, Send, Instagram, MapPin, Heart, Sparkles } from "lucide-react";
import { mandalData, navItems } from "@/data/mandal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-festive-charcoal text-gray-300 relative overflow-hidden border-t-4 border-bhagwa-500">
      {/* Decorative top saffron pattern strip */}
      <div className="h-1.5 bhagwa-gradient w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Mandal Identity & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-bhagwa-400 bg-bhagwa-100 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/branding/mandal-logo.png"
                  alt="धर्मवीर संभाजी क्रीडा मंडळ लोगो"
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-white">
                  {mandalData.name}
                </h3>
                <span className="text-bhagwa-400 font-bold text-sm">
                  {mandalData.tagline} · स्थापना {mandalData.establishedMarathi}
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              छत्रपती संभाजीनगरमधील मानाचा गणेशोत्सव आणि प्रख्यात ढोल ताशा पथक. अखंड भक्ती, परंपरा, सामाजिक ऐक्य आणि तालबद्ध संस्कृतीचा ३०+ वर्षांचा गौरवशाली वारसा.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 pt-1">
              <MapPin className="w-4 h-4 text-bhagwa-500 shrink-0" />
              <span>{mandalData.contact.addressMarathi}</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg text-white border-b border-gray-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-bhagwa-500" />
              <span>महत्त्वाच्या लिंक्स</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-bhagwa-400 transition-colors inline-block py-1 min-h-[32px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Community (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-lg text-white border-b border-gray-800 pb-2">
              सोशल मीडिया व संपर्क
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              आमच्या अधिकृत सोशल चॅनेल्सवर जुडा आणि गणेशोत्सवाचे सर्व अपडेट्स, छायाचित्रे व व्हिडिओ थेट मिळवा.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={mandalData.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 hover:text-white hover:bg-red-800/80 transition-colors text-xs font-semibold min-h-[44px]"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
              </a>

              <a
                href={mandalData.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-300 hover:text-white hover:bg-sky-800/80 transition-colors text-xs font-semibold min-h-[44px]"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram</span>
              </a>

              <a
                href={mandalData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 border border-pink-800/60 text-pink-300 hover:text-white hover:bg-pink-800/80 transition-colors text-xs font-semibold min-h-[44px]"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center sm:text-left">
            © {currentYear} {mandalData.name}. सर्व हक्क राखीव.
          </p>

          <p className="text-center sm:text-right flex items-center gap-1">
            <span>भक्ती आणि निष्ठेने समर्पित</span>
            <Heart className="w-3 h-3 text-bhagwa-500 fill-bhagwa-500 inline" />
            <span>छत्रपती संभाजीनगर</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
