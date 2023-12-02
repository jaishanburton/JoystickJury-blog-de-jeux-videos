import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';

const dummyArticles = [
    { id: 1, title: "Mon premier article" },
    { id: 2, title: "Découverte de Next.js" },
    // Ajoutez d'autres articles factices si nécessaire
];

function Articles({ articles }) {
    return (
        <><Header />
        <div className="container mx-auto px-4"><Nav /></div>
        
        <div className="container mx-auto px-4">
            {/* En-tête */}
            
            

            {/* Contenu principal */}
            <main className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Liste des articles</h2>
                <ul>
                    {articles.map(article => (
                        <li key={article.id} className="mb-2">
                            <p className="italic font-bold">{article.title}</p>
                        </li>
                    ))}
                </ul>
            </main>

            {/* Pied de page */}
            <Footer />
        </div>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            articles: dummyArticles,
        },
    };
}

export default Articles;
