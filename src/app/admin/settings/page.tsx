"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Instagram,
  Youtube,
  Send,
  Calendar,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mandalData } from "@/data/mandal";

export default function AdminSettingsPage() {
  const [address, setAddress] = useState(mandalData.contact.addressMarathi);
  const [instagramUrl, setInstagramUrl] = useState(mandalData.social.instagram);
  const [youtubeUrl, setYoutubeUrl] = useState(mandalData.social.youtube);
  const [telegramUrl, setTelegramUrl] = useState(mandalData.social.telegram);
  const [establishedMarathi, setEstablishedMarathi] = useState(mandalData.establishedMarathi);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    async function loadSettings() {
      if (!configured) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        if (!supabase) return;

        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "contact_info")
          .maybeSingle();

        if (data?.value) {
          if (data.value.addressMarathi) setAddress(data.value.addressMarathi);
          if (data.value.instagramUrl) setInstagramUrl(data.value.instagramUrl);
          if (data.value.youtubeUrl) setYoutubeUrl(data.value.youtubeUrl);
          if (data.value.telegramUrl) setTelegramUrl(data.value.telegramUrl);
          if (data.value.establishedMarathi) setEstablishedMarathi(data.value.establishedMarathi);
        }
      } catch (err) {
        console.warn("Could not load settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [configured]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSaving(true);

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      const payload = {
        addressMarathi: address.trim(),
        instagramUrl: instagramUrl.trim(),
        youtubeUrl: youtubeUrl.trim(),
        telegramUrl: telegramUrl.trim(),
        establishedMarathi: establishedMarathi.trim(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "contact_info", value: payload }, { onConflict: "key" });

      if (error) throw error;
      setSuccessMsg("सेटिंग्ज व संपर्क माहिती यशस्वीरीत्या अद्ययावत केली!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "जतन करताना त्रुटी आली.";
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
          <Settings className="w-3.5 h-3.5 text-bhagwa-600" />
          <span>सामान्य मांडणी</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
          मंडळ सेटिंग्ज व संपर्क माहिती
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          पत्ता, सोशल मीडिया लिंक्स (Instagram, YouTube, Telegram) व स्थापना माहिती बदला.
        </p>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm">
        <form onSubmit={handleSaveSettings} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-bhagwa-600" />
              <span>अधिकृत मंडळ पत्ता (मराठी)</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-bhagwa-600" />
              <span>स्थापना वर्ष (मराठी)</span>
            </label>
            <input
              type="text"
              required
              value={establishedMarathi}
              onChange={(e) => setEstablishedMarathi(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
            />
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-4">
            <h3 className="font-heading font-bold text-sm text-maroon-900">
              सोशल मीडिया लिंक्स
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram URL</span>
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-600" />
                <span>YouTube URL</span>
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-sky-600" />
                <span>Telegram URL</span>
              </label>
              <input
                type="url"
                value={telegramUrl}
                onChange={(e) => setTelegramUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 min-h-[44px]"
            >
              {saving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <Save className="w-4 h-4" />
              <span>सेटिंग्ज जतन करा (Save Settings)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
