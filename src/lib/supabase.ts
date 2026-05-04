import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

// Create a singleton client. 
// Note: During build, this will use placeholders if env vars are missing.
// The actual usage in log.ts already checks for SUPABASE_URL before calling.
export const supabase = createClient(supabaseUrl, supabaseKey);

export const createPublicClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );
};
