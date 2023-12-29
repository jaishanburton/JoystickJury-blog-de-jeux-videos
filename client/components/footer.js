import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 body-font">
            <div className="container mx-auto py-8 px-5 flex justify-between items-center border-t border-gray-300">
                {/* Colonne de liens */}
                <div className="flex flex-col">
                    <a href="/" className="mb-2">Accueil</a>
                    <a href="/about" className="mb-2">À propos</a>
                    <a href="/trailers" className="mb-2">Bandes annonces</a>
                    <a href="/liste_posts" className="mb-2">Liste des posts</a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Colonne de liens */}
                <div className="flex flex-col px-5">
                    <a href="/my_posts" className="mb-2">Mes posts</a>
                    <a href="/contacts" className="mb-2">Nous contacter</a>
                    <a href="/post" className="mb-2">Publier</a>
                    <a href="/modifier_profil" className="mb-2">Modifier profil</a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Carré des icônes de réseaux sociaux */}
                <div className="grid grid-cols-2 gap-2">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaYoutube className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaTiktok className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaInstagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaFacebook className="w-5 h-5" />
                    </a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Logo et nom */}
                <div className="flex items-center">
                    <img src="/images/logo.png" alt="Losgo" className="w-32 h-21 mr-2" />
                </div>
                {/* Droits d'auteur */}
                <div className="text-gray-500 text-sm">
                    © JoystickJury {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
