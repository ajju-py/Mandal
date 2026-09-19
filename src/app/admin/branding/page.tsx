"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Flag,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaImage } from "@/lib/supabase/storage";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminBrandingPage() {
  const [logoUrl, setLogoUrl] = useState("/images/branding/mandal-logo.png");
  const [logoAlt, setLogoAlt] = useState("धर्मवीर संभाजी क्रीडा मंडळ अधिकृत लोगो");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configured = isSupabaseConfigured();

  const loadBranding = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!configured) {
      setLogoUrl("/images/branding/mandal-logo.png");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client initialize होऊ शकले नाही.");

      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "site_logo")
        .maybeSingle();

      if (error) throw error;

      if (data?.value?.url) {
        setLogoUrl(data.value.url);
        if (data.value.alt) setLogoAlt(data.value.alt);
      }
    } catch (err: unknown) {
      console.warn("Failed to load branding from Supabase:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranding();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedFile && !previewUrl) {
      setErrorMsg("कृपया नवीन लोगो छायाचित्र निवडा.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");
      }

      let finalUrl = logoUrl;

      if (selectedFile) {
        const uploadResult = await uploadMediaImage(selectedFile, "branding");
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "लोगो अपलोड अयशस्वी झाले.");
        }
        finalUrl = uploadResult.url;
      }

      const { error } = await supabase
        .from("site_settings")
        .upsert(
          {
            key: "site_logo",
            value: {
              url: finalUrl,
              alt: logoAlt.trim() || "धर्मवीर संभाजी क्रीडा मंडळ अधिकृत लोगो",
              updated_at: new Date().toISOString(),
            },
          },
          { onConflict: "key" }
        );

      if (error) throw error;

      setLogoUrl(finalUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSuccessMsg("अधिकृत मंडळ लोगो यशस्वीरीत्या बदलण्यात आला! आता हा लोगो संपूर्ण वेबसाइटवर दिसेल.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "लोगो जतन करताना त्रुटी आली.";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-orange-100 shadow-sm space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold">
          <Flag className="w-3.5 h-3.5 text-bhagwa-600" />
          <span>अधिकृत ब्रँडिंग</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
          मंडळ लोगो व ब्रँडिंग (Canonical Logo)
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          येथे बदललेला अधिकृत लोगो थेट नेव्हबार (Navbar), फूटर (Footer) आणि संपूर्ण वेबसाइटवर एकच अधिकृत स्रोत म्हणून आपोआप अपडेट होतो.
        </p>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Logo Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm space-y-6">
        <h2 className="font-heading text-lg font-bold text-maroon-900 border-b border-gray-100 pb-3">
          सध्याचा सक्रिय लोगो (Active Official Logo)
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Logo Visual Box */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-bhagwa-400 bg-bhagwa-50/70 p-2 shadow-lg shrink-0 flex items-center justify-center">
            <Image
              src={previewUrl || logoUrl}
              alt={logoAlt}
              fill
              sizes="176px"
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                अधिकृत इमेज पाथ / URL
              </span>
              <p className="font-mono text-xs bg-gray-50 p-2 rounded-xl border border-gray-200 break-all text-gray-700 mt-1">
                {previewUrl ? "(नवीन निवडलेली फाईल)" : logoUrl}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              पारदर्शक बॅकग्राउंड (Transparent PNG किंवा WEBP) असलेला लोगो सर्वोत्तम दिसतो.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-bhagwa-800 text-xs sm:text-sm font-bold transition-all shadow-2xs"
            >
              <Upload className="w-4 h-4 text-bhagwa-600" />
              <span>नवीन लोगो फाईल निवडा</span>
            </button>
          </div>
        </div>

        {/* Save Form */}
        <form onSubmit={handleSaveLogo} className="pt-4 border-t border-gray-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              लोगो ऑल्ट मजकूर (Alt Text / Description)
            </label>
            <input
              type="text"
              value={logoAlt}
              onChange={(e) => setLogoAlt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {previewUrl && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold"
              >
                रद्द करा
              </button>
            )}

            <button
              type="submit"
              disabled={saving || (!selectedFile && previewUrl === null)}
              className="px-6 py-3 rounded-xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2 min-h-[44px]"
            >
              {saving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>लोगो बदला व सेव्ह करा</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
