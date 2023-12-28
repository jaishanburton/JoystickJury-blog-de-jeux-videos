import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Header from '../components/header';
import Footer from '../components/footer';
import md5 from 'md5'; // Assurez-vous d'avoir installé md5
import CryptoJS from 'crypto-js'; // Assurez-vous d'avoir installé crypto-js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fonction pour générer l'URL Gravatar
  const generateGravatarUrl = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const md5Hash = CryptoJS.MD5(trimmedEmail).toString();
    return `https://www.gravatar.com/avatar/${md5Hash}?d=identicon&s=200`;
  };


const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('français');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.log('Erreur lors de la récupération du profil:', error.message);
        } else {
          setUsername(data.username);
          setLanguage(data.language);
        }

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

  const updateProfile = async () => {
    setLoading(true);
    setError(null);
  
    const { data: { session } } = await supabase.auth.getSession();
  
    if (session) {
      try {
        // Mise à jour de l'email et d'autres informations dans la table 'profiles'
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            username: username,
            language: language,
            email: email  // Mise à jour de l'email dans votre table 'profiles'
          }, { returning: "minimal", onConflict: "id" });
  
        if (profileError) throw profileError;
  
        alert('Profil mis à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error.message);
        setError(error.message);
        alert('Erreur lors de la mise à jour du profil: ' + error.message);
      }
    } else {
      router.push('/login');
    }
  
    setLoading(false);
  };
    
  
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Profil</h1>
        {email && (
          <>
            <img
              src={generateGravatarUrl(email)}
              alt="Profil"
              className="w-24 h-24 rounded-full mb-4 mx-auto"
            />
            <a
              href="https://gravatar.com/profile/avatar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Modifier la photo de profil sur Gravatar
            </a>
          </>
        )}


            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          
          {/* Formulaire de mise à jour */}
          <form onSubmit={updateProfile}>
            {/* Nom d'utilisateur */}
            <div className="mt-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Langue avec drapeaux */}
            <div className="mt-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Langue
              </label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="français">Français 🇫🇷</option>
                <option value="anglais">Anglais 🇬🇧</option>
              </select>
            </div>

            {/* Boutons */}
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Mettre à jour
              </button>
              <button
                onClick={handleLogout}
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-transparent hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
              >
                Se déconnecter
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
