import React from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import md5 from 'md5';

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

    const getGravatarUrl = (email) => {
        const hash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
    };


    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          console.log('Fetching profile for user:', session.user.id); // Log pour déboguer
            // Récupération des données de la table 'profiles'
            supabaseClient
                .from('profiles')
                .select('email')
                .eq('id', session.user.id)
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Erreur lors de la récupération des données de profil:', error);
                    } else if (data) {
                        setUserEmail(data.email);
                    }
                    setLoading(false);
                  }
                );
        }
        });
      }, [supabaseClient]);
      


      const logout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
      };
    
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {userEmail && <img src={getGravatarUrl(userEmail)} alt="Gravatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />}
                {userEmail}
            </div>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}

export default LoggedIn;