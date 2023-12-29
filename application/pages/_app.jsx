import React, { useState } from 'react';
import '../app/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
