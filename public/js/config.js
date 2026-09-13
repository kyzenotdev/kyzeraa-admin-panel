import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Kredensial Supabase
const SUPABASE_URL = 'https://bxvgaymtuxnjsbgulqxd.supabase.co'; // Ganti dengan Project URL asli kamu dari Supabase
const SUPABASE_ANON_KEY = 'sb_publishable_JcurKrtiZ-4T-6gIFwWpbw_04KUL-aZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cloudflare Turnstile Sitekey
export const TURNSTILE_SITEKEY = '0x4AAAAAAEyMwUdYSJCcbmb0';
