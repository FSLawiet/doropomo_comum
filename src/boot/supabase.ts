import { createClient } from '@supabase/supabase-js';
import { useAuthUser } from '../composables/UseAuthUser';

const supabaseUrl = 'https://jxizmmziaqvkbykhtkmz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4aXptbXppYXF2a2J5a2h0a216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1MDMyOTYsImV4cCI6MTk5NDA3OTI5Nn0.YMxRdK1f88sPdIl8AqCCBOFrSWZld833hCEIfYMnwJg';

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
