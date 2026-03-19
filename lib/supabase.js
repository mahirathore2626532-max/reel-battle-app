import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://lcfajgptzyuvzugephig.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZmFqZ3B0enl1dnp1Z2VwaGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTEzMTEsImV4cCI6MjA4NzI4NzMxMX0.SObboyGRR4dUy3YxlWVjHRWMZsXS_g64rr0OUrnX2t8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});