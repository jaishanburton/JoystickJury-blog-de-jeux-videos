import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function PostsPage() {
  const [posts, setPosts] = useState([]);

  // Récupération des posts de la base de données
  useEffect(() => {
    async function fetchPosts() {
      let { data: posts, error } = await supabase
        .from('posts')
        .select('*');
      
      if (error) console.log('error', error);
      else setPosts(posts);
    }

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Liste des Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">{post.nom_du_jeu}</h2>
            <Image
  src={post.nom_image} // le chemin commence à partir de la racine du dossier `public`
  alt={`Image du jeu ${post.nom_du_jeu}`}
  width={300} // Mettez la largeur de votre choix
  height={300} // Mettez la hauteur de votre choix
  layout="responsive"
/>
            <p className="text-gray-700 mt-3">{post.contenu_du_jeu}</p>
            <p className="text-gray-500 text-sm">Catégorie: {post.categorie}</p>
            <p className="text-gray-500 text-sm">Email: {post.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsPage;
