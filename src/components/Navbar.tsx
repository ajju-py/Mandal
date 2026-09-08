"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Youtube, Send, Instagram, ChevronRight, Sparkles } from "lucide-react";
import { mandalData, navItems } from "@/data/mandal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-bhagwa-200"
          : "bg-white/90 backdrop-blur-sm border-b border-orange-100"
      }`}
    >
      {/* Top festival banner bar */}
      <div className="bhagwa-gradient text-white text-xs sm:text-sm py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">🚩</span>
        <span>स्थापना १९९१ · धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ), एन – ६ सिडको, छत्रपती संभाजीनगर</span>
        <span className="hidden sm:inline-block">🚩</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-bhagwa-500 shadow-md transition-transform group-hover:scale-105 bg-bhagwa-100">
              <Image
                src="/images/brand/logo.jpg"
                alt="धर्मवीर संभाजी क्रीडा मंडळ लोगो"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-2xl text-maroon-700 leading-tight group-hover:text-bhagwa-600 transition-colors">
                {mandalData.name}
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-bhagwa-600 flex items-center gap-1">
                <span>{mandalData.tagline}</span>
                <span className="text-gray-400 font-normal">|</span>
                <span className="text-gray-600 font-normal">एन – ६ सिडको</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href.startsWith("/#")
                  ? pathname === "/"
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive && item.href === pathname
                      ? "text-bhagwa-600 bg-bhagwa-50"
                      : "text-gray-700 hover:text-bhagwa-600 hover:bg-orange-50/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Social Links & CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={mandalData.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors hover:scale-110"
              title="YouTube (@bhgvvadal)"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={mandalData.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Channel"
              className="p-2 rounded-full text-sky-600 hover:bg-sky-50 transition-colors hover:scale-110"
              title="Telegram (@bhgvvadal)"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href={mandalData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition-colors hover:scale-110"
              title="Instagram (@bhgv__vadal)"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <Link
              href="/gallery"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bhagwa-gradient text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>फोटो गॅलरी</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button (Min 44px tap target) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-700 hover:text-bhagwa-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-bhagwa-500"
              aria-label={isOpen ? "मेनू बंद करा" : "मेनू उघडा"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-bhagwa-200 shadow-xl transition-all animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-gray-800 hover:text-bhagwa-600 hover:bg-bhagwa-50 transition-colors min-h-[44px]"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}

            <div className="pt-4 border-t border-orange-100 flex items-center justify-around">
              <a
                href={mandalData.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 min-h-[44px]"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
              <a
                href={mandalData.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-sky-600 bg-sky-50 min-h-[44px]"
              >
                <Send className="w-5 h-5" />
                <span>Telegram</span>
              </a>
              <a
                href={mandalData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-pink-600 bg-pink-50 min-h-[44px]"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
