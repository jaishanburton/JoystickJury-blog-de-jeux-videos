import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';

function Contacts() {
    return (
        <div className="container mx-auto px-4">
            {/* En-tête */}
            <Header />
            <Nav />

            {/* Contenu principal */}
            <main className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>

                {/* Coordonnées */}
                <div className="mb-6">
                    <p className="mb-2"><strong>Email:</strong> exemple@monblog.com</p>
                    <p><strong>Téléphone:</strong> +33 1 23 45 67 89</p>
                </div>

                {/* Formulaire de contact */}
                <h3 className="text-xl font-bold mb-2">Formulaire de contact :</h3>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Nom :</label>
                        <input type="text" name="name" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email :</label>
                        <input type="email" name="email" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Message :</label>
                        <textarea name="message" className="w-full p-2 border rounded"></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Envoyer</button>
                </form>
            </main>

            {/* Pied de page */}
            <Footer />
        </div>
    );
}

export default Contacts;
