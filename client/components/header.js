import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavigationLink = ({ children, href, darkMode }) => {
  return (
    <Link href={href} passHref>
      <span className={`nav-link hover:text-blue-600 decoration-2 underline-offset-8 transition-all duration-500 ease-in-out cursor-pointer ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {children}
      </span>
    </Link>
  );
};

function Header() {
  const user = useUser();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
<header className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 flex justify-between items-center w-full`}>
  <span className="text-4xl font-bold">JoystickJury</span>
  {/* rajouter les crédits dans l'en-tête */}
  <span className="text-1xl font-bold">fait par Mathys BAGNAH & Jaishan BURTON ELMO</span>
  <nav className="flex gap-4 items-center">
    <NavigationLink href="/" darkMode={darkMode}>Accueil</NavigationLink>
    <NavigationLink href="/about" darkMode={darkMode}>À propos</NavigationLink>
    <NavigationLink href="/trailers" darkMode={darkMode}>Bandes-Annonces</NavigationLink>
    <NavigationLink href="/liste_posts" darkMode={darkMode}>Liste des posts</NavigationLink>
    <NavigationLink href="/my_posts" darkMode={darkMode}>Mes posts</NavigationLink>
    <NavigationLink href="/post" darkMode={darkMode}>Publier</NavigationLink>
    <NavigationLink href="/contacts" darkMode={darkMode}>Nous Contacter</NavigationLink>
    <NavigationLink href="/modifier_profil" darkMode={darkMode}>Modifier profil</NavigationLink>
  </nav>
  <div className="flex items-center gap-4">
  {user ? (
      <LoggedIn darkMode={darkMode} />
    ) : (
      <Link href="/login">
        <button className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg cursor-pointer ml-2">
          Connexion
        </button>
      </Link>
    )}

    <button onClick={toggleDarkMode} className={`p-2 rounded-md ${darkMode ? 'bg-gray-300 text-gray-900' : 'bg-gray-600 text-white'}`}>
      {darkMode ? 'Light 🌞' : 'Dark 🌜'}
    </button>
  </div>
</header>
  );
}

export default Header;
