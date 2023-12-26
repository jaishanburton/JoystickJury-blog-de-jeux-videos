import React from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



function LoggedIn() {
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            setUserEmail(session.user.email);
            setLoading(false);
          } else {
            setLoading(false);
            setUserEmail(null);
          }
        });
      }, [supabaseClient]);
      


    const logout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    return (
        <div>
            <div>
                <span role="img" aria-label="icône de compte">👤</span> {userEmail}
            </div>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}

export default LoggedIn;