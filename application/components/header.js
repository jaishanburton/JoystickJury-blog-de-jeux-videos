import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

function Header() {
    const user = useUser(); // Faut pas déstructurer ici car useUser peut retourner null

    return (
        <header>
            <h1>Mon Blog</h1>
            {user ? <LoggedIn /> : <LoggedOut />}
        </header>
    );
}

export default Header;