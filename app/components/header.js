import { useContext } from 'react';
import { UserContext } from './UserContext';

function Header() {
    const { user } = useContext(UserContext);

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
