import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';

// Initialisez Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PostDetails = ({ post, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');
  const router = useRouter();
  const { post_id } = router.query;
  
  // Gestion de la soumission du commentaire
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentative de soumission du commentaire"); // Log pour débogage

    const session = supabase.auth.getUser();
    
    if (!session) {
        alert('Vous devez être connecté pour poster un commentaire.');
        return;
    }

    console.log("Envoi du commentaire à Supabase"); // Log pour débogage

    const { data: newComment, error } = await supabase
        .from('comments')
        .insert([
            { 
                post_id: post.id, // Assurez-vous que post.id est l'ID correct du post
                user_id: session.id, // ID de l'utilisateur connecté
                comment_text: commentText // Texte du commentaire
            }
        ])
        .single(); // Utilisation de .single() pour obtenir directement l'objet inséré

    if (error) {
        alert('Erreur lors de la publication du commentaire.');
        console.error('Error submitting comment', error);
    } else {
        console.log("Commentaire publié avec succès", newComment); // Log pour débogage
        setComments([...comments, newComment]);
        setCommentText(''); // Réinitialiser le champ de texte après la soumission
    }
};

  return (
    <>
      <Header />
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-3xl font-bold mb-6">{post.nom_du_jeu}</h1>
        <Image
          src={post.nom_image}
          alt={`Image du jeu ${post.nom_du_jeu}`}
          width={600}
          height={400}
          layout="responsive"
        />
        <p className="mt-4">{post.contenu_du_jeu}</p>
        <p className="text-sm text-gray-500">Catégorie: {post.categorie}</p>
        <p className="text-sm text-gray-500">Email: {post.email}</p>

        {/* Espace commentaires */}
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ajoutez un commentaire..."
              className="w-full border p-2 rounded-md mb-2"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Poster</button>
          </form>
          <div className="space-y-4">
            {comments.map((comment, index) => {
                // Vérifier si le commentaire n'est pas null
                if (!comment) {
                return null; // ou affichez une autre chose indiquant un commentaire manquant ou invalide
                }

                return (
                <div key={index} className="border p-2 rounded-md">
                    <p>{comment.comment_text}</p>
                    {/* Affichez ici d'autres détails comme l'auteur et la date */}
            </div>
    );
  })}
</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.post_id)
    .single();

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select(`
      id,
      comment_text,
      user_id,
      created_at
    `)
    .eq('post_id', params.post_id);

  if (postError) console.error('Error fetching post', postError);
  if (commentsError) console.error('Error fetching comments', commentsError);

  return {
    props: {
      post: post || {},
      initialComments: comments || [],
    },
  };
}

export default PostDetails;
