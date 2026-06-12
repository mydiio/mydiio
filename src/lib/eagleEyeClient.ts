import { createClient } from '@supabase/supabase-js';

const EAGLE_EYE_URL = import.meta.env.VITE_EAGLE_EYE_SUPABASE_URL;
const EAGLE_EYE_ANON_KEY = import.meta.env.VITE_EAGLE_EYE_SUPABASE_ANON_KEY;

export const eagleEyeSupabase = createClient(EAGLE_EYE_URL, EAGLE_EYE_ANON_KEY);
