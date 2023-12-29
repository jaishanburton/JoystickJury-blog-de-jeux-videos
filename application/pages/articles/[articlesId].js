import Header from '../../components/header';
import Footer from '../../components/footer';
import Nav from '../../components/navbar';

function ArticlePage({ data }) {
    return (
        <div className="container mx-auto px-4">
            <Header />
            <Nav />
            <main className="mt-10">
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <p className="text-gray-700">{data.content}</p>
            </main>
            <Footer />
        </div>
    );
}

export async function getStaticPaths() {
    const paths = [
        { params: { articlesId: '1' } },
        { params: { articlesId: '2' } },
    ];

    return {
        paths,
        fallback: 'blocking' 
    };
}

export async function getStaticProps(context) {
    const articleId = context.params.articlesId;

    const dummyData = {
        title: `Titre de l'article ${articleId}`,
        content: `Contenu de l'article ${articleId}. Ceci est un exemple de données factices pour l'article ${articleId}.`
    };

    return {
        props: {
            data: dummyData
        }
    };
}

export default ArticlePage;
