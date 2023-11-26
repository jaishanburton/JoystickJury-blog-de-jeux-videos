import Link from 'next/link';

function Nav() {
    return (
        <nav class="pricipal">
            <ul class="shadow-button-set">
                <li >
                    <button>
                        <Link href="/">Accueil</Link>
                    </button>
                </li>

                <li >
                    <button>
                    <Link href="/about">À Propos</Link>
                    </button>
                </li>
            
                <li >
                    <button>
                    <Link href="/contacts">Contacts</Link>
                    </button>
                </li>
            
                <li >
                    <button>
                    <Link href="/articles">Articles</Link>
                    </button>
                </li>
            
                <li >
                    <button>
                    <Link href="/use-state">Compteur</Link>
                    </button>
                </li>
            
                <li >
                    <button>
                    <Link href="/login">Login (Supabase)</Link>                    </button>
                </li>
            
                {/* <li >
                    <button>
                    <Link href="/login-native">Login native </Link>                 </button>
                </li> */}
           </ul>
        </nav>
    );
}

export default Nav;