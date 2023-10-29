import React from 'react';
import { useUser } from './UserContext';

function LoggedOut() {
    const { login } = useUser();

    const onClickLogin = async () => {
        try {
            const response = await fetch('/api/profile');
            const user = await response.json();
            login(user);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <div>
            <button onClick={onClickLogin}>Se connecter</button>
        </div>
    );
}

export default LoggedOut;
