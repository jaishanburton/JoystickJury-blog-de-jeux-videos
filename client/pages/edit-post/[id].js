import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Header from '../../components/header';
import Footer from '../../components/footer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = {
  'Jeux de sport': ['FC24', 'NBA2K24', 'UFC 5', 'Just Dance 2024', 'FIFA 23'],
  'Jeux de guerre': ['Call Of Duty: MW3', 'Call Of Duty: MW2', 'Call Of Duty: BO4', 'Call Of Duty: BO3', 'Call Of Duty: Warzone'],
  'Jeux d\'aventure': ['The Legend of Zelda: Breath of the Wild', 'Uncharted 4', 'Red Dead Redemption 2', 'Assassin’s Creed Valhalla', 'Tomb Raider'],
  'Jeux de manga': ['Naruto Shippuden: Ultimate Ninja Storm 4', 'Dragon Ball FighterZ', 'One Piece: Pirate Warriors 4', 'Attack on Titan 2', 'My Hero One’s Justice']
};


const EditPost = ({ post }) => {
  const [formData, setFormData] = useState({
    categorie: '',
    nom_du_jeu: '',
    contenu_du_jeu: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (post) {
      setFormData({
        categorie: post.categorie,
        nom_du_jeu: post.nom_du_jeu,
        contenu_du_jeu: post.contenu_du_jeu,
        email: post.email,
      });
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .update({
        categorie: formData.categorie,
        nom_du_jeu: formData.nom_du_jeu,
        contenu_du_jeu: formData.contenu_du_jeu,
      })
      .eq('id', post.id);

    if (error) {
      setError(error.message);
    } else {
      window.alert('Post modifié avec succès!');
      router.push('/my_posts');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <div className="mt-1">
                <select
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="mt-6">
              <label htmlFor="nom_du_jeu" className="block text-sm font-medium text-gray-700">
                Nom du jeu
              </label>
              <div className="mt-1">
                <select
                  id="nom_du_jeu"
                  name="nom_du_jeu"
                  value={formData.nom_du_jeu}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Sélectionnez un jeu</option>
                  {formData.categorie && categories[formData.categorie].map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="mt-6">
              <label htmlFor="contenu_du_jeu" className="block text-sm font-medium text-gray-700">
                Contenu du jeu
              </label>
              <div className="mt-1">
                <textarea
                  id="contenu_du_jeu"
                  name="contenu_du_jeu"
                  value={formData.contenu_du_jeu}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
  
            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return { props: { error: error.message } };
    }

    return { props: { post } };
  } catch (error) {
    console.error('Server-side error:', error);
    return { props: { error: 'An error occurred while fetching the post.' } };
  }
}


export default EditPost;
