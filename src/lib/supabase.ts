import { createClient } from "@supabase/supabase-js";

// These are safe to ship in a browser build. Supabase table policies and
// Cloudinary's unsigned preset enforce the actual access boundaries.
export const SUPABASE_URL = "https://vedinfhjcnegzwrhgxdt.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_cWtdQnGAeVdm9V_TmIe_hA_EOTqkLrJ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
