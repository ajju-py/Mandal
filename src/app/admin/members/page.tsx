"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  X,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaImage } from "@/lib/supabase/storage";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { leadershipTeam, TeamMember } from "@/data/team";

interface MemberRecord {
  id: string;
  name: string;
  names?: string[];
  position: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  badge?: string;
  is_memorial?: boolean;
  memorial_note?: string;
}

function MembersContent() {
  const searchParams = useSearchParams();
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRecord | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formPosition, setFormPosition] = useState("");
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);
  const [formBadge, setFormBadge] = useState("");
  const [formIsMemorial, setFormIsMemorial] = useState(false);
  const [formMemorialNote, setFormMemorialNote] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configured = isSupabaseConfigured();

  // Load members from Supabase or fallback
  const loadMembers = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!configured) {
      // Map static dataset to format
      const mapped = leadershipTeam.map((m, idx) => ({
        id: m.id,
        name: m.name || (m.names ? m.names.join(" आणि ") : "पदाधिकारी"),
        names: m.names,
        position: m.role,
        image_url: m.image || m.photo || "",
        display_order: idx + 1,
        is_active: true,
        badge: m.badge,
        is_memorial: m.isMemorial,
        memorial_note: m.memorialNote,
      }));
      setMembers(mapped);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client initialize होऊ शकले नाही.");

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMembers(data);
      } else {
        // If Supabase table is empty, show default static data with seed button
        const mapped = leadershipTeam.map((m, idx) => ({
          id: m.id,
          name: m.name || (m.names ? m.names.join(" आणि ") : "पदाधिकारी"),
          names: m.names,
          position: m.role,
          image_url: m.image || m.photo || "",
          display_order: idx + 1,
          is_active: true,
          badge: m.badge,
          is_memorial: m.isMemorial,
          memorial_note: m.memorialNote,
        }));
        setMembers(mapped);
      }
    } catch (err: unknown) {
      console.error("Failed to load members:", err);
      setErrorMsg("पदाधिकाऱ्यांची सूची लोड करताना त्रुटी आली.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
    if (searchParams.get("action") === "add") {
      openAddModal();
    }
  }, []);

  const openAddModal = () => {
    setEditingMember(null);
    setFormName("");
    setFormPosition("");
    setFormOrder(members.length + 1);
    setFormActive(true);
    setFormBadge("");
    setFormIsMemorial(false);
    setFormMemorialNote("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member: MemberRecord) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormPosition(member.position);
    setFormOrder(member.display_order);
    setFormActive(member.is_active);
    setFormBadge(member.badge || "");
    setFormIsMemorial(member.is_memorial || false);
    setFormMemorialNote(member.memorial_note || "");
    setSelectedFile(null);
    setPreviewUrl(member.image_url);
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

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formName.trim() || !formPosition.trim()) {
      setErrorMsg("कृपया पदाधिकाऱ्याचे नाव आणि पद दोन्ही प्रविष्ट करा.");
      return;
    }

    if (!editingMember && !selectedFile && !previewUrl) {
      setErrorMsg("कृपया छायाचित्र निवडा.");
      return;
    }

    setSaveLoading(true);

    try {
      let finalImageUrl = editingMember ? editingMember.image_url : previewUrl || "";

      // If user uploaded a new image file, upload to Supabase Storage
      if (selectedFile) {
        const uploadResult = await uploadMediaImage(selectedFile, "leadership");
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "छायाचित्र अपलोड अयशस्वी झाले.");
        }
        finalImageUrl = uploadResult.url;
      }

      // Detect dual-names: if user typed "आणि" or "||" or comma
      let namesArray: string[] | undefined = undefined;
      if (formName.includes(" आणि ")) {
        namesArray = formName.split(" आणि ").map((s) => s.trim());
      } else if (formName.includes(" || ")) {
        namesArray = formName.split(" || ").map((s) => s.trim());
      }

      const memberPayload = {
        name: formName.trim(),
        names: namesArray,
        position: formPosition.trim(),
        image_url: finalImageUrl,
        display_order: Number(formOrder) || 1,
        is_active: formActive,
        badge: formBadge.trim() || null,
        is_memorial: formIsMemorial,
        memorial_note: formIsMemorial ? (formMemorialNote.trim() || "आदरणीय स्मृती") : null,
      };

      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत. बदल जतन करण्यासाठी .env.local जोडा.");
      }

      if (editingMember) {
        // UPDATE existing
        const { error } = await supabase
          .from("members")
          .update(memberPayload)
          .eq("id", editingMember.id);

        if (error) throw error;
        setSuccessMsg("पदाधिकारी माहिती यशस्वीरीत्या अद्ययावत केली!");
      } else {
        // INSERT new
        const { error } = await supabase
          .from("members")
          .insert([memberPayload]);

        if (error) throw error;
        setSuccessMsg("नवीन पदाधिकारी यशस्वीरीत्या जोडला गेला!");
      }

      setIsModalOpen(false);
      await loadMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "जतन करताना त्रुटी आली.";
      setErrorMsg(msg);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `तुम्हाला खात्री आहे का की '${name}' यांना हटवायचे आहे?`
    );
    if (!confirmDelete) return;

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Supabase क्रेडेंशियल्स सक्रिय नाहीत.");
      }

      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSuccessMsg(`'${name}' हटवले गेले.`);
      await loadMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "हटवताना त्रुटी आली.";
      alert(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-orange-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bhagwa-100 text-bhagwa-800 text-xs font-bold">
            <Users className="w-3.5 h-3.5 text-bhagwa-600" />
            <span>मंडळ नेतृत्व</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-maroon-950">
            पदाधिकारी व्यवस्थापन
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            येथून पदाधिकारी जोडा, संपादित करा, क्रम बदला किंवा फोटो अपलोड करा.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>+ नवीन पदाधिकारी जोडा</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-700 hover:text-red-900 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Members Table / List */}
      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">पदाधिकाऱ्यांची माहिती लोड होत आहे...</span>
          </div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <Users className="w-12 h-12 mx-auto text-gray-300" />
            <p className="text-base font-semibold">कोणतेही पदाधिकारी सापडले नाहीत.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bhagwa-gradient text-white text-xs font-bold"
            >
              + पहिला पदाधिकारी जोडा
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-50/70 border-b border-orange-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-16">क्रम</th>
                  <th className="py-3.5 px-4">छायाचित्र</th>
                  <th className="py-3.5 px-4">नाव (Name)</th>
                  <th className="py-3.5 px-4">पद / जबाबदारी (Position)</th>
                  <th className="py-3.5 px-4 text-center">स्थिती (Status)</th>
                  <th className="py-3.5 px-4 text-right">कृती (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-orange-50/30 transition-colors"
                  >
                    {/* Order */}
                    <td className="py-3 px-4 text-center font-bold text-gray-500 text-xs">
                      #{member.display_order}
                    </td>

                    {/* Photo Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-bhagwa-300 bg-orange-50 shrink-0 shadow-2xs">
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-heading font-bold text-maroon-900 text-base">
                        {member.name}
                      </div>
                      {member.badge && (
                        <span className="inline-block text-[10px] font-bold text-bhagwa-700 bg-bhagwa-50 px-2 py-0.5 rounded border border-bhagwa-200 mt-0.5">
                          {member.badge}
                        </span>
                      )}
                      {member.is_memorial && (
                        <span className="inline-block ml-1.5 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 mt-0.5">
                          श्रद्धांजली
                        </span>
                      )}
                    </td>

                    {/* Position */}
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {member.position}
                    </td>

                    {/* Active Status */}
                    <td className="py-3 px-4 text-center">
                      {member.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>सक्रिय</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          <XCircle className="w-3 h-3 text-gray-400" />
                          <span>निष्क्रिय</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-bhagwa-700 hover:text-bhagwa-900 border border-orange-200 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                          title="संपादित करा"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 border border-red-200 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                          title="हटवा"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-orange-100 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-bhagwa-100 text-bhagwa-700 flex items-center justify-center font-bold">
                  {editingMember ? <Edit2 className="w-4 h-4" /> : <Plus className="w-5 h-5" />}
                </div>
                <h3 className="font-heading text-xl font-bold text-maroon-950">
                  {editingMember ? "पदाधिकारी माहिती बदला" : "नवीन पदाधिकारी जोडा"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  पदाधिकाऱ्याचे छायाचित्र (Photo)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-bhagwa-400 bg-orange-50 shadow-md shrink-0 flex items-center justify-center">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-bhagwa-300" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-bhagwa-800 text-xs font-bold transition-all shadow-2xs"
                    >
                      <Upload className="w-4 h-4 text-bhagwa-600" />
                      <span>{previewUrl ? "फोटो बदला" : "फोटो निवडा"}</span>
                    </button>
                    <p className="text-[11px] text-gray-500">
                      JPG, PNG किंवा WEBP (कमाल १० MB). आपोआप क्लाऊड स्टोरेजमध्ये सेव्ह होईल.
                    </p>
                  </div>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  पूर्ण नाव (Name) *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="उदा. कल्याण औटे किंवा सुशील सातदिवे आणि मंगेश थोरात"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 text-sm outline-hidden bg-gray-50/40 focus:bg-white"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  दोन व्यक्तींचे संयुक्त कार्ड असल्यास दोघांच्या नावात &apos;आणि&apos; लिहा.
                </p>
              </div>

              {/* Position Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  पद / जबाबदारी (Position / Title) *
                </label>
                <input
                  type="text"
                  required
                  value={formPosition}
                  onChange={(e) => setFormPosition(e.target.value)}
                  placeholder="उदा. मंडळ ट्रस्ट अध्यक्ष"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 text-sm outline-hidden bg-gray-50/40 focus:bg-white"
                />
              </div>

              {/* Order and Active status in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    दर्शनाचा क्रम (Display Order)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 text-sm outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    पर्यायी बॅज (Badge)
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="उदा. संस्थापक / ट्रस्ट अध्यक्ष"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-bhagwa-500 text-sm outline-hidden"
                  />
                </div>
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 text-bhagwa-600 rounded border-gray-300 focus:ring-bhagwa-500"
                />
                <label htmlFor="activeToggle" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  सक्रिय (वेबसाइटवर लगेच दाखवा)
                </label>
              </div>

              {/* Memorial Checkbox */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="memorialToggle"
                    checked={formIsMemorial}
                    onChange={(e) => setFormIsMemorial(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                  />
                  <label htmlFor="memorialToggle" className="text-sm font-semibold text-amber-900 cursor-pointer">
                    स्मृती / श्रद्धांजली कार्ड (कै. व्यक्तींसाठी)
                  </label>
                </div>

                {formIsMemorial && (
                  <input
                    type="text"
                    value={formMemorialNote}
                    onChange={(e) => setFormMemorialNote(e.target.value)}
                    placeholder="उदा. आदरणीय स्मृती व अखंड प्रेरणा स्थान"
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-xs sm:text-sm outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-3 rounded-xl bhagwa-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center gap-2 min-h-[44px]"
                >
                  {saveLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>जतन करा (Save Member)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminMembersPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-bhagwa-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">पदाधिकाऱ्यांची माहिती लोड होत आहे...</span>
        </div>
      }
    >
      <MembersContent />
    </React.Suspense>
  );
}
