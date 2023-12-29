import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../app/globals.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const games = [
  { src: '/images/nba2k24-pc.jpg', title: 'NBA2K24', description: 'Le basketball à son apogée.' },
  { src: '/images/fc24-pc.jpg', title: 'FC24', description: 'Découvrez le frisson du football mondial.' },
  { src: '/images/dragonballfighterz-pc.jpg', title: 'Dragon Ball FighterZ', description: 'Des combats épiques vous attendent.' },
  { src: '/images/codwarzone-pc.jpg', title: 'Call Of Duty: Warzone', description: 'Survivez dans ce Battle Royale intense.' },
  { src: '/images/fifa23-pc.jpg', title: 'FIFA 23', description: 'Affrontez des équipes du monde entier.' },
  { src: '/images/onepiecepiratewarriors4-pc.jpg', title: 'One Piece: Pirate Warriors 4', description: 'Rejoignez Luffy et son équipage dans leurs aventures.' },
  { src: '/images/narutostorm4-pc.jpg', title: 'Naruto Shippuden: Ultimate Ninja Storm 4', description: 'Combattez avec vos ninjas favoris.' },
  { src: '/images/acvalhalla-pc.jpg', title: 'Assassin’s Creed Valhalla', description: 'Vivez la saga épique du Viking.' },
  { src: '/images/codmw2-pc.jpg', title: 'Call Of Duty: MW2', description: 'Une aventure pleine d\'action et de stratégie.' },
  { src: '/images/codbo3-pc.jpg', title: 'Call Of Duty: BO3', description: 'Un futur sombre et complexe.' },
];



const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*');
      if (error) {
        console.log('Erreur de chargement des posts:', error);
      } else {
        setPosts(data);
      }
    };
    
    fetchPosts();
  }, []); 
  

 const toggleDarkMode = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  localStorage.setItem('darkMode', newDarkMode.toString());
  document.documentElement.classList.toggle('dark', newDarkMode);
};

  const handleGameClick = (game) => {
    const gamePosts = posts.filter(post => post.nom_du_jeu === game.title);
    console.log(gamePosts); 
    const lastPost = gamePosts[gamePosts.length - 1];
  
    if (lastPost) {
      console.log('Redirection vers', `/posts/${lastPost.id}`); 
      router.push(`/posts/${lastPost.id}`);
    } else {
      console.log('Aucun post trouvé pour ce jeu'); 
    }
  };
  
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-700'} text-center py-20 text-white`}>
          <h1 className="text-5xl font-bold mb-6">Bienvenue sur JoystickJury!</h1>
          <p className="text-xl">Votre source ultime pour les critiques et les nouvelles de jeux vidéo.</p>
        </section>

        <section className="container mx-auto py-20">
          <h2 className={`text-4xl text-center font-bold mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>Les incontournables</h2>
          <Slider {...settings}>
            {games.map((game, index) => (
              <div key={index} className="p-2 game-card">
                <div
                  className={`bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition duration-300 hover:scale-105 cursor-pointer`}
                  onClick={() => handleGameClick(game)}
                >
                  <img src={game.src} alt={game.title} className="w-full object-contain" style={{ height: '250px' }} />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                  <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{game.title}</h3>
                    <p className={`text-gray-700 dark:text-gray-200 text-base`}>{game.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} text-white dark:text-white py-20`}>
          <div className="container mx-auto text-center">
            <h2 className={`text-4xl ${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-6`}>À propos de JoystickJury</h2>
            <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nous sommes une équipe passionnée par le monde du gaming. Notre mission est de vous apporter les critiques les plus honnêtes et les informations les plus récentes sur vos jeux préférés.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;