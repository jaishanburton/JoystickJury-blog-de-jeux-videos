import { useRouter } from 'next/router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Nav from '../../components/navbar';
import { useEffect, useState } from 'react';

function ArticlePage() {
    const router = useRouter();
    const [articleId, setArticleId] = useState(null);

    useEffect(() => {
        const { articlesId } = router.query;
        if (articlesId) {
            setArticleId(articlesId);
        }
    }, [router.query]);

    // Si articleId n'est pas encore disponible, retournez un rendu par défaut
    if (!articleId) {
        return (
            <div className="container mx-auto px-4">
                <Header />
                <Nav />
                <main className="mt-10">
                    <h1 className="text-2xl font-bold">Chargement...</h1>
                </main>
                <Footer />
            </div>
        );
    }

    const dummyData = {
        title: `Titre de l'article ${articleId}`,
        content: `Contenu de l'article ${articleId}. Ceci est un exemple de données factices pour l'article ${articleId}.`
    };

    return (
        <div className="container mx-auto px-4">
            <Header />
            <Nav />
            <main className="mt-10">
                <h1 className="text-3xl font-bold mb-4">{dummyData.title}</h1>
                <p className="text-gray-700">{dummyData.content}</p>
            </main>
            <Footer />
        </div>
    );
}

export default ArticlePage;
