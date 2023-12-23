import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Assurez-vous de configurer correctement vos variables d'environnement pour Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUsername(session.user.user_metadata.full_name);
        setEmail(session.user.email);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Nom d'utilisateur: {username}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default ProfilePage;
