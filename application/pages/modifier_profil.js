// Dans votre fichier profile.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('français'); // Défaut à français
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        // Ici, vous devriez récupérer les informations de la table `profile`
        // en utilisant l'ID de l'utilisateur pour obtenir le bon profil.
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.log('Erreur lors de la récupération du profil:', error.message);
        } else {
          // Supposons que la table 'profile' contienne des colonnes 'username' et 'language'
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
      // Crée ou met à jour le profil en fonction de l'existence de l'ID utilisateur
      const profileData = {
        id: session.user.id,
        username: username,
        language: language,
        email: session.user.email // L'email est récupéré de la session actuelle
      };
  
      // Effectue un upsert sur la table 'profile'
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { returning: "minimal", onConflict: "id" });
  
      if (error) {
        setError(error.message);
        console.error('Erreur lors de la mise à jour du profil:', error.message);
        alert('Erreur lors de la mise à jour du profil: ' + error.message);
      } else {
        alert('Profil mis à jour avec succès.');
      }
    } else {
      // Gérer le cas où il n'y a pas de session valide
      router.push('/login');
    }
  
    setLoading(false);
  };
  
    

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Email: {email}</p>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="français">Français</option>
          <option value="anglais">Anglais</option>
        </select>
        <button onClick={updateProfile}>Mettre à jour le profil</button>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </div>
  );
};

export default ProfilePage;
