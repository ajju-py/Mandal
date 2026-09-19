import { getPublicClient } from "@/lib/supabase/public";
import { leadershipTeam, TeamMember } from "@/data/team";
import { mentorsList, specialCooperationList, MentorItem } from "@/data/mentors";
import { allGalleryPhotos, gallery2023List, galleryArchiveList, GalleryImage } from "@/data/gallery";
import { mandalData, MandalInfo } from "@/data/mandal";

export interface BrandingInfo {
  logoUrl: string;
  logoAlt: string;
}

interface MemberRow {
  id: string;
  name: string;
  names?: string[] | null;
  position: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  badge?: string | null;
  is_memorial?: boolean | null;
  memorial_note?: string | null;
  object_position?: string | null;
  scale?: number | null;
}

interface MentorRow {
  id: string;
  name?: string | null;
  role_title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  object_position?: string | null;
  scale?: number | null;
  translate_y?: string | null;
}

interface CoopRow {
  id: string;
  name?: string | null;
  role_title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  object_position?: string | null;
  scale?: number | null;
}

interface GalleryRow {
  id: string;
  image_url: string;
  title?: string | null;
  caption?: string | null;
  category: string;
  year?: string | null;
  display_order: number;
  is_active: boolean;
  show_in_slideshow: boolean;
}

/**
 * Fetch all published leadership members.
 * Falls back to static dataset if Supabase is unconfigured or empty.
 */
export async function fetchLeadershipMembers(): Promise<TeamMember[]> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return leadershipTeam;

    const res = await supabase
      .from("members")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    const { data, error } = res as unknown as { data: MemberRow[] | null; error: Error | null };

    if (error || !data || data.length === 0) {
      return leadershipTeam;
    }

    return data.map((item: MemberRow) => ({
      id: item.id,
      name: item.name,
      names: Array.isArray(item.names) && item.names.length > 0 ? item.names : undefined,
      role: item.position,
      image: item.image_url,
      photo: item.image_url,
      badge: item.badge || undefined,
      isMemorial: item.is_memorial || false,
      memorialNote: item.memorial_note || undefined,
      objectPosition: item.object_position || "center 10%",
      scale: item.scale ? Number(item.scale) : 1.0,
    }));
  } catch (err) {
    console.warn("fetchLeadershipMembers fallback triggered:", err);
    return leadershipTeam;
  }
}

/**
 * Fetch all published mentors.
 * Falls back to static dataset if Supabase is unconfigured or empty.
 */
export async function fetchMentors(): Promise<MentorItem[]> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return mentorsList;

    const res = await supabase
      .from("mentors")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    const { data, error } = res as unknown as { data: MentorRow[] | null; error: Error | null };

    if (error || !data || data.length === 0) {
      return mentorsList;
    }

    return data.map((item: MentorRow) => ({
      id: item.id,
      image: item.image_url,
      photo: item.image_url,
      name: item.name || undefined,
      roleTitle: item.role_title || "मार्गदर्शक",
      objectPosition: item.object_position || "center 10%",
      scale: item.scale ? Number(item.scale) : 1.0,
      translateY: item.translate_y || undefined,
    }));
  } catch (err) {
    console.warn("fetchMentors fallback triggered:", err);
    return mentorsList;
  }
}

/**
 * Fetch all published special cooperation entries.
 * Falls back to static dataset if Supabase is unconfigured or empty.
 */
export async function fetchSpecialCooperation(): Promise<MentorItem[]> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return specialCooperationList;

    const res = await supabase
      .from("special_cooperation")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    const { data, error } = res as unknown as { data: CoopRow[] | null; error: Error | null };

    if (error || !data || data.length === 0) {
      return specialCooperationList;
    }

    return data.map((item: CoopRow) => ({
      id: item.id,
      image: item.image_url,
      photo: item.image_url,
      name: item.name || undefined,
      roleTitle: item.role_title || "विशेष सहकार्य",
      objectPosition: item.object_position || "center 10%",
      scale: item.scale ? Number(item.scale) : 1.0,
    }));
  } catch (err) {
    console.warn("fetchSpecialCooperation fallback triggered:", err);
    return specialCooperationList;
  }
}

/**
 * Fetch all published gallery photos.
 * Falls back to static dataset if Supabase is unconfigured or empty.
 */
export async function fetchGalleryPhotos(): Promise<{
  all: GalleryImage[];
  photos2023: GalleryImage[];
  archivePhotos: GalleryImage[];
}> {
  try {
    const supabase = getPublicClient();
    if (!supabase) {
      return {
        all: allGalleryPhotos,
        photos2023: gallery2023List,
        archivePhotos: galleryArchiveList,
      };
    }

    const res = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    const { data, error } = res as unknown as { data: GalleryRow[] | null; error: Error | null };

    if (error || !data || data.length === 0) {
      return {
        all: allGalleryPhotos,
        photos2023: gallery2023List,
        archivePhotos: galleryArchiveList,
      };
    }

    const all: GalleryImage[] = data.map((item: GalleryRow) => ({
      id: item.id,
      src: item.image_url,
      category: item.category as "2k23" | "archive",
      title: item.title || (item.category === "2k23" ? "गणेशोत्सव २०२३ - छायाचित्र" : "जुनी आठवण - छायाचित्र"),
      year: item.year || (item.category === "2k23" ? "२०२३" : "संग्रहित"),
    }));

    const photos2023 = all.filter((img) => img.category === "2k23");
    const archivePhotos = all.filter((img) => img.category === "archive");

    return { all, photos2023, archivePhotos };
  } catch (err) {
    console.warn("fetchGalleryPhotos fallback triggered:", err);
    return {
      all: allGalleryPhotos,
      photos2023: gallery2023List,
      archivePhotos: galleryArchiveList,
    };
  }
}

/**
 * Fetch slideshow photos for the Hero Section.
 * Sourced directly from the gallery table where show_in_slideshow = true and is_active = true.
 */
export async function fetchSlideshowPhotos(): Promise<GalleryImage[]> {
  try {
    const supabase = getPublicClient();
    if (!supabase) return allGalleryPhotos;

    const res = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .eq("show_in_slideshow", true)
      .order("display_order", { ascending: true });

    const { data, error } = res as unknown as { data: GalleryRow[] | null; error: Error | null };

    if (error || !data || data.length === 0) {
      return allGalleryPhotos;
    }

    return data.map((item: GalleryRow) => ({
      id: item.id,
      src: item.image_url,
      category: item.category as "2k23" | "archive",
      title: item.title || "गणेशोत्सव छायाचित्र",
      year: item.year || "२०२३",
    }));
  } catch (err) {
    console.warn("fetchSlideshowPhotos fallback triggered:", err);
    return allGalleryPhotos;
  }
}

/**
 * Fetch canonical Mandal Logo & Branding settings.
 */
export async function fetchSiteBranding(): Promise<BrandingInfo> {
  const fallback = {
    logoUrl: "/images/branding/mandal-logo.png",
    logoAlt: "धर्मवीर संभाजी क्रीडा मंडळ लोगो",
  };

  try {
    const supabase = getPublicClient();
    if (!supabase) return fallback;

    const res = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "site_logo")
      .maybeSingle();

    const { data, error } = res as unknown as { data: { value: { url?: string; alt?: string } } | null; error: Error | null };

    if (error || !data?.value?.url) {
      return fallback;
    }

    return {
      logoUrl: data.value.url,
      logoAlt: data.value.alt || fallback.logoAlt,
    };
  } catch (err) {
    console.warn("fetchSiteBranding fallback triggered:", err);
    return fallback;
  }
}
