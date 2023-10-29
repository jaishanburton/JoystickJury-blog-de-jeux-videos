import React from 'react';
import { useUser } from './UserContext';

function LoggedIn() {
    const { user, logout } = useUser();

    return (
        <div>
            <div>
                <span role="img" aria-label="icône de compte">👤</span> {user.username}
            </div>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}

export default LoggedIn;
