import Header from '../components/header';
import Footer from '../components/footer';
import Nav from '../components/navbar';

function About() {
    return (
        <div>
            <Header />
            <main>
                <h2>À propos de ce blog</h2>
                <p>
                    Ce blog a été créé pour partager mes pensées, idées et découvertes 
                    dans le monde du développement web. Je suis passionné par les nouvelles 
                    technologies et j'espère que ce blog sera une plateforme pour 
                    échanger et apprendre ensemble.
                </p>
                <p>
                    Merci de me rejoindre dans ce voyage !
                </p>
            </main>
            <Footer />
        </div>
    );
}

export default About;
