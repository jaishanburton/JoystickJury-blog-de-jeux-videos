import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

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

  const filteredPosts = posts.filter(post => 
    post.nom_du_jeu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handlePostClick = (postId) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Liste des Posts</h1>
        
        {/* Barre de recherche */}
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
          {filteredPosts.map((post, index) => (
            <div key={index} className="p-2" onClick={() => handlePostClick(post.id)}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                <Image
                  src={post.nom_image}
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
