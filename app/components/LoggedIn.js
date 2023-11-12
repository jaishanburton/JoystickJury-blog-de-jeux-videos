import React from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function LoggedIn() {
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();

    const logout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    return (
        <div>
            <div>
                <span role="img" aria-label="icône de compte">👤</span> {user?.email}
            </div>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}

export default LoggedIn;