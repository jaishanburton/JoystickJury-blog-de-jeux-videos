import Link from 'next/link';

function Nav() {
    return (
        <nav>
            <Link href="/">        Accueil</Link>
            <Link href="/about">         À Propos</Link>
            <Link href="/contacts">        Contacts</Link>
            <Link href="/articles">        Articles</Link>
            <Link href="/use-state">        Compteur</Link>
            <Link href="/login-native">        Login Native</Link>
            <Link href="/login-controlled">        Login Controlled</Link>
        </nav>
    );
}

export default Nav;