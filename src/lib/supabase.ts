import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbpugvynxaywzhnjinax.supabase.co';
// Handle both quoted and unquoted env variables
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '').replace(/"/g, '');
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

// Check if properly configured (runtime check)
export function isSupabaseConfigured(): boolean {
  return !!(supabaseKey && supabaseKey.length > 10);
}

// Database types
export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service: string;
  message: string;
  status?: 'new' | 'read' | 'contacted' | 'closed';
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}
