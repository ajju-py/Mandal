"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Award,
  Handshake,
  Image as ImageIcon,
  Flag,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  subLabel: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: "अवलोकन",
    subLabel: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "पदाधिकारी",
    subLabel: "Members",
    href: "/admin/members",
    icon: Users,
  },
  {
    label: "मार्गदर्शक",
    subLabel: "Mentors",
    href: "/admin/mentors",
    icon: Award,
  },
  {
    label: "विशेष सहकार्य",
    subLabel: "Cooperation",
    href: "/admin/special-cooperation",
    icon: Handshake,
  },
  {
    label: "गॅलरी व्यवस्थापन",
    subLabel: "Gallery & Slideshow",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    label: "लोगो व ब्रँडिंग",
    subLabel: "Logo & Branding",
    href: "/admin/branding",
    icon: Flag,
  },
  {
    label: "सेटिंग्ज",
    subLabel: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  // If this is the login page, render children directly without the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  useEffect(() => {
    // Check demo session cookie / localStorage
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/mandal_demo_session=([^;]+)/);
      const emailMatch = document.cookie.match(/mandal_demo_email=([^;]+)/);
      if (match && match[1] === "true") {
        setIsDemo(true);
        setUserEmail(emailMatch ? decodeURIComponent(emailMatch[1]) : "admin@mandal.com");
        return;
      }
    }

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user?.email) {
          setUserEmail(user.email);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    // Clear demo session cookies and localStorage
    document.cookie = "mandal_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mandal_demo_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    try {
      localStorage.removeItem("mandal_demo_session");
      localStorage.removeItem("mandal_demo_email");
    } catch {}

    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#FDFBFA] flex flex-col md:flex-row text-gray-900">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-maroon-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-bhagwa-400 bg-bhagwa-100 shrink-0">
            <Image
              src="/images/branding/mandal-logo.png"
              alt="लोगो"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="font-heading text-lg font-bold text-orange-100 truncate">
            प्रशासक नियंत्रण
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-maroon-800 text-white hover:bg-maroon-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="मेनू उघडा"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-72 bg-gradient-to-b from-maroon-950 via-maroon-900 to-[#1A0307] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen`}
      >
        {/* Top Branding Section */}
        <div className="p-5 border-b border-maroon-800/80">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-bhagwa-400 bg-bhagwa-100 shrink-0 shadow-md">
              <Image
                src="/images/branding/mandal-logo.png"
                alt="धर्मवीर संभाजी क्रीडा मंडळ लोगो"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="font-heading text-lg text-orange-200 leading-tight truncate">
                धर्मवीर संभाजी
              </h2>
              <span className="text-xs font-bold text-bhagwa-400 tracking-wide">
                क्रीडा मंडळ CMS
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-maroon-800/60 flex items-center justify-between text-xs text-orange-200/80">
            <div className="flex items-center gap-1.5 truncate">
              <Shield className="w-3.5 h-3.5 text-bhagwa-400 shrink-0" />
              <span className="truncate">{userEmail || "प्रशासक"}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${isDemo ? "bg-amber-950/80 border-amber-500 text-amber-300" : "bg-emerald-950/80 border-emerald-600 text-emerald-400"}`}>
              {isDemo ? "ट्रायल मोड" : "सक्रिय"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-maroon-700">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-sm font-semibold group min-h-[44px] ${
                  isActive
                    ? "bg-bhagwa-600 text-white shadow-md font-bold"
                    : "text-orange-100/90 hover:bg-maroon-800/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-bhagwa-400 group-hover:text-bhagwa-300"
                    }`}
                  />
                  <div className="flex flex-col text-left">
                    <span className="leading-tight">{item.label}</span>
                    <span className="text-[10px] text-orange-200/60 font-normal">
                      {item.subLabel}
                    </span>
                  </div>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-maroon-800/80 space-y-2 bg-black/20">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-maroon-900/80 hover:bg-maroon-800 text-orange-200 text-xs font-semibold transition-colors border border-maroon-700/50 min-h-[44px]"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-bhagwa-400" />
              <span>संकेतस्थळ उघडा (View Site)</span>
            </div>
            <span className="text-[10px] bg-maroon-800 px-1.5 py-0.5 rounded text-orange-300">
              Live
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white text-xs font-semibold transition-colors border border-red-900/40 min-h-[44px]"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>बाहेर पडा (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Announcement Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-orange-100 shadow-2xs">
          <div>
            <h1 className="font-heading text-xl font-bold text-maroon-950">
              धर्मवीर संभाजी क्रीडा मंडळ
            </h1>
            <p className="text-xs text-gray-500">
              वेबसाइट नियंत्रण कक्ष · बदल थेट संकेतस्थळावर त्वरित लागू होतात
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isDemo && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>चाचणी / डेमो मोड (Demo Mode)</span>
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-bhagwa-300 text-bhagwa-800 text-xs font-bold hover:bg-orange-100 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-bhagwa-600" />
              <span>लाइव्ह साइट पाहा</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
