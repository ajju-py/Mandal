"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ImageIcon,
  Upload,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Layers,
  X,
  Eye,
  Sliders,
  Play,
  RotateCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaImage } from "@/lib/supabase/storage";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { allGalleryPhotos, GalleryImage } from "@/data/gallery";

interface GalleryRecord {
  id: string;
  image_url: string;
  title?: string | null;
  caption?: string | null;
  category: string;
  year?: string | null;
  display_order: number;
  is_active: boolean;
  show_in_slideshow: boolean;
  created_at?: string;
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter & tab
  const [activeTab, setActiveTab] = useState<"all" | "2k23" | "archive" | "slideshow">("all");

  // Modal State for Single Upload / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryRecord | null>(null);

  // Upload Form Fields
  const [formCaption, setFormCaption] = useState("");
  const [formCategory, setFormCategory] = useState("2k23");
  const [formYear, setFormYear] = useState("२०२३");
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [formSlideshow, setFormSlideshow] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const configured = isSupabaseConfigured();

  const loadGallery = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!configured) {
      const mapped: GalleryRecord[] = allGalleryPhotos.map((p, idx) => ({
        id: p.id,
        image_url: p.src,
        title: p.title,
        caption: p.title,
        category: p.category,
        year: p.year,
        display_order: idx + 1,
        is_active: true,
        show_in_slideshow: true,
      }));
      setPhotos(mapped);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client initialize होऊ शकले नाही.");

      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setPhotos(data);
      } else {
        const mapped: GalleryRecord[] = allGalleryPhotos.map((p, idx) => ({
          id: p.id,
          image_url: p.src,
          title: p.title,
          caption: p.title,
          category: p.category,
          year: p.year,
          display_order: idx + 1,
          is_active: true,
          show_in_slideshow: true,
        }));
        setPhotos(mapped);
      }
    } catch (err: unknown) {
      console.error("Failed to load gallery:", err);
      setErrorMsg("गॅलरी छायाचित्रे लोड करताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openUploadModal = () => {
    setEditingPhoto(null);
    setFormCaption("");
    setFormCategory("2k23");
    setFormYear("२०२३");
    setFormOrder(photos.length + 1);
    setFormActive(true);
    setFormSlideshow(true);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (photo: GalleryRecord) => {
    setEditingPhoto(photo);
    setFormCaption(photo.title || photo.caption || "");
    setFormCategory(photo.category || "2k23");
    setFormYear(photo.year || "२०२३");
    setFormOrder(photo.display_order);
    setFormActive(photo.is_active);
    setFormSlideshow(photo.show_in_slideshow);
    setSelectedFiles([]);
    setPreviewUrls([photo.image_url]);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      const urls = files.map((f) => URL.createObjectURL(f));
      setPreviewUrls(urls);
    }
  };

  const handleSaveOrUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!editingPhoto && selectedFiles.length === 0) {
      setErrorMsg("कृपया किमान एक छायाचित्र निवडा.");
      return;
    }

    setUploading(true);
    setUploadProgress({ current: 0, total: editingPhoto ? 1 : selectedFiles.length });

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      if (editingPhoto) {
        // Edit single photo metadata
        let finalUrl = editingPhoto.image_url;
        if (selectedFiles.length > 0) {
          const res = await uploadMediaImage(selectedFiles[0], "gallery");
          if (!res.success || !res.url) throw new Error(res.error);
          finalUrl = res.url;
        }

        const { error } = await supabase
          .from("gallery")
          .update({
            title: formCaption.trim() || null,
            caption: formCaption.trim() || null,
            category: formCategory,
            year: formYear.trim() || "२०२३",
            display_order: Number(formOrder) || 1,
            is_active: formActive,
            show_in_slideshow: formSlideshow,
            image_url: finalUrl,
          })
          .eq("id", editingPhoto.id);

        if (error) throw error;
        setSuccessMsg("छायाचित्र माहिती यशस्वीरीत्या बदलली!");
      } else {
        // Upload 1 or multiple new photos
        const total = selectedFiles.length;
        const newRecords = [];

        for (let i = 0; i < total; i++) {
          setUploadProgress({ current: i + 1, total });
          const file = selectedFiles[i];

          const res = await uploadMediaImage(file, "gallery");
          if (!res.success || !res.url) {
            console.error(`Failed to upload ${file.name}:`, res.error);
            continue;
          }

          newRecords.push({
            image_url: res.url,
            title: formCaption.trim()
              ? `${formCaption.trim()} (${i + 1})`
              : `गणेशोत्सव - छायाचित्र ${photos.length + i + 1}`,
            caption: formCaption.trim() || null,
            category: formCategory,
            year: formYear.trim() || "२०२३",
            display_order: Number(formOrder) + i,
            is_active: formActive,
            show_in_slideshow: formSlideshow,
          });
        }

        if (newRecords.length > 0) {
          const { error } = await supabase.from("gallery").insert(newRecords);
          if (error) throw error;
          setSuccessMsg(`${newRecords.length} छायाचित्रे गॅलरी व स्लाईडशोमध्ये यशस्वीरीत्या अपलोड केली!`);
        }
      }

      setIsModalOpen(false);
      await loadGallery();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "अपलोड करताना त्रुटी आली.";
      setErrorMsg(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    const confirmDelete = window.confirm("हे छायाचित्र कायमचे हटवायचे आहे का?");
    if (!confirmDelete) return;

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;

      setSuccessMsg("छायाचित्र हटवले गेले.");
      await loadGallery();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "हटवताना त्रुटी आली.";
      alert(msg);
    }
  };

  const handleToggleSlideshow = async (photo: GalleryRecord) => {
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      const nextVal = !photo.show_in_slideshow;
      const { error } = await supabase
        .from("gallery")
        .update({ show_in_slideshow: nextVal })
        .eq("id", photo.id);

      if (error) throw error;

      setPhotos((prev) =>
        prev.map((p) => (p.id === photo.id ? { ...p, show_in_slideshow: nextVal } : p))
      );
    } catch (err: unknown) {
      console.error("Error toggling slideshow:", err);
    }
  };

  const filteredPhotos = photos.filter((p) => {
    if (activeTab === "2k23") return p.category === "2k23";
    if (activeTab === "archive") return p.category === "archive";
    if (activeTab === "slideshow") return p.show_in_slideshow && p.is_active;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-orange-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold">
            <ImageIcon className="w-3.5 h-3.5 text-bhagwa-600" />
            <span>छायाचित्र दालन & स्लाईडशो</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
            गॅलरी व्यवस्थापन ({photos.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            येथून अपलोड केलेले फोटो सार्वजनिक गॅलरी आणि मुख्यपृष्ठावरील स्लाईडशोमध्ये त्वरित दिसतील.
          </p>
        </div>

        <button
          onClick={openUploadModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all min-h-[48px]"
        >
          <Upload className="w-5 h-5" />
          <span>+ छायाचित्रे अपलोड करा</span>
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

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "all"
              ? "bg-bhagwa-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
          }`}
        >
          सर्व छायाचित्रे ({photos.length})
        </button>

        <button
          onClick={() => setActiveTab("2k23")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "2k23"
              ? "bg-bhagwa-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
          }`}
        >
          2K23 फोटो ({photos.filter((p) => p.category === "2k23").length})
        </button>

        <button
          onClick={() => setActiveTab("archive")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "archive"
              ? "bg-bhagwa-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
          }`}
        >
          जुनी आठवण संग्रह ({photos.filter((p) => p.category === "archive").length})
        </button>

        <button
          onClick={() => setActiveTab("slideshow")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "slideshow"
              ? "bg-maroon-800 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
          }`}
        >
          स्लाईडशोमधील फोटो ({photos.filter((p) => p.show_in_slideshow && p.is_active).length})
        </button>
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">गॅलरी फोटो लोड होत आहेत...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-2xs hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={photo.image_url}
                  alt={photo.title || "गॅलरी फोटो"}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Slideshow Active Badge */}
                <button
                  onClick={() => handleToggleSlideshow(photo)}
                  className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 ${
                    photo.show_in_slideshow
                      ? "bg-bhagwa-600 text-white"
                      : "bg-black/60 text-gray-300 hover:text-white"
                  }`}
                  title={photo.show_in_slideshow ? "होमपेज स्लाईडशोमध्ये चालू" : "स्लाईडशोमध्ये चालू करा"}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">स्लाईडशो</span>
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                  {photo.category === "2k23" ? "२०२३" : "संग्रहित"}
                </div>
              </div>

              {/* Meta & Actions */}
              <div className="p-3 space-y-2">
                <div className="text-xs font-semibold text-gray-800 line-clamp-1">
                  {photo.title || "छायाचित्र"}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
                  <span className="text-gray-400 font-bold">#{photo.display_order}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(photo)}
                      className="p-1 rounded text-gray-500 hover:text-bhagwa-700 hover:bg-orange-50"
                      title="संपादित करा"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-1 rounded text-gray-500 hover:text-red-600 hover:bg-red-50"
                      title="हटवा"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-heading text-xl font-bold text-maroon-950">
                {editingPhoto ? "छायाचित्र माहिती बदला" : "नवीन छायाचित्रे अपलोड करा"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOrUpload} className="space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  {editingPhoto ? "छायाचित्र बदला (पर्यायी)" : "छायाचित्रे निवडा (एक किंवा अनेक)"}
                </label>
                <input
                  ref={multiFileInputRef}
                  type="file"
                  multiple={!editingPhoto}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFilesSelected}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => multiFileInputRef.current?.click()}
                  className="w-full py-4 px-4 rounded-2xl border-2 border-dashed border-orange-300 hover:border-bhagwa-500 bg-orange-50/50 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 text-center"
                >
                  <Upload className="w-6 h-6 text-bhagwa-600" />
                  <span className="text-xs sm:text-sm font-bold text-bhagwa-900">
                    {previewUrls.length > 0
                      ? `${previewUrls.length} छायाचित्रे निवडली (बदलण्यासाठी क्लिक करा)`
                      : "मोबाईल किंवा कॉम्प्युटरवरून छायाचित्रे निवडा"}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    JPG, PNG किंवा WEBP फॉरमॅट (कमाल १० MB प्रति फोटो)
                  </span>
                </button>

                {/* Previews Strip */}
                {previewUrls.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto mt-3 p-2 bg-gray-50 rounded-xl">
                    {previewUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-orange-200"
                      >
                        <Image
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Caption / Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  शीर्षक / कॅप्शन (Caption)
                </label>
                <input
                  type="text"
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  placeholder="उदा. गणेशोत्सव २०२३ - भव्य मिरवणूक"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
                />
              </div>

              {/* Category & Year in 2 cols */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    विभाग (Category)
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500 bg-white"
                  >
                    <option value="2k23">2K23 गणेशोत्सव</option>
                    <option value="archive">Old Photo&apos;s (जुनी आठवण)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    वर्ष (Year)
                  </label>
                  <input
                    type="text"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="२०२३ किंवा वर्ष"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden"
                  />
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  दर्शनाचा क्रम (Display Order)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="slideshowToggle"
                    checked={formSlideshow}
                    onChange={(e) => setFormSlideshow(e.target.checked)}
                    className="w-4 h-4 text-bhagwa-600 rounded border-gray-300"
                  />
                  <label htmlFor="slideshowToggle" className="text-sm font-semibold text-gray-800 cursor-pointer">
                    मुख्यपृष्ठावरील स्लाईडशोमध्ये दाखवा (Homepage Slideshow)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="activeToggleGallery"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="w-4 h-4 text-bhagwa-600 rounded border-gray-300"
                  />
                  <label htmlFor="activeToggleGallery" className="text-sm font-semibold text-gray-800 cursor-pointer">
                    सक्रिय (गॅलरीमध्ये लगेच प्रदर्शित करा)
                  </label>
                </div>
              </div>

              {/* Upload progress indicator */}
              {uploading && (
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-bhagwa-800">
                    <span>अपलोड होत आहे...</span>
                    <span>
                      {uploadProgress.current} / {uploadProgress.total}
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-bhagwa-600 h-2 transition-all duration-300"
                      style={{
                        width: `${
                          uploadProgress.total > 0
                            ? (uploadProgress.current / uploadProgress.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
                >
                  {uploading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{editingPhoto ? "बदल जतन करा" : "अपलोड करा"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
