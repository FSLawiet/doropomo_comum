import { createClient } from '@supabase/supabase-js';
import { useAuthUser } from '../composables/UseAuthUser';
import { Database } from 'components/supabase-types';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient<Database>(
  supabaseUrl ? supabaseUrl : '',
  supabaseKey ? supabaseKey : ''
);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
