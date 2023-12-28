import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Assurez-vous que ce module est disponible
import Header from '../components/header';
import Footer from '../components/footer';
import '../app/globals.css';

// Assurez-vous de configurer correctement vos variables d'environnement pour Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/modifier_profil');
      }
    });

    // S'assurer de se désabonner correctement lors du nettoyage
    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [router]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }} // Appliquez le thème ThemeSupa ici
          providers={['google', 'facebook', 'twitter', 'discord', 'github']}
        />
      </div>
      <Footer/>
    </>
    
  );
};

export default LoginPage;
