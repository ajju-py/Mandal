"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Handshake,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaImage } from "@/lib/supabase/storage";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { specialCooperationList } from "@/data/mentors";

interface CoopRecord {
  id: string;
  name?: string | null;
  role_title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export default function AdminSpecialCooperationPage() {
  const [items, setItems] = useState<CoopRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CoopRecord | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formRoleTitle, setFormRoleTitle] = useState("विशेष सहकार्य");
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configured = isSupabaseConfigured();

  const loadItems = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!configured) {
      const mapped = specialCooperationList.map((c, idx) => ({
        id: c.id,
        name: c.name || null,
        role_title: c.roleTitle || "विशेष सहकार्य",
        image_url: c.image || c.photo || "",
        display_order: idx + 1,
        is_active: true,
      }));
      setItems(mapped);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client initialize होऊ शकले नाही.");

      const { data, error } = await supabase
        .from("special_cooperation")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setItems(data);
      } else {
        const mapped = specialCooperationList.map((c, idx) => ({
          id: c.id,
          name: c.name || null,
          role_title: c.roleTitle || "विशेष सहकार्य",
          image_url: c.image || c.photo || "",
          display_order: idx + 1,
          is_active: true,
        }));
        setItems(mapped);
      }
    } catch (err: unknown) {
      console.error("Failed to load cooperation items:", err);
      setErrorMsg("विशेष सहकार्य सूची लोड करताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormRoleTitle("विशेष सहकार्य");
    setFormOrder(items.length + 1);
    setFormActive(true);
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: CoopRecord) => {
    setEditingItem(item);
    setFormName(item.name || "");
    setFormRoleTitle(item.role_title || "विशेष सहकार्य");
    setFormOrder(item.display_order);
    setFormActive(item.is_active);
    setSelectedFile(null);
    setPreviewUrl(item.image_url);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!editingItem && !selectedFile && !previewUrl) {
      setErrorMsg("कृपया छायाचित्र निवडा.");
      return;
    }

    setSaveLoading(true);

    try {
      let finalImageUrl = editingItem ? editingItem.image_url : previewUrl || "";

      if (selectedFile) {
        const uploadResult = await uploadMediaImage(selectedFile, "special-cooperation");
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "छायाचित्र अपलोड अयशस्वी झाले.");
        }
        finalImageUrl = uploadResult.url;
      }

      const coopPayload = {
        name: formName.trim() || null,
        role_title: formRoleTitle.trim() || "विशेष सहकार्य",
        image_url: finalImageUrl,
        display_order: Number(formOrder) || 1,
        is_active: formActive,
      };

      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");
      }

      if (editingItem) {
        const { error } = await supabase
          .from("special_cooperation")
          .update(coopPayload)
          .eq("id", editingItem.id);

        if (error) throw error;
        setSuccessMsg("विशेष सहकार्य नोंद अद्ययावत केली!");
      } else {
        const { error } = await supabase
          .from("special_cooperation")
          .insert([coopPayload]);

        if (error) throw error;
        setSuccessMsg("नवीन सहकार्य नोंद जोडली गेली!");
      }

      setIsModalOpen(false);
      await loadItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "जतन करताना त्रुटी आली.";
      setErrorMsg(msg);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    const confirmDelete = window.confirm("तुम्हाला खात्री आहे का की ही नोंद हटवायची आहे?");
    if (!confirmDelete) return;

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      const { error } = await supabase.from("special_cooperation").delete().eq("id", id);
      if (error) throw error;

      setSuccessMsg("नोंद हटवली गेली.");
      await loadItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "हटवताना त्रुटी आली.";
      alert(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-orange-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold">
            <Handshake className="w-3.5 h-3.5 text-bhagwa-600" />
            <span>सहकार्य</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
            विशेष सहकार्य व्यवस्थापन ({items.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            मंडळाच्या उपक्रमांमध्ये मोलाचे सहकार्य करणाऱ्या मान्यवरांची छायाचित्रे.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>+ नवीन सहकार्य नोंद जोडा</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cards List */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">माहिती लोड होत आहे...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-orange-100 shadow-sm hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col items-center text-center justify-between group relative"
            >
              <div className="w-full flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="font-bold">#{item.display_order}</span>
                {item.is_active ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    सक्रिय
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">
                    निष्क्रिय
                  </span>
                )}
              </div>

              {/* Photo */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden mb-3 border-2 border-orange-200 group-hover:border-bhagwa-400 transition-all shadow-inner bg-gray-50">
                <Image
                  src={item.image_url}
                  alt={item.name || item.role_title}
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  className="object-cover"
                />
              </div>

              {/* Title / Name */}
              <div className="space-y-1 mb-3">
                <div className="font-heading font-bold text-base text-maroon-900">
                  {item.name || item.role_title}
                </div>
                {item.name && (
                  <span className="text-xs text-bhagwa-700 font-semibold block">
                    {item.role_title}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full pt-3 border-t border-gray-100 justify-center">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-bhagwa-800 text-xs font-bold transition-colors min-h-[38px]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>संपादित करा</span>
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                  title="हटवा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-heading text-xl font-bold text-maroon-950">
                {editingItem ? "सहकार्य नोंद बदला" : "नवीन सहकार्य जोडा"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  छायाचित्र (Photo)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-bhagwa-400 bg-orange-50 shrink-0 flex items-center justify-center">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Camera className="w-6 h-6 text-bhagwa-300" />
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-bhagwa-800 text-xs font-bold"
                    >
                      <Upload className="w-3.5 h-3.5 inline mr-1" />
                      <span>{previewUrl ? "फोटो बदला" : "फोटो निवडा"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  शीर्षक / लेबल (Title)
                </label>
                <input
                  type="text"
                  value={formRoleTitle}
                  onChange={(e) => setFormRoleTitle(e.target.value)}
                  placeholder="विशेष सहकार्य"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  नाव (Name) - पर्यायी
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="नाव माहित नसल्यास रिकामे ठेवा"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    क्रम (Order)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="coopActive"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="w-4 h-4 text-bhagwa-600 rounded border-gray-300"
                  />
                  <label htmlFor="coopActive" className="text-sm font-semibold text-gray-700">
                    सक्रिय
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
                >
                  {saveLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>जतन करा</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
