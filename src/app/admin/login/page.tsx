"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/admin";

  const [email, setEmail] = useState("admin@mandal.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
  }, []);

  const startDemoSession = (customEmail?: string) => {
    const demoEmail = customEmail || "admin@mandal.com";
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg("चाचणी (Trial/Demo) प्रवेश यशस्वी! ॲडमिन पॅनेल उघडत आहे...");

    // Set demo cookie for 7 days
    document.cookie = `mandal_demo_session=true; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `mandal_demo_email=${encodeURIComponent(demoEmail)}; path=/; max-age=604800; SameSite=Lax`;

    try {
      localStorage.setItem("mandal_demo_session", "true");
      localStorage.setItem("mandal_demo_email", demoEmail);
    } catch {}

    setTimeout(() => {
      router.push(redirectedFrom);
      router.refresh();
    }, 600);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const isDemoAccount =
      (cleanEmail === "admin@mandal.com" || cleanEmail === "admin" || cleanEmail === "demo@mandal.com") &&
      (password === "admin123" || password === "admin" || password === "mandal123" || password === "demo");

    // If matching demo credentials or if Supabase is unconfigured
    if (isDemoAccount) {
      startDemoSession(email.trim());
      return;
    }

    if (!configured) {
      if (cleanEmail === "admin@mandal.com" || cleanEmail === "admin") {
        if (password === "admin123" || password === "admin" || password === "mandal123") {
          startDemoSession(email.trim());
          return;
        } else {
          setErrorMsg("चाचणीसाठी (Trial) पासवर्ड 'admin123' किंवा 'admin' प्रविष्ट करा, किंवा खालील 'त्वरित डेमो प्रवेश' बटण वापरा.");
          return;
        }
      } else {
        // If unconfigured and any credentials entered, offer demo
        setErrorMsg("चाचणीसाठी (Trial) ईमेल: admin@mandal.com आणि पासवर्ड: admin123 वापरा, किंवा थेट खालील 'त्वरित चाचणी प्रवेश' बटणावर क्लिक करा.");
        return;
      }
    }

    if (!email || !password) {
      setErrorMsg("कृपया ईमेल आणि पासवर्ड दोन्ही प्रविष्ट करा.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase client initialize होऊ शकले नाही.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("अवैध लॉगिन! कृपया ईमेल आणि पासवर्ड तपासून पुन्हा प्रयत्न करा. चाचणीसाठी 'admin@mandal.com' व 'admin123' वापरा.");
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        setSuccessMsg("प्रवेश यशस्वी! ॲडमिन डॅशबोर्ड उघडत आहे...");
        router.push(redirectedFrom);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "लॉगिन करताना अनपेक्षित त्रुटी आली.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50/50 flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Background Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-bhagwa-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-maroon-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Mandal Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-bhagwa-500 shadow-lg bg-bhagwa-50 p-1 mb-3 transition-transform group-hover:scale-105">
              <Image
                src="/images/branding/mandal-logo.png"
                alt="धर्मवीर संभाजी क्रीडा मंडळ लोगो"
                fill
                sizes="80px"
                className="object-contain"
                priority
              />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-maroon-900 leading-tight">
              धर्मवीर संभाजी क्रीडा मंडळ
            </h1>
            <p className="text-bhagwa-700 font-semibold text-sm mt-0.5">
              प्रशासकीय नियंत्रण कक्ष (Admin CMS)
            </p>
          </Link>
        </div>

        {/* Trial / Demo Credentials Banner (Prominent & Helpful) */}
        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-bhagwa-300 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-bhagwa-600 text-white shadow-xs shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-maroon-950 text-sm">
                  चाचणी / डेमो क्रेडेंशियल्स (Trial Access):
                </p>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 border border-bhagwa-300">
                  सक्रिय (Active)
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs text-gray-800 font-medium bg-white/80 p-2.5 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">ईमेल (ID):</span>
                  <code className="font-mono font-bold text-bhagwa-900 bg-orange-100/70 px-2 py-0.5 rounded text-xs select-all">
                    admin@mandal.com
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">पासवर्ड (Pass):</span>
                  <code className="font-mono font-bold text-bhagwa-900 bg-orange-100/70 px-2 py-0.5 rounded text-xs select-all">
                    admin123
                  </code>
                </div>
              </div>
              <button
                type="button"
                onClick={() => startDemoSession()}
                disabled={loading}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-bhagwa-600 to-amber-600 hover:from-bhagwa-700 hover:to-amber-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
                <span>🚀 १-क्लिक थेट डेमो प्रवेश (1-Click Trial Login)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100/90">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold mb-2">
              <Lock className="w-3.5 h-3.5 text-bhagwa-600" />
              <span>प्रशासक लॉगिन</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              प्रवेश करा
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              वेबसाइटचे फोटो, पदाधिकारी आणि माहिती व्यवस्थापित करण्यासाठी लॉगिन करा
            </p>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span className="leading-snug font-medium">{successMsg}</span>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                ईमेल पत्ता (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mandal.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 focus:border-bhagwa-500 text-sm sm:text-base outline-hidden transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                पासवर्ड (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 focus:border-bhagwa-500 text-sm sm:text-base outline-hidden transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bhagwa-gradient text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 min-h-[48px]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>प्रमाणित करत आहे...</span>
                </>
              ) : (
                <>
                  <span>प्रवेश करा (Login)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs sm:text-sm text-bhagwa-700 hover:text-bhagwa-800 font-semibold transition-colors"
            >
              ← सार्वजनिक मुख्यपृष्ठावर परत जा
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>सुरक्षित Supabase SSL एन्क्रिप्शन व RLS संरक्षण</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-orange-50/50 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
