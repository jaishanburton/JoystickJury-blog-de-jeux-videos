import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


// Initialisez Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PostDetails = ({ post, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');

  const supabaseClient = useSupabaseClient();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const { post_id } = router.query;


  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            setUsername(session.user.user_metadata.full_name);
            setUserEmail(session.user.email);
            setLoading(false);
          } 
        });
        }, [supabaseClient]);


  
const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // ... code pour obtenir la session et les détails de l'utilisateur
    
    const { data: newComment, error } = await supabase
        .from('comments')
        .insert([
        {
            post_id: post_id, // Assurez-vous que post_id est l'ID correct du post
            comment_text: commentText, // Texte du commentaire
        }
        ])
        .single();
    
    if (error) {
        console.error("Erreur lors de la soumission du commentaire :", error.message);
        alert('Erreur lors de la publication du commentaire.');
    } else {
        console.log("Commentaire publié avec succès :", commentText);
        fetchComments();
    setCommentText(''); // Réinitialiser le champ de texte après la soumission
  }
};

const fetchComments = async () => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des commentaires :", error.message);
  } else {
    setComments(comments);
  }
};

useEffect(() => {
  fetchComments();
}, []);

          

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
    if (!comment) {
      // Gérez le cas où le commentaire est null ou undefined
      return <div key={index}>Chargement du commentaire...</div>;
    }

    // Convertissez la chaîne de date en objet Date JavaScript
    const commentDate = new Date(comment.created_at);

    // Formatez la date comme vous le souhaitez, par exemple '1 Jan 2020 14:00'
    const displayDate = commentDate.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div key={index} className="border p-2 rounded-md">
        <p>{comment.comment_text}</p>
        <p className="text-gray-600">Commenté le: {displayDate}</p>
        {/* Vous pouvez ajouter plus de détails ici */}
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
