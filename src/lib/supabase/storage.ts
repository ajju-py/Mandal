import { createClient } from "./client";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export type MediaFolder =
  | "leadership"
  | "mentors"
  | "special-cooperation"
  | "gallery"
  | "branding";

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Validates an image file before upload.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: "केवळ JPG, JPEG, PNG किंवा WEBP फॉरमॅटमधील छायाचित्रे अपलोड केली जाऊ शकतात.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "छायाचित्राचा आकार १० MB पेक्षा कमी असावा.",
    };
  }

  return { valid: true };
}

/**
 * Uploads an image to Supabase Storage bucket 'mandal-media'
 */
export async function uploadMediaImage(
  file: File,
  folder: MediaFolder
): Promise<UploadResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const supabase = createClient();
  if (!supabase) {
    return {
      success: false,
      error: "Supabase कॉन्फिगरेशन उपलब्ध नाही. कृपया .env.local मध्ये क्रेडेंशियल्स तपासा.",
    };
  }

  try {
    // Generate clean sanitized filename with timestamp
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const fileName = `${folder}/${Date.now()}_${cleanBase}.${ext}`;

    const { data, error } = await supabase.storage
      .from("mandal-media")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { success: false, error: error.message };
    }

    const { data: publicData } = supabase.storage
      .from("mandal-media")
      .getPublicUrl(data.path);

    return {
      success: true,
      url: publicData.publicUrl,
      path: data.path,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "छायाचित्र अपलोड करताना त्रुटी आली.";
    return { success: false, error: errorMsg };
  }
}
