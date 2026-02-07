import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// TEMPORARY TEST: Completely disabling Supabase
export const supabase = null;

if (!supabase) {
    console.warn("Supabase is TEMPORARILY DISABLED for testing.");
}
