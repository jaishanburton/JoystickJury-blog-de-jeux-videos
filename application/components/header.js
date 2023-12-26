import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

import Link from 'next/link';

const NavigationLink = ({ children, href = "#" }) => {
    return (
      <Link href={href}>
<span className="nav-link hover:text-blue-600 decoration-2 underline-offset-8 transition-all duration-500 ease-in-out cursor-pointer">
  {children}
</span>
      </Link>
    );
  };
  
function Header() {
    const user = useUser();
  
    return (
        <header className="bg-white p-4 flex justify-between items-center w-full">
            <span className="text-4xl font-bold">JoystickJury</span>
            <nav className="flex gap-16">
                <NavigationLink href="/">Accueil</NavigationLink>
                <NavigationLink href="/about">A propos</NavigationLink>
                <NavigationLink href="/liste_posts">Liste des posts</NavigationLink>
                <NavigationLink href="/my_posts">Mes posts</NavigationLink>
                <NavigationLink href="/contacts">Contacts</NavigationLink>
                <NavigationLink href="/post">Publier</NavigationLink>
                {user ? <LoggedIn /> : <NavigationLink href="/login">Connexion</NavigationLink>}
            </nav>
        </header>
    );
  }
  
export default Header;
