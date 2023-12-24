import React, { useState, useEffect } from 'react'; // Ajout de useEffect ici
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from '../components/header';
import Footer from '../components/footer';
import Image from 'next/image'; // Importation du composant Image de Next.js pour une meilleure optimisation
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


function Post() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [gameImage, setGameImage] = useState('');
    const [postContent, setPostContent] = useState('');
    const [games, setGames] = useState([]);
    const [submitStatus, setSubmitStatus] = useState({ success: false, error: false, message: '' });

    const supabaseClient = useSupabaseClient();
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const router = useRouter();
  

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
              setUsername(session.user.user_metadata.full_name);
              setUserEmail(session.user.email);
              setLoading(false);
            } else {
              router.push('/login');
            }
          });
          }, [supabaseClient]);
                

    const categories = {
        'Jeux de sport': ['FC24', 'NBA2K24', 'UFC 5', 'Just Dance 2024', 'FIFA 23'],
        'Jeux de guerre': ['Call Of Duty: MW3', 'Call Of Duty: MW2', 'Call Of Duty: BO4', 'Call Of Duty: BO3', 'Call Of Duty: Warzone'],
        'Jeux d\'aventure': ['The Legend of Zelda: Breath of the Wild', 'Uncharted 4', 'Red Dead Redemption 2', 'Assassin’s Creed Valhalla', 'Tomb Raider'],
        'Jeux de manga': ['Naruto Shippuden: Ultimate Ninja Storm 4', 'Dragon Ball FighterZ', 'One Piece: Pirate Warriors 4', 'Attack on Titan 2', 'My Hero One’s Justice']
    };

    // Un objet contenant les chemins des images pour chaque jeu.
    // Assurez-vous que les chemins correspondent aux noms de fichier des images que vous avez.
    const gameImages = {
        'FC24': '/images/fc24-pc.jpg',
        'NBA2K24': '/images/nba2k24-pc.jpg',
        'UFC 5': '/images/ufc5-pc.jpg',
        'Just Dance 2024': '/images/justdance2024-pc.jpg',
        'FIFA 23': '/images/fifa23-pc.jpg',
        'Call Of Duty: MW3': '/images/codmw3-pc.jpg',
        'Call Of Duty: MW2': '/images/codmw2-pc.jpg',
        'Call Of Duty: BO4': '/images/codbo4-pc.jpg',
        'Call Of Duty: BO3': '/images/codbo3-pc.jpg',
        'Call Of Duty: Warzone': '/images/codwarzone-pc.jpg',
        'The Legend of Zelda: Breath of the Wild': '/images/zeldabreathofthewild-pc.jpg',
        'Uncharted 4': '/images/uncharted4-pc.jpg',
        'Red Dead Redemption 2': '/images/reddeadredemption2-pc.jpg',
        'Assassin’s Creed Valhalla': '/images/acvalhalla-pc.jpg',
        'Tomb Raider': '/images/tombraider-pc.jpg',
        'Naruto Shippuden: Ultimate Ninja Storm 4': '/images/narutostorm4-pc.jpg',
        'Dragon Ball FighterZ': '/images/dragonballfighterz-pc.jpg',
        'One Piece: Pirate Warriors 4': '/images/onepiecepiratewarriors4-pc.jpg',
        'Attack on Titan 2': '/images/attackontitan2-pc.jpg',
        'My Hero One’s Justice': '/images/myheroonesjustice-pc.jpg'
    };
    

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setGames(categories[category] || []);
        setSelectedGame('');
        setGameImage('');
        setPostContent('');
    };

    const handleGameChange = (e) => {
        const game = e.target.value;
        setSelectedGame(game);
        // Utilisez le nom du jeu pour obtenir l'image correspondante.
        const image = gameImages[game] || '/images/default-pc.jpg';
        setGameImage(image);
    };

    const handlePostContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userEmail);
        if (!postContent.trim()) {
            setSubmitStatus({ success: false, error: true, message: 'Le contenu du post ne peut pas être vide.' });
            return;
        }
    
        // Modification ici pour inclure les bons attributs
        const { error } = await supabaseClient
            .from('posts') // Assurez-vous que 'posts' est le nom de votre table
            .insert([
                { 
                    categorie: selectedCategory, // Assurez-vous que le nom de l'attribut correspond à celui dans votre base de données
                    nom_du_jeu: selectedGame,    // Assurez-vous que le nom de l'attribut correspond à celui dans votre base de données
                    contenu_du_jeu: postContent,  // Assurez-vous que le nom de l'attribut correspond à celui dans votre base de données
                    email: userEmail, // Utilisez l'email stocké dans l'état
                    nom_image: gameImage
                }
            ]);
    
        if (error) {
            setSubmitStatus({ success: false, error: true, message: 'Une erreur est survenue lors de la publication du post.' });
        } else {
            setSubmitStatus({ success: true, error: false, message: 'Post publié avec succès!' });
            setPostContent('');
            setGameImage('');
        }
    };
    
    return (
        <div className="container mx-auto px-4">
            <Header />    
            <main className="mt-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Créez votre post!</h2>
    
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie de jeux:</label>
                        <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                            <option value="">Sélectionnez une catégorie</option>
                            {Object.keys(categories).map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    {selectedCategory && (
                        <div className="mb-4">
                            <label htmlFor="game" className="block text-sm font-medium text-gray-700">Jeux:</label>
                            <select id="game" name="game" value={selectedGame} onChange={handleGameChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                                <option value="">Sélectionnez un jeu</option>
                                {games.map((game, index) => (
                                    <option key={index} value={game}>{game}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {selectedGame && gameImage && (
                        <div className="flex justify-center mb-4"> {/* Centre l'image horizontalement */}
                            <Image src={gameImage} alt={`Couverture du jeu ${selectedGame}`} width={300} height={450} layout="intrinsic" />
                        </div>
                    )}
                    {selectedGame && (
                        <div className="mb-4">
                            <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Contenu du post:</label>
                            <textarea
                                id="postContent"
                                name="postContent"
                                value={postContent}
                                onChange={handlePostContentChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Qu'avez-vous à partager sur ce jeu ?"
                                required
                            ></textarea>
                        </div>
                    )}
                    <div className="mb-4 text-center">
                        <button type="submit" className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Publier le post
                        </button>
                    </div>
                </form>
    
                {submitStatus.message && (
                    <div className={`mt-6 text-center p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {submitStatus.message}
                    </div>
                )}
            </main>
    
            <Footer />
        </div>
    );
    
}

export default Post;