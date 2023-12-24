import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick'; // Assurez-vous que Slider est importé
import 'slick-carousel/slick/slick.css'; // Feuilles de style pour Slider
import 'slick-carousel/slick/slick-theme.css';
import { createClient } from '@supabase/supabase-js';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Paramètres pour le carrousel de posts
const postSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Ajustez en fonction de la taille de votre conteneur
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
};

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
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Liste des Posts</h1>
        {/* Utilisation du Slider pour afficher les posts */}
        <Slider {...postSettings}>
          {posts.map((post, index) => (
            <div key={index} className="p-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                <Image
                  src={post.nom_image} // Assurez-vous que le chemin est correct
                  alt={`Image du jeu ${post.nom_du_jeu}`}
                  width={300}
                  height={300}
                  layout="responsive"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{post.nom_du_jeu}</h3>
                  <p className="text-gray-700">{post.contenu_du_jeu}</p>
                  <p className="text-gray-500 text-sm">Catégorie: {post.categorie}</p>
                  <p className="text-gray-500 text-sm">Email: {post.email}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Footer />
    </>
  );
}

export default PostsPage;
