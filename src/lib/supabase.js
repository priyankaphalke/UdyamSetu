import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('your-project') &&
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

if (isSupabaseConfigured) {
  console.info(
    '%c[UdyamSetu]%c Connected to Supabase backend: ' + supabaseUrl,
    'color: #12304a; font-weight: bold;',
    'color: #166b55;'
  );
} else {
  console.info(
    '%c[UdyamSetu]%c Supabase credentials not set or placeholder. Running on client adapter with local persistence fallback.',
    'color: #12304a; font-weight: bold;',
    'color: #166b55;'
  );
}
