import React, { useState } from 'react';
import '../app/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function MyApp({ Component, pageProps }) {
  // Initialiser le client Supabase pour le navigateur
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    // Fournir le client Supabase à l'application via le contexte
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
