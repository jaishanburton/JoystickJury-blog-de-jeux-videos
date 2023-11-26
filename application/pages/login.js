// Fichier: pages/login.js

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Assurez-vous d'importer ThemeSupa
import { supabase } from '../supabaseClient'; // Assurez-vous que le chemin est correct

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/profile');
      }
    });

    // Si la méthode unsubscribe n'existe pas, ne faites rien lors du nettoyage
    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [router]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }} // Appliquez le thème ThemeSupa ici
      providers={['google', 'facebook', 'twitter', 'discord', 'github']}
    />
  );
};

export default LoginPage;
