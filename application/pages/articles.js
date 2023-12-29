import Header from '../components/header';
import Footer from '../components/footer';

const dummyArticles = [
    { id: 1, title: "Mon premier article" },
    { id: 2, title: "Découverte de Next.js" },
];

function Articles({ articles }) {
    return (
        <><Header />
        
        <div className="container mx-auto px-4">
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
