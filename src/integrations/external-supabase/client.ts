import { createClient } from "@supabase/supabase-js";

const EXTERNAL_URL = "https://rxdvlevzsxemanlfyqin.supabase.co";
const EXTERNAL_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4ZHZsZXZ6c3hlbWFubGZ5cWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjk1MjAsImV4cCI6MjA5Mzc0NTUyMH0.LVO6fusZgqY3bq0f22kSuwHvCxtr2SM_vVk9jTTTQH8";

export const externalSupabase = createClient(EXTERNAL_URL, EXTERNAL_KEY);
