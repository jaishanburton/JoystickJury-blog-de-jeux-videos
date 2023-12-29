import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from '../components/header'; 
import Footer from '../components/footer';
import '../app/globals.css';

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
          appearance={{ theme: ThemeSupa }} 
          providers={['github']}
        />
      </div>
      <Footer/>
    </>
    
  );
};

export default LoginPage;
