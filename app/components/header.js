import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

function Header() {
    const { user } = useContext(UserContext);

    return (
        <header>
            <h1>Mon Blog</h1>
            {user ? <LoggedIn /> : <LoggedOut />}
        </header>
    );
}

export default Header;
