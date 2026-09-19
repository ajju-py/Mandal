import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "./config";

let cachedPublicClient: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * Lightweight Supabase client for reading public data.
 * Does not require or touch cookies, allowing fast cached Next.js responses.
 */
export function getPublicClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!cachedPublicClient) {
    cachedPublicClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return cachedPublicClient;
}
