import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      let { data: fetchedPosts, error } = await supabase
        .from('posts')
        .select('*');
      
      if (error) console.log('Error fetching posts', error);
      else setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.nom_du_jeu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paramètres pour le carrousel adaptés pour afficher correctement les posts
  const postSettings = {
    dots: true,
    infinite: filteredPosts.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, filteredPosts.length), // Affichez 3 ou moins selon le nombre de posts
    slidesToScroll: Math.min(3, filteredPosts.length),
    autoplay: filteredPosts.length > 3,
    autoplaySpeed: 4000,
  };

  const handlePostClick = postId => {
    router.push(`/posts/${postId}`);
  };

  const renderPost = (post) => (
    <div key={post.id} className="p-2 game-card" onClick={() => handlePostClick(post.id)}>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition duration-300 hover:scale-105 cursor-pointer"
      >
        <img
          src={post.nom_image}
          alt={`Image du jeu ${post.nom_du_jeu}`}
          className="w-full object-contain" // La classe object-contain assure que l'image garde ses proportions
          style={{ height: '250px' }} // Hauteur fixe pour toutes les images
        />
        <div className="p-6 flex flex-col justify-between flex-grow">
          <h3 className="font-bold text-xl mb-2">{post.nom_du_jeu}</h3>
          <p className="text-gray-700 text-base">{post.contenu_du_jeu}</p>
          <p className="text-gray-500 text-sm">Catégorie: {post.categorie}</p>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Liste des Posts</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par titre du jeu..."
            className="border p-2 rounded-md mr-2 w-full"
          />
        </div>

        <Slider {...postSettings}>
          {filteredPosts.map(renderPost)}
        </Slider>
      </div>
      <Footer />
    </>
  );
}

export default PostsPage;
