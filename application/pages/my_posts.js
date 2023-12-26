import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createClient } from '@supabase/supabase-js';

// Initialisez le client Supabase ici, en dehors du composant
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Paramètres pour le carrousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
};

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMyPosts() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        let { data: fetchedPosts, error } = await supabase
          .from('posts')
          .select('*')
          .eq('email', session.user.email); // Filtre par email de l'utilisateur

        if (error) {
          console.log('Error fetching posts', error);
        } else {
          setMyPosts(fetchedPosts);
        }
      }
    }

    fetchMyPosts();
  }, []);

  const handlePostClick = (post) => {
    router.push({
      pathname: `/posts/${post.id}`,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {/* Posts Section */}
        <section className="container mx-auto py-20">
          <h2 className="text-4xl text-center font-bold mb-12">Mes Posts</h2>
          <Slider {...settings}>
            {myPosts.map((post, index) => (
              <div key={index} className="p-2 post-card">
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <img src={post.nom_image} alt={post.title} className="w-full object-contain" style={{ height: '250px' }} />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h3 className="font-bold text-xl mb-2">{post.nom_du_jeu}</h3>
                    <p className="text-gray-700 text-base">{post.contenu_du_jeu}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyPosts;
