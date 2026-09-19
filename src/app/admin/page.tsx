"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Award,
  Handshake,
  ImageIcon,
  Flag,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Database,
  Layers,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface Stats {
  membersCount: number;
  mentorsCount: number;
  cooperationCount: number;
  galleryCount: number;
  slideshowCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    membersCount: 12,
    mentorsCount: 32,
    cooperationCount: 3,
    galleryCount: 159,
    slideshowCount: 159,
  });
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [logoUrl, setLogoUrl] = useState("/images/branding/mandal-logo.png");

  useEffect(() => {
    const isConfig = isSupabaseConfigured();
    setConfigured(isConfig);

    async function loadStats() {
      if (!isConfig) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const [
          { count: membersCount },
          { count: mentorsCount },
          { count: cooperationCount },
          { count: galleryCount },
          { count: slideshowCount },
          { data: logoData },
        ] = await Promise.all([
          supabase.from("members").select("*", { count: "exact", head: true }),
          supabase.from("mentors").select("*", { count: "exact", head: true }),
          supabase.from("special_cooperation").select("*", { count: "exact", head: true }),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
          supabase.from("gallery").select("*", { count: "exact", head: true }).eq("show_in_slideshow", true),
          supabase.from("site_settings").select("value").eq("key", "site_logo").maybeSingle(),
        ]);

        setStats({
          membersCount: membersCount ?? 12,
          mentorsCount: mentorsCount ?? 32,
          cooperationCount: cooperationCount ?? 3,
          galleryCount: galleryCount ?? 159,
          slideshowCount: slideshowCount ?? 159,
        });

        if (logoData?.value?.url) {
          setLogoUrl(logoData.value.url);
        }
      } catch (err) {
        console.warn("Failed to load dashboard stats from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-maroon-900 via-bhagwa-700 to-bhagwa-600 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs sm:text-sm font-bold text-orange-100">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>प्रशासकीय नियंत्रण कक्ष (CMS)</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white leading-tight">
            जय संभाजी! स्वागत आहे.
          </h1>
          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            येथून तुम्ही मंडळाचे पदाधिकारी, मार्गदर्शक, विशेष सहकार्य आणि गॅलरीचे फोटो थेट मोबाइल किंवा संगणकावरून जोडू आणि बदलू शकता.
          </p>
        </div>
      </div>

      {/* Database Connection Status Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          configured
            ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
            : "bg-amber-50 border-amber-300 text-amber-900"
        }`}
      >
        <div className="flex items-center gap-3">
          {configured ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <div>
            <span className="font-bold text-sm">
              {configured
                ? "Supabase क्लाऊड डेटाबेस आणि स्टोरेज सक्रिय आहे."
                : "Supabase क्रेडेंशियल्स जोडलेले नाहीत (Static Fallback चालू आहे)."}
            </span>
            <p className="text-xs text-gray-600 mt-0.5">
              {configured
                ? "तुम्ही केलेले सर्व बदल तत्काळ सेव्ह होतील आणि वेबसाइटवर त्वरित दिसतील."
                : "लाइव्ह अपडेट्ससाठी Vercel किंवा .env.local मध्ये Supabase URL आणि Anon Key जोडा."}
            </p>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white shadow-2xs text-xs font-bold text-gray-800 hover:bg-orange-50 border border-gray-200 transition-colors shrink-0"
        >
          <span>थेट वेबसाइट उघडा</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Members Card */}
        <Link
          href="/admin/members"
          className="group p-5 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">पदाधिकारी</span>
            <div className="w-10 h-10 rounded-xl bg-bhagwa-50 text-bhagwa-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-bold text-maroon-900">
              {loading ? "..." : stats.membersCount}
            </div>
            <div className="text-xs text-bhagwa-600 font-semibold mt-1 flex items-center gap-1">
              <span>व्यवस्थापित करा</span>
              <ChevronRightIcon />
            </div>
          </div>
        </Link>

        {/* Mentors Card */}
        <Link
          href="/admin/mentors"
          className="group p-5 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">मार्गदर्शक</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-bold text-maroon-900">
              {loading ? "..." : stats.mentorsCount}
            </div>
            <div className="text-xs text-bhagwa-600 font-semibold mt-1 flex items-center gap-1">
              <span>व्यवस्थापित करा</span>
              <ChevronRightIcon />
            </div>
          </div>
        </Link>

        {/* Cooperation Card */}
        <Link
          href="/admin/special-cooperation"
          className="group p-5 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">विशेष सहकार्य</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Handshake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-bold text-maroon-900">
              {loading ? "..." : stats.cooperationCount}
            </div>
            <div className="text-xs text-bhagwa-600 font-semibold mt-1 flex items-center gap-1">
              <span>व्यवस्थापित करा</span>
              <ChevronRightIcon />
            </div>
          </div>
        </Link>

        {/* Gallery Photos Card */}
        <Link
          href="/admin/gallery"
          className="group p-5 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">गॅलरी फोटो</span>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-bold text-maroon-900">
              {loading ? "..." : stats.galleryCount}
            </div>
            <div className="text-xs text-bhagwa-600 font-semibold mt-1 flex items-center gap-1">
              <span>अपलोड / बदला</span>
              <ChevronRightIcon />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Action Shortcuts & Branding Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions List (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-orange-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-heading text-lg font-bold text-maroon-950">
              त्वरित कृती (Quick Actions)
            </h3>
            <span className="text-xs text-gray-500">कोणत्याही कोडिंगशिवाय</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <Link
              href="/admin/members?action=add"
              className="p-4 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-bhagwa-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-maroon-900">
                  नवीन पदाधिकारी जोडा
                </span>
                <span className="text-xs text-gray-500">नाव, पद व फोटो अपलोड</span>
              </div>
            </Link>

            <Link
              href="/admin/gallery?action=upload"
              className="p-4 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-bhagwa-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-maroon-900">
                  गॅलरी फोटो अपलोड करा
                </span>
                <span className="text-xs text-gray-500">थेट स्लाईडशोमध्ये दिसेल</span>
              </div>
            </Link>

            <Link
              href="/admin/mentors"
              className="p-4 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-maroon-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-maroon-900">
                  मार्गदर्शक व्यवस्थापन
                </span>
                <span className="text-xs text-gray-500">३२ मार्गदर्शकांची सूची</span>
              </div>
            </Link>

            <Link
              href="/admin/branding"
              className="p-4 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 transition-all flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-maroon-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Flag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-maroon-900">
                  मंडळ लोगो बदला
                </span>
                <span className="text-xs text-gray-500">अधिकृत ब्रँडिंग अपडेट करा</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Current Canonical Logo Widget */}
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm flex flex-col items-center text-center justify-between space-y-4">
          <div className="w-full border-b border-gray-100 pb-3 flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-maroon-950">
              अधिकृत ब्रँड लोगो
            </h3>
            <span className="text-xs text-bhagwa-600 font-bold">Canonical</span>
          </div>

          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-bhagwa-400 bg-bhagwa-50 shadow-md p-1">
            <Image
              src={logoUrl}
              alt="मंडळ लोगो"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <div className="font-bold text-sm text-gray-800">
              धर्मवीर संभाजी क्रीडा मंडळ
            </div>
            <div className="text-xs text-gray-500">
              हा लोगो संपूर्ण संकेतस्थळावर सर्व ठिकाणी मुख्य लोगो म्हणून वापरला जातो.
            </div>
          </div>

          <Link
            href="/admin/branding"
            className="w-full py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-bhagwa-800 text-xs font-bold transition-colors text-center"
          >
            नवीन लोगो अपलोड करा →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
