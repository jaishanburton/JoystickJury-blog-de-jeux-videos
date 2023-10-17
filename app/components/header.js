import { useState, useEffect } from 'react';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/profile')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Non autorisé');
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du profil:", error);
            });
    }, []);

    return (
        <header>
            <h1>Mon Blog</h1>
            {user && (
                <div>
                    <span role="img" aria-label="icône de compte">👤</span> {user.username}
                </div>
            )}
        </header>
    );
}

export default Header;
