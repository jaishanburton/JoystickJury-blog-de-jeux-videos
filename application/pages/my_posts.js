import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createClient } from '@supabase/supabase-js';
import { TrashIcon } from '@heroicons/react/outline'; 
import { PencilAltIcon } from '@heroicons/react/outline';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// Initialisez le client Supabase ici, en dehors du composant
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);




const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const supabaseClient = useSupabaseClient();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const router = useRouter();

// Paramètres pour le carrousel
const settings = {
    dots: true,
    infinite: myPosts.length > 3, // Infinite seulement si plus de 3 posts
    speed: 500,
    slidesToShow: Math.min(3, myPosts.length), // Ne montrez pas plus de diapositives qu'il n'y a de posts
    slidesToScroll: 2,
    autoplay: myPosts.length > 3, // Autoplay seulement si plus de 3 posts
    autoplaySpeed: 4000,
};
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserEmail(session.user.email);
        setLoading(false);
      } else {
        setLoading(false);
        setUserEmail(null);
      }
    });
  }, [supabaseClient]);
  

  useEffect(() => {
    async function fetchMyPosts() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('Fetching posts for email:', session.user.email); // Log pour déboguer
        let { data: fetchedPosts, error } = await supabase
          .from('posts')
          .select('*')
          .eq('email', session.user.email);

        if (error) {
          console.log('Error fetching posts', error);
        } else {
          setMyPosts(fetchedPosts);
        }
      }
    }

    fetchMyPosts();
  }, []);


  const handleEdit = (postId) => {
    // Rediriger l'utilisateur vers la page de modification du post
    router.push(`/edit-post/${postId}`);
};



  // Gérer le clic sur le post pour naviguer vers la page de détail
  const handlePostClick = (post) => {
    router.push({
      pathname: `/posts/${post.id}`,
    });
  };

 // Gérer la suppression du post
 const handleDelete = async (postId) => {
    if (!userEmail) {
      alert('Vous devez être connecté pour supprimer des posts.');
      return;
    }
  
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      try {
        // Démarrez une transaction pour supprimer les commentaires puis le post
        await supabaseClient
          .from('comments')
          .delete()
          .eq('post_id', postId);
  
        const { error } = await supabaseClient
          .from('posts')
          .delete()
          .match({ id: postId, email: userEmail });
  
        if (error) {
          throw error;
        }
  
        // Mettre à jour l'état local après la suppression réussie
        setMyPosts(currentPosts => currentPosts.filter((post) => post.id !== postId));
        alert('Post et commentaires associés supprimés avec succès.');
  
      } catch (error) {
        alert(`Erreur lors de la suppression : ${error.message}`);
        console.log('Error in delete transaction:', error);
      }
    }
  };
  
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {/* Section des posts */}
        <section className="container mx-auto py-20">
          <h2 className="text-4xl text-center font-bold mb-12">Mes Posts</h2>
          <Slider {...settings}>
            {myPosts.map((post, index) => (
              <div key={index} className="p-2 post-card relative">
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <img src={post.nom_image} alt={post.nom_du_jeu} className="w-full object-contain" style={{ height: '250px' }} />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h3 className="font-bold text-xl mb-2">{post.nom_du_jeu}</h3>
                    <p className="text-gray-700 text-base">{post.contenu_du_jeu}</p>
                  </div>
                  <PencilAltIcon className="h-6 w-6 absolute top-2 right-8 text-blue-600 cursor-pointer"  onClick={(e) => {
                    e.stopPropagation(); // Empêcher l'événement de clic de la carte
                    handleEdit(post.id);
                  }} />
                  <TrashIcon className="h-6 w-6 absolute top-2 right-2 text-red-600 cursor-pointer" onClick={(e) => {
                    e.stopPropagation(); // Empêcher l'événement de clic de la carte
                    handleDelete(post.id);
                  }} />
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
