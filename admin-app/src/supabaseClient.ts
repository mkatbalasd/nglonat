import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://YOUR_SUPABASE_URL'
export const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
