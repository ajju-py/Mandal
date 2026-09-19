"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  X,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaImage } from "@/lib/supabase/storage";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mentorsList, MentorItem } from "@/data/mentors";

interface MentorRecord {
  id: string;
  name?: string | null;
  role_title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  object_position?: string;
  scale?: number;
  translate_y?: string;
}

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<MentorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<MentorRecord | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formRoleTitle, setFormRoleTitle] = useState("मार्गदर्शक");
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configured = isSupabaseConfigured();

  const loadMentors = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!configured) {
      const mapped: MentorRecord[] = mentorsList.map((m, idx) => ({
        id: m.id,
        name: m.name || null,
        role_title: m.roleTitle || "मार्गदर्शक",
        image_url: m.image || m.photo || "",
        display_order: idx + 1,
        is_active: true,
        object_position: m.objectPosition,
        scale: m.scale,
        translate_y: m.translateY,
      }));
      setMentors(mapped);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client initialize होऊ शकले नाही.");

      const { data, error } = await supabase
        .from("mentors")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMentors(data);
      } else {
        const mapped: MentorRecord[] = mentorsList.map((m, idx) => ({
          id: m.id,
          name: m.name || null,
          role_title: m.roleTitle || "मार्गदर्शक",
          image_url: m.image || m.photo || "",
          display_order: idx + 1,
          is_active: true,
          object_position: m.objectPosition,
          scale: m.scale,
          translate_y: m.translateY,
        }));
        setMentors(mapped);
      }
    } catch (err: unknown) {
      console.error("Failed to load mentors:", err);
      setErrorMsg("मार्गदर्शकांची सूची लोड करताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  const openAddModal = () => {
    setEditingMentor(null);
    setFormName("");
    setFormRoleTitle("मार्गदर्शक");
    setFormOrder(mentors.length + 1);
    setFormActive(true);
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (mentor: MentorRecord) => {
    setEditingMentor(mentor);
    setFormName(mentor.name || "");
    setFormRoleTitle(mentor.role_title || "मार्गदर्शक");
    setFormOrder(mentor.display_order);
    setFormActive(mentor.is_active);
    setSelectedFile(null);
    setPreviewUrl(mentor.image_url);
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

  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!editingMentor && !selectedFile && !previewUrl) {
      setErrorMsg("कृपया छायाचित्र निवडा.");
      return;
    }

    setSaveLoading(true);

    try {
      let finalImageUrl = editingMentor ? editingMentor.image_url : previewUrl || "";

      if (selectedFile) {
        const uploadResult = await uploadMediaImage(selectedFile, "mentors");
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "छायाचित्र अपलोड अयशस्वी झाले.");
        }
        finalImageUrl = uploadResult.url;
      }

      const mentorPayload = {
        name: formName.trim() || null,
        role_title: formRoleTitle.trim() || "मार्गदर्शक",
        image_url: finalImageUrl,
        display_order: Number(formOrder) || 1,
        is_active: formActive,
      };

      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत. बदल जतन करण्यासाठी .env.local जोडा.");
      }

      if (editingMentor) {
        const { error } = await supabase
          .from("mentors")
          .update(mentorPayload)
          .eq("id", editingMentor.id);

        if (error) throw error;
        setSuccessMsg("मार्गदर्शक माहिती अद्ययावत केली!");
      } else {
        const { error } = await supabase
          .from("mentors")
          .insert([mentorPayload]);

        if (error) throw error;
        setSuccessMsg("नवीन मार्गदर्शक यशस्वीरीत्या जोडले गेले!");
      }

      setIsModalOpen(false);
      await loadMentors();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "जतन करताना त्रुटी आली.";
      setErrorMsg(msg);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteMentor = async (id: string, label: string) => {
    const confirmDelete = window.confirm(
      `तुम्हाला खात्री आहे का की '${label}' यांना सूचीतून हटवायचे आहे?`
    );
    if (!confirmDelete) return;

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");

      const { error } = await supabase.from("mentors").delete().eq("id", id);
      if (error) throw error;

      setSuccessMsg(`मार्गदर्शक नोंदी हटवली.`);
      await loadMentors();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "हटवताना त्रुटी आली.";
      alert(msg);
    }
  };

  const filteredMentors = mentors.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(q)) ||
      m.role_title.toLowerCase().includes(q) ||
      String(m.display_order).includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-orange-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-bhagwa-600" />
            <span>मार्गदर्शन परिवार</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
            मार्गदर्शक व्यवस्थापन ({mentors.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            मंडळाच्या ३२ मार्गदर्शकांची सूची संपादित करा किंवा नवीन मार्गदर्शक जोडा.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>+ नवीन मार्गदर्शक जोडा</span>
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

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="मार्गदर्शक शोधा..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500 bg-white"
        />
      </div>

      {/* Mentors Grid Display */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">मार्गदर्शकांची माहिती लोड होत आहे...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl p-3 border border-orange-100 shadow-2xs hover:shadow-md hover:border-bhagwa-300 transition-all flex flex-col items-center text-center justify-between group relative"
            >
              <div className="absolute top-2 left-2 text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded-full">
                #{mentor.display_order}
              </div>

              {/* Status indicator */}
              <div className="absolute top-2 right-2">
                {mentor.is_active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" title="सक्रिय" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 block" title="निष्क्रिय" />
                )}
              </div>

              {/* Photo */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden my-3 border-2 border-orange-200 group-hover:border-bhagwa-500 transition-colors shadow-2xs bg-orange-50">
                <Image
                  src={mentor.image_url}
                  alt={mentor.name || mentor.role_title}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                />
              </div>

              {/* Name / Role */}
              <div className="space-y-0.5 my-1 w-full truncate">
                <h4 className="font-heading font-bold text-sm text-maroon-900 truncate">
                  {mentor.name || mentor.role_title}
                </h4>
                {mentor.name && (
                  <span className="text-[11px] text-gray-500 block">
                    {mentor.role_title}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100 w-full justify-center">
                <button
                  onClick={() => openEditModal(mentor)}
                  className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-bhagwa-700 transition-colors"
                  title="संपादित करा"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteMentor(mentor.id, mentor.name || `मार्गदर्शक #${mentor.display_order}`)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  title="हटवा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Mentor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-bhagwa-100 text-bhagwa-700 flex items-center justify-center font-bold">
                  {editingMentor ? <Edit2 className="w-4 h-4" /> : <Plus className="w-5 h-5" />}
                </div>
                <h3 className="font-heading text-xl font-bold text-maroon-950">
                  {editingMentor ? "मार्गदर्शक माहिती बदला" : "नवीन मार्गदर्शक जोडा"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMentor} className="space-y-4">
              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  छायाचित्र (Photo)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-bhagwa-400 bg-orange-50 shrink-0 flex items-center justify-center">
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
                  <div className="space-y-1">
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
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-bhagwa-800 text-xs font-bold transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-bhagwa-600" />
                      <span>{previewUrl ? "फोटो बदला" : "फोटो निवडा"}</span>
                    </button>
                    <p className="text-[10px] text-gray-500">
                      कमाल १० MB (JPG, PNG, WEBP)
                    </p>
                  </div>
                </div>
              </div>

              {/* Name (Optional) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  नाव (Name) - पर्यायी
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="नाव माहित असल्यास लिहा, नसल्यास रिकामे ठेवा"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  नाव न दिल्यास कार्डवर आपोआप &apos;मार्गदर्शक&apos; असे दिसेल.
                </p>
              </div>

              {/* Role Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  पद / लेबल (Role Title)
                </label>
                <input
                  type="text"
                  value={formRoleTitle}
                  onChange={(e) => setFormRoleTitle(e.target.value)}
                  placeholder="उदा. मार्गदर्शक"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-hidden focus:ring-2 focus:ring-bhagwa-500"
                />
              </div>

              {/* Order and Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    दर्शनाचा क्रम (Order)
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
                    id="mentorActive"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="w-4 h-4 text-bhagwa-600 rounded border-gray-300 focus:ring-bhagwa-500"
                  />
                  <label htmlFor="mentorActive" className="text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer">
                    सक्रिय
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
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
