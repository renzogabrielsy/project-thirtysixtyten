import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithPassword = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
}

// export const signOut = async () => {
//     return await supabase.auth.signOut();
// }

export default supabase;
