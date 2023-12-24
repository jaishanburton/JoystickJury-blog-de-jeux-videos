// pages/posts/[post_id].js
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PostDetails = ({ post }) => {
  const [comment, setComment] = useState('');

  // Gestion de la soumission du commentaire (à implémenter)
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit the comment to your database
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
          {/* Formulaire pour poster un commentaire */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajoutez un commentaire..."
              className="w-full border p-2 rounded-md mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Poster</button>
          </form>

          {/* Liste des commentaires (à implémenter) */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.post_id)
    .single();

  return {
    props: {
      post: post || {},
    },
  };
}

export default PostDetails;
