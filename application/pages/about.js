import Header from '../components/header';
import Footer from '../components/footer';
import Image from 'next/image';

function About() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="my-10 text-center px-5">
                    <h2 className="text-4xl font-bold mb-6">À propos de JoystickJury</h2>
                    <p className="text-xl mb-6">
                        JoystickJury est votre destination incontournable pour les avis éclairés,
                        les discussions animées et les dernières nouvelles dans l'univers des jeux vidéo.
                        Que vous soyez un joueur occasionnel ou un hardcore gamer, notre blog est dédié
                        à partager des critiques profondes, des tutoriels de gameplay et des conseils
                        pour améliorer votre expérience de jeu.
                    </p>
                    {/* Conteneur pour l'image avec une qualité et un recadrage optimisés */}
                    <div className="my-8 mx-auto max-w-4xl">
                        <Image 
                            src="/images/gaming.png" 
                            alt="Gaming Setup" 
                            width={1920} 
                            height={1080} 
                            layout="responsive" 
                            objectFit="cover" 
                            quality={100} // Mettez la qualité à 100 pour une image de haute qualité
                        />
                    </div>
                    <p className="text-xl">
                        Rejoignez-nous pour explorer les mondes captivants que les jeux ont à offrir,
                        discuter des dernières sorties et partager vos propres histoires et expériences.
                        JoystickJury est plus qu'un blog - c'est une communauté pour ceux qui vivent et respirent les jeux vidéo.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default About;
